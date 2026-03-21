<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heading } from '$lib/components/headings';
	import { textVariants } from '$lib/components/text';
	import CategoryIcon from '$lib/features/awesome-privacy/components/category-icon.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} | Awesome Privacy</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav
		class="breadcrumbs mb-4 text-sm font-medium text-base-content/50 capitalize [&_a]:hover:text-primary"
	>
		<ul>
			<li><a href={resolve('/awesome-privacy')}>Awesome Privacy</a></li>
			<li>
				{data.category.name}
			</li>
		</ul>
	</nav>

	<header class="mb-8 flex items-center gap-3">
		<CategoryIcon category={data.category.name} class="text-2xl text-primary" />

		<Heading size="display">{data.category.name}</Heading>
	</header>

	<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each data.category.sections as section (section.name)}
			{@const sectionSlug = awesomePrivacy.slugify(section.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${sectionSlug}`)}
					class="group flex items-center justify-between rounded-lg bg-base-100 px-5 py-4"
				>
					<span
						class={cn(
							textVariants.base,
							textVariants.size.default,
							'font-semibold group-hover:text-primary group-hover:underline'
						)}>{section.name}</span
					>
					<span class={cn(textVariants.base, textVariants.size.xs)}
						>{section.services.length}
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<!-- Back -->
	<a href={resolve(`/awesome-privacy/`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</main>
