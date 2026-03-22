<script lang="ts">
	import { Heading } from '$lib/components/headings/index.js';
	import { Text } from '$lib/components/text';
	import Feed from '$lib/features/feed/components/feed.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<Heading size="display">Awesome Privacy</Heading>
		<Text>A curated guide to privacy-respecting software and services.</Text>
	</header>

	<Feed articlesResponse={data.articlesResponse} />
</main>
