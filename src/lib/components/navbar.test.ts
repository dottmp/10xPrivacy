import { render, screen } from '@testing-library/svelte';
import { readable } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Navbar from './navbar.svelte';

vi.mock('theme-change');

// Mock $app/stores to control the current page URL in tests
vi.mock('$app/stores', async () => {
	return {
		page: readable({ url: new URL('http://localhost/') })
	};
});

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

vi.mock('$lib/features/awesome-privacy/components/search.svelte');

describe('Navbar component', () => {
	// mock localStorage
	beforeEach(() => {
		globalThis.localStorage = (function () {
			let store: Record<string, string> = {};

			return {
				getItem: (k: string) => (k in store ? store[k] : null),
				setItem: (k: string, v: string) => {
					store[k] = String(v);
				},
				removeItem: (k: string) => {
					delete store[k];
				},
				clear: () => {
					store = {};
				},

				length: 0,
				key: (index: number) => Object.keys(store)[index] ?? null
			} as Storage;
		})();
	});

	describe('URLs', () => {
		it('Privacy News link has correct href', () => {
			render(Navbar);
			const links = screen.getAllByRole('link', { name: /Privacy News/i });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/privacy-news');
			});
		});

		it('Awesome Privacy link has correct href', () => {
			render(Navbar);

			const links = screen.getAllByRole('link', { name: /Awesome Privacy/i });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/awesome-privacy');
			});
		});

		it('Websites link has correct href', () => {
			render(Navbar);

			const links = screen.getAllByRole('link', { name: /Websites/i });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/websites');
			});
		});
	});
});
