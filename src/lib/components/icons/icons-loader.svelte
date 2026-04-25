<script lang="ts">
	import type { IconProps } from '@lucide/svelte';
	import Loader2 from '@lucide/svelte/icons/loader-2';

	import { cn } from '$lib/utils/cn';

	let { class: klass, ...props }: IconProps = $props();
</script>

<Loader2 class={cn('animate-spin text-base-content/50', klass)} {...props} />
