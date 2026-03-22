<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import CategoryIcon from './category-icon.svelte';

	import { resolve } from '$app/paths';
	import Subheading from '$lib/components/headings/subheading.svelte';
	import Link, { linkVariants } from '$lib/components/text/link.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Category } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';

	type CategoriesProps = HTMLAttributes<HTMLDivElement> & {
		categories: Category[];
	};

	let { categories, class: klass, ...props }: CategoriesProps = $props();
</script>

<!-- List -->
<div class={cn('flex flex-col', klass)} {...props}>
	<div class="w-full space-y-10">
		{#each categories as category (category.name)}
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
	<a href={resolve(`/awesome-privacy`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</div>
