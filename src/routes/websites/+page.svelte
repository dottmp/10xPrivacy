<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Link, Text } from '$lib/components/text';
	import websites from '$lib/data/websites.json';

	function stripProtocol(url: string): string {
		return url.replace(/https?:\/\//, '');
	}
</script>

<main class="mx-auto max-w-3xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Websites</Heading>
		<Text
			>A list of websites related to digital privacy. Can be anything from news sites, intresting
			articles to tools and resources. If you have any suggestions, feel free to <Link
				href="https://github.com/dottmp/10xprivacy/edit/main/src/lib/data/websites.json"
				external
				variant="primary">suggest websites on GitHub</Link
			>.</Text
		>
	</header>

	<ul class="flex flex-wrap gap-2">
		{#each websites.data as website (website)}
			<li>
				<Link
					href={website}
					class="block rounded-lg bg-base-100 px-2 py-1.5  font-semibold"
					external
				>
					{stripProtocol(website)}
				</Link>
			</li>
		{/each}
	</ul>
</main>
