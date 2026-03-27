<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { Service } from '../types';

	import { cn } from '$lib/utils/cn';

	type ServiceLogoProps = HTMLAttributes<HTMLImageElement> & {
		service: Service;
	};

	let { service, class: klass, ...props }: ServiceLogoProps = $props();

	const fallback = $derived(`https://icon.horse/icon/${service.url}`);
</script>

<img
	referrerpolicy="no-referrer"
	src={service.icon ?? fallback}
	onerror={(e) => {
		const target = e.target as HTMLImageElement;
		if (target.src !== fallback) target.src = fallback;
	}}
	alt={service.name}
	class={cn('shrink-0 object-contain', klass)}
	{...props}
/>
