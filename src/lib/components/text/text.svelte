<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

	export const textVariants = {
		base: 'text-base-content/50',
		size: {
			lg: 'sm:text-base/6 text-lg/6',
			default: 'sm:text-sm/6 text-base/6',
			xs: 'sm:text-xs/6 text-sm/6'
		},
		variant: {
			default: 'text-base-content/50',
			foreground: 'text-base-content'
		},
		weight: {
			default: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold'
		}
	} as const;

	export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
		size?: keyof typeof textVariants.size;
		variant?: keyof typeof textVariants.variant;
		weight?: keyof typeof textVariants.weight;
	};
</script>

<script lang="ts">
	let {
		size = 'default',
		variant = 'default',
		weight = 'default',
		class: klass,
		children,
		...props
	}: TextProps = $props();
</script>

<p
	class={cn(
		textVariants.base,
		textVariants.size[size],
		textVariants.variant[variant],
		textVariants.weight[weight],
		klass
	)}
	{...props}
>
	{@render children?.()}
</p>
