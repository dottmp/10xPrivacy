import { describe, expect, it } from 'vitest';

import rssSourcesData from './rss-sources.json';
import websitesData from './websites.json';

import { isSafeUrl } from '$lib/utils/sanitize';

// ---------------------------------------------------------------------------
// websites.json
// ---------------------------------------------------------------------------

describe('websites.json', () => {
	it('has a data array', () => {
		expect(Array.isArray(websitesData.data)).toBe(true);
	});

	it('data array is not empty', () => {
		expect(websitesData.data.length).toBeGreaterThan(0);
	});

	it('every entry is a non-empty string', () => {
		websitesData.data.forEach((entry) => {
			expect(typeof entry).toBe('string');
			expect(entry.length).toBeGreaterThan(0);
		});
	});

	it('every entry is a safe URL', () => {
		websitesData.data.forEach((entry) => {
			expect(isSafeUrl(entry)).toBe(true);
		});
	});

	it('contains no duplicate URLs', () => {
		const unique = new Set(websitesData.data);
		expect(unique.size).toBe(websitesData.data.length);
	});
});

// ---------------------------------------------------------------------------
// rss-sources.json
// ---------------------------------------------------------------------------

describe('rss-sources.json', () => {
	it('has a data array', () => {
		expect(Array.isArray(rssSourcesData.data)).toBe(true);
	});

	it('data array is not empty', () => {
		expect(rssSourcesData.data.length).toBeGreaterThan(0);
	});

	it('every entry has the required fields', () => {
		rssSourcesData.data.forEach((source) => {
			expect(typeof source.id).toBe('string');
			expect(source.id.length).toBeGreaterThan(0);
			expect(typeof source.name).toBe('string');
			expect(source.name.length).toBeGreaterThan(0);
			expect(typeof source.url).toBe('string');
			expect(typeof source.feedUrl).toBe('string');
		});
	});

	it('every entry has a safe url', () => {
		rssSourcesData.data.forEach((source) => {
			expect(isSafeUrl(source.url)).toBe(true);
		});
	});

	it('every entry has a safe feedUrl', () => {
		rssSourcesData.data.forEach((source) => {
			expect(isSafeUrl(source.feedUrl)).toBe(true);
		});
	});

	it('contains no duplicate ids', () => {
		const ids = rssSourcesData.data.map((s) => s.id);
		const unique = new Set(ids);
		expect(unique.size).toBe(ids.length);
	});
});
