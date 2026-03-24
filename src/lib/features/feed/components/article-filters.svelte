<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import rssSources from '$lib/data/rss-sources.json';
	import type { SourceSearchParam } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';

	const filters = [{ id: 'all', name: 'All' }, ...rssSources.data];

	let activeFilter = $state(page.url.searchParams.get('source') as SourceSearchParam);

	type ArticleFiltersProps = HTMLAttributes<HTMLDivElement>;

	let { class: klass, ...props }: ArticleFiltersProps = $props();
</script>

<div role="tablist" class={cn('tabs-border mb-6 tabs ', klass)} {...props}>
	{#each filters as filter (filter.id)}
		{@const isActive = activeFilter === filter.id || (filter.id === 'all' && activeFilter === null)}
		{@const href =
			filter.id === 'all' ? '/privacy-news' : (`/privacy-news?source=${filter.id}` as const)}
		<a
			role="tab"
			href={resolve(href)}
			class={cn('tab', isActive && 'tab-active text-primary')}
			onclick={() => {
				activeFilter = filter.id as SourceSearchParam;
			}}
		>
			{filter.name}
		</a>
	{/each}
</div>
