<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	import brand from '$lib/assets/brand.txt?raw';
	import { cn } from '$lib/utils/cn';

	export let brandVariants = {
		base: 'ascii whitespace-pre text-primary font-mono  ',
		size: {
			lg: 'text-[6px] sm:text-xs md:text-sm  ',
			default: 'text-xs',
			xs: 'text-[3px] '
		}
	} as const;

	type BrandProps = HTMLAttributes<HTMLPreElement> & {
		size?: keyof typeof brandVariants.size;
	};
</script>

<script lang="ts">
	let { class: className, size = 'default', ...props }: BrandProps = $props();
</script>

<div>
	<pre
		class={cn(brandVariants.base, brandVariants.size[size], className)}
		aria-disabled="true"
		{...props}>{brand}</pre>
	<span class="sr-only">10xPrivacy</span>
</div>
