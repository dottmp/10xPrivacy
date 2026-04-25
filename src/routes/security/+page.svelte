<script lang="ts">
	import { Heading, Subheading } from '$lib/components/headings';
	import { Link, Text } from '$lib/components/text';

	let { data } = $props();
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Security</Heading>
		<Text size="lg">
			Transparency is cool, 10xPrivacy will allways be cool. Below are the security scores from
			Mozilla HTTP Observatory and the HTTP headers set on every response.
		</Text>
	</header>

	<section class="mb-10">
		<Subheading class="mb-4">Scores</Subheading>
		<div class="flex flex-wrap items-center gap-4">
			<Link
				href="https://observatory.mozilla.org/analyze/10xprivacy.com"
				class="inline-flex items-center"
			>
				<img
					src="https://img.shields.io/mozilla-observatory/grade/10xprivacy.com?label=Mozilla%20Observatory"
					alt="Mozilla Observatory grade"
					class="h-5"
				/>
			</Link>
		</div>
	</section>

	<section>
		<Subheading class="mb-4">HTTP Headers</Subheading>
		<ul class="flex flex-col gap-6 rounded-lg bg-base-100 p-4 shadow-sm">
			{#each data.headers as header (header.name)}
				<li>
					<Subheading size="xs" class="mb-2">{header.name}</Subheading>
					<Text class="break-all">{header.value}</Text>
				</li>
			{/each}
		</ul>
	</section>
</main>
