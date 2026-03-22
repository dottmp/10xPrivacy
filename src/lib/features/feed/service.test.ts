import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import rssSources from '../../data/rss-sources.json';

import { rss } from './service.ts';
import type { Output } from './types.ts';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('../../utils/sanitize.js', () => ({
	sanitizeHtml: (html: string) => html
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const [tutaSource, privacyGuidesSource] = rssSources.data;

/** Build a minimal RSS 2.0 XML string from a list of item-like objects */
function makeXml(items: Partial<Output['items'][number]>[]): string {
	const itemsXml = items
		.map((item) => {
			const mediaUrl = item['media:content']?.$?.url;
			return `<item>
      ${item.title != null ? `<title>${item.title}</title>` : ''}
      ${item.guid != null ? `<guid>${item.guid}</guid>` : ''}
      ${item.pubDate != null ? `<pubDate>${item.pubDate}</pubDate>` : ''}
      ${item.isoDate != null && item.pubDate == null ? `<pubDate>${item.isoDate}</pubDate>` : ''}
      ${item.contentSnippet != null ? `<description>${item.contentSnippet}</description>` : ''}
      ${item.summary != null && item.contentSnippet == null ? `<description>${item.summary}</description>` : ''}
      ${item['content:encoded'] != null ? `<content:encoded><![CDATA[${item['content:encoded']}]]></content:encoded>` : ''}
      ${item.content != null && item['content:encoded'] == null ? `<description>${item.content}</description>` : ''}
      ${mediaUrl != null ? `<media:content url="${mediaUrl}"/>` : ''}
    </item>`;
		})
		.join('\n');

	return `<?xml version="1.0"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Test Feed</title>
    ${itemsXml}
  </channel>
</rss>`;
}

/** Stub global fetch to return the given XML for every request */
function stubFetch(xmlPerUrl: Map<string, string> | string) {
	vi.stubGlobal(
		'fetch',
		vi.fn().mockImplementation((url: string) => {
			const xml = typeof xmlPerUrl === 'string' ? xmlPerUrl : xmlPerUrl.get(url);
			if (!xml) return Promise.reject(new Error(`Unexpected URL: ${url}`));
			return Promise.resolve({ ok: true, text: () => Promise.resolve(xml) });
		})
	);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('RSS', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	// -----------------------------------------------------------------------
	// getSources
	// -----------------------------------------------------------------------

	describe('getSources', () => {
		beforeEach(() => {
			stubFetch(makeXml([]));
		});

		it('returns all sources when source param is "all"', async () => {
			const result = await rss.getSources({ source: 'all' });

			expect(result.count).toBe(3);
			expect(result.data).toHaveLength(3);
		});

		it('returns all sources when called with default param', async () => {
			const result = await rss.getSources();

			expect(result.count).toBe(3);
		});

		it('returns only the matching source when a specific source id is provided', async () => {
			const result = await rss.getSources({ source: 'tuta' });

			expect(result.count).toBe(1);
			expect(result.data[0].source.id).toBe('tuta');
		});

		it('returns all sources when source is null', async () => {
			const result = await rss.getSources({ source: null });

			expect(result.count).toBe(3);
		});

		it('each parsed source contains a source and output property', async () => {
			const result = await rss.getSources({ source: 'all' });

			result.data.forEach((parsedSource) => {
				expect(parsedSource).toHaveProperty('source');
				expect(parsedSource).toHaveProperty('output');
			});
		});

		it('throws when the parser fails for a source', async () => {
			vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

			await expect(rss.getSources({ source: 'tuta' })).rejects.toThrow(
				'Failed to fetch source Tuta'
			);
		});
	});

	// -----------------------------------------------------------------------
	// getArticles
	// -----------------------------------------------------------------------

	describe('getArticles', () => {
		describe('basic response shape', () => {
			beforeEach(() => {
				stubFetch(
					new Map([
						[
							tutaSource.feedUrl,
							makeXml([
								{
									title: 'Tuta Article One',
									guid: 'tuta-1',
									pubDate: '2024-03-15T10:00:00Z',
									contentSnippet: 'Tuta snippet one',
									'content:encoded': '<p>Tuta body one</p>'
								},
								{
									title: 'Tuta Article Two',
									guid: 'tuta-3',
									pubDate: '2024-03-10T10:00:00Z',
									contentSnippet: 'Tuta snippet two',
									'content:encoded': '<p>Tuta body two</p>'
								}
							])
						],
						[
							privacyGuidesSource.feedUrl,
							makeXml([
								{
									title: 'PG Article',
									guid: 'pg-1',
									pubDate: '2024-03-20T10:00:00Z',
									contentSnippet: 'PG snippet',
									'content:encoded': '<p>PG body</p>'
								}
							])
						]
					])
				);
			});

			it('attaches the correct source object to each article', async () => {
				const result = await rss.getArticles({ source: 'tuta' });

				result.data.forEach((article) => {
					expect(article.source.id).toBe('tuta');
				});
			});
		});

		describe('article field mapping', () => {
			it('uses contentSnippet as description when available', async () => {
				stubFetch(
					makeXml([
						{ title: 'Test', guid: 'g1', contentSnippet: 'The snippet', 'content:encoded': '' }
					])
				);
				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].description).toBe('The snippet');
			});

			it('falls back to summary when contentSnippet is missing', async () => {
				stubFetch(
					makeXml([{ title: 'Test', guid: 'g1', summary: 'The summary', 'content:encoded': '' }])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].description).toBe('The summary');
			});

			it('uses content:encoded as content when available', async () => {
				stubFetch(makeXml([{ title: 'Test', guid: 'g1', 'content:encoded': '<b>encoded</b>' }]));

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].content).toBe('<b>encoded</b>');
			});

			it('falls back to item.content when content:encoded is absent', async () => {
				stubFetch(makeXml([{ title: 'Test', guid: 'g1', content: '<p>plain</p>' }]));

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].content).toBe('<p>plain</p>');
			});

			it('extracts thumbnailUrl from media:content.$url', async () => {
				stubFetch(
					makeXml([
						{
							title: 'Test',
							guid: 'g1',
							'media:content': { $: { url: 'https://example.com/thumb.jpg' } },
							'content:encoded': ''
						}
					])
				);
				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].thumbnailUrl).toBe('https://example.com/thumb.jpg');
			});

			it('sets thumbnailUrl to undefined when media:content is absent', async () => {
				stubFetch(makeXml([{ title: 'Test', guid: 'g1', 'content:encoded': '' }]));

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].thumbnailUrl).toBeUndefined();
			});

			it('uses pubDate as date when available', async () => {
				stubFetch(
					makeXml([
						{ title: 'Test', guid: 'g1', pubDate: '2024-01-01T00:00:00Z', 'content:encoded': '' }
					])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].date).toBe('2024-01-01T00:00:00Z');
			});

			it('falls back to isoDate when pubDate is absent', async () => {
				stubFetch(
					makeXml([
						{
							title: 'Test',
							guid: 'g1',
							isoDate: '2024-06-01T00:00:00.000Z',
							'content:encoded': ''
						}
					])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].date).toBe('2024-06-01T00:00:00.000Z');
			});

			it('generates a slug from the article title', async () => {
				stubFetch(makeXml([{ title: 'Hello World Article', guid: 'g1', 'content:encoded': '' }]));

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(typeof data[0].slug).toBe('string');
				expect((data[0].slug as string).length).toBeGreaterThan(0);
			});
		});

		describe('sorting edge cases', () => {
			it('places articles without a pubDate at the end', async () => {
				stubFetch(
					makeXml([
						{ title: 'No Date', guid: 'no-date', 'content:encoded': '' },
						{
							title: 'Has Date',
							guid: 'has-date',
							pubDate: '2024-03-01T00:00:00Z',
							'content:encoded': ''
						}
					])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].title).toBe('Has Date');
				expect(data[1].title).toBe('No Date');
			});
		});

		describe('error handling', () => {
			it('throws when getSources fails', async () => {
				vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

				await expect(rss.getArticles({ source: 'tuta' })).rejects.toThrow(
					'Failed to fetch source Tuta'
				);
			});
		});
	});
});
