<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import ServiceBadges from './service-badges.svelte';
	import ServiceLogo from './service-logo.svelte';
	import TosdrBadge from './tosdr-badge.svelte';
	import TosdrCard from './tosdr-card.svelte';

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
				<ServiceBadges {service} size="sm" />
				{#if service.androidApp}
					<span class="badge badge-soft badge-sm">Android</span>
				{/if}
				{#if service.iosApp}
					<span class="badge badge-soft badge-sm">iOS</span>
				{/if}
				{#if service.tosdrId}
					<TosdrBadge tosdrId={service.tosdrId} />
				{/if}
			</div>
		</div>
	</div>

	<!-- Tabs -->
	{#if service.tosdrId}
		<div class="tabs-border mb-2 tabs [&>input]:checked:text-primary">
			<!-- overview tab  -->
			<input
				type="radio"
				name="service-tabs-{service.name}"
				class="tab"
				aria-label="Overview"
				checked
			/>
			<div class="tab-content pt-6">
				<!-- Description -->
				<section
					class={cn(
						'prose mb-8 max-w-none rounded-lg bg-base-100 p-5 shadow-sm',
						textVariants.base,
						textVariants.size.default
					)}
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html markdownToHtml(service.description)}
				</section>

				<!-- Word of Warning -->
				{#if section.wordOfWarning}
					<section class="mb-8">
						<div role="alert" class="alert text-sm alert-warning">
							<Icons.warning class="size-4 shrink-0" />
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<div>{@html markdownToHtml(section.wordOfWarning)}</div>
						</div>
					</section>
				{/if}

				<!-- Alternative To -->
				{#if section.alternativeTo && section.alternativeTo.length > 0}
					<section class="mb-8">
						<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}>
							<Icons.warning class="inline size-4 text-error" /> Avoid
						</Subheading>
						<div class="flex flex-wrap gap-2">
							{#each section.alternativeTo as alt (alt)}
								<span class="badge bg-base-100 text-sm">
									{alt}
								</span>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Links -->
				<section class="mb-8">
					<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}
						>Links</Subheading
					>
					<ul
						class="space-y-2 [&_a]:truncate [&_a]:text-primary [&_a]:hover:underline [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:text-sm [&_span]:text-base-content/50 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-primary"
					>
						{#if service.url}
							<li>
								<Icons.globe /><span>Homepage:</span><Link href={service.url} external
									>{service.url}</Link
								>
							</li>
						{/if}
						{#if service.github}
							<li>
								<Icons.github /><span>GitHub:</span><Link
									href="https://github.com/{service.github}"
									external>github.com/{service.github}</Link
								>
							</li>
						{/if}
						{#if service.subreddit}
							<li>
								<Icons.reddit /><span>Reddit:</span><Link
									href="https://reddit.com/r/{service.subreddit}"
									external>r/{service.subreddit}</Link
								>
							</li>
						{/if}
						{#if service.discordInvite}
							<li>
								<Icons.messageCircle /><span class="text-base-content/50">Discord:</span><Link
									href="https://discord.gg/{service.discordInvite}"
									external>Join server</Link
								>
							</li>
						{/if}
						{#if service.androidApp}
							<li>
								<Icons.android /><span>Android:</span><Link
									href="https://play.google.com/store/apps/details?id={service.androidApp}"
									external>{service.androidApp}</Link
								>
							</li>
						{/if}
						{#if service.iosApp}
							<li>
								<Icons.apple /><span>iOS:</span><Link
									href={service.iosApp.startsWith('http')
										? service.iosApp
										: `https://apps.apple.com/app/${service.iosApp}`}
									external>App Store</Link
								>
							</li>
						{/if}
					</ul>
				</section>
			</div>

			<!-- terms of service tab  -->
			<input
				type="radio"
				name="service-tabs-{service.name}"
				class="tab"
				aria-label="Terms of Service"
			/>

			<div class="tab-content pt-6">
				<TosdrCard tosdrId={service.tosdrId} />
			</div>
		</div>
	{:else}
		<!-- No tabs — render overview content directly -->
		<section
			class={cn(
				'mb-8 rounded-lg bg-base-100 p-5 shadow-sm',
				textVariants.base,
				textVariants.size.default
			)}
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(service.description)}
		</section>

		{#if section.wordOfWarning}
			<section class="mb-8">
				<div role="alert" class="alert text-sm alert-warning">
					<Icons.warning class="size-4 shrink-0" />
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<div>{@html markdownToHtml(section.wordOfWarning)}</div>
				</div>
			</section>
		{/if}

		{#if section.alternativeTo && section.alternativeTo.length > 0}
			<section class="mb-8">
				<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}>
					<Icons.warning class="inline size-4 text-error" /> Avoid
				</Subheading>
				<div class="flex flex-wrap gap-2">
					{#each section.alternativeTo as alt (alt)}
						<span class="badge">
							{alt}
						</span>
					{/each}
				</div>
			</section>
		{/if}

		<section class="mb-8">
			<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}>
				Links
			</Subheading>
			<ul
				class="space-y-2 [&_a]:truncate [&_a]:text-primary [&_a]:hover:underline [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:text-sm [&_span]:text-base-content/50 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-primary"
			>
				{#if service.url}
					<li>
						<Icons.globe /><span>Homepage:</span><Link href={service.url} external
							>{service.url}</Link
						>
					</li>
				{/if}
				{#if service.github}
					<li>
						<Icons.github /><span>GitHub:</span><Link
							href="https://github.com/{service.github}"
							external>github.com/{service.github}</Link
						>
					</li>
				{/if}
				{#if service.subreddit}
					<li>
						<Icons.reddit /><span>Reddit:</span><Link
							href="https://reddit.com/r/{service.subreddit}"
							external>r/{service.subreddit}</Link
						>
					</li>
				{/if}
				{#if service.discordInvite}
					<li>
						<Icons.messageCircle /><span class="text-base-content/50">Discord:</span><Link
							href="https://discord.gg/{service.discordInvite}"
							external>Join server</Link
						>
					</li>
				{/if}
				{#if service.androidApp}
					<li>
						<Icons.android /><span>Android:</span><Link
							href="https://play.google.com/store/apps/details?id={service.androidApp}"
							external>{service.androidApp}</Link
						>
					</li>
				{/if}
				{#if service.iosApp}
					<li>
						<Icons.apple /><span>iOS:</span><Link
							href={service.iosApp.startsWith('http')
								? service.iosApp
								: `https://apps.apple.com/app/${service.iosApp}`}
							external>App Store</Link
						>
					</li>
				{/if}
			</ul>
		</section>
	{/if}

	<!-- related services (always shown) -->
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
							<ServiceBadges service={rel} size="xs" />
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
