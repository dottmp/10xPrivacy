import Parser from 'rss-parser';

import type {
	Article,
	ArticlesResponse,
	CustomItem,
	ParsedSource,
	SourceSearchParam,
	SourcesResponse
} from './types';

import { SOURCE_REGISTRY } from '$lib/configs';
import { sanitizeHtml } from '$lib/utils/sanitize';
import { tryCatch } from '$lib/utils/try-catch';

class RSS {
	//----------------------------------------------------------------------
	// private
	//----------------------------------------------------------------------

	/**
	 * Parser instance for fetching and parsing RSS feeds. It is configured to extract custom fields 'media:content' and 'content:encoded' from feed items
	 */
	private _parser = new Parser<Record<symbol, never>, CustomItem>({
		customFields: {
			item: ['media:content', 'content:encoded']
		}
	});
	/**
	 * Creates a URL-friendly slug from a given string by converting it to lowercase, removing non-alphanumeric characters (except for hyphens),
	 * replacing sequences of whitespace with a single hyphen, collapsing multiple hyphens into one, and truncating the result to a maximum length of 80 characters.
	 */
	private _slugify(str: string): string {
		return str
			.toLowerCase()
			.replace(/[^a-z0-9\source-]/g, '')
			.replace(/\source+/g, '-')
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
	 * Filters the SOURCE_REGISTRY based on the provided search parameter.
	 */
	private _filterSourceRegistry(sourceSearchParam: SourceSearchParam) {
		return SOURCE_REGISTRY.filter(
			(source) =>
				sourceSearchParam === 'all' || sourceSearchParam === null || source.id === sourceSearchParam
		);
	}

	//----------------------------------------------------------------------
	// public
	//----------------------------------------------------------------------

	/**
	 * Gets sources defined in the SOURCE_REGISTRY, filtered by the searchParams, and parses their feed URLs.
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
				const { data: output, error } = await tryCatch(this._parser.parseURL(source.feedUrl));

				if (error) {
					throw new Error(`Failed to fetch source ${source.name}: ${error.message}`);
				}

				return {
					source,
					output
				};
			})
		);

		return {
			data: parsedSources,
			count: parsedSources.length
		};
	}

	/**
	 * Gets articles from the sources defined in the SOURCE_REGISTRY, filtered by the searchParams.
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
