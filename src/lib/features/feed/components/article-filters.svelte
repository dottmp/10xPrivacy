<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import rssSources from '$lib/data/rss-sources.json';
	import type { SourceSearchParam } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';

	type ArticleFiltersProps = HTMLAttributes<HTMLDivElement>;

	let { class: klass, ...props }: ArticleFiltersProps = $props();

	const filters = [{ id: 'all', name: 'All' }, ...rssSources.data];

	let activeFilter = $state(page.url.searchParams.get('source') as SourceSearchParam);

	function createHref(filterId: string | null) {
		return filterId === 'all' || filterId === null
			? '/privacy-news'
			: (`/privacy-news?source=${filterId}` as const);
	}

	function handleFilterChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value as SourceSearchParam;

		activeFilter = value;

		void goto(resolve(createHref(value)));
	}
</script>

<div class={cn('mb-6', klass)} {...props}>
	<select
		class="select-bordered select w-full sm:hidden"
		aria-label="Filter by source"
		value={activeFilter ?? 'all'}
		onchange={handleFilterChange}
	>
		{#each filters as filter (filter.id)}
			<option value={filter.id}>{filter.name}</option>
		{/each}
	</select>

	<div role="tablist" class="tabs-border tabs hidden gap-1 sm:flex">
		{#each filters as filter (filter.id)}
			{@const isActive =
				activeFilter === filter.id || (filter.id === 'all' && activeFilter === null)}
			<a
				role="tab"
				href={resolve(createHref(filter.id))}
				class={cn('tab', isActive && 'tab-active text-primary')}
				onclick={() => {
					activeFilter = filter.id as SourceSearchParam;
				}}
			>
				{filter.name}
			</a>
		{/each}
	</div>
</div>
