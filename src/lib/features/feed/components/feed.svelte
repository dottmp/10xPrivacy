<script lang="ts">
	import ArticleFilters from './article-filters.svelte';
	import Articles from './articles.svelte';

	import type { ArticlesResponse } from '$lib/features/feed/types';

	type FeedProps = {
		articlesResponse: ArticlesResponse;
	};

	let { articlesResponse }: FeedProps = $props();
</script>

<ArticleFilters {articlesResponse} />

<Articles {articlesResponse} />
