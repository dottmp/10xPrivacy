<script lang="ts">
	import type { IconProps } from '@lucide/svelte';
	import Loader from '@lucide/svelte/icons/loader';

	import { cn } from '$lib/utils/cn';

	let { class: klass, ...props }: IconProps = $props();
</script>

<Loader class={cn('animate-spin text-base-content/50', klass)} {...props} />
