<script lang="ts">
	import Feed from '$lib/features/feed/components/feed.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<Feed feed={data.feed} />
</div>
