import type { HTMLAttributes } from 'svelte/elements';

export const textVariants = {
	base: 'text-base-content/50',
	size: {
		default: 'sm:text-sm text-base',
		xs: 'sm:text-xs text-sm'
	}
} as const;

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
	size?: keyof typeof textVariants.size;
};
