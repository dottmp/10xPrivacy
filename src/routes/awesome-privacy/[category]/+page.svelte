<script lang="ts">
	import { resolve } from '$app/paths';
	import { awesomePrivacy } from '$lib/awesome-privacy';

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
		<!-- <i class="nf {CATEGORY_ICONS[data.category.slug] ?? 'nf-fa-circle'} text-2xl text-primary"></i> -->
		<div>
			<h1 class="text-3xl font-bold text-primary">{data.category.name}</h1>
			<p class="mt-0.5 text-sm text-base-content/60">
				{data.category.sections.length} sections
			</p>
		</div>
	</header>

	<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each data.category.sections as section (section.name)}
			{@const sectionSlug = awesomePrivacy.slugify(section.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${sectionSlug}`)}
					class="group flex items-center justify-between bg-base-100 px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
				>
					<span class="font-semibold text-base-content group-hover:text-primary"
						>{section.name}</span
					>
					<span class="text-xs text-base-content/40">{section.services.length} tools</span>
				</a>
			</li>
		{/each}
	</ul>
</main>
