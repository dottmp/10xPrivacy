<script lang="ts">
	import { resolve } from '$app/paths';
	import { awesomePrivacy } from '$lib/awesome-privacy';
	import { markdownToHtml, markdownToInlineHtml } from '$lib/utils/markdown';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.section.name} | Awesome Privacy</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-10">
	<!-- Breadcrumb -->
	<nav class="mb-4 text-xs text-base-content/50 capitalize">
		<a href={resolve('/awesome-privacy')} class="hover:text-primary">Awesome Privacy</a>
		<span class="mx-1">›</span>
		<a href={resolve(`/awesome-privacy/${data.categorySlug}`)} class="hover:text-primary">
			{data.categorySlug}
		</a>
		<span class="mx-1">›</span>
		<span>{data.section.name}</span>
	</nav>

	<header class="mb-4">
		<h1 class="text-3xl font-bold text-primary">{data.section.name}</h1>
		<p class="mt-0.5 text-sm text-base-content/60">
			{data.section.services.length} privacy-respecting services
		</p>
	</header>

	<!-- Alternatives to -->
	{#if data.section.alternativeTo && data.section.alternativeTo.length > 0}
		<p class="mb-6 text-xs text-base-content/50">
			Privacy-respecting alternatives to:
			{#each data.section.alternativeTo as alt, i (alt)}
				<span class="font-mono text-base-content/70">{alt}</span
				>{#if i < data.section.alternativeTo.length - 1},
				{/if}
			{/each}
		</p>
	{/if}

	<!-- Intro text -->
	{#if data.section.intro}
		<div
			class="prose prose-sm mb-6 max-w-none bg-base-100 p-4 leading-relaxed text-base-content/70 shadow-sm"
		>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(data.section.intro)}
		</div>
	{/if}

	<!-- Word of warning -->
	{#if data.section.wordOfWarning}
		<div
			class="mb-8 flex gap-3 border border-warning/30 bg-warning/10 p-4 text-sm text-base-content/80"
		>
			<i class="nf nf-fa-exclamation_triangle mt-0.5 shrink-0 text-warning"></i>
			<div class="prose prose-sm max-w-none leading-relaxed">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html markdownToHtml(data.section.wordOfWarning)}
			</div>
		</div>
	{/if}

	<ul class="space-y-4">
		{#each data.section.services as service (service.name)}
			{@const serviceSlug = awesomePrivacy.slugify(service.name)}
			<li>
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}/${serviceSlug}`)}
					class="group flex gap-4 bg-base-100 p-5"
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
							<div
								class="flex h-8 w-8 items-center justify-center bg-base-200 text-base-content/30"
							>
								<i class="nf nf-fa-cube text-lg"></i>
							</div>
						{/if}
					</div>

					<!-- Content -->
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-2">
							<h2
								class="font-semibold text-base-content group-hover:text-primary group-hover:underline"
							>
								{service.name}
							</h2>
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

						<div class="mt-1 line-clamp-2 text-xs text-base-content/60">
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

	<a href={resolve(`/awesome-privacy/${data.categorySlug}`)} class="btn mt-4 w-full sm:w-fit">
		<i class="nf nf-fa-arrow_left mr-1"></i> Back
	</a>
</main>
