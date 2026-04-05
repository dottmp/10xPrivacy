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
		<Link href="https://dottmp.dev/">© {copyrightYear} dottmp</Link> |<Link
			class="ml-2"
			href="https://github.com/dottmp/10xprivacy/releases/tag/v{__APP_VERSION__}"
			variant="primary">v{__APP_VERSION__}</Link
		> |<Link class="ml-2" href="https://github.com/dottmp/10xprivacy" variant="primary"
			>GitHub repo</Link
		> |<Link
			class="ml-2"
			href="https://github.com/dottmp/10xprivacy/blob/main/LICENSE"
			variant="primary">MIT License</Link
		> |<Link class="ml-2" href="/security" variant="primary">Security</Link>
	</Text>
</footer>
