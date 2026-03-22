<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Subheading } from './headings';
	import { Text } from './text';

	import { cn } from '$lib/utils/cn';

	type AboutProps = HTMLAttributes<HTMLDivElement>;

	let { class: klass, ...props }: AboutProps = $props();
</script>

<div class={cn('bg-base-300 p-4', klass)} {...props}>
	<div>
		<Subheading>About</Subheading>
		<Text>10xPrivacy is a website</Text>
	</div>
</div>
