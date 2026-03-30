<script lang="ts">
	import Article from '$lib/features/feed/components/article.svelte';

	let { data } = $props();
</script>

<Article article={data.article} />
