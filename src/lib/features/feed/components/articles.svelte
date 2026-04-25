<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { rss } from '../service';

	import SourceBadge from './source-badge.svelte';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Text, textVariants } from '$lib/components/text';
	import type { Article, SourceSearchParam } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';
	import { formatDate } from '$lib/utils/date';

	function isToday(dateStr?: string): boolean {
		if (!dateStr) return false;
		const d = new Date(dateStr);
		const now = new Date();
		return d.toDateString() === now.toDateString();
	}

	type ArticlesProps = HTMLAttributes<HTMLUListElement> & {
		articles: Article[];
	};

	let { articles, class: klass, ...props }: ArticlesProps = $props();

	let _articles = $derived(
		rss.filterArticlesBySource(articles, {
			source: page.url.searchParams.get('source') as SourceSearchParam
		})
	);
</script>

<!-- List -->
<ul class={cn('space-y-3', klass)} {...props}>
	{#each _articles as article (article.guid)}
		{#snippet metaBadges(klass?: string)}
			<span class={cn('ml-auto flex shrink-0 items-center gap-2 ', klass)}>
				<SourceBadge class="badge-sm" source={article.source} />
				<time datetime={article.date} class={cn(textVariants.size.xs, 'text-base-content/40')}>
					{article.date ? formatDate(article.date) : 'Date unknown'}
				</time>
			</span>
		{/snippet}

		<li class="relative">
			<a
				href={resolve(`/privacy-news/${article.slug}`)}
				class="group flex flex-col items-baseline gap-3 rounded-lg bg-base-100 px-4 py-3 shadow-sm sm:flex-row"
			>
				{#if isToday(article.date)}
					<span
						class=" absolute -top-2 -right-2 z-10 badge rotate-12 badge-sm shadow-xl badge-accent sm:-right-4"
					>
						New!
					</span>
				{/if}
				<!-- content -->
				{@render metaBadges('sm:hidden')}

				<div>
					<Text class={cn('flex min-w-0 items-start')}>
						<span
							class="font-semibold text-base-content group-hover:text-primary group-hover:underline"
						>
							{article.title}
						</span>
						{@render metaBadges('sm:inline-flex pl-2 hidden')}
					</Text>

					<Text class="mt-2 line-clamp-2">{article.description}</Text>
				</div>
			</a>
		</li>
	{/each}
</ul>

{#if _articles.length === 0}
	<Text class="py-12 text-center">No articles found.</Text>
{/if}
