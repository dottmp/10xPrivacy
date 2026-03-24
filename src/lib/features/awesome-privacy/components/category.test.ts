import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import CategoryComponent from './category.svelte';

import type { Category } from '$lib/features/awesome-privacy/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

const category: Category = {
	name: 'Essentials',
	sections: [
		{
			name: 'Password Managers',
			services: [
				{
					name: 'Bitwarden',
					description: 'Open source password manager.',
					url: 'https://bitwarden.com'
				},
				{ name: 'KeePass', description: 'Local password manager.', url: 'https://keepass.info' }
			]
		},
		{
			name: 'VPNs',
			services: [
				{ name: 'Mullvad', description: 'Privacy-focused VPN.', url: 'https://mullvad.net' }
			]
		}
	]
};

const baseProps = {
	category,
	categorySlug: 'essentials'
};

describe('Category component', () => {
	it('renders the category name', () => {
		render(CategoryComponent, { props: baseProps });

		expect(screen.getByText(category.name)).toBeTruthy();
	});

	it('renders all section names', () => {
		render(CategoryComponent, { props: baseProps });

		category.sections.forEach((section) => {
			expect(screen.getByText(section.name)).toBeTruthy();
		});
	});

	it('renders correct href for each section link', () => {
		render(CategoryComponent, { props: baseProps });

		const links = screen.getAllByRole('link');
		const hrefs = links.map((link) => link.getAttribute('href'));

		expect(hrefs).toContain(`/awesome-privacy/${baseProps.categorySlug}/password-managers`);

		expect(hrefs).toContain(`/awesome-privacy/${baseProps.categorySlug}/vpns`);
	});

	it('renders back link to /awesome-privacy', () => {
		render(CategoryComponent, { props: baseProps });

		const backLink = screen.getByRole('link', { name: /Back to categories/i });

		expect(backLink.getAttribute('href')).toBe('/awesome-privacy');
	});
});
