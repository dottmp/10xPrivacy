import Parser from 'rss-parser';
import { FEED_SOURCES } from './configs';
import { tryCatch } from './utils/try-catch';
import { sanitizeHtml } from './utils/sanitize';

class RSS {
	private _parser = new Parser<Record<string, never>, CustomData>({
		customFields: {
			item: ['media:content', 'content:encoded']
		}
	});

	private _slugify(str: string): string {
		return str
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.slice(0, 80);
	}

	private _sortByRecent(items: FeedItem[]): FeedItem[] {
		return items.sort((a, b) => {
			const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return dateB - dateA;
		});
	}

	private _flattenFeed(feed: ParsedFeed) {}

	async getSources(searchParams: { source: SourceSearchParam }) {
		const sources = FEED_SOURCES.filter(
			(s) =>
				searchParams.source === 'all' ||
				searchParams.source === null ||
				s.id === searchParams.source
		);

		const parsedSources = await Promise.allSettled(
			sources.map((source) =>
				this._parser
					.parseURL(source.feedUrl)
					.then((feed) => ({ feed, source, count: feed.items.length }))
			)
		);

		return {
			sources: parsedSources,
			count: parsedSources.length
		};
	}

	async getFeed(searchParams: { source: SourceSearchParam }) {
		const { data, error } = await tryCatch(this.getSources(searchParams));

		if (error) {
			throw new Error(`Failed to fetch feed sources: ${error.message}`);
		}

		const items = data.sources.flatMap((result): FeedItem[] => {
			if (result.status !== 'fulfilled') return [];

			const { feed, source } = result.value;

			return feed.items.map((item) => {
				const title = item.title!;
				const link = item.link!;
				const slug = this._slugify(title);
				const id = item.guid || link || slug;
				const description = item.contentSnippet || item.summary || '';
				const content = sanitizeHtml(item['content:encoded'] || item.content || item.summary || '');

				return {
					id,
					title,
					link,
					description,
					content,
					pubDate: item.pubDate || item.isoDate || null,
					author: item.creator || null,
					imageUrl: item['media:content']?.$?.url || null,
					source,
					slug
				} satisfies FeedItem;
			});
		});

		return {
			data: this._sortByRecent(items),
			count: items.length
		};
	}
}

export const rss = new RSS();
