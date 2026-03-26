<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import SourceBadge from './source-badge.svelte';

	import { resolve } from '$app/paths';
	import { Text, textVariants } from '$lib/components/text';
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
		<li class="group rounded-lg bg-base-100 px-4 py-3">
			<a href={resolve(`/privacy-news/article/${item.slug}`)} class="flex items-baseline gap-3">
				<!-- Title -->
				<span
					class={cn(
						textVariants.size.default,
						'min-w-0 flex-1 font-semibold group-hover:text-primary group-hover:underline'
					)}
				>
					{item.title}
				</span>

				<!-- Meta: articlesResponse + date -->
				<span class="ml-auto flex shrink-0 items-center gap-2">
					<SourceBadge class="badge-sm" source={item.source} />
					<span class={cn(textVariants.size.xs, 'text-base-content/40')}>
						{item.date ? formatDate(item.date) : 'Date unknown'}
					</span>
				</span></a
			>
		</li>
	{/each}
</ul>

{#if articlesResponse.count === 0}
	<Text class="py-12 text-center">No articles found.</Text>
{/if}
