<script lang="ts">
	import { resolve } from '$app/paths';
	import Heading from '$lib/components/headings/heading.svelte';
	import Subheading, { subheadingVariants } from '$lib/components/headings/subheading.svelte';
	import { textVariants } from '$lib/components/text';
	import Link from '$lib/components/text/link.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';
	import { markdownToHtml } from '$lib/utils/markdown';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.name} | {data.section.name} | Awesome Privacy</title>
	<meta name="description" content={data.service.description} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav
		class="breadcrumbs mb-4 text-sm font-medium text-base-content/50 capitalize [&_a]:hover:text-primary"
	>
		<ul>
			<li><a href={resolve('/awesome-privacy')}>Awesome Privacy</a></li>
			<li>
				<a href={resolve(`/awesome-privacy/${data.categorySlug}`)}>
					{awesomePrivacy.slugToName(data.categorySlug)}
				</a>
			</li>
			<li>
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
					class="hover:text-primary">{data.section.name}</a
				>
			</li>

			<li>{data.service.name}</li>
		</ul>
	</nav>

	<!-- Hero -->
	<div class="mb-8 flex items-start gap-5">
		{#if data.service.icon}
			<img
				referrerpolicy="no-referrer"
				src={data.service.icon}
				alt={data.service.name}
				class=" size-14 shrink-0 object-contain"
			/>
		{/if}
		<div>
			<Heading size="display">{data.service.name}</Heading>
			{#if data.service.url}
				<Link href={data.service.url} external class="mt-0.5">
					{data.service.url.replace(/^https?:\/\//, '')}
				</Link>
			{/if}
			<!-- Badges -->
			<div class="mt-2 flex flex-wrap gap-2">
				{#if data.service.openSource || data.service.github}
					<span class="badge badge-soft badge-sm badge-success">Open Source</span>
				{/if}
				{#if data.service.securityAudited}
					<span class="badge badge-soft badge-sm badge-warning">Security Audited</span>
				{/if}
				{#if data.service.acceptsCrypto}
					<span class="badge badge-soft badge-sm badge-accent">Accepts Crypto</span>
				{/if}
				{#if data.service.followWith}
					<span class="badge badge-soft badge-sm badge-info">{data.service.followWith}</span>
				{/if}
				{#if data.service.androidApp}
					<span class="badge badge-soft badge-sm">Android</span>
				{/if}
				{#if data.service.iosApp}
					<span class="badge badge-soft badge-sm">iOS</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Description -->
	<section
		class={cn('mb-8 rounded-lg bg-base-100 p-5', textVariants.base, textVariants.size.default)}
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html markdownToHtml(data.service.description)}
	</section>

	<!-- Links -->
	<section class="mb-8">
		<Subheading size="xs" class={cn('mb-3 tracking-widest uppercase', textVariants.base)}
			>Links</Subheading
		>
		<ul
			class="space-y-2 [&_a]:text-primary [&_a]:hover:underline [&_i]:w-4 [&_i]:text-primary [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:text-sm [&_span]:text-base-content/50"
		>
			{#if data.service.url}
				<li>
					<i class="nf nf-fa-globe"></i>
					<span>Homepage:</span>
					<Link href={data.service.url} external>{data.service.url}</Link>
				</li>
			{/if}
			{#if data.service.github}
				<li>
					<i class="nf nf-fa-github"></i>
					<span>GitHub:</span>
					<Link href="https://github.com/{data.service.github}" external
						>github.com/{data.service.github}</Link
					>
				</li>
			{/if}
			{#if data.service.subreddit}
				<li>
					<i class="nf nf-fa-reddit"></i>
					<span>Reddit:</span>
					<Link href="https://reddit.com/r/{data.service.subreddit}" external
						>r/{data.service.subreddit}</Link
					>
				</li>
			{/if}
			{#if data.service.discordInvite}
				<li>
					<i class="nf nf-fa-comment"></i>
					<span class="text-base-content/50">Discord:</span>
					<Link href="https://discord.gg/{data.service.discordInvite}" external>Join server</Link>
				</li>
			{/if}
			{#if data.service.androidApp}
				<li>
					<i class="nf nf-fa-android"></i>
					<span> Android:</span>
					<Link
						href="https://play.google.com/store/apps/details?id={data.service.androidApp}"
						external>{data.service.androidApp}</Link
					>
				</li>
			{/if}
			{#if data.service.iosApp}
				<li>
					<i class="nf nf-fa-apple"></i>
					<span>iOS:</span>
					<Link
						href={data.service.iosApp.startsWith('http')
							? data.service.iosApp
							: `https://apps.apple.com/app/${data.service.iosApp}`}
						external>App Store</Link
					>
				</li>
			{/if}
		</ul>
	</section>

	<!-- related services -->
	{#if data.related.length > 0}
		<section class="mb-8">
			<h2 class="mb-3 text-sm font-semibold tracking-widest text-base-content/40 uppercase">
				More {data.section.name}
			</h2>
			<ul class="space-y-2">
				{#each data.related as rel (rel.name)}
					<li>
						<a
							href={resolve(
								`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}/${awesomePrivacy.slugify(rel.name)}`
							)}
							class="group flex items-center gap-3 rounded-lg bg-base-100 px-4 py-3"
						>
							{#if rel.icon}
								<img
									referrerpolicy="no-referrer"
									src={rel.icon}
									alt={rel.name}
									class="h-6 w-6 object-contain"
								/>
							{:else}
								<i class="nf nf-fa-cube text-base-content/30"></i>
							{/if}
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
		href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
		class="btn mt-4 w-full sm:w-fit"
	>
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</main>
