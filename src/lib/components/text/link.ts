import type { HTMLAnchorAttributes } from 'svelte/elements';

export const linkVariants = {
	base: 'link link-hover',
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
