<script lang="ts">
	import type { Service } from '#lib/features/awesome-privacy/types.ts';
	import { cn } from '#lib/utils/cn.ts';
	import { resolve } from '$app/paths';

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

{#if service.stack}
	<a
		href="{resolve('/guides/used-by-10xprivacy')}#{service.stack.slug}"
		class={cn(serviceBadgesVariants.base, serviceBadgesVariants.size[size])}
	>
		Used by 10xPrivacy
	</a>
{/if}
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
