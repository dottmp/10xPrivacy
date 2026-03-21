<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
	import { cn } from '$lib/utils/cn';

	type CategoryIconProps = HTMLAttributes<HTMLElement> & {
		category: string;
	};

	let { category, class: klass, ...props }: CategoryIconProps = $props();

	const CATEGORY_ICONS = Object.freeze({
		essentials: 'nf-fa-shield',
		communication: 'nf-fa-comments',
		'security-tools': 'nf-fa-lock',
		networking: 'nf-fa-globe',
		productivity: 'nf-fa-tasks',
		utilities: 'nf-fa-wrench',
		'operating-systems': 'nf-fa-desktop',
		development: 'nf-fa-code',
		'smart-home-and-iot': 'nf-fa-home',
		finance: 'nf-fa-money',
		social: 'nf-fa-users',
		media: 'nf-fa-film',
		creativity: 'nf-fa-paint_brush'
	} as const);

	const slug = $derived(awesomePrivacy.slugify(category));

	const icon = $derived(CATEGORY_ICONS[slug as keyof typeof CATEGORY_ICONS] || 'nf-fa-circle');
</script>

<i class={cn('nf', icon, klass)} {...props}></i>
