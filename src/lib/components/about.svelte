<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Subheading } from './headings';
	import { Text } from './text';

	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils/cn';

	type AboutProps = HTMLAttributes<HTMLElement>;

	let { class: klass, ...props }: AboutProps = $props();
</script>

<section class={cn('rounded-lg bg-base-100 p-4 text-center shadow-sm', klass)} {...props}>
	<div class="flex flex-col">
		<Subheading>About</Subheading>
		<Text class="mt-2">
			10xPrivacy is a website dedicated to gathering and sharing information about digital privacy.
			It provides a curated feed of news, resources, and tools to help users protect themselves from
			surveillance capitalism. Start by going to one of the sections below.
		</Text>

		<div class="mx-auto mt-6 flex flex-col items-center gap-4 sm:flex-row">
			<a class="btn btn-primary" href={resolve('/privacy-news')}> Privacy News </a>
			<a class="btn btn-primary" href={resolve('/awesome-privacy')}> Awesome Privacy </a>
			<a class="btn btn-primary" href={resolve('/websites')}> Websites </a>
		</div>
	</div>
</section>
