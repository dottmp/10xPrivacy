import type { HTMLAttributes } from 'svelte/elements';

export const headingVariants = {
	base: 'text-primary',
	size: {
		display: 'text-3xl font-bold',
		lg: 'text-2xl font-semibold',
		default: 'sm:text-xl text-2xl font-semibold'
	}
} as const;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	size?: keyof typeof headingVariants.size;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
};
