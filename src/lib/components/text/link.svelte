<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { linkVariants, type LinkProps } from './link.ts';

	let {
		size = 'default',
		variant = 'default',
		external = false,
		class: klass,
		children,
		...props
	}: LinkProps = $props();
</script>

<a
	class={cn(linkVariants.base, linkVariants.size[size], linkVariants.variant[variant], klass)}
	{...external ? { target: '_blank', rel: 'noopener noreferrer external' } : {}}
	{...props}
>
	{@render children?.()}
</a>
