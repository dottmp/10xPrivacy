<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

	export const headingVariants = {
		base: 'text-primary',
		size: {
			display: 'text-3xl font-bold',
			default: 'sm:text-xl text-lg font-semibold'
		}
	} as const;

	export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
		size?: keyof typeof headingVariants.size;
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	};
</script>

<script lang="ts">
	let { size = 'default', level = 1, class: klass, children, ...props }: HeadingProps = $props();
</script>

<svelte:element
	this={`h${level}`}
	class={cn(headingVariants.base, headingVariants.size[size], klass)}
	{...props}
>
	{@render children?.()}
</svelte:element>
