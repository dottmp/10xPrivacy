import { fireEvent, render, screen } from '@testing-library/svelte';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import ArticleFilters from './article-filters.svelte';

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

vi.mock('$app/state', () => ({
	page: {
		url: new URL('https://example.com/privacy-news')
	}
}));

beforeAll(() => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	vi.spyOn((window as any)._virtualConsole, 'emit').mockImplementation(() => {});
});

describe('ArticleFilters component', () => {
	it('sets the correct source tab as active when clicked', async () => {
		render(ArticleFilters);

		const tutaTab = screen.getByRole('tab', { name: /tuta/i });

		await fireEvent.click(tutaTab);

		expect(tutaTab.classList.contains('tab-active')).toBe(true);
	});

	it('source tab has correct href with source param', () => {
		render(ArticleFilters);

		const tutaTab = screen.getByRole('tab', { name: /tuta/i });

		expect(tutaTab.getAttribute('href')).toBe('/privacy-news?source=tuta');
	});

	it('"All" tab has correct href without source param', () => {
		render(ArticleFilters);

		const allTab = screen.getByRole('tab', { name: /all/i });

		expect(allTab.getAttribute('href')).toBe('/privacy-news');
	});
});
