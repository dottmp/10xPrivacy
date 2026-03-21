<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';
	import { awesomePrivacy, type Category } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';
	import CategoryIcon from './category-icon.svelte';

	type CategoriesProps = HTMLAttributes<HTMLUListElement> & {
		categories: Category[];
	};

	let { categories, class: klass, ...props }: CategoriesProps = $props();
</script>

<!-- List -->

<ul class={cn('grid  gap-2 sm:grid-cols-2', klass)} {...props}>
	{#each categories as category (category.name)}
		{@const slug = awesomePrivacy.slugify(category.name)}
		<li class="group col-span-1 bg-base-100 px-4 py-3 shadow-sm">
			<!-- Icon + title -->
			<div class="mb-3 flex items-center gap-2">
				<CategoryIcon category={category.name} class="text-xl text-primary" />
				<a href={resolve(`/awesome-privacy/${slug}`)}>
					<h2 class="font-semibold hover:text-primary hover:underline">
						{category.name}
					</h2>
				</a>
			</div>

			<!-- Subcategory list -->
			<ul class="space-y-1">
				{#each category.sections.slice(0, 5) as section (section.name)}
					{@const subSlug = awesomePrivacy.slugify(section.name)}
					<li>
						<a
							href={resolve(`/awesome-privacy/${slug}/${subSlug}`)}
							class="text-sm font-semibold text-base-content/60 hover:text-primary hover:underline"
						>
							{section.name}
						</a>
					</li>
				{/each}
				{#if category.sections.length > 5}
					<li>
						<a
							href={resolve(`/awesome-privacy/${slug}`)}
							class="text-sm font-semibold text-primary italic hover:text-primary hover:underline"
						>
							+ {category.sections.length - 5} more
						</a>
					</li>
				{/if}
			</ul>
		</li>
	{/each}
</ul>

<!-- "Show everything" CTA card -->
<a href={resolve('/awesome-privacy/all')} class="btn mt-4 w-full btn-primary sm:w-fit">
	Show all categories
</a>
