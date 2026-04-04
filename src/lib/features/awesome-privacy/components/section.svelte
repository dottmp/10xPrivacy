<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import ServiceLogo from './service-logo.svelte';

	import { resolve } from '$app/paths';
	import { Heading, Subheading } from '$lib/components/headings';
	import { Text, textVariants } from '$lib/components/text';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Section } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';
	import { markdownToHtml, markdownToInlineHtml } from '$lib/utils/markdown';
	import { Icons } from '$lib/components/icons/icons.svelte';

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
			<Icons.triangleAlert class="mt-1 mb-auto shrink-0" />
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
						<Icons.chevronRight />
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<a href={resolve(`/awesome-privacy/${categorySlug}`)} class="btn mt-4 w-full sm:w-fit">
		<Icons.arrowLeft class="mr-1" /> Back to {awesomePrivacy.slugToName(categorySlug)}
	</a>
</div>
