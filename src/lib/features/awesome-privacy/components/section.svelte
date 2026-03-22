<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';
	import { Heading, Subheading } from '$lib/components/headings';
	import { Text, textVariants } from '$lib/components/text';
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
	<header class="mb-4">
		<Heading size="display">{section.name}</Heading>
	</header>

	<!-- Alternatives to -->
	{#if section.alternativeTo && section.alternativeTo.length > 0}
		<Text class="mb-6">
			Privacy-respecting alternatives to:
			{#each section.alternativeTo as alt, i (alt)}
				<span class="text-base-content/70">{alt}</span>{#if i < section.alternativeTo.length - 1}
					<span class="mr-0.5">,</span>
				{/if}
			{/each}
		</Text>
	{/if}

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
			<i class="nf nf-fa-exclamation_triangle mt-2 mb-auto shrink-0"></i>
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
					class="group flex gap-4 rounded-lg bg-base-100 p-5"
				>
					<!-- Icon -->
					<div class="mt-0.5 shrink-0">
						{#if service.icon}
							<img
								referrerpolicy="no-referrer"
								src={service.icon}
								alt={service.name}
								class="h-8 w-8 object-contain"
							/>
						{:else}
							<div class="flex size-8 items-center justify-center bg-base-200 text-base-content/30">
								<i class="nf nf-fa-cube text-lg"></i>
							</div>
						{/if}
					</div>

					<!-- Content -->
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-2">
							<Subheading size="sm" class="group-hover:text-primary group-hover:underline">
								{service.name}
							</Subheading>
							{#if service.openSource || service.github}
								<span class="badge badge-soft badge-xs badge-success">Open Source</span>
							{/if}
							{#if service.securityAudited}
								<span class="badge badge-soft badge-xs badge-warning">Audited</span>
							{/if}
							{#if service.acceptsCrypto}
								<span class="badge badge-soft badge-xs badge-accent">Accepts Crypto</span>
							{/if}
							{#if service.followWith}
								<span class="badge badge-soft badge-xs badge-info">{service.followWith}</span>
							{/if}
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
						<i class="nf nf-fa-chevron_right"></i>
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<a href={resolve(`/awesome-privacy/${categorySlug}`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</div>
