<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Link, Text } from '$lib/components/text';
	import { WEBSITES } from '$lib/configs';
</script>

<main class="mx-auto max-w-3xl px-4 py-8">
	<header class="mb-8">
		<Heading size="display">Websites</Heading>
		<Text>A list of websites</Text>
	</header>

	<ul class="flex flex-wrap gap-2">
		{#each WEBSITES as website (website)}
			<li>
				<Link
					href={website}
					class="block rounded-lg bg-base-100 px-2 py-1.5  font-semibold"
					external
				>
					{website.replace(/https?:\/\//, '')}
				</Link>
			</li>
		{/each}
	</ul>
</main>
