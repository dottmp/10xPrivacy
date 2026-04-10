<script lang="ts">
	import About from '$lib/components/about.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
</script>

<main class="m-auto flex max-w-3xl flex-col items-center px-4 py-8">
	<Icons.logo class="fill-primary text-primary" />

	<About class="mt-6 sm:mt-20" />
</main>
