<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Link, Text } from './text';

	import { cn } from '$lib/utils/cn';

	type FooterProps = HTMLAttributes<HTMLElement>;

	let { class: klass, ...props }: FooterProps = $props();

	const START_YEAR = 2026;
	const currentYear = new Date().getFullYear();
	const copyrightYear = currentYear > START_YEAR ? `${START_YEAR}–${currentYear}` : `${START_YEAR}`;
</script>

<footer class={cn('w-full p-4 text-center', klass)} {...props}>
	<Text>
		© {copyrightYear} dottmp | Commit: {__COMMIT_HASH__} |<Link
			class="ml-2"
			href="https://github.com/dottmp/10xprivacy"
			external
			variant="primary">GitHub repo</Link
		> |<Link
			class="ml-2"
			href="https://github.com/dottmp/10xprivacy/blob/main/LICENSE"
			external
			variant="primary">MIT License</Link
		>
	</Text>
</footer>
