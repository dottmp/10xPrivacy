<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import brand from '$lib/assets/brand.txt?raw';
	import { cn } from '$lib/utils/cn';

	export let brandVariants = {
		base: 'leading-none whitespace-pre text-primary',
		size: {
			lg: 'text-[6px] sm:text-xs md:text-sm',
			default: 'text-xs',
			xs: 'text-[4px]'
		}
	} as const;

	type BrandProps = HTMLAttributes<HTMLPreElement> & {
		size?: keyof typeof brandVariants.size;
	};
</script>

<script lang="ts">
	let { class: className, size = 'default', ...props }: BrandProps = $props();
</script>

<pre
	class={cn(brandVariants.base, brandVariants.size[size], className)}
	aria-disabled="true"
	{...props}>{brand}
</pre>
