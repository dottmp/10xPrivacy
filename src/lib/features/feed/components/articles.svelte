<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import SourceBadge from './source-badge.svelte';

	import { resolve } from '$app/paths';
	import type { ArticlesResponse } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';
	import { formatDate } from '$lib/utils/date';

	type ArticlesProps = HTMLAttributes<HTMLUListElement> & {
		articlesResponse: ArticlesResponse;
	};

	let { articlesResponse, class: klass, ...props }: ArticlesProps = $props();
</script>

<!-- List -->
<ul class={cn('space-y-3', klass)} {...props}>
	{#each articlesResponse.data as item (item.guid)}
		<li class="group bg-base-100 px-4 py-3 shadow-sm hover:shadow-none">
			<a href={resolve(`/article/${item.slug}`)} class="flex items-baseline gap-3">
				<!-- Title -->
				<span
					class="min-w-0 flex-1 text-sm leading-snug font-semibold text-base-content group-hover:text-primary group-hover:underline"
				>
					{item.title}
				</span>

				<!-- Meta: articlesResponse + date -->
				<span class="ml-auto flex shrink-0 items-center gap-2">
					<SourceBadge class="badge-sm" source={item.source} />
					<span class="text-xs text-base-content/40"
						>{item.date ? formatDate(item.date) : 'Date unknown'}
					</span>
				</span></a
			>
		</li>
	{/each}
</ul>

{#if articlesResponse.count === 0}
	<p class="py-12 text-center text-sm text-base-content/40">No articles found.</p>
{/if}
