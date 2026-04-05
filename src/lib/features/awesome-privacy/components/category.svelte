<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import CategoryIcon from './category-icon.svelte';

	import { resolve } from '$app/paths';
	import { Heading } from '$lib/components/headings';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { textVariants } from '$lib/components/text';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Category } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';

	type CategoryProps = HTMLAttributes<HTMLDivElement> & {
		category: Category;
		categorySlug: string;
	};

	let { category, categorySlug, ...props }: CategoryProps = $props();
</script>

<!-- List -->
<div {...props}>
	<header class="mb-8 flex items-center gap-3">
		<CategoryIcon category={category.name} class="text-2xl text-primary" />

		<Heading size="display">{category.name}</Heading>
	</header>

	<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each category.sections as section (section.name)}
			{@const sectionSlug = awesomePrivacy.slugify(section.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${categorySlug}/${sectionSlug}`)}
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

	<!-- Back -->
	<a href={resolve(`/awesome-privacy`)} class="btn mt-4 w-full sm:w-fit">
		<Icons.arrowLeft class="mr-1" /> Back to Categories
	</a>
</div>
