<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import ServiceLogo from './service-logo.svelte';

	import { resolve } from '$app/paths';
	import { Heading, Subheading, subheadingVariants } from '$lib/components/headings';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link, textVariants } from '$lib/components/text';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import type { Section, Service } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';
	import { markdownToHtml } from '$lib/utils/markdown';

	type SectionProps = HTMLAttributes<HTMLDivElement> & {
		service: Service;
		section: Section;
		related: Service[];
		categorySlug: string;
		sectionSlug: string;
	};

	let { service, section, categorySlug, sectionSlug, related, ...props }: SectionProps = $props();
</script>

<!-- List -->
<div {...props}>
	<!-- Hero -->
	<div class="mb-8 flex items-start gap-5">
		<ServiceLogo {service} class="size-14" />
		<div>
			<Heading size="display">{service.name}</Heading>
			{#if service.url}
				<Link href={service.url} external class="mt-0.5">
					{service.url.replace(/^https?:\/\//, '')}
				</Link>
			{/if}
			<!-- Badges -->
			<div class="mt-2 flex flex-wrap gap-2">
				{#if service.openSource || service.github}
					<span class="badge badge-soft badge-sm badge-success">Open Source</span>
				{/if}
				{#if service.securityAudited}
					<span class="badge badge-soft badge-sm badge-warning">Security Audited</span>
				{/if}
				{#if service.acceptsCrypto}
					<span class="badge badge-soft badge-sm badge-accent">Accepts Crypto</span>
				{/if}
				{#if service.followWith}
					<span class="badge badge-soft badge-sm badge-info">{service.followWith}</span>
				{/if}
				{#if service.androidApp}
					<span class="badge badge-soft badge-sm">Android</span>
				{/if}
				{#if service.iosApp}
					<span class="badge badge-soft badge-sm">iOS</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Description -->
	<section
		class={cn(
			'mb-8 rounded-lg bg-base-100 p-5  shadow-sm',
			textVariants.base,
			textVariants.size.default
		)}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html markdownToHtml(service.description)}
	</section>

	<!-- Links -->
	<section class="mb-8">
		<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}
			>Links</Subheading
		>
		<ul
			class="space-y-2 [&_a]:truncate [&_a]:text-primary [&_a]:hover:underline [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:text-sm [&_span]:text-base-content/50 [&_svg]:w-4 [&_svg]:text-primary"
		>
			{#if service.url}
				<li>
					<Icons.globe />
					<span>Homepage:</span>
					<Link href={service.url} external>{service.url}</Link>
				</li>
			{/if}
			{#if service.github}
				<li>
					<Icons.github />
					<span>GitHub:</span>
					<Link href="https://github.com/{service.github}" external
						>github.com/{service.github}</Link
					>
				</li>
			{/if}
			{#if service.subreddit}
				<li>
					<Icons.reddit />
					<span>Reddit:</span>
					<Link href="https://reddit.com/r/{service.subreddit}" external>r/{service.subreddit}</Link
					>
				</li>
			{/if}
			{#if service.discordInvite}
				<li>
					<Icons.messageCircle />
					<span class="text-base-content/50">Discord:</span>
					<Link href="https://discord.gg/{service.discordInvite}" external>Join server</Link>
				</li>
			{/if}
			{#if service.androidApp}
				<li>
					<Icons.android />
					<span>Android:</span>
					<Link href="https://play.google.com/store/apps/details?id={service.androidApp}" external
						>{service.androidApp}</Link
					>
				</li>
			{/if}
			{#if service.iosApp}
				<li>
					<Icons.apple />
					<span>iOS:</span>
					<Link
						href={service.iosApp.startsWith('http')
							? service.iosApp
							: `https://apps.apple.com/app/${service.iosApp}`}
						external>App Store</Link
					>
				</li>
			{/if}
		</ul>
	</section>

	<!-- related services -->
	{#if related.length > 0}
		<section class="mb-8">
			<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}>
				More {section.name}</Subheading
			>

			<ul class="space-y-2">
				{#each related as rel (rel.name)}
					<li>
						<a
							href={resolve(
								`/awesome-privacy/${categorySlug}/${sectionSlug}/${awesomePrivacy.slugify(rel.name)}`
							)}
							class="group flex items-center gap-3 rounded-lg bg-base-100 px-4 py-3 shadow-sm"
						>
							<ServiceLogo service={rel} class="size-6" />

							<span
								class={cn(
									subheadingVariants.base,
									textVariants.size.default,
									'font-semibold group-hover:text-primary group-hover:underline'
								)}>{rel.name}</span
							>
							{#if rel.openSource || rel.github}
								<span class="ml-auto badge badge-soft badge-xs badge-success">Open Source</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Back -->
	<a
		href={resolve(`/awesome-privacy/${categorySlug}/${sectionSlug}`)}
		class="btn mt-4 w-full sm:w-fit"
	>
		<Icons.arrowLeft class="mr-1" /> Back to {awesomePrivacy.slugToName(sectionSlug)}
	</a>
</div>
