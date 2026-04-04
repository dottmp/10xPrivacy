<script lang="ts" module>
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

	export const linkVariants = {
		base: 'link link-hover inline-flex items-center [&_svg]:size-4 gap-x-1',
		size: {
			default: 'sm:text-sm text-base',
			xs: 'sm:text-xs text-sm'
		},
		variant: {
			default: 'text-base-content/50 hover:text-primary',
			primary: 'link-primary',
			foreground: 'text-base-content hover:text-primary'
		}
	} as const;

	export type LinkProps = HTMLAnchorAttributes & {
		size?: keyof typeof linkVariants.size;
		variant?: keyof typeof linkVariants.variant;
		external?: boolean;
	};
</script>

<script lang="ts">
	let {
		size = 'default',
		variant = 'default',
		external = false,
		class: klass,
		children,
		...props
	}: LinkProps = $props();
</script>

<a
	class={cn(linkVariants.base, linkVariants.size[size], linkVariants.variant[variant], klass)}
	{...external ? { target: '_blank', rel: 'noopener noreferrer external' } : {}}
	{...props}
>
	{@render children?.()}
</a>
