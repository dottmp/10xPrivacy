import type { Article, ParsedSource, RawItem, Source, SourceSearchParam } from './types';
import { RssXmlParser } from './xml-parser';

import rssSourcesJSON from '$lib/data/rss-sources.json';
import { tryCatch } from '$lib/utils/try-catch';

const rssSources = rssSourcesJSON.data as Source[];

class RSS extends RssXmlParser {
	/**
	 * Converts a raw `RawItem` into the richer `Article`
	 */
	private _toArticle(item: RawItem, source: Source): Article {
		return {
			...item,
			source,
			date: item.pubDate ?? item.isoDate,
			slug: this._slugify(item.title ?? item.guid ?? crypto.randomUUID()),
			description: item.contentSnippet ?? item.summary ?? '',
			content: item['content:encoded'] ?? item.content ?? item.summary ?? '',
			thumbnailUrl: item['media:content']?.url
		};
	}

	/**
	 * Creates a URL-friendly slug
	 */
	private _slugify(str: string): string {
		return str
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.slice(0, 80);
	}

	/** Returns a new array sorted newest-first by `pubDate`. */
	private _sortByRecent(articles: Article[]): Article[] {
		return articles.toSorted((a, b) => {
			const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return dateB - dateA;
		});
	}

	/** Filters the source registry down to the requested source(s). */
	private _filterSourceRegistry(sourceSearchParam: SourceSearchParam): Source[] {
		return rssSources.filter(
			(source) =>
				sourceSearchParam === 'all' || sourceSearchParam === null || source.id === sourceSearchParam
		);
	}

	/**
	 * Fetches and parses a single RSS/Atom feed URL.
	 * Throws if the network request fails or the server returns a non-OK status.
	 */
	private async _fetchFeed(source: Source): Promise<ParsedSource> {
		const { data: response, error: fetchError } = await tryCatch(fetch(source.feedUrl));

		if (fetchError || !response?.ok) {
			throw new Error(
				`Failed to fetch source ${source.name}: ${fetchError?.message ?? response?.statusText}`
			);
		}

		const xml = await response.text();
		const feed = this.parse(xml);

		return { source, feed };
	}

	// ------------------------------------------------------------------
	// public
	// ------------------------------------------------------------------

	/**
	 * Fetches and parses all configured RSS/Atom sources, optionally filtered
	 * to a single source by `searchParams.source`.
	 */
	public async getSources(
		searchParams: { source: SourceSearchParam } = { source: 'all' }
	): Promise<ParsedSource[]> {
		const sources = this._filterSourceRegistry(searchParams.source);

		return Promise.all(sources.map((source) => this._fetchFeed(source)));
	}

	/**
	 * Returns a flat, sorted list of articles from all matching sources.
	 * Articles are sorted newest-first by publication date.
	 */
	public async getArticles(
		searchParams: { source: SourceSearchParam } = { source: 'all' }
	): Promise<Article[]> {
		const parsedSources = await this.getSources(searchParams);

		const articles = parsedSources.flatMap(({ source, feed }) =>
			feed.items.map((item) => this._toArticle(item, source))
		);

		return this._sortByRecent(articles);
	}

	public async getFeaturedArticles(count: number = 5): Promise<Article[]> {
		const articles = await this.getArticles({ source: 'all' });

		return articles.slice(0, count);
	}

	/** Filters a list of articles to those matching the specified source. */
	public filterArticlesBySource(
		articles: Article[],
		searchParams: { source: SourceSearchParam }
	): Article[] {
		return articles.filter(
			(article) =>
				searchParams.source === 'all' ||
				searchParams.source === null ||
				article.source.id === searchParams.source
		);
	}
}

export const rss = new RSS();
