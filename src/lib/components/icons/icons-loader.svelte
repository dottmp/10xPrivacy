<script lang="ts">
	import { Loader, type IconProps } from 'lucide-svelte';

	import { cn } from '$lib/utils/cn';

	let { class: klass, ...props }: IconProps = $props();
</script>

<Loader class={cn('animate-spin text-base-content/50', klass)} {...props} />
