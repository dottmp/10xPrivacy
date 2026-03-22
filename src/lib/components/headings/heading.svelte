<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { headingVariants, type HeadingProps } from './heading.ts';

	let { size = 'default', level = 1, class: klass, children, ...props }: HeadingProps = $props();
</script>

<svelte:element
	this={`h${level}`}
	class={cn(headingVariants.base, headingVariants.size[size], klass)}
	{...props}
>
	{@render children?.()}
</svelte:element>
