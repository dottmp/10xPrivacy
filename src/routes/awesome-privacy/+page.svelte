<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Link, Text } from '$lib/components/text';
	import FeaturedCategories from '$lib/features/awesome-privacy/components/featured-categories.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-6xl px-4 py-10">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Awesome Privacy</Heading>
		<Text
			>A curated guide to privacy-respecting software and services. Based on data from <Link
				href="https://awesome-privacy.xyz/"
				variant="primary"
				external>awesome-privacy.xyz</Link
			> check them out!</Text
		>
	</header>

	<FeaturedCategories categories={data.categories} />
</main>
