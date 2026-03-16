<script lang="ts">
	import { page } from '$app/state';
	import { FEED_SOURCES } from '$lib/types';
	import type { Source } from '$lib/types';

	let { data } = $props();

	let soruceSearchParam = page.url.searchParams.get('source');

	let activeFilter = $state<Source | 'all'>((soruceSearchParam as Source) || 'all');
	const filteredItems = $derived(
		activeFilter === 'all' ? data.items : data.items.filter((item) => item.source === activeFilter)
	);

	const sourceMap = Object.fromEntries(FEED_SOURCES.map((s) => [s.id, s]));

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		const now = new Date();
		const diff = now.getTime() - d.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		if (days === 0) return 'Today';
		if (days === 1) return 'Yesterday';
		if (days < 7) return `${days}d ago`;
		return d.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: days > 365 ? 'numeric' : undefined
		});
	}

	function encode(slug: string, id: string) {
		return encodeURIComponent(
			slug + '__' + btoa(unescape(encodeURIComponent(id))).replace(/=/g, '')
		);
	}

	const sourceColors = {
		tuta: {
			background: 'bg-rose-900',
			foreground: 'text-rose-300'
		},
		privacyguides: {
			background: 'bg-yellow-900',
			foreground: 'text-yellow-300'
		},
		techlore: {
			background: 'bg-blue-900',
			foreground: 'text-blue-100'
		}
	};
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<!-- Header -->
	<header class="mb-6 flex items-start justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-secondary-content">Privacy News</h1>
			<p class="text-sm">
				RSS feed aggregator for privacy news from various sources. Click on an article to read more.
			</p>
		</div>
	</header>

	<!-- Filter bar -->
	<div role="tablist" class="tabs-border mb-6 tabs">
		{#each [{ id: 'all', name: 'All' }, ...FEED_SOURCES] as f (f.id)}
			{@const id = f.id as Source | 'all'}
			{@const count =
				id === 'all' ? data.items.length : data.items.filter((i) => i.source === id).length}
			<a
				role="tab"
				href={`${f.id === 'all' ? '/' : `/?source=${f.id}`}`}
				class="tab {activeFilter === id ? 'tab-active' : ''}"
				onclick={() => (activeFilter = id)}
			>
				{f.name}
				<span class="ml-1 text-xs">[{count}]</span>
			</a>
		{/each}
	</div>

	<!-- List -->
	<ul class="space-y-3">
		{#each filteredItems as item (item.id)}
			{@const src = sourceMap[item.source]}
			<li class="group bg-base-100 px-4 shadow-sm hover:shadow-none">
				<a
					href="/article/{encode(item.slug, item.id)}?source={item.source}"
					class="group flex items-baseline gap-3 py-3"
				>
					<!-- Title -->
					<span
						class="min-w-0 flex-1 text-sm leading-snug font-semibold text-base-content group-hover:underline"
					>
						{item.title}
					</span>

					<!-- Meta: source + date -->
					<span class="ml-auto flex shrink-0 gap-2 text-xs text-base-content/40">
						<span
							class=" font-semibold {sourceColors[item.source].foreground}  {sourceColors[
								item.source
							].background}">{src.name}</span
						>
						<span>{formatDate(item.pubDate)}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>

	{#if filteredItems.length === 0}
		<p class="py-12 text-center text-sm text-base-content/40">No articles found.</p>
	{/if}
</div>
