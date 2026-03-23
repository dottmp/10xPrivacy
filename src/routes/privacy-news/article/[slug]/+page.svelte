<script lang="ts">
	import Article from '$lib/features/feed/components/article.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.article.title}</title>
	<meta name="description" content={data.article.description} />
</svelte:head>

<Article article={data.article} />
