<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Subheading } from './headings';
	import { Text } from './text';

	import { cn } from '$lib/utils/cn';

	type AboutProps = HTMLAttributes<HTMLDivElement>;

	let { class: klass, ...props }: AboutProps = $props();
</script>

<div class={cn('rounded-lg bg-base-100 p-4 text-center', klass)} {...props}>
	<div>
		<Subheading>About</Subheading>
		<Text class="mt-2">
			10xPrivacy is website dedicated to gathering and sharing information about digital privacy. It
			provides a curated feed of news, resources, and tools to help users protect themselves from
			surveillance capitalism.
		</Text>
	</div>
</div>
