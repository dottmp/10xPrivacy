<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import CategoryIcon from './category-icon.svelte';

	import { resolve } from '$app/paths';
	import Subheading from '$lib/components/headings/subheading.svelte';
	import Link, { linkVariants } from '$lib/components/text/link.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Category } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';

	type FeaturedCategoriesProps = HTMLAttributes<HTMLDivElement> & {
		categories: Category[];
	};

	let { categories, class: klass, ...props }: FeaturedCategoriesProps = $props();
</script>

<!-- List -->
<div class={cn('flex flex-col items-center', klass)} {...props}>
	<ul class="grid w-full gap-2 sm:grid-cols-2">
		{#each categories as category (category.name)}
			{@const slug = awesomePrivacy.slugify(category.name)}
			<li class="group col-span-1 rounded-lg bg-base-100 px-4 py-3 shadow-sm">
				<!-- Icon + title -->
				<div class="mb-3 flex items-center gap-2">
					<CategoryIcon category={category.name} class="text-xl text-primary" />
					<a href={resolve(`/awesome-privacy/${slug}`)}>
						<Subheading size="sm" class={cn(linkVariants.base, linkVariants.variant.foreground)}>
							{category.name}
						</Subheading>
					</a>
				</div>

				<!-- Subcategory list -->
				<ul class="space-y-1">
					{#each category.sections.slice(0, 5) as section (section.name)}
						{@const subSlug = awesomePrivacy.slugify(section.name)}
						<li>
							<Link href={resolve(`/awesome-privacy/${slug}/${subSlug}`)} class="font-semibold">
								{section.name}
							</Link>
						</li>
					{/each}
					{#if category.sections.length > 5}
						<li>
							<Link
								variant="primary"
								href={resolve(`/awesome-privacy/${slug}`)}
								class="font-semibold"
							>
								+ {category.sections.length - 5} more
							</Link>
						</li>
					{/if}
				</ul>
			</li>
		{/each}
	</ul>

	<!-- "Show everything" CTA card -->
	<a href={resolve('/awesome-privacy/all')} class="btn mt-6 w-full btn-primary sm:w-fit">
		Show all categories
	</a>
</div>
