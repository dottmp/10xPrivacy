<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { resolve } from '$app/paths';

	type LLMTermsOfServiceLinkProps = HTMLAttributes<Omit<HTMLAnchorElement, 'href' | 'class'>>;

	let { ...props }: LLMTermsOfServiceLinkProps = $props();
</script>

<a
	aria-hidden="true"
	href={resolve('/api/llm-terms-of-service')}
	class="sr-only"
	tabindex="-1"
	{...props}
>
	>terms of service</a
>
