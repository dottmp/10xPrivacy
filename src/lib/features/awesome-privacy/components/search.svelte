<script lang="ts">
	import Fuse from 'fuse.js';

	import type { Service } from '../types';

	import CategoryIcon from './category-icon.svelte';
	import ServiceLogo from './service-logo.svelte';

	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import Text, { textVariants } from '$lib/components/text/text.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { SearchEntry, SearchEntryType } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';
	import { debounce } from '$lib/utils/debounce';

	const MIN_QUERY_LENGTH = 2;
	const SEARCH_DEBOUNCE_MS = 200;

	const ENTRY_BADGE: Record<SearchEntryType, { label: string; class: string }> = Object.freeze({
		category: {
			label: 'Category',
			class: 'badge-primary'
		},
		section: {
			label: 'Section',
			class: 'badge-secondary'
		},
		service: {
			label: 'Service',
			class: 'badge-accent'
		}
	} as const);

	function featuredAsResults(): SearchEntry[] {
		return awesomePrivacy.getFeaturedCategories().map((c) => ({
			type: 'category' as const,
			name: c.name,
			href: `/awesome-privacy/${awesomePrivacy.slugify(c.name)}`,
			categorySlug: awesomePrivacy.slugify(c.name),
			description: undefined
		}));
	}

	let dialog: HTMLDialogElement | null;
	let inputElement: HTMLInputElement | null;
	let fuse: Fuse<SearchEntry> | null;
	let abortController = new AbortController();

	let query = $state('');
	let results = $state<SearchEntry[]>(featuredAsResults());
	let loading = $state(false);

	const isSearching = $derived(query.trim().length >= MIN_QUERY_LENGTH);

	// ----------------------------------------------------------------
	// Index
	// ----------------------------------------------------------------

	async function loadIndex() {
		loading = true;
		try {
			const res = await fetch('/api/search-index', { signal: abortController.signal });

			const data: SearchEntry[] = await res.json();

			fuse = new Fuse(data, {
				keys: [
					{ name: 'name', weight: 0.7 },
					{ name: 'description', weight: 0.3 }
				],
				threshold: 0.35,
				includeScore: true,
				minMatchCharLength: MIN_QUERY_LENGTH
			});
		} catch (err) {
			let error = err instanceof Error ? err : new Error(String(err));

			throw new Error('Failed to load search index', error);
		}

		loading = false;
	}

	$effect(() => {
		loadIndex();
		return () => abortController.abort();
	});

	// ----------------------------------------------------------------
	// utils
	// ----------------------------------------------------------------

	function open() {
		dialog?.showModal();
		inputElement?.focus();
	}

	function close() {
		dialog?.close();
		clear();
	}

	function clear() {
		query = '';
		results = featuredAsResults();
	}

	// ----------------------------------------------------------------
	// Search
	// ----------------------------------------------------------------

	function search(query: string) {
		if (!fuse || query.trim().length < MIN_QUERY_LENGTH) {
			results = featuredAsResults();

			return;
		}
		results = fuse.search(query).map((result) => result.item);
	}

	const debouncedSearch = debounce(search, SEARCH_DEBOUNCE_MS);

	// ----------------------------------------------------------------
	// Keyboard
	// ----------------------------------------------------------------

	function handleKeydown(e: KeyboardEvent) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
		e.preventDefault();

		const listbox = dialog?.querySelector('[role="listbox"]');
		const anchors = Array.from(listbox?.querySelectorAll('a') ?? []) as HTMLAnchorElement[];

		if (!anchors.length) return;

		const focused = document.activeElement;
		const currentIndex = anchors.indexOf(focused as HTMLAnchorElement);

		if (e.key === 'ArrowDown') {
			if (currentIndex === anchors.length - 1) return;
			const next = currentIndex === -1 ? anchors[0] : anchors[currentIndex + 1];
			next.focus();
			next.scrollIntoView({ block: 'nearest' });
		} else {
			if (currentIndex <= 0) {
				inputElement?.focus();
			} else {
				const prev = anchors[currentIndex - 1];
				prev.focus();
				prev.scrollIntoView({ block: 'nearest' });
			}
		}
	}
</script>

<button
	class={cn(
		'btn max-md:btn-square max-md:btn-ghost md:min-w-64 md:justify-start md:btn-md',
		textVariants.base
	)}
	onclick={open}
	aria-label="Search"
	data-testid="navbar-search"
>
	<Icons.search class="mr-2" />
	<span class="sr-only md:not-sr-only"> Search...</span>
</button>

<dialog
	bind:this={dialog}
	id="search-modal"
	class="modal max-md:modal-bottom"
	onkeydown={handleKeydown}
	onclose={close}
>
	<div
		class="relative modal-box max-w-3xl p-0 max-md:h-[80vh] md:mt-[10vh] md:h-[clamp(12rem,75vh,75vh)] md:w-11/12"
	>
		<div class="flex h-full flex-col">
			<!-- Search bar -->
			<label
				class="input sticky top-0 z-10 input-lg flex w-full items-center gap-3 rounded-none border-0 border-b border-base-200 bg-base-100 px-4 shadow-none focus-within:shadow-none focus-within:outline-none"
			>
				{#if loading}
					<span class="loading loading-sm shrink-0 loading-spinner text-base-content/40"></span>
				{:else}
					<Icons.search class="size-5 shrink-0 text-base-content/40" />
				{/if}
				<input
					bind:this={inputElement}
					type="search"
					class={cn(
						'grow bg-transparent outline-none',
						textVariants.base,
						textVariants.size.default
					)}
					placeholder="Search categories, sections and services..."
					bind:value={query}
					oninput={(e) => debouncedSearch((e.target as HTMLInputElement).value)}
					autocomplete="off"
					spellcheck="false"
				/>
				{#if query}
					<button
						class="btn btn-square btn-ghost btn-sm"
						onclick={() => {
							clear();

							inputElement?.focus();
						}}
					>
						<Icons.close />
						<span class="sr-only">Clear search</span>
					</button>
				{/if}
			</label>

			<!-- Results  -->
			<div class="flex-1 overflow-y-auto [scrollbar-width:thin]">
				{#if isSearching && results.length === 0 && !loading}
					<Text class="px-4 py-8 text-center">No results for "{query}"</Text>
				{:else}
					<ul role="listbox" class="space-y-2 p-2">
						{#each results as entry (entry.href)}
							{@const badge = ENTRY_BADGE[entry.type]}
							<li>
								<a
									href={resolve(entry.href as Pathname)}
									onclick={close}
									class="flex w-full items-center gap-3 rounded-box px-3 py-2.5 text-left focus-within:bg-base-200 focus-within:outline-1 focus-within:outline-primary hover:bg-base-200"
								>
									<span class="shrink-0 text-base-content/40">
										{#if entry.type === 'service'}
											<ServiceLogo service={{ ...entry.meta } as Service} class="size-6" />
										{:else if entry.type === 'category'}
											<CategoryIcon category={entry.name} class="size-5" />
										{:else}
											<Icons.section class="size-5" />
										{/if}
									</span>

									<span class="min-w-0 flex-1">
										<Text class="truncate font-medium text-base-content">{entry.name}</Text>
										{#if entry.description}
											<Text size="xs" class="truncate">{entry.description}</Text>
										{/if}
									</span>

									<span class={cn('badge shrink-0 badge-soft badge-sm capitalize', badge.class)}>
										{badge.label}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>

	<!-- Click outside to close -->
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
