import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import CategoriesComponent from './categories.svelte';

import type { Category } from '$lib/features/awesome-privacy/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

const categories: Category[] = [
	{
		name: 'Essentials',
		sections: [
			{ name: 'Password Managers', services: [] },
			{ name: 'VPNs', services: [] }
		]
	},
	{
		name: 'Communication',
		sections: [
			{ name: 'Messaging', services: [] },
			{ name: 'Video Calls', services: [] }
		]
	}
];

describe('Categories component', () => {
	it('renders all category names', () => {
		render(CategoriesComponent, { props: { categories } });

		categories.forEach((category) => {
			expect(screen.getByText(category.name)).toBeTruthy();
		});
	});

	it('renders correct href for each category', () => {
		render(CategoriesComponent, { props: { categories } });

		const links = screen.getAllByRole('link');
		const hrefs = links.map((link) => link.getAttribute('href'));

		expect(hrefs).toContain('/awesome-privacy/essentials');
		expect(hrefs).toContain('/awesome-privacy/communication');
	});

	it('renders all section names', () => {
		render(CategoriesComponent, { props: { categories } });

		categories
			.flatMap((category) => category.sections)
			.forEach((section) => {
				expect(screen.getByText(section.name)).toBeTruthy();
			});
	});

	it('renders correct href for each section link', () => {
		render(CategoriesComponent, { props: { categories } });

		const links = screen.getAllByRole('link');

		const hrefs = links.map((link) => link.getAttribute('href'));

		expect(hrefs).toContain('/awesome-privacy/essentials/password-managers');
		expect(hrefs).toContain('/awesome-privacy/essentials/vpns');
		expect(hrefs).toContain('/awesome-privacy/communication/messaging');
		expect(hrefs).toContain('/awesome-privacy/communication/video-calls');
	});

	it('renders back link to /awesome-privacy', () => {
		render(CategoriesComponent, { props: { categories } });

		const backLink = screen.getByRole('link', { name: /Back/i });

		expect(backLink.getAttribute('href')).toBe('/awesome-privacy');
	});
});
