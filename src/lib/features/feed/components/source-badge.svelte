<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type SourceBadgeProps = HTMLAttributes<HTMLDivElement> & {
		source: Source;
	};

	let { source, class: klass, ...props }: SourceBadgeProps = $props();

	const variant = {
		tuta: 'badge-error',
		techlore: 'badge-info',
		privacyguides: 'badge-warning'
	} satisfies Record<Source['id'], string>;
</script>

<div class={cn('badge badge-soft', variant[source.id], klass)} {...props}>{source.name}</div>
