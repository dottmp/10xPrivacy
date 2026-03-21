<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Text } from '$lib/components/text';
	import Categories from '$lib/features/awesome-privacy/components/categories.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-6xl px-4 py-10">
	<header class="mb-8">
		<Heading size="display">Awesome Privacy</Heading>
		<Text>A curated guide to privacy-respecting software and services.</Text>
	</header>

	<!-- Bento Grid -->
	<Categories categories={data.categories} />
</main>
