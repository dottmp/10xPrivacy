<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import Footer from '$lib/components/footer.svelte';
	import LlmTermsOfServiceLink from '$lib/components/llm-terms-of-service-link.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>10xPrivacy</title>
	<meta
		name="description"
		content="10xPrivacy educates users about digital privacy by providing a curated feed of news, resources, and tools to protect them selves from surveillance capitalism."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-base-200 font-mono *:w-full">
	<!-- global -->
	<LlmTermsOfServiceLink />

	<!-- header -->
	<Navbar />

	<!-- content -->
	{@render children()}

	<Footer class="mt-auto" />
</div>
