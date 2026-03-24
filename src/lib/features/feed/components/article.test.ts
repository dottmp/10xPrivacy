import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Article from './article.svelte';

import type { Article as ArticleType, Source } from '$lib/features/feed/types';

vi.mock('$app/paths');

const source = {
	id: 'tuta',
	name: 'Tuta',
	url: 'https://tuta.com',
	feedUrl: 'https://tuta.com/blog/feed.xml'
} as const satisfies Source;

const baseArticle = {
	guid: 'test-guid',
	slug: 'test-slug',
	title: 'Test Article Title',
	date: '2020-01-01T00:00:00.000Z',
	creator: 'Jane Doe',
	description: 'Test description',
	content: '<p>Test content</p>',
	link: 'https://tuta.com/blog/test-article',
	source
} as const satisfies ArticleType;

describe('Article component', () => {
	it('renders the article title', () => {
		render(Article, { props: { article: baseArticle } });

		expect(screen.getByText(baseArticle.title)).toBeTruthy();
	});

	it('renders the source badge', () => {
		render(Article, { props: { article: baseArticle } });

		const badge = document.querySelector('.badge');

		expect(badge?.textContent?.trim()).toBe(source.name);
	});

	it('renders the formatted date', () => {
		render(Article, { props: { article: baseArticle } });

		const time = document.querySelector('time');

		expect(time).not.toBeNull();
		expect(time?.getAttribute('datetime')).toBe(baseArticle.date);
	});

	it('renders the author', () => {
		render(Article, { props: { article: baseArticle } });

		expect(screen.getByText(`by ${baseArticle.creator}`)).toBeTruthy();
	});

	it('renders the article content', () => {
		render(Article, { props: { article: baseArticle } });

		expect(screen.getByText('Test content')).toBeTruthy();
	});

	it('renders the original article link', () => {
		render(Article, { props: { article: baseArticle } });

		const link = screen.getByRole('link', {
			name: new RegExp(`Read original on ${source.name}`, 'i')
		});

		expect(link.getAttribute('href')).toBe(baseArticle.link);
	});

	it('shows fallback text when content is missing', () => {
		render(Article, { props: { article: { ...baseArticle, content: undefined } } });

		expect(screen.getByText(/No content available for this article/i)).toBeTruthy();
	});

	it('shows fallback text when link is unsafe', () => {
		render(Article, { props: { article: { ...baseArticle, link: 'javascript:alert(1)' } } });

		expect(screen.getByText(/Original article link is unavailable/i)).toBeTruthy();
	});
});
