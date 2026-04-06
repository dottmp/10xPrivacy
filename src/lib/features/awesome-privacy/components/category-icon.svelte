<script lang="ts">
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';

	type CategoryIconProps = {
		category: string;
		class?: string;
	};

	let { category, class: klass }: CategoryIconProps = $props();

	const categoryIcons = {
		essentials: Icons.essentials,
		communication: Icons.communication,
		'security-tools': Icons['security-tools'],
		networking: Icons.networking,
		productivity: Icons.productivity,
		utilities: Icons.utilities,
		'operating-systems': Icons['operating-systems'],
		development: Icons.development,
		'smart-home-and-iot': Icons['smart-home-and-iot'],
		finance: Icons.finance,
		social: Icons.social,
		media: Icons.media,
		creativity: Icons.creativity
	} as const;

	const slug = $derived(awesomePrivacy.slugify(category));

	const IconComponent = $derived(
		(categoryIcons as Record<string, typeof Icons.fallback>)[slug] ?? Icons.fallback
	);
</script>

<IconComponent class={cn(klass)} />
