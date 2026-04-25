import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Articles from './articles.svelte';

import type { Article, Source } from '$lib/features/feed/types';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

const source = {
	id: 'tuta',
	name: 'Tuta',
	url: 'https://tuta.com',
	feedUrl: 'https://tuta.com/blog/feed.xml'
} as const satisfies Source;

const articles = [
	{
		guid: 'guid-1',
		slug: 'first-article',
		title: 'First Article',
		date: '2020-01-01T00:00:00.000Z',
		description: 'First description',
		content: 'First content',
		source
	},
	{
		guid: 'guid-2',
		slug: 'second-article',
		title: 'Second Article',
		date: '2020-01-02T00:00:00.000Z',
		description: 'Second description',
		content: 'Second content',
		source
	}
] satisfies Article[];

describe('Articles component', () => {
	it('renders all article titles', () => {
		render(Articles, { props: { articles } });

		articles.forEach((item) => {
			expect(screen.getByText(item.title!)).toBeTruthy();
		});
	});

	it('renders the correct article link for each item', () => {
		render(Articles, { props: { articles } });

		const links = screen.getAllByRole('link');
		const hrefs = links.map((link) => link.getAttribute('href'));

		articles.forEach((item) => {
			expect(hrefs).toContain(`/privacy-news/${item.slug}`);
		});
	});

	it('renders source badge for each article', () => {
		render(Articles, { props: { articles } });

		const badges = screen.getAllByText(source.name);

		expect(badges).toHaveLength(articles.length * 2);
	});

	it('renders formatted date for each article', () => {
		render(Articles, { props: { articles } });

		const items = screen.getAllByRole('listitem');

		expect(items).toHaveLength(2);
		items.forEach((item) => {
			expect(item.textContent).not.toMatch(/Date unknown/i);
		});
	});

	it('shows fallback when there are no articles', () => {
		render(Articles, { props: { articles: [] } });

		expect(screen.getByText(/No articles found/i)).toBeTruthy();
	});
});
