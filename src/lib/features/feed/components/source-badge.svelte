<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils/cn';

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
