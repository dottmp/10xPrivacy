<script lang="ts">
	import { resolve } from '$app/paths';
	import Heading from '$lib/components/headings/heading.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import Link from '$lib/components/text/link.svelte';
	import Text from '$lib/components/text/text.svelte';
	import Articles from '$lib/features/feed/components/articles.svelte';

	let { data } = $props();
</script>

<main class="my-auto flex flex-col items-center">
	<!-- hero -->
	<header class="mb-24 w-full max-w-6xl px-4 pt-12">
		<Icons.logo class="-ml-6 text-primary sm:-mb-4 sm:-ml-12" />
		<Heading class="sr-only">10xPrivacy</Heading>

		<Text size="lg" class="max-w-5xl text-balance">
			10xPrivacy is a website dedicated to gathering and sharing information about digital privacy.
			It provides a curated feed of news, resources, and tools to help users protect themselves from
			surveillance capitalism.

			<span class="mt-4 block">Good luck and stay private!</span>
		</Text>

		<div class="mt-10 flex items-center gap-x-6">
			<a href={resolve('/awesome-privacy')} class="btn btn-md btn-primary">
				Get started <Icons.arrowRight />
			</a>

			<a href={resolve('/guides/get-started')} class="link link-hover"> Learn more </a>
		</div>
	</header>

	<!-- articles -->
	<section class="mx-auto w-full max-w-6xl px-4 py-12">
		<div>
			<Heading class="mb-2" level={2} size="display">Privacy News</Heading>
			<Text size="lg" class="mt-4 max-w-3xl">
				Get the lates and greates news in the wolrd of privacy. We got a curated feed of news
				articles from various sources e.g. from our beloved
				<Link href="https://www.mullvad.com/en/blog/" variant="primary" external>
					Mullvad Blog
				</Link>,

				<Link href="https://www.privacyguides.org/blog/" variant="primary" external>
					Privacy Guides
				</Link>, and many more.
			</Text>
		</div>

		<div class="mt-10 flex flex-col items-center">
			{#await data.promisedArticles}
				<ul class="grid w-full gap-3 md:grid-cols-2">
					{#each Array.from({ length: 4 })}
						<li class="h-32 w-full animate-pulse rounded-lg bg-base-100 px-4 py-3"></li>
					{/each}
				</ul>
			{:then articles}
				<Articles {articles} class="grid gap-3 *:size-full md:grid-cols-2 [&_a]:size-full" />
			{:catch}
				<div role="alert" class="alert alert-soft alert-error">
					<span>Error! Failed to load articles. Please try again later.</span>
				</div>
			{/await}

			<a href={resolve('/privacy-news')} class="btn mt-6 w-full btn-primary sm:w-fit">
				Show all News
			</a>
		</div>
	</section>

	<!-- checklist  -->
	<section class="mx-auto max-w-4xl px-4 py-24">
		<div class="card bg-primary text-primary-content">
			<div class="card-body items-center text-center">
				<h2 class="card-title">Don't know where to start?</h2>
				<p>
					Starting your privacy journey can be overwhelming, where do you even start? Don't worry,
					we got you covered. Check our list of recomneneded first steps to take to kickstart your
					privacy journey.
				</p>

				<span>(」ﾟﾛﾟ)｣</span>

				<div class="card-actions justify-center">
					<a href={resolve('/guides/checklist')} class="btn btn-accent">Gimme that list!</a>
				</div>
			</div>
		</div>
	</section>
</main>
