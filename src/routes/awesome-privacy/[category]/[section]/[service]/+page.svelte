<script lang="ts">
	import { resolve } from '$app/paths';
	import { awesomePrivacy } from '$lib/awesome-privacy';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.name} | {data.section.name} | Awesome Privacy</title>
	<meta name="description" content={data.service.description} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav class="mb-4 text-xs text-base-content/50">
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
					<span class="badge badge-soft badge-sm badge-neutral">Android</span>
				{/if}
				{#if data.service.iosApp}
					<span class="badge badge-soft badge-sm badge-neutral">iOS</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Description -->
	<section class="mb-8 bg-base-100 p-5 shadow-sm">
		<p class="text-sm leading-relaxed text-base-content/80">{data.service.description}</p>
	</section>

	<!-- Links -->
	<section class="mb-8">
		<h2 class="mb-3 text-sm font-semibold tracking-widest text-base-content/40 uppercase">Links</h2>
		<ul class="space-y-2">
			{#if data.service.url}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-globe w-4 text-primary"></i>
					<span class="text-base-content/50">Homepage:</span>
					<a
						href={data.service.url}
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">{data.service.url}</a
					>
				</li>
			{/if}
			{#if data.service.github}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-github w-4 text-primary"></i>
					<span class="text-base-content/50">GitHub:</span>
					<a
						href="https://github.com/{data.service.github}"
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">github.com/{data.service.github}</a
					>
				</li>
			{/if}
			{#if data.service.subreddit}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-reddit w-4 text-primary"></i>
					<span class="text-base-content/50">Reddit:</span>
					<a
						href="https://reddit.com/r/{data.service.subreddit}"
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">r/{data.service.subreddit}</a
					>
				</li>
			{/if}
			{#if data.service.discordInvite}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-comment w-4 text-primary"></i>
					<span class="text-base-content/50">Discord:</span>
					<a
						href="https://discord.gg/{data.service.discordInvite}"
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">Join server</a
					>
				</li>
			{/if}
			{#if data.service.androidApp}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-android w-4 text-primary"></i>
					<span class="text-base-content/50">Android:</span>
					<a
						href="https://play.google.com/store/apps/details?id={data.service.androidApp}"
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">{data.service.androidApp}</a
					>
				</li>
			{/if}
			{#if data.service.iosApp}
				<li class="flex items-center gap-3 text-sm">
					<i class="nf nf-fa-apple w-4 text-primary"></i>
					<span class="text-base-content/50">iOS:</span>
					<a
						href={data.service.iosApp.startsWith('http')
							? data.service.iosApp
							: `https://apps.apple.com/app/${data.service.iosApp}`}
						target="_blank"
						rel="noopener noreferrer external"
						class="text-primary hover:underline">App Store</a
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
							class="group flex items-center gap-3 bg-base-100 px-4 py-3 shadow-sm hover:shadow-none"
						>
							{#if rel.icon}
								<img src={rel.icon} alt={rel.name} class="h-6 w-6 object-contain" />
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
				class="mt-3 block text-xs text-primary hover:underline"
			>
				View all {data.section.name} →
			</a>
		</section>
	{/if}

	<!-- Back -->
	<div class="mt-4">
		<a
			href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
			class="btn btn-ghost btn-sm"
		>
			<i class="nf nf-fa-arrow_left mr-1"></i> Back to {data.section.name}
		</a>
	</div>
</main>
