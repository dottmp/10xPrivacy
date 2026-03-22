<script lang="ts">
	import { Heading } from '$lib/components/headings';
	import { Link, Text } from '$lib/components/text';

	const WEBSITES = [
		'https://theyseeyourphotos.com',
		'https://privacyguides.org',
		'https://techlore.tech',
		'https://reddit.com/r/privacy',
		'https://awesome-privacy.xyz',
		'https://tuta.com/blog',
		'https://privacytools.io',
		'https://github.com/brandonhimpfen/awesome-privacy',
		'https://mullvad.net/en/why-privacy-matters',
		'https://privacypack.org',
		'https://www.poisonfountain.org',
		'https://rnsaffn.com/poison3',
		'https://haveibeenpwned.com',
		'https://prism-break.org',
		'https://github.com/pluja/awesome-privacy',
		'https://ssd.eff.org',
		'https://reddit.com/r/thehatedone',
		'https://browserleaks.com/',
		'https://mullvad.net/en/servers',
		'https://protonvpn.com/vpn-servers',
		'https://haveibeenpwned.com/Passwords',
		'https://discuss.privacyguides.net',
		'https://coveryourtracks.eff.org',
		'https://github.com/privacytoolsIO/privacy-tools',
		'https://proton.me/blog'
	] as const;
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
