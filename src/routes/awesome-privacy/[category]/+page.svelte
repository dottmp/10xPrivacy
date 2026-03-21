<script lang="ts">
	import { resolve } from '$app/paths';
	import { awesomePrivacy } from '$lib/awesome-privacy';
	import CategoryIcon from '$lib/features/awesome-privacy/components/category-icon.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} | Awesome Privacy</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav class="mb-4 text-xs text-base-content/50">
		<a href={resolve('/awesome-privacy')} class="hover:text-primary">Awesome Privacy</a>
		<span class="mx-1">›</span>
		<span>{data.category.name}</span>
	</nav>

	<header class="mb-8 flex items-center gap-3">
		<CategoryIcon category={data.category.name} class="text-2xl text-primary" />
		<div>
			<h1 class="text-3xl font-bold text-primary">{data.category.name}</h1>
		</div>
	</header>

	<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each data.category.sections as section (section.name)}
			{@const sectionSlug = awesomePrivacy.slugify(section.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${sectionSlug}`)}
					class="group flex items-center justify-between bg-base-100 px-5 py-4"
				>
					<span
						class="text-sm font-semibold text-base-content/70 group-hover:text-primary group-hover:underline"
						>{section.name}</span
					>
					<span class="text-xs text-base-content/40">[{section.services.length}] </span>
				</a>
			</li>
		{/each}
	</ul>

	<!-- Back -->
	<a href={resolve(`/awesome-privacy/`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</main>
