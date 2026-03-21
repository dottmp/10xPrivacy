<script lang="ts">
	import ArticleFilters from './article-filters.svelte';
	import Articles from './articles.svelte';

	type FeedProps = {
		articlesResponse: ArticlesResponse;
	};

	let { articlesResponse }: FeedProps = $props();
</script>

<header class="mb-6 flex items-start justify-between">
	<div>
		<h1 class="text-2xl font-semibold text-primary">Privacy News</h1>
		<p class="text-sm text-base-content">
			RSS feed aggregator for privacy news from various sources. Click on an article to read more.
		</p>
	</div>
</header>

<ArticleFilters {articlesResponse} />

<Articles {articlesResponse} />
