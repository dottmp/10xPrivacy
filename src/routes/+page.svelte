<script lang="ts">
	import { resolve } from '$app/paths';
	import About from '$lib/components/about.svelte';
	import Brand from '$lib/components/brand.svelte';
</script>

<main class="m-auto flex max-w-3xl flex-col items-center px-4 py-8">
	<Brand size="lg" />

	<div class="mx-auto mt-6 flex flex-col items-center gap-4 sm:mt-20 sm:flex-row">
		<a class="btn btn-primary" href={resolve('/privacy-news')}> Privacy News </a>

		<a class="btn btn-primary" href={resolve('/awesome-privacy')}> Awesome Privacy </a>
		<a class="btn btn-primary" href={resolve('/websites')}> Websites </a>
	</div>

	<About class="mt-6 sm:mt-20" />
</main>
