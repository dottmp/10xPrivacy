<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { Service } from '../types';

	import { Icons } from '$lib/components/icons/icons.svelte';
	import { cn } from '$lib/utils/cn';

	type ServiceLogoProps = HTMLAttributes<HTMLImageElement> & {
		service: Service;
	};

	let { service, class: klass, ...props }: ServiceLogoProps = $props();

	let error = $state(false);

	const fallback = $derived(`https://icon.horse/icon/${service.url}`);
</script>

{#if error}
	<Icons.fallback class={cn('shrink-0', klass)} />
{:else}
	<img
		referrerpolicy="no-referrer"
		src={service.icon ?? fallback}
		onerror={(e) => {
			const target = e.target as HTMLImageElement;

			if (target.src !== fallback) {
				target.src = fallback;
			} else if (target.src === fallback) {
				error = true;
			}
		}}
		alt={service.name}
		class={cn('shrink-0 object-contain', klass)}
		{...props}
	/>
{/if}
