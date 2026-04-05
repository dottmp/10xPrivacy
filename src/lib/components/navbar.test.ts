import { render, screen } from '@testing-library/svelte';
import { readable } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';

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

// Mock search component — isolates navbar tests from search internals
vi.mock('$lib/features/awesome-privacy/components/search.svelte', () => ({
	default: vi.fn()
}));

describe('Navbar component', () => {
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

	describe('Breakpoint styling', () => {
		it('desktop nav is hidden by default and visible at md breakpoint', () => {
			render(Navbar);

			const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:block');

			expect(desktopNav).not.toBeNull();
		});

		it('mobile drawer is visible by default and hidden at md breakpoint', () => {
			render(Navbar);

			const mobileDrawer = screen.getByRole('navigation').querySelector('.md\\:hidden');

			expect(mobileDrawer).not.toBeNull();
		});

		it('desktop nav contains all nav links', () => {
			render(Navbar);

			const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:block');

			const links = desktopNav?.querySelectorAll('a');

			expect(links).toHaveLength(3);
		});

		it('mobile drawer contains all nav links', () => {
			render(Navbar);

			const mobileDrawer = screen.getByRole('navigation').querySelector('.md\\:hidden');

			const links = mobileDrawer?.querySelectorAll('a');

			expect(links).toHaveLength(4);
		});
	});
});
