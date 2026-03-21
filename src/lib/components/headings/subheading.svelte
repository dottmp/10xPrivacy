<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

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
</script>

<script lang="ts">
	let { size = 'default', level = 2, class: klass, children, ...props }: SubheadingProps = $props();
</script>

<svelte:element
	this={`h${level}`}
	class={cn(subheadingVariants.base, subheadingVariants.size[size], klass)}
	{...props}
>
	{@render children?.()}
</svelte:element>
