<script lang="ts">
	import Categories from '$lib/features/awesome-privacy/components/categories.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-6xl px-4 py-10">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-primary">Awesome Privacy</h1>
		<p class="mt-1 text-sm text-base-content/60">
			A curated guide to privacy-respecting software and services.
		</p>
	</header>

	<!-- Bento Grid -->
	<Categories categories={data.categories} />
</main>
