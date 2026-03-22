import type { HTMLAttributes } from 'svelte/elements';

export const subheadingVariants = {
	base: 'text-base-content font-semibold',
	size: {
		default: 'sm:text-lg text-xl',
		sm: 'sm:text-base text-lg',
		xs: 'sm:text-sm text-base'
	}
} as const;

export type SubheadingProps = HTMLAttributes<HTMLHeadingElement> & {
	size?: keyof typeof subheadingVariants.size;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
};
