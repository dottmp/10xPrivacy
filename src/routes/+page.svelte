<script lang="ts">
	import { resolve } from '$app/paths';
	import About from '$lib/components/about.svelte';
	import { LOGO } from '$lib/configs';
</script>

<main class="m-auto flex max-w-3xl flex-col items-center px-4 py-8">
	<pre class="text-xs text-primary">
		{LOGO}
	</pre>

	<div class="mx-auto mt-20 flex items-center gap-4">
		<a class="btn btn-primary" href={resolve('/privacy-news')}> Privacy News </a>

		<a class="btn btn-primary" href={resolve('/awesome-privacy')}> Awesome Privacy </a>
		<a class="btn btn-primary" href={resolve('/websites')}> Websites </a>
	</div>

	<About class="mt-20" />
</main>
