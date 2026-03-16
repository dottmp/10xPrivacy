<script lang="ts">
	import { FEED_SOURCES } from '$lib/types';
	import type { Source } from '$lib/types';

	let { data } = $props();

	let activeFilter = $state<Source | 'all'>('all');

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
				{data.items.length} articles from Tuta, Privacy Guides, and Techlore
			</p>
		</div>
		<label class="swap swap-rotate">
			<input type="checkbox" value="dark" class="theme-controller" />
			<!-- sun icon -->
			<svg
				class="swap-off h-5 w-5 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
				/>
			</svg>
			<!-- moon icon -->
			<svg
				class="swap-on h-5 w-5 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				<path
					d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
				/>
			</svg>
		</label>
	</header>

	<!-- Filter bar -->
	<div role="tablist" class="tabs-border mb-6 tabs">
		{#each [{ id: 'all', name: 'All' }, ...FEED_SOURCES] as f (f.id)}
			{@const id = f.id as Source | 'all'}
			{@const count =
				id === 'all' ? data.items.length : data.items.filter((i) => i.source === id).length}
			<button
				role="tab"
				class="tab {activeFilter === id ? 'tab-active' : ''}"
				onclick={() => (activeFilter = id)}
			>
				{f.name}
				<span class="ml-1 text-xs">[{count}]</span>
			</button>
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
