import { XMLParser } from 'fast-xml-parser';

import type {
	Article,
	FeedItem,
	Output,
	ArticlesResponse,
	ParsedSource,
	SourceSearchParam,
	SourcesResponse,
	Source
} from './types';

import { sanitizeHtml } from '$lib/utils/sanitize';
import { tryCatch } from '$lib/utils/try-catch';

const rssSources = [] as Source[];
// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

/** Extract a plain string from a fast-xml-parser value (may be string, object with _text, or number) */
function _str(val: unknown): string | undefined {
	if (val == null) return undefined;
	if (typeof val === 'string') {
		// strip CDATA wrappers emitted by stopNodes
		const m = val.match(/^<!\[CDATA\[([\s\S]*?)]]>$/);
		return m ? m[1] : val;
	}
	if (typeof val === 'object')
		return ((val as Record<string, unknown>)._text as string) ?? undefined;
	return String(val);
}

function _mediaContent(val: unknown): { $?: { url?: string } } {
	if (!val || typeof val !== 'object') return { $: {} };
	const attrs = (val as Record<string, unknown>).$ as Record<string, unknown> | undefined;
	// fast-xml-parser keeps attribute names as-is when attributeNamePrefix is ''
	return { $: { url: attrs?.url as string | undefined } };
}

function _atomLink(val: unknown): string | undefined {
	if (!val) return undefined;
	const links = Array.isArray(val) ? val : [val];
	const pick =
		links.find((l) => (l as Record<string, Record<string, unknown>>).$?.rel === 'alternate') ??
		links[0];
	return (pick as Record<string, Record<string, unknown>>).$?.href as string | undefined;
}

class RSS {
	//----------------------------------------------------------------------
	// private
	//----------------------------------------------------------------------

	/**
	 * Fetches and parses an RSS/Atom feed URL into our Output shape.
	 */
	private async _parseURL(url: string): Promise<Output> {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const xml = await res.text();

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '',
			attributesGroupName: '$',
			textNodeName: '_text',
			stopNodes: ['*.description', '*.summary', '*.content\\:encoded', '*.content'],
			isArray: (name) => name === 'item' || name === 'entry'
		});
		const doc = parser.parse(xml);

		// RSS 2.0
		const channel = doc?.rss?.channel;
		if (channel) {
			const items: FeedItem[] = (channel.item ?? []).map((i: Record<string, unknown>) => ({
				...i,
				title: _str(i.title),
				link: _str(i.link),
				guid: _str(i.guid),
				pubDate: _str(i.pubDate),
				isoDate: _str(i.pubDate),
				content: _str(i['content:encoded']) ?? _str(i.description),
				contentSnippet: _str(i.description),
				summary: _str(i.description),
				'content:encoded': _str(i['content:encoded']) ?? '',
				'media:content': _mediaContent(i['media:content'])
			}));
			return { title: _str(channel.title), items };
		}

		// Atom
		const feed = doc?.feed;
		if (feed) {
			const items: FeedItem[] = (feed.entry ?? []).map((e: Record<string, unknown>) => {
				const contentText = _str(e.content);
				const summaryText = _str(e.summary);
				const date = _str(e.published) ?? _str(e.updated);
				return {
					...e,
					title: _str(e.title),
					link: _atomLink(e.link),
					guid: _str(e.id),
					pubDate: date,
					isoDate: date,
					content: contentText ?? summaryText,
					contentSnippet: summaryText,
					summary: summaryText,
					'content:encoded': contentText ?? '',
					'media:content': { $: {} }
				};
			});
			return { title: _str(feed.title), items };
		}

		throw new Error('Unrecognised feed format');
	}

	/**
	 * Creates a URL-friendly slug from a given string by converting it to lowercase, removing non-alphanumeric characters (except for hyphens),
	 * replacing sequences of whitespace with a single hyphen, collapsing multiple hyphens into one, and truncating the result to a maximum length of 80 characters.
	 */
	private _slugify(str: string): string {
		return str
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.slice(0, 80);
	}

	/**
	 * Sorts feed items by their publication date, with the most recent items appearing first.
	 * If an item does not have a publication date, it is treated as having a date of 0 (the Unix epoch), which will place it at the end of the sorted list.
	 */
	private _sortByRecent(items: Article[]): Article[] {
		return items.sort((a, b) => {
			const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return dateB - dateA;
		});
	}

	/**
	 * Filters the rssSources based on the provided search parameter.
	 */
	private _filterSourceRegistry(sourceSearchParam: SourceSearchParam) {
		return rssSources.filter(
			(source) =>
				sourceSearchParam === 'all' || sourceSearchParam === null || source.id === sourceSearchParam
		);
	}

	//----------------------------------------------------------------------
	// public
	//----------------------------------------------------------------------

	/**
	 * Gets sources defined in the rssSources, filtered by the searchParams, and parses their feed URLs.
	 * @param {Object} searchParams - The parameters to filter the sources.
	 * @example
	 * const sources = await rss.getSources({ source: 'tuta' });
	 */
	public async getSources(
		searchParams: { source: SourceSearchParam } = { source: 'all' }
	): Promise<SourcesResponse> {
		const filteredSourceRegistry = this._filterSourceRegistry(searchParams.source);

		const parsedSources: ParsedSource[] = await Promise.all(
			filteredSourceRegistry.map(async (source) => {
				const { data: output, error } = await tryCatch(this._parseURL(source.feedUrl));

				if (error) {
					throw new Error(`Failed to fetch source ${source.name}: ${error.message}`);
				}

				return {
					source,
					output: output as Output
				};
			})
		);

		return {
			data: parsedSources,
			count: parsedSources.length
		};
	}

	/**
	 * Gets articles from the sources defined in the rssSources, filtered by the searchParams.
	 * @param {Object} searchParams - The parameters to filter the sources.
	 * @example
	 * const articles = await rss.getArticles({ source: 'tuta' });
	 */
	public async getArticles(
		searchParams: { source: SourceSearchParam } = { source: 'all' }
	): Promise<ArticlesResponse> {
		const { data: parsedSources, error } = await tryCatch(this.getSources(searchParams));

		if (error) {
			throw new Error(`Failed to fetch feed parsedSources: ${error.message}`);
		}

		const articles = parsedSources.data.flatMap((parsedSource): Article[] => {
			return parsedSource.output.items.map((item): Article => {
				return {
					...item,
					source: parsedSource.source,
					date: item.pubDate || item.isoDate,
					slug: this._slugify(item.title || item.guid || crypto.randomUUID()),
					description: item.contentSnippet || item.summary,
					content: sanitizeHtml(item['content:encoded'] || item.content || item.summary || ''),
					thumbnailUrl: item['media:content']?.$?.url
				};
			});
		});

		return {
			data: this._sortByRecent(articles),
			count: articles.length
		};
	}
}

/**
 * RSS variable is an instance of the RSS class, which can be used to call the getSources and getArticles methods to fetch and parse RSS feeds from the predefined sources.
 */
export const rss = new RSS();
