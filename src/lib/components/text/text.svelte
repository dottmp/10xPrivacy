<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

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
</script>

<script lang="ts">
	let { size = 'default', class: klass, children, ...props }: TextProps = $props();
</script>

<p class={cn(textVariants.base, textVariants.size[size], klass)} {...props}>
	{@render children?.()}
</p>
