<script lang="ts">
	import { resolve } from '$app/paths';
	import CategoryIcon from '$lib/features/awesome-privacy/components/category-icon.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

	let { data } = $props();
</script>

<svelte:head>
	<title>All Categories | Awesome Privacy</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav class="mb-4 text-xs text-base-content/50">
		<a href={resolve('/awesome-privacy')} class="hover:text-primary">Awesome Privacy</a>
		<span class="mx-1">›</span>
		<span>All</span>
	</nav>

	<header class="mb-8">
		<h1 class="text-3xl font-bold text-primary">All Categories</h1>
		<p class="mt-1 text-sm text-base-content/60">
			{data.categories.length} categories
		</p>
	</header>

	<div class="space-y-10">
		{#each data.categories as category (category.name)}
			{@const slug = awesomePrivacy.slugify(category.name)}
			<section>
				<a href={resolve(`/awesome-privacy/${slug}`)} class="group mb-3 flex items-center gap-2">
					<CategoryIcon category={category.name} class="text-lg text-primary" />
					<h2
						class="text-lg font-semibold text-base-content group-hover:text-primary group-hover:underline"
					>
						{category.name}
					</h2>
				</a>

				<ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
					{#each category.sections as section (section.name)}
						{@const sectionSlug = awesomePrivacy.slugify(section.name)}
						<li>
							<a
								href={resolve(`/awesome-privacy/${slug}/${sectionSlug}`)}
								class="block bg-base-100 px-3 py-2 text-sm font-semibold text-base-content/70 hover:text-primary hover:underline"
							>
								{section.name}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>

	<!-- Back -->
	<a href={resolve(`/awesome-privacy/`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</main>
