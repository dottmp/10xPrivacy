<script lang="ts">
	import { Heading } from '$lib/components/headings/index.js';
	import { Text } from '$lib/components/text';
	import ArticleFilters from '$lib/features/feed/components/article-filters.svelte';
	import Articles from '$lib/features/feed/components/articles.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Privacy News</Heading>

		<Text size="lg">
			RSS feed aggregator for privacy news from goated sources. Perfect read during your morning
			coffee! ☕️
		</Text>
	</header>

	<ArticleFilters />

	{#await data.promisedArticles}
		<ul class="space-y-3">
			{#each Array.from({ length: 8 })}
				<li class="h-32 animate-pulse rounded-lg bg-base-100 px-4 py-3 sm:h-16"></li>
			{/each}
		</ul>
	{:then articles}
		<Articles {articles} />
	{:catch}
		<div role="alert" class="alert alert-soft alert-error">
			<span>Error! Failed to load articles. Please try again later.</span>
		</div>
	{/await}
</main>
