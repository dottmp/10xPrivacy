import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import FeaturedCategories from './featured-categories.svelte';

import type { Category } from '$lib/features/awesome-privacy/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

function makeSection(name: string) {
	return {
		name,
		services: []
	};
}

const categories: Category[] = [
	{
		name: 'Essentials',
		sections: [
			makeSection('Password Managers'),
			makeSection('VPNs'),
			makeSection('Email'),
			makeSection('Browsers'),
			makeSection('Search Engines'),
			makeSection('2FA')
		]
	},
	{
		name: 'Communication',
		sections: [makeSection('Messaging'), makeSection('Video Calls')]
	}
];

describe('FeaturedCategories component', () => {
	it('renders all category names', () => {
		render(FeaturedCategories, { props: { categories } });

		categories.forEach((category) => {
			expect(screen.getByText(category.name)).toBeTruthy();
		});
	});

	it('renders correct href for each category', () => {
		render(FeaturedCategories, { props: { categories } });

		const links = screen.getAllByRole('link');

		const hrefs = links.map((link) => link.getAttribute('href'));

		expect(hrefs).toContain('/awesome-privacy/essentials');
		expect(hrefs).toContain('/awesome-privacy/communication');
	});

	it('renders "more" link when category has more than 5 sections', () => {
		render(FeaturedCategories, { props: { categories } });

		expect(screen.getByText('+ 1 more')).toBeTruthy();
	});

	it('renders "Show all categories" link to /awesome-privacy/all', () => {
		render(FeaturedCategories, { props: { categories } });

		const link = screen.getByRole('link', { name: /Show all categories/i });

		expect(link.getAttribute('href')).toBe('/awesome-privacy/all');
	});
});
