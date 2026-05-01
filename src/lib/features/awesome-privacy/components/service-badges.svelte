<script lang="ts">
	import type { Service } from '$lib/features/awesome-privacy/types';
	import { cn } from '$lib/utils/cn';

	let serviceBadgesVariants = {
		base: 'badge badge-soft',
		size: {
			xs: 'badge-xs',
			sm: 'badge-sm'
		}
	};

	type ServiceBadgesProps = {
		service: Service;
		size?: keyof typeof serviceBadgesVariants.size;
	};

	let { service, size = 'sm' }: ServiceBadgesProps = $props();
</script>

{#if service.openSource || service.github}
	<span class={cn(serviceBadgesVariants.base, serviceBadgesVariants.size[size], 'badge-success')}>
		Open Source
	</span>
{/if}
{#if service.securityAudited}
	<span class={cn(serviceBadgesVariants.base, serviceBadgesVariants.size[size], 'badge-warning')}>
		{size === 'xs' ? 'Audited' : 'Security Audited'}
	</span>
{/if}
{#if service.acceptsCrypto}
	<span class={cn(serviceBadgesVariants.base, serviceBadgesVariants.size[size], 'badge-accent')}>
		Accepts Crypto
	</span>
{/if}
{#if service.followWith}
	<span class={cn(serviceBadgesVariants.base, serviceBadgesVariants.size[size], 'badge-info')}>
		{service.followWith}
	</span>
{/if}
