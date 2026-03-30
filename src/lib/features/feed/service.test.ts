import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import rssSources from '../../data/rss-sources.json';

import { rss } from './service.ts';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../../utils/sanitize.js');

const [tutaSource, privacyGuidesSource] = rssSources.data;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRssFeed(
	items: {
		title?: string;
		guid?: string;
		pubDate?: string;
		isoDate?: string;
		description?: string;
		'content:encoded'?: string;
		'media:content'?: string;
	}[]
) {
	const itemsXml = items
		.map(
			(i) => `
    <item>
      ${i.title ? `<title>${i.title}</title>` : ''}
      ${i.guid ? `<guid>${i.guid}</guid>` : ''}
      ${i.pubDate ? `<pubDate>${i.pubDate}</pubDate>` : ''}
      ${i.description ? `<description>${i.description}</description>` : ''}
      ${i['content:encoded'] ? `<content:encoded><![CDATA[${i['content:encoded']}]]></content:encoded>` : ''}
      ${i['media:content'] ? `<media:content url="${i['media:content']}" />` : ''}
    </item>`
		)
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    ${itemsXml}
  </channel>
</rss>`;
}

function mockFetchWith(urlMap: Record<string, string>) {
	vi.stubGlobal(
		'fetch',
		vi.fn((url: string) => {
			const body = urlMap[url];
			if (!body) return Promise.reject(new Error(`Unknown URL: ${url}`));
			return Promise.resolve({
				ok: true,
				text: () => Promise.resolve(body)
			});
		})
	);
}

function mockFetchError() {
	vi.stubGlobal(
		'fetch',
		vi.fn(() => Promise.reject(new Error('Network error')))
	);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('RSS', () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.unstubAllGlobals();
	});

	// -----------------------------------------------------------------------
	// getSources
	// -----------------------------------------------------------------------

	describe('getSources', () => {
		beforeEach(() => {
			const allFeeds = Object.fromEntries(rssSources.data.map((s) => [s.feedUrl, makeRssFeed([])]));
			mockFetchWith(allFeeds);
		});

		it('returns all sources when source param is "all"', async () => {
			const result = await rss.getSources({ source: 'all' });

			expect(result.length).toBe(3);
			expect(result).toHaveLength(3);
		});

		it('returns all sources when called with default param', async () => {
			const result = await rss.getSources();

			expect(result.length).toBe(3);
		});

		it('returns all sources when source is null', async () => {
			const result = await rss.getSources({ source: null });

			expect(result.length).toBe(3);
		});

		it('returns only the matching source when a specific source id is provided', async () => {
			const result = await rss.getSources({ source: 'tuta' });

			expect(result.length).toBe(1);
			expect(result[0].source.id).toBe('tuta');
		});

		it('each parsed source contains a source and feed property', async () => {
			const result = await rss.getSources({ source: 'all' });

			result.forEach((parsedSource) => {
				expect(parsedSource).toHaveProperty('source');
				expect(parsedSource).toHaveProperty('feed');
			});
		});

		it('throws when the fetch fails for a source', async () => {
			mockFetchError();

			await expect(rss.getSources({ source: 'tuta' })).rejects.toThrow(
				'Failed to fetch source Tuta: Network error'
			);
		});
	});

	// -----------------------------------------------------------------------
	// getArticles
	// -----------------------------------------------------------------------

	describe('getArticles', () => {
		describe('basic response shape', () => {
			beforeEach(() => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{
							title: 'Tuta Article One',
							guid: 'tuta-1',
							pubDate: 'Fri, 15 Mar 2024 10:00:00 +0000',
							'content:encoded': '<p>Tuta body one</p>',
							description: 'Tuta snippet one'
						},
						{
							title: 'Tuta Article Two',
							guid: 'tuta-2',
							pubDate: 'Sun, 10 Mar 2024 10:00:00 +0000',
							'content:encoded': '<p>Tuta body two</p>',
							description: 'Tuta snippet two'
						}
					]),
					[privacyGuidesSource.feedUrl]: makeRssFeed([
						{
							title: 'PG Article',
							guid: 'pg-1',
							pubDate: 'Wed, 20 Mar 2024 10:00:00 +0000',
							'content:encoded': '<p>PG body</p>',
							description: 'PG snippet'
						}
					])
				});
			});

			it('attaches the correct source object to each article', async () => {
				const result = await rss.getArticles({ source: 'tuta' });

				result.forEach((article) => {
					expect(article.source.id).toBe('tuta');
				});
			});
		});

		describe('article field mapping', () => {
			it('uses description as contentSnippet (stripped HTML) when available', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{ title: 'Test', guid: 'g1', description: 'The snippet', 'content:encoded': '' }
					])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(articles[0].description).toBe('The snippet');
			});

			it('uses content:encoded as content when available', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{ title: 'Test', guid: 'g1', 'content:encoded': '<b>encoded</b>' }
					])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(articles[0].content).toBe('<b>encoded</b>');
			});

			it('extracts thumbnailUrl from media:content url attribute', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{
							title: 'Test',
							guid: 'g1',
							'media:content': 'https://example.com/thumb.jpg',
							'content:encoded': ''
						}
					])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(articles[0].thumbnailUrl).toBe('https://example.com/thumb.jpg');
			});

			it('sets thumbnailUrl to undefined when media:content is absent', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([{ title: 'Test', guid: 'g1', 'content:encoded': '' }])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(articles[0].thumbnailUrl).toBeUndefined();
			});

			it('uses pubDate as date when available', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{
							title: 'Test',
							guid: 'g1',
							pubDate: 'Mon, 01 Jan 2024 00:00:00 +0000',
							'content:encoded': ''
						}
					])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(articles[0].date).toBe('Mon, 01 Jan 2024 00:00:00 +0000');
			});

			it('generates a slug from the article title', async () => {
				mockFetchWith({
					[tutaSource.feedUrl]: makeRssFeed([
						{ title: 'Hello World Article', guid: 'g1', 'content:encoded': '' }
					])
				});

				const articles = await rss.getArticles({ source: 'tuta' });

				expect(typeof articles[0].slug).toBe('string');
				expect((articles[0].slug as string).length).toBeGreaterThan(0);
			});
		});

		it('places articles without a pubDate at the end', async () => {
			mockFetchWith({
				[tutaSource.feedUrl]: makeRssFeed([
					{ title: 'No Date', guid: 'no-date', 'content:encoded': '' },
					{
						title: 'Has Date',
						guid: 'has-date',
						pubDate: 'Fri, 01 Mar 2024 00:00:00 +0000',
						'content:encoded': ''
					}
				])
			});

			const articles = await rss.getArticles({ source: 'tuta' });

			expect(articles[0].title).toBe('Has Date');
			expect(articles[1].title).toBe('No Date');
		});

		it('throws when fetch fails', async () => {
			mockFetchError();

			await expect(rss.getArticles({ source: 'tuta' })).rejects.toThrow(
				'Failed to fetch source Tuta: Network error'
			);
		});
	});
});
