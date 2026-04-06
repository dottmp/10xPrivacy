<script lang="ts">
	import { Heading, Subheading } from '$lib/components/headings';
	import { Text } from '$lib/components/text';

	let { data } = $props();
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Security Headers</Heading>
		<Text>
			This page lists the HTTP security headers this server sets on every response. These headers
			instruct your browser on how to interact with this site.
		</Text>
	</header>

	<ul class="flex flex-col gap-4">
		{#each data.headers as header (header.name)}
			<li class=" pb-4">
				<Subheading size="xs" class="mb-2">{header.name}</Subheading>
				<Text class="font-mono  break-all opacity-70">{header.value}</Text>
			</li>
		{/each}
	</ul>
</main>
