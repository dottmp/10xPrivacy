<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heading } from '$lib/components/headings';
	import Subheading from '$lib/components/headings/subheading.svelte';
	import Link, { linkVariants } from '$lib/components/text/link.svelte';
	import CategoryIcon from '$lib/features/awesome-privacy/components/category-icon.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';

	let { data } = $props();
</script>

<svelte:head>
	<title>All Categories | Awesome Privacy</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav
		class="breadcrumbs mb-4 text-sm font-medium text-base-content/50 capitalize [&_a]:hover:text-primary"
	>
		<ul>
			<li><a href={resolve('/awesome-privacy')}>Awesome Privacy</a></li>
			<li>All</li>
		</ul>
	</nav>

	<header class="mb-8">
		<Heading size="display">All Categories</Heading>
	</header>

	<div class="space-y-10">
		{#each data.categories as category (category.name)}
			{@const slug = awesomePrivacy.slugify(category.name)}
			<section>
				<a href={resolve(`/awesome-privacy/${slug}`)} class=" mb-3 flex items-center gap-2">
					<CategoryIcon category={category.name} class="text-lg text-primary" />
					<Subheading class={cn(linkVariants.base, linkVariants.variant.foreground)}>
						{category.name}
					</Subheading>
				</a>

				<ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
					{#each category.sections as section (section.name)}
						{@const sectionSlug = awesomePrivacy.slugify(section.name)}
						<li>
							<Link
								href={resolve(`/awesome-privacy/${slug}/${sectionSlug}`)}
								class="block rounded-lg bg-base-100 px-4 py-3 font-semibold"
							>
								{section.name}
							</Link>
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
