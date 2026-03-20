<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { FEED_SOURCES } from '$lib/configs';
	import { cn } from '$lib/utils/cn';

	const FILTERS = [{ id: 'all', name: 'All' }, ...FEED_SOURCES] as const;

	let activeFilter = $state(page.url.searchParams.get('source') as SourceSearchParam);

	type ArticleFiltersProps = HTMLAttributes<HTMLDivElement> & {
		feed: FeedResponse;
	};

	let { feed, class: klass, ...props }: ArticleFiltersProps = $props();
</script>

<div role="tablist" class={cn('tabs-border mb-6 tabs', klass)} {...props}>
	{#each FILTERS as filter (filter.id)}
		{@const isActive = activeFilter === filter.id || (filter.id === 'all' && activeFilter === null)}
		<a
			role="tab"
			href={resolve(
				activeFilter === 'all' || activeFilter === null ? '/' : `/?source=${filter.id}`
			)}
			class={cn('tab', isActive && 'tab-active')}
			onclick={() => {
				activeFilter = filter.id;
			}}
		>
			{filter.name}
			{#if isActive}
				<span class="ml-1 text-xs">[{feed.count}]</span>
			{/if}
		</a>
	{/each}
</div>
