<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';
	import SourceBadge from './source-badge.svelte';
	import { formatDate } from '$lib/utils/date';
	import { resolve } from '$app/paths';

	type ArticlesProps = HTMLAttributes<HTMLUListElement> & {
		feed: FeedResponse;
	};

	let { feed, class: klass, ...props }: ArticlesProps = $props();
</script>

<!-- List -->
<ul class={cn('space-y-3', klass)} {...props}>
	{#each feed.data as item (item.id)}
		<li class="group bg-base-100 px-4 py-3 shadow-sm hover:shadow-none">
			<a href={resolve(`/article/${item.slug}`)} class="flex items-baseline gap-3">
				<!-- Title -->
				<span
					class="min-w-0 flex-1 text-sm leading-snug font-semibold text-base-content group-hover:underline"
				>
					{item.title}
				</span>

				<!-- Meta: feed + date -->
				<span class="ml-auto flex shrink-0 items-center gap-2">
					<SourceBadge class="badge-sm" source={item.source} />
					<span class="text-xs text-base-content/40">{formatDate(item.pubDate)}</span>
				</span>
			</a>
		</li>
	{/each}
</ul>

{#if feed.count !== 0}
	<p class="py-12 text-center text-sm text-base-content/40">No articles found.</p>
{/if}
