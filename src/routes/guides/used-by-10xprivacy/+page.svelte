<script lang="ts">
	import { resolve } from '$app/paths';
	import { type Pathname } from '$app/types';
	import Heading from '$lib/components/headings/heading.svelte';
	import Subheading from '$lib/components/headings/subheading.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import Link from '$lib/components/text/link.svelte';
	import Text from '$lib/components/text/text.svelte';
	import ServiceLogo from '$lib/features/awesome-privacy/components/service-logo.svelte';
	import { markdownToInlineHtml } from '$lib/utils/markdown';

	let { data } = $props();
</script>

<main class="mx-auto w-full max-w-3xl px-4 py-16">
	<header class="mb-10">
		<Heading size="display" class="mb-4">Used by 10xPrivacy</Heading>
		<Text size="lg">
			This is what I actually run, day to day. 10xPrivacy is a one-person project, so "we" really
			means me. Nothing here is "the best", it's just what I ended up with, and what fits me might
			not fit you. Nobody pays for a spot: no sponsorships, no affiliate links. Plenty of good
			options aren't on this page.
		</Text>
	</header>

	{#each data.stackGroups as group (group.name)}
		<section class="mb-10">
			<Subheading size="xs" class="mb-3 tracking-widest uppercase">{group.name}</Subheading>

			<ul class="space-y-2">
				{#each group.items as item (item.name)}
					<li id={item.slug} class="scroll-mt-[40vh]">
						<a
							href={resolve(item.href as Pathname)}
							class="group flex items-start gap-3 rounded-lg bg-base-100 p-4 shadow-sm"
						>
							<ServiceLogo service={item.service} class="mt-0.5 size-8" />

							<div class="min-w-0">
								<span class="font-semibold group-hover:text-primary group-hover:underline">
									{item.name}
								</span>
								{#if item.note}
									<p class="mt-1 text-sm text-base-content/70">{item.note}</p>
								{/if}
							</div>

							<div class="ml-auto self-center text-base-content/20 group-hover:text-primary">
								<Icons.chevronRight />
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	{#if data.notableMentions.length > 0}
		<section class="mt-2 alert flex flex-col items-start alert-outline alert-info">
			<Subheading size="xs" class="text-info">Also in my setup 📣</Subheading>

			<ul class="space-y-4">
				{#each data.notableMentions as mention (mention.name)}
					<li>
						<Link
							href={mention.url}
							external
							class="font-semibold text-info! underline hover:no-underline"
						>
							{mention.name}
						</Link>
						{#if mention.description}
							<div class="prose prose-sm max-w-none text-base-content/80">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html markdownToInlineHtml(mention.description)}
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</main>
