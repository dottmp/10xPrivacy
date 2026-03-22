<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { subheadingVariants, type SubheadingProps } from './subheading.ts';

	let { size = 'default', level = 2, class: klass, children, ...props }: SubheadingProps = $props();
</script>

<svelte:element
	this={`h${level}`}
	class={cn(subheadingVariants.base, subheadingVariants.size[size], klass)}
	{...props}
>
	{@render children?.()}
</svelte:element>
