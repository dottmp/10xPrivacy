import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import SearchComponent from './search.svelte';

import type { SearchEntry } from '$lib/features/awesome-privacy/types';

// ----------------------------------------------------------------
//  mocks
// ----------------------------------------------------------------

vi.mock('$app/paths', () => ({
	resolve: (path: string) => path
}));

// ----------------------------------------------------------------
// jsdom polyfills
// ----------------------------------------------------------------

beforeEach(() => {
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute('open', '');
	};
	HTMLDialogElement.prototype.close = function () {
		this.removeAttribute('open');
		this.dispatchEvent(new Event('close', { bubbles: false, cancelable: false }));
	};
	Element.prototype.scrollIntoView ??= vi.fn();
});

// ----------------------------------------------------------------
//  mock data
// ----------------------------------------------------------------

const featuredCategories: SearchEntry[] = [
	{
		type: 'category',
		name: 'Essentials',
		categorySlug: 'essentials',
		href: '/awesome-privacy/essentials'
	},
	{
		type: 'category',
		name: 'Communication',
		categorySlug: 'communication',
		href: '/awesome-privacy/communication'
	}
];

const searchIndex: SearchEntry[] = [
	...featuredCategories,
	{
		type: 'service',
		name: 'Bitwarden',
		description: 'A secure open source password manager.',
		categorySlug: 'essentials',
		sectionSlug: 'password-managers',
		serviceSlug: 'bitwarden',
		href: '/awesome-privacy/essentials/password-managers/bitwarden'
	}
];

function makeSearch() {
	return {
		featuredCategories: Promise.resolve(featuredCategories),
		index: Promise.resolve(searchIndex)
	};
}

function getSearchButton() {
	return screen.getByRole('button', { name: /search/i });
}

function getSearchInput() {
	return screen.getByPlaceholderText(/search categories/i) as HTMLInputElement;
}

// ----------------------------------------------------------------
// tests
// ----------------------------------------------------------------

describe('Search component', () => {
	beforeEach(() => {
		render(SearchComponent, { props: { search: makeSearch() } });
	});

	it('renders a closed dialog by default', () => {
		const dialog = document.querySelector('dialog#search-modal') as HTMLDialogElement;

		expect(dialog).toBeTruthy();
		expect(dialog.hasAttribute('open')).toBe(false);
	});

	it('renders a search input when the dialog is open', async () => {
		await fireEvent.click(getSearchButton());

		expect(getSearchInput()).toBeTruthy();
	});

	it('shows featured categories before any query is entered', async () => {
		await fireEvent.click(getSearchButton());

		await waitFor(() => {
			expect(screen.getByText(/essentials/i)).toBeTruthy();
			expect(screen.getByText(/communication/i)).toBeTruthy();
		});
	});

	it('shows Fuse results when query is long enough', async () => {
		await fireEvent.click(getSearchButton());

		await waitFor(() => getSearchInput());

		const input = getSearchInput();
		await fireEvent.input(input, { target: { value: 'bitwarden' } });

		await waitFor(() => expect(screen.getByText(/bitwarden/i)).toBeTruthy());
	});

	it('shows no-results message for an unmatched query', async () => {
		await fireEvent.click(getSearchButton());

		await waitFor(() => getSearchInput());

		const input = getSearchInput();

		await fireEvent.input(input, { target: { value: 'zzzzzzzzz' } });

		await waitFor(() => expect(screen.getByText(/no results for/i)).toBeTruthy());
	});

	it('does not show a results list for a single-character query', async () => {
		await fireEvent.click(getSearchButton());

		await waitFor(() => getSearchInput());

		const input = getSearchInput();

		await fireEvent.input(input, { target: { value: 'b' } });

		expect(screen.queryByText(/no results for/i)).toBeNull();
	});
});
