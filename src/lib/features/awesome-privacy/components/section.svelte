<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import ServiceBadges from './service-badges.svelte';
	import ServiceLogo from './service-logo.svelte';

	import { resolve } from '$app/paths';
	import { Heading, Subheading, subheadingVariants } from '$lib/components/headings';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Text, textVariants } from '$lib/components/text';
	import Link from '$lib/components/text/link.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Section } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';
	import { markdownToHtml, markdownToInlineHtml } from '$lib/utils/markdown';

	type SectionProps = HTMLAttributes<HTMLDivElement> & {
		section: Section;
		categorySlug: string;
		sectionSlug: string;
	};

	let { section, categorySlug, sectionSlug, ...props }: SectionProps = $props();
</script>

<!-- List -->
<div {...props}>
	<header class="mb-6 space-y-4">
		<Heading size="display">{section.name}</Heading>

		<!-- Alternatives to -->
		{#if section.alternativeTo && section.alternativeTo.length > 0}
			<Text class="flex max-w-3xl flex-wrap items-center">
				Privacy-respecting alternatives to:&nbsp;
				{#each section.alternativeTo as alt, i (alt)}
					<span class="text-base-content/70">{alt}</span>{#if i < section.alternativeTo.length - 1}
						<span class="mr-0.5">,</span>
					{/if}
				{/each}
			</Text>
		{/if}
	</header>

	<!-- Intro text -->
	{#if section.intro}
		<div
			class={cn(
				'prose prose-sm mb-6 max-w-none rounded-lg bg-base-100 p-4 leading-relaxed',
				textVariants.base
			)}
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(section.intro)}
		</div>
	{/if}

	<!-- Word of warning -->
	{#if section.wordOfWarning}
		<div role="alert" class="mb-8 alert alert-soft alert-warning **:text-warning">
			<Icons.warning class="mt-1 mb-auto shrink-0" />
			<span class="prose prose-sm max-w-none">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html markdownToHtml(section.wordOfWarning)}
			</span>
		</div>
	{/if}

	<ul class="space-y-4">
		{#each section.services as service (service.name)}
			{@const serviceSlug = awesomePrivacy.slugify(service.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${categorySlug}/${sectionSlug}/${serviceSlug}`)}
					class="group flex gap-4 rounded-lg bg-base-100 p-5 shadow-sm"
				>
					<!-- Icon -->
					<div class="mt-0.5 shrink-0">
						<ServiceLogo {service} class="size-8" />
					</div>

					<!-- Content -->
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-2">
							<Subheading size="sm" class="group-hover:text-primary group-hover:underline">
								{service.name}
							</Subheading>
							<ServiceBadges {service} size="xs" />
						</div>

						<div class={cn('mt-1 line-clamp-2', textVariants.base, textVariants.size.xs)}>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html markdownToInlineHtml(service.description)}
						</div>
					</div>

					<!-- Arrow -->
					<div
						class="ml-auto flex shrink-0 items-center text-base-content/20 group-hover:text-primary"
					>
						<Icons.chevronRight />
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<!-- Notable Mentions -->
	{#if section.notableMentions}
		<section class="mt-8 alert flex flex-col items-start alert-outline alert-info">
			<Subheading size="xs" class="text-info">Notable Mentions 📣</Subheading>
			{#if typeof section.notableMentions === 'string'}
				<div class={cn('prose prose-sm max-w-none ', textVariants.base)}>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html markdownToHtml(section.notableMentions)}
				</div>
			{:else}
				<ul class="space-y-6">
					{#each section.notableMentions as mention (mention.name)}
						<li>
							{#if mention.url}
								<Link
									href={mention.url}
									external
									class={cn(
										'text-info! underline',
										subheadingVariants.size.sm,
										subheadingVariants.base
									)}
								>
									{mention.name}
								</Link>
							{:else}
								<span class={cn('text-info!', subheadingVariants.size.sm, subheadingVariants.base)}>
									{mention.name}
								</span>
							{/if}
							{#if mention.description}
								<div class={cn('prose prose-sm max-w-none', textVariants.base)}>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html markdownToInlineHtml(mention.description)}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/if}

	<!-- Further Info -->
	{#if section.furtherInfo}
		<div class="mt-8 alert flex flex-col items-start alert-outline alert-info text-info">
			<Subheading size="xs" class="text-info">Further Reading 📖</Subheading>
			<div class={cn('prose prose-sm max-w-none', textVariants.base)}>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html markdownToHtml(section.furtherInfo)}
			</div>
		</div>
	{/if}

	<a href={resolve(`/awesome-privacy/${categorySlug}`)} class="btn mt-6 w-full sm:w-fit">
		<Icons.arrowLeft class="mr-1" /> Back to {awesomePrivacy.slugToName(categorySlug)}
	</a>
</div>
