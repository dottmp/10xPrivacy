<script lang="ts">
	import { Heading } from '$lib/components/headings/index.js';
	import { Link, Text } from '$lib/components/text';
	import Feed from '$lib/features/feed/components/feed.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-6xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Privacy News</Heading>
		<Text>
			RSS feed aggregator for privacy news from <Link
				variant="primary"
				href="https://tuta.com/blog"
				external>tuta.com</Link
			>, <Link variant="primary" href="https://www.privacyguides.org/blog/" external
				>privacyguides.org</Link
			>, and <Link variant="primary" href="https://techlore.tech/" external>techlore.tech</Link>.
		</Text>
	</header>

	<Feed articlesResponse={data.articlesResponse} />
</main>
