<script lang="ts">
	import { FEED_SOURCES } from '$lib/types';

	let { data } = $props();

	const item = $derived(data.item);
	const src = $derived(FEED_SOURCES.find((s) => s.id === item.source)!);

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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

<svelte:head>
	<title>{item.title}</title>
	<meta name="description" content={item.description} />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8">
	<!-- Back -->
	<a
		href="/"
		class="mb-8 inline-flex items-center gap-1.5 text-sm text-base-content/50 transition-colors hover:text-base-content"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-3.5 w-3.5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
		</svg>
		Back to feed
	</a>

	<!-- Meta -->
	<div class="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-base-content/50">
		<span
			class=" font-semibold {sourceColors[item.source].foreground}  {sourceColors[item.source]
				.background}">{src.name}</span
		>
		{#if item.pubDate}
			<span>{formatDate(item.pubDate)}</span>
		{/if}
		{#if item.author}
			<span>by {item.author}</span>
		{/if}
	</div>

	<!-- Title -->
	<h1 class="mb-6 text-2xl leading-snug font-bold">{item.title}</h1>

	<!-- Divider -->
	<div class="mb-8 border-t border-base-300"></div>

	<!-- Content -->
	{#if item.content}
		<div class="prose prose-sm max-w-none">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html item.content}
		</div>
	{:else}
		<p class="text-sm text-base-content/50 italic">No full content available for this article.</p>
	{/if}

	<!-- Original link -->
	<div class="mt-10 border-t border-base-300 pt-6">
		<a
			href={item.link}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-sm text-base-content/50 transition-colors hover:text-base-content"
		>
			Read original on {src.name}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		</a>
	</div>
</div>
