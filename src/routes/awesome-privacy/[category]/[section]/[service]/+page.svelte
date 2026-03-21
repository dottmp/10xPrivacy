<script lang="ts">
	import { resolve } from '$app/paths';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { markdownToHtml } from '$lib/utils/markdown';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.name} | {data.section.name} | Awesome Privacy</title>
	<meta name="description" content={data.service.description} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav class="mb-4 text-xs text-base-content/50 capitalize">
		<a href={resolve('/awesome-privacy')} class="hover:text-primary">Awesome Privacy</a>
		<span class="mx-1">›</span>
		<a href={resolve(`/awesome-privacy/${data.categorySlug}`)} class="hover:text-primary"
			>{data.categorySlug}</a
		>
		<span class="mx-1">›</span>
		<a
			href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
			class="hover:text-primary">{data.section.name}</a
		>
		<span class="mx-1">›</span>
		<span>{data.service.name}</span>
	</nav>

	<!-- Hero -->
	<div class="mb-8 flex items-start gap-5">
		{#if data.service.icon}
			<img
				referrerpolicy="no-referrer"
				src={data.service.icon}
				alt={data.service.name}
				class="mt-1 h-14 w-14 shrink-0 object-contain"
			/>
		{/if}
		<div>
			<h1 class="text-3xl font-bold text-primary">{data.service.name}</h1>
			{#if data.service.url}
				<a
					href={data.service.url}
					target="_blank"
					rel="noopener noreferrer external"
					class="mt-0.5 text-sm text-base-content/50 hover:text-primary"
				>
					{data.service.url.replace(/^https?:\/\//, '')}
				</a>
			{/if}
			<!-- Badges -->
			<div class="mt-2 flex flex-wrap gap-2">
				{#if data.service.openSource}
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
	<section class="mb-8 bg-base-100 p-5 shadow-sm">
		<div class="text-sm leading-relaxed text-base-content/80">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(data.service.description)}
		</div>
	</section>

	<!-- Links -->
	<section class="mb-8">
		<h2 class="mb-3 text-sm font-semibold tracking-widest text-base-content/40 uppercase">Links</h2>
		<ul
			class="space-y-2 [&_a]:text-primary [&_a]:hover:underline [&_i]:w-4 [&_i]:text-primary [&_li]:flex [&_li]:items-center [&_li]:gap-3 [&_li]:text-sm [&_span]:text-base-content/50"
		>
			{#if data.service.url}
				<li>
					<i class="nf nf-fa-globe"></i>
					<span>Homepage:</span>
					<a href={data.service.url} target="_blank" rel="noopener noreferrer external"
						>{data.service.url}</a
					>
				</li>
			{/if}
			{#if data.service.github}
				<li>
					<i class="nf nf-fa-github"></i>
					<span>GitHub:</span>
					<a
						href="https://github.com/{data.service.github}"
						target="_blank"
						rel="noopener noreferrer external">github.com/{data.service.github}</a
					>
				</li>
			{/if}
			{#if data.service.subreddit}
				<li>
					<i class="nf nf-fa-reddit"></i>
					<span>Reddit:</span>
					<a
						href="https://reddit.com/r/{data.service.subreddit}"
						target="_blank"
						rel="noopener noreferrer external">r/{data.service.subreddit}</a
					>
				</li>
			{/if}
			{#if data.service.discordInvite}
				<li>
					<i class="nf nf-fa-comment"></i>
					<span class="text-base-content/50">Discord:</span>
					<a
						href="https://discord.gg/{data.service.discordInvite}"
						target="_blank"
						rel="noopener noreferrer external">Join server</a
					>
				</li>
			{/if}
			{#if data.service.androidApp}
				<li>
					<i class="nf nf-fa-android"></i>
					<span> Android:</span>
					<a
						href="https://play.google.com/store/apps/details?id={data.service.androidApp}"
						target="_blank"
						rel="noopener noreferrer external">{data.service.androidApp}</a
					>
				</li>
			{/if}
			{#if data.service.iosApp}
				<li>
					<i class="nf nf-fa-apple"></i>
					<span>iOS:</span>
					<a
						href={data.service.iosApp.startsWith('http')
							? data.service.iosApp
							: `https://apps.apple.com/app/${data.service.iosApp}`}
						target="_blank"
						rel="noopener noreferrer external">App Store</a
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
							class="group flex items-center gap-3 bg-base-100 px-4 py-3 hover:shadow-sm"
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
							<span class="text-sm font-semibold text-base-content group-hover:text-primary"
								>{rel.name}</span
							>
							{#if rel.openSource || rel.github}
								<span class="ml-auto badge badge-soft badge-xs badge-success">Open Source</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
			<a
				href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
				class="btn mt-6 block btn-link"
			>
				View all {data.section.name}
			</a>
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
