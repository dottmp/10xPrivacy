import { load } from 'js-yaml';
import { describe, expect, it } from 'vitest';

import awesomePrivacyRaw from './awesome-privacy.yml?raw';
import rssSourcesData from './rss-sources.json';
import stackRaw from './stack.yml?raw';
import websitesData from './websites.json';

import { isSafeUrl } from '#lib/utils/sanitize.ts';

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

// ---------------------------------------------------------------------------
// stack.yml
// ---------------------------------------------------------------------------

type StackData = {
	groups: Array<{ name: string; items: Array<{ name: string; note?: string }> }>;
	notableMentions?: Array<{ name: string; url: string; description?: string }>;
};

const stackData = load(stackRaw) as StackData;
const stackServiceNames = new Set<string>();
const awesomePrivacyData = load(awesomePrivacyRaw) as {
	categories: Array<{ sections: Array<{ services: Array<{ name: string }> }> }>;
};

for (const category of awesomePrivacyData.categories) {
	for (const section of category.sections) {
		for (const service of section.services) {
			stackServiceNames.add(service.name.toLowerCase());
		}
	}
}

describe('stack.yml', () => {
	it('has at least one group', () => {
		expect(stackData.groups.length).toBeGreaterThan(0);
	});

	it('every group has a name and at least one item', () => {
		stackData.groups.forEach((group) => {
			expect(group.name.length).toBeGreaterThan(0);
			expect(group.items.length).toBeGreaterThan(0);
		});
	});

	it('group names are unique', () => {
		const names = stackData.groups.map((group) => group.name);
		expect(new Set(names).size).toBe(names.length);
	});

	it('item names are unique across groups', () => {
		const names = stackData.groups.flatMap((group) => group.items.map((item) => item.name));
		expect(new Set(names).size).toBe(names.length);
	});

	it('every item name exists in awesome-privacy.yml', () => {
		const missing = stackData.groups
			.flatMap((group) => group.items)
			.filter((item) => !stackServiceNames.has(item.name.toLowerCase()))
			.map((item) => item.name);

		expect(missing).toEqual([]);
	});

	it('every item has a note', () => {
		stackData.groups
			.flatMap((group) => group.items)
			.forEach((item) => {
				expect((item.note ?? '').length).toBeGreaterThan(0);
			});
	});

	it('every notable mention has a name and a safe url', () => {
		expect((stackData.notableMentions ?? []).length).toBeGreaterThan(0);

		(stackData.notableMentions ?? []).forEach((mention) => {
			expect(mention.name.length).toBeGreaterThan(0);
			expect(isSafeUrl(mention.url)).toBe(true);
			expect((mention.description ?? '').length).toBeGreaterThan(0);
		});
	});

	it('notable mention names are unique', () => {
		const names = (stackData.notableMentions ?? []).map((mention) => mention.name);

		expect(new Set(names).size).toBe(names.length);
	});
});
