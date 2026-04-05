<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import CategoryIcon from './category-icon.svelte';

	import { resolve } from '$app/paths';
	import Subheading from '$lib/components/headings/subheading.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { textVariants } from '$lib/components/text';
	import { linkVariants } from '$lib/components/text/link.svelte';
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
							<a
								href={resolve(`/awesome-privacy/${slug}/${sectionSlug}`)}
								class="group flex items-center justify-between rounded-lg bg-base-100 px-5 py-4 shadow-sm"
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
			</section>
		{/each}
	</div>

	<!-- Back -->
	<a href={resolve(`/awesome-privacy`)} class="btn mt-4 w-full sm:w-fit">
		<Icons.arrowLeft class="mr-1" /> Back
	</a>
</div>
