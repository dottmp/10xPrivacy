import { describe, expect, it } from 'vitest';

import { load } from './+page.server';

import { buildStackGroups } from '#lib/features/awesome-privacy/stack.ts';

describe('/guides/used-by-10xprivacy page load', () => {
	it('returns page metadata', () => {
		const result = load({
			url: new URL('http://localhost/guides/used-by-10xprivacy')
		} as never) as unknown as {
			meta: { title: string; description: string; url: string };
		};

		expect(result.meta.title).toBe('Used by 10xPrivacy');
		expect(result.meta.description.length).toBeGreaterThan(0);
		expect(result.meta.url).toBe('http://localhost/guides/used-by-10xprivacy');
	});

	it('keeps the groups in file order', () => {
		const groups = buildStackGroups();

		expect(groups.map((group) => group.name)).toEqual([
			'Browsers',
			'Search Engines',
			'Ad Blockers',
			'Passwords and 2FA',
			'Email',
			'Messaging',
			'Files and backup',
			'Documents',
			'Photos',
			'Video',
			'Maps',
			'Network',
			'Phone OS'
		]);
	});

	it('resolves every item to a service page', () => {
		const items = buildStackGroups().flatMap((group) => group.items);

		expect(items).toHaveLength(21);
		items.forEach((item) => {
			expect(item.href).toMatch(/^awesome-privacy\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/);
			expect(item.service.name).toBe(item.name);
			expect(item.service.url.length).toBeGreaterThan(0);
		});
	});

	it('matches names case-insensitively and shows the directory spelling', () => {
		const names = buildStackGroups().flatMap((group) => group.items.map((item) => item.name));

		expect(names).toContain('NextCloud');
		expect(names).toContain('FileN');
		expect(names).toContain('OpenWRT');
	});

	it('includes the tools we actually run', () => {
		const names = buildStackGroups().flatMap((group) => group.items.map((item) => item.name));

		expect(names).toContain('Tuta');
		expect(names).toContain('Ente Auth');
		expect(names).toContain('SimpleLogin');
	});

	it('returns notable mentions with external urls', () => {
		const result = load({
			url: new URL('http://localhost/guides/used-by-10xprivacy')
		} as never) as unknown as {
			notableMentions: Array<{ name: string; url: string; description?: string }>;
		};

		expect(result.notableMentions).toHaveLength(6);
		result.notableMentions.forEach((mention) => {
			expect(mention.url).toMatch(/^https:\/\//);
			expect((mention.description ?? '').length).toBeGreaterThan(0);
		});
	});

	it('gives every item a unique anchor slug', () => {
		const slugs = buildStackGroups().flatMap((group) => group.items.map((item) => item.slug));

		expect(new Set(slugs).size).toBe(slugs.length);
		slugs.forEach((slug) => {
			expect(slug).toMatch(/^[a-z0-9-]+$/);
		});
	});

	it('resolves duplicate names to the first match in document order', () => {
		const byName = new Map(
			buildStackGroups()
				.flatMap((group) => group.items)
				.map((item) => [item.name, item.href])
		);

		expect(byName.get('uBlock Origin')).toMatch(/^awesome-privacy\/security-tools\//);
		expect(byName.get('Cryptomator')).toMatch(/^awesome-privacy\/essentials\//);
	});
});
