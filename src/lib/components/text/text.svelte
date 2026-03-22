<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { textVariants, type TextProps } from './text.ts';

	let { size = 'default', class: klass, children, ...props }: TextProps = $props();
</script>

<p class={cn(textVariants.base, textVariants.size[size], klass)} {...props}>
	{@render children?.()}
</p>
