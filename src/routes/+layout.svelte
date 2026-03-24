<script lang="ts">
	import '@fontsource/ibm-plex-mono/100.css';
	import '@fontsource/ibm-plex-mono/200.css';
	import '@fontsource/ibm-plex-mono/300.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import '@fontsource/ibm-plex-mono/700.css';

	import favicon from '$lib/assets/favicon.png';
	import Footer from '$lib/components/footer.svelte';
	import LlmTermsOfServiceLink from '$lib/components/llm-terms-of-service-link.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import '$lib/styles/app.css';

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
