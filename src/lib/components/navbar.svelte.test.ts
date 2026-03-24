import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Navbar from './navbar.svelte';

describe('Navbar component', () => {
	describe('URLs', () => {
		it('home link has correct href', () => {
			const { getByRole } = render(Navbar);

			const homeLink = getByRole('link', { name: /10xPrivacy/i });

			expect(homeLink.getAttribute('href')).toBe('/');
		});

		it('Privacy News link has correct href', () => {
			const { getAllByRole } = render(Navbar);
			const links = getAllByRole('link', { name: 'Privacy News' });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/privacy-news');
			});
		});

		it('Awesome Privacy link has correct href', () => {
			const { getAllByRole } = render(Navbar);

			const links = getAllByRole('link', { name: 'Awesome Privacy' });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/awesome-privacy');
			});
		});

		it('Websites link has correct href', () => {
			const { getAllByRole } = render(Navbar);

			const links = getAllByRole('link', { name: 'Websites' });

			expect(links).toHaveLength(2);

			links.forEach((link) => {
				expect(link.getAttribute('href')).toBe('/websites');
			});
		});
	});

	describe('Breakpoint styling', () => {});
});
