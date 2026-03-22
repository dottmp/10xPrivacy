import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import rssSources from '../../data/rss-sources.json';

import { rss } from './service.ts';
import type { Output } from './types.ts';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const { mockParseURL } = vi.hoisted(() => ({
	mockParseURL: vi.fn()
}));

vi.mock('../../utils/sanitize.js', () => ({
	sanitizeHtml: (html: string) => html
}));

vi.mock('rss-parser', () => {
	return {
		default: class MockParser {
			parseURL = mockParseURL;
		}
	};
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const [tutaSource, privacyGuidesSource] = rssSources.data;

/** Minimal Output fixture for a source */
function makeFeedOutput(items: Partial<Output['items'][number]>[] = []): Output {
	return {
		title: 'Test Feed',
		items: items as Output['items']
	} as Output;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('RSS', () => {
	afterEach(() => {
		vi.clearAllMocks();
		mockParseURL.mockReset();
	});

	// -----------------------------------------------------------------------
	// getSources
	// -----------------------------------------------------------------------

	describe('getSources', () => {
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
			mockParseURL.mockRejectedValue(new Error('Network error'));

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
				mockParseURL.mockImplementation((url: string) => {
					if (url === tutaSource.feedUrl) {
						return Promise.resolve(
							makeFeedOutput([
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
						);
					}

					if (url === privacyGuidesSource.feedUrl) {
						return Promise.resolve(
							makeFeedOutput([
								{
									title: 'PG Article',
									guid: 'pg-1',
									pubDate: '2024-03-20T10:00:00Z',
									contentSnippet: 'PG snippet',
									'content:encoded': '<p>PG body</p>'
								}
							])
						);
					}

					return Promise.reject(new Error('Unknown URL'));
				});
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
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
						{ title: 'Test', guid: 'g1', contentSnippet: 'The snippet', 'content:encoded': '' }
					])
				);
				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].description).toBe('The snippet');
			});

			it('falls back to summary when contentSnippet is missing', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
						{ title: 'Test', guid: 'g1', summary: 'The summary', 'content:encoded': '' }
					])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].description).toBe('The summary');
			});

			it('uses content:encoded as content when available', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([{ title: 'Test', guid: 'g1', 'content:encoded': '<b>encoded</b>' }])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].content).toBe('<b>encoded</b>');
			});

			it('falls back to item.content when content:encoded is absent', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([{ title: 'Test', guid: 'g1', content: '<p>plain</p>' }])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].content).toBe('<p>plain</p>');
			});

			it('extracts thumbnailUrl from media:content.$url', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
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
				mockParseURL.mockResolvedValue(
					makeFeedOutput([{ title: 'Test', guid: 'g1', 'content:encoded': '' }])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].thumbnailUrl).toBeUndefined();
			});

			it('uses pubDate as date when available', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
						{ title: 'Test', guid: 'g1', pubDate: '2024-01-01T00:00:00Z', 'content:encoded': '' }
					])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(data[0].date).toBe('2024-01-01T00:00:00Z');
			});

			it('falls back to isoDate when pubDate is absent', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
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
				mockParseURL.mockResolvedValue(
					makeFeedOutput([{ title: 'Hello World Article', guid: 'g1', 'content:encoded': '' }])
				);

				const { data } = await rss.getArticles({ source: 'tuta' });

				expect(typeof data[0].slug).toBe('string');
				expect((data[0].slug as string).length).toBeGreaterThan(0);
			});
		});

		describe('sorting edge cases', () => {
			it('places articles without a pubDate at the end', async () => {
				mockParseURL.mockResolvedValue(
					makeFeedOutput([
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
				mockParseURL.mockRejectedValue(new Error('Feed unavailable'));

				await expect(rss.getArticles({ source: 'tuta' })).rejects.toThrow(
					'Failed to fetch source Tuta: Feed unavailable'
				);
			});
		});
	});
});
