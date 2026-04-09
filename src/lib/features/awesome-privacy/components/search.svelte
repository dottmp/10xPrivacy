<script lang="ts">
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';

	import type { LayoutData } from '../../../../routes/$types';
	import type { Service } from '../types';

	import CategoryIcon from './category-icon.svelte';
	import ServiceLogo from './service-logo.svelte';

	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import Text, { textVariants } from '$lib/components/text/text.svelte';
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
	let { search: _search }: { search: LayoutData['search'] } = $props();

	let dialog: HTMLDialogElement | null;
	let inputElement: HTMLInputElement | null;
	let fuse: Fuse<SearchEntry> | null;

	let query = $state('');
	let results = $state<SearchEntry[]>([]);
	let searching = $state(false);
	let hasQuery = $derived(query.trim().length >= MIN_QUERY_LENGTH);
	let initiating = $state(false);
	let ctrlKey = $derived.by(() => {
		const ua = navigator.userAgent || '';
		const isMac = /\bMacintosh\b/i.test(ua);
		return isMac ? '⌘' : 'Ctrl';
	});
	// ----------------------------------------------------------------
	// Index
	// ----------------------------------------------------------------

	async function loadIndex() {
		initiating = true;

		try {
			const data = await _search.index;

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

		initiating = false;
	}

	$effect(() => {
		loadIndex();
	});

	// ----------------------------------------------------------------
	// utils
	// ----------------------------------------------------------------

	function open() {
		dialog?.showModal();

		//NOTE: needed in chromium based browsers to prevent the dialog to endup outside the viewport.
		setTimeout(() => {
			inputElement?.focus();
		}, 50);
	}

	function close() {
		dialog?.close();
		clear();
	}

	function clear() {
		query = '';
	}

	// ----------------------------------------------------------------
	// Search
	// ----------------------------------------------------------------

	function search(query: string) {
		searching = false;
		if (!fuse || query.trim().length < MIN_QUERY_LENGTH) {
			results = [];
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

	let keyboardHeight = $state(0);

	onMount(() => {
		const initial = window.visualViewport ? window.visualViewport.height : window.innerHeight;

		function handler() {
			const hv = window.visualViewport ? window.visualViewport.height : window.innerHeight;
			keyboardHeight = Math.max(0, initial - hv);
		}

		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', handler);
			window.visualViewport.addEventListener('scroll', handler);
		} else {
			window.addEventListener('resize', handler);
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener('resize', handler);
				window.visualViewport.removeEventListener('scroll', handler);
			} else {
				window.removeEventListener('resize', handler);
			}
		};
	});

	onMount(() => {
		function handler(e: KeyboardEvent) {
			const isK = e.key.toLowerCase() === 'k';
			const mod = e.metaKey || e.ctrlKey;

			if (!mod || !isK) return;

			e.preventDefault();
			open();
		}

		window.addEventListener('keydown', handler);
		return () => {
			window.removeEventListener('keydown', handler);
		};
	});
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
	<kbd class="ml-auto kbd hidden kbd-sm md:inline">{ctrlKey}+K</kbd>
</button>

<dialog
	bind:this={dialog}
	id="search-modal"
	class="modal max-md:modal-bottom"
	onkeydown={handleKeydown}
	onclose={close}
>
	<div
		class="relative modal-box max-w-3xl p-0 max-md:h-dvh max-md:max-h-none md:mt-[10vh] md:h-[clamp(12rem,75vh,75vh)] md:w-11/12"
	>
		<div class="flex h-full flex-col">
			<!-- Search bar -->
			<label
				class="input sticky top-0 z-10 input-lg flex w-full items-center gap-3 rounded-none border-0 border-b border-base-200 bg-base-100 px-4 shadow-none focus-within:shadow-none focus-within:outline-none"
			>
				<button class="btn btn-square btn-ghost btn-sm md:hidden" onclick={close}>
					<Icons.arrowLeft />
					<span class="sr-only">Back</span>
				</button>

				{#if initiating}
					<Icons.loading class="shrink-0"></Icons.loading>
				{/if}

				<input
					bind:this={inputElement}
					type="search"
					class={cn(
						'grow bg-transparent outline-none placeholder:truncate [&::-webkit-search-cancel-button]:hidden',
						textVariants.base,
						textVariants.size.default
					)}
					placeholder="Search categories, sections and services..."
					bind:value={query}
					oninput={(e) => {
						if (!searching) searching = true;
						debouncedSearch((e.target as HTMLInputElement).value);
					}}
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
			<div
				class="flex-1 overflow-y-auto [scrollbar-width:thin]"
				style="margin-bottom: {keyboardHeight}px"
			>
				{#snippet entryList(entries: SearchEntry[])}
					<ul role="listbox" class="space-y-2 p-2">
						{#each entries as entry (entry.href)}
							{@const badge = ENTRY_BADGE[entry.type]}
							<li>
								<a
									href={resolve(entry.href as Pathname)}
									onclick={close}
									class="flex w-full items-center gap-3 rounded-box px-3 py-2.5 text-left focus-within:bg-base-200 focus-within:outline-1 focus-within:outline-primary hover:bg-base-200"
								>
									<span
										class="flex size-6 shrink-0 items-center justify-center text-base-content/40 *:mr-1 [&>img]:size-6 [&>svg]:size-5"
									>
										{#if entry.type === 'service'}
											<ServiceLogo service={{ ...entry.meta } as Service} />
										{:else if entry.type === 'category'}
											<CategoryIcon category={entry.name} />
										{:else}
											<Icons.section />
										{/if}
									</span>

									<span class="min-w-0 flex-1">
										<Text class="truncate font-medium text-base-content">{entry.name}</Text>
										{#if entry.description}
											<Text size="xs" class="line-clamp-3 sm:line-clamp-1">{entry.description}</Text
											>
										{/if}

										{#if entry?.meta?.parent}
											{@const parents = entry.meta.parent.split(',')}
											<div class="mt-1 flex flex-wrap items-center gap-1">
												{#each parents as parent, index (index)}
													<span class="badge badge-soft badge-xs">
														{parent}
													</span>
												{/each}
											</div>
										{/if}
									</span>

									<span class={cn('badge shrink-0 badge-soft badge-sm capitalize', badge.class)}>
										{badge.label}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				{/snippet}

				{#if hasQuery}
					<!-- loading indicator while searching results -->
					{#if searching && results.length === 0}
						<div class="flex items-center justify-center py-8">
							<Icons.loading class="shrink-0 "></Icons.loading>
						</div>
						<!-- no results message -->
					{:else if results.length === 0}
						<Text class="px-4 py-8 text-center">No results for "{query}"</Text>
						<!-- results -->
					{:else}
						{@render entryList(results)}
					{/if}
				{:else}
					<!-- intial data -->
					{#await _search.featuredCategories}
						<div class="flex items-center justify-center py-8">
							<Icons.loading class="shrink-0 "></Icons.loading>
						</div>
					{:then featuredCategories}
						{@render entryList(featuredCategories)}
					{/await}
				{/if}
			</div>
		</div>
	</div>

	<!-- Click outside to close -->
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
