import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Navbar from './navbar.svelte';

vi.mock('theme-change');

describe('Navbar component', () => {
	describe('URLs', () => {
		it('home link has correct href', () => {
			render(Navbar);

			const homeLink = screen.getByRole('link', { name: /10xPrivacy/i });

			expect(homeLink.getAttribute('href')).toBe('/');
		});

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
		it('desktop nav is hidden by default and visible at sm breakpoint', () => {
			render(Navbar);

			const desktopNav = screen.getByRole('navigation').querySelector('.hidden.sm\\:block');

			expect(desktopNav).not.toBeNull();
		});

		it('mobile nav is visible by default and hidden at sm breakpoint', () => {
			render(Navbar);

			const mobileNav = screen.getByRole('navigation').querySelector('.sm\\:hidden');

			expect(mobileNav).not.toBeNull();
		});

		it('desktop nav contains all nav links', () => {
			render(Navbar);

			const desktopNav = screen.getByRole('navigation').querySelector('.hidden.sm\\:block');

			const links = desktopNav?.querySelectorAll('a');

			expect(links).toHaveLength(3);
		});

		it('mobile nav contains all nav links', () => {
			render(Navbar);

			const mobileNav = screen.getByRole('navigation').querySelector('.sm\\:hidden');

			const links = mobileNav?.querySelectorAll('a');

			expect(links).toHaveLength(3);
		});
	});
});
