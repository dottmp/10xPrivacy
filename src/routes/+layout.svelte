<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '$lib/components/footer.svelte';
	import LlmTermsOfServiceLink from '$lib/components/llm-terms-of-service-link.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	{#if page.data.meta?.title}
		<title>{page.data.meta.title}</title>
	{/if}

	{#if page.data.meta?.description}
		<meta name="description" content={page.data.meta.description} />
	{/if}
</svelte:head>

<div class="flex min-h-screen flex-col bg-base-200 font-mono *:w-full">
	<!-- global -->
	<LlmTermsOfServiceLink />

	<!-- header -->
	<Navbar searchIndex={data.searchIndex} />

	<!-- content -->
	{@render children()}

	<Footer class="mt-auto" />
</div>
