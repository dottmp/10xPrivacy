<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Link, Text } from './text';

	import { cn } from '$lib/utils/cn';

	type FooterProps = HTMLAttributes<HTMLElement>;

	let { class: klass, ...props }: FooterProps = $props();
</script>

<footer class={cn('w-full p-4 text-center', klass)} {...props}>
	<Text>
		© {new Date().getFullYear()} 10xPrivacy | Version: 1 Commit: asdasd123 |<Link
			class="ml-2"
			href="https://github.com/dottmp/10xprivacy"
			external
			variant="primary">GitHub</Link
		>
	</Text>
</footer>
