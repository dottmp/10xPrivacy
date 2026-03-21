<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let status = page.status;
	let title = status === 404 ? 'Page not found' : 'Error';
	let description =
		status === 404
			? 'Could not find the page you were looking for'
			: 'An unexpected error has occured';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="mx-auto flex h-screen max-w-3xl items-center justify-center px-4 py-8">
	<div class="text-center">
		<h1 class="text-3xl font-bold text-primary">{status}</h1>
		<p class="mt-4 text-center text-sm text-base-content/40">{description}</p>
		<a href={resolve('/')} class="btn mt-6 btn-primary"> Back to home </a>
		{#if status !== 404}
			<button on:click={() => location.reload()} class="btn mt-6"> Try again </button>
		{/if}
	</div>
</main>
