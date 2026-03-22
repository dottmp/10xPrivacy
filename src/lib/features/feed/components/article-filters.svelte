<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import rssSources from '$lib/data/rss-sources.json';
	import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';

	const filters = [{ id: 'all', name: 'All' }, ...rssSources.data];

	let activeFilter = $state(page.url.searchParams.get('source') as SourceSearchParam);

	type ArticleFiltersProps = HTMLAttributes<HTMLDivElement> & {
		articlesResponse: ArticlesResponse;
	};

	let { articlesResponse, class: klass, ...props }: ArticleFiltersProps = $props();
</script>

<div role="tablist" class={cn('tabs-border mb-6 tabs ', klass)} {...props}>
	{#each filters as filter (filter.id)}
		{@const isActive = activeFilter === filter.id || (filter.id === 'all' && activeFilter === null)}
		<a
			role="tab"
			href={resolve(
				activeFilter === 'all' || activeFilter === null
					? '/privacy-news'
					: `/privacy-news/?source=${filter.id}`
			)}
			class={cn('tab', isActive && 'tab-active text-primary')}
			onclick={() => {
				activeFilter = filter.id as SourceSearchParam;
			}}
		>
			{filter.name}
			{#if isActive}
				<span class="ml-1 text-xs">[{articlesResponse.count}]</span>
			{/if}
		</a>
	{/each}
</div>
