<script lang="ts">
	import { resolve } from '$app/paths';
	import SourceBadge from '$lib/features/feed/components/source-badge.svelte';
	import { formatDate } from '$lib/utils/date.js';

	type ArticleProps = {
		article: FeedItem;
	};

	let { article }: ArticleProps = $props();
</script>

<article class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<a href={resolve('/')} class="btn mb-8 btn-link btn-sm">
		<i class="nf nf-fa-chevron_left"></i>
		Back to feed
	</a>

	<div class="border-b border-base-300 pb-8">
		<!-- header -->
		<div class="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-base-content/50">
			<SourceBadge source={article.source} />
			{#if article.pubDate}
				<time datetime={article.pubDate}>{formatDate(article.pubDate)}</time>
			{/if}

			{#if article.author}
				<span>by {article.author}</span>
			{/if}
		</div>

		<h1 class="text-2xl leading-snug font-bold">{article.title}</h1>
	</div>

	<!-- content -->
	{#if article.content}
		<div class="prose prose-sm max-w-none">
			<!-- sanitized in rss.ts  -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.content}
		</div>
	{:else}
		<p class="text-sm text-base-content/40 italic">No content available for this article.</p>
	{/if}

	<!-- footer -->
	<div class="mt-10 border-t border-base-300 pt-6">
		<a
			href={article.link}
			target="_blank"
			rel="external noopener noreferrer"
			class="btn btn-link btn-sm"
		>
			Read original on {article.source.name}
			<i class="nf nf-cod-link_external ml-1 text-xs"></i>
		</a>
	</div>
</article>
