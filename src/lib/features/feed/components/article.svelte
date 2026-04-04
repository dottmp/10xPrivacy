<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heading } from '$lib/components/headings';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link, Text, textVariants } from '$lib/components/text';
	import SourceBadge from '$lib/features/feed/components/source-badge.svelte';
	import type { Article } from '$lib/features/feed/types';
	import { cn } from '$lib/utils/cn';
	import { formatDate } from '$lib/utils/date.js';
	import { isSafeUrl, sanitizeHtml } from '$lib/utils/sanitize';

	type ArticleProps = {
		article: Article;
	};

	let { article }: ArticleProps = $props();
</script>

<article class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<a href={resolve('/')} class="btn mb-8">
		<Icons.arrowLeft class="mr-1" />
		Back to feed
	</a>

	<div class="border-b border-base-300 pb-8">
		<!-- header -->
		<div
			class={cn(
				textVariants.base,
				textVariants.size.default,
				'mb-4 flex flex-wrap items-center gap-x-3 gap-y-1'
			)}
		>
			<SourceBadge source={article.source} />
			{#if article.date}
				<time datetime={article.date}>{formatDate(article.date)}</time>
			{/if}

			{#if article.creator}
				<span>by {article.creator}</span>
			{/if}
		</div>

		<Heading size="lg">{article.title}</Heading>
	</div>

	<!-- content -->
	{#if article.content}
		<div class="prose prose-sm max-w-none">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html sanitizeHtml(article.content)}
		</div>
	{:else}
		<Text>No content available for this article.</Text>
	{/if}

	<!-- footer -->
	<div class="mt-10 border-t border-base-300 pt-6">
		{#if isSafeUrl(article.link)}
			<Link href={article.link} variant="primary" external>
				Read original on {article.source.name}
				<Icons.external class="ml-1" />
			</Link>
		{:else}
			<Text>Original article link is unavailable.</Text>
		{/if}
	</div>
</article>
