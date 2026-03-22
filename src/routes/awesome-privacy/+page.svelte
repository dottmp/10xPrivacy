<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Text } from '$lib/components/text';
	import FeaturedCategories from '$lib/features/awesome-privacy/components/featured-categories.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-6xl px-4 py-8">
	<header class="mb-8">
		<Heading size="display">Privacy News</Heading>
		<Text>
			RSS feed aggregator for privacy news from various sources. Click on an article to read more.</Text
		>
	</header>

	<!-- Bento Grid -->
	<FeaturedCategories categories={data.categories} />
</main>
