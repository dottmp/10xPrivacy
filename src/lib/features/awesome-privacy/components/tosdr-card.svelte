<script lang="ts">
	import { Subheading } from '$lib/components/headings';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link, textVariants } from '$lib/components/text';
	import Text from '$lib/components/text/text.svelte';
	import { cn } from '$lib/utils/cn';
	import { formatDate } from '$lib/utils/date';
	import { tryCatch } from '$lib/utils/try-catch';

	type TosdrCardProps = { tosdrId: string };

	let { tosdrId }: TosdrCardProps = $props();

	type TosdrPoint = {
		title: string;
		case: { classification: 'good' | 'bad' | 'neutral' };
	};

	type TosdrData = {
		rating: string;
		slug: string;
		name: string;
		updated_at: string;
		is_comprehensively_reviewed: boolean;
		points: TosdrPoint[];
	};

	const gradeBg: Record<string, string> = {
		A: 'alert-success',
		B: 'alert-success',
		C: 'alert-warning',
		D: 'alert-error',
		E: 'alert-error'
	};

	async function fetchTosdr(id: string): Promise<TosdrData | null> {
		const { data, error } = await tryCatch<{ parameters: TosdrData }>(
			fetch(`https://api.tosdr.org/service/v2/?id=${id}`).then((r) => r.json())
		);
		if (error || !data?.parameters?.rating) return null;
		return data.parameters;
	}

	const tosdrPromise = $derived(fetchTosdr(tosdrId));
</script>

{#await tosdrPromise}
	<!-- skeleton -->
	<div class="mb-8 h-96 animate-pulse rounded-lg bg-base-100 p-5 shadow-sm"></div>
{:then tosdr}
	{#if tosdr}
		{@const good = tosdr.points.filter((point) => point.case.classification === 'good')}
		{@const bad = tosdr.points.filter((point) => point.case.classification === 'bad')}

		<section class="mb-8 rounded-lg bg-base-100 p-5 shadow-sm">
			<!-- Header -->
			<div class="mb-4 flex items-center justify-between">
				<Subheading size="xs" class={cn('tracking-widest uppercase', textVariants.base)}>
					Terms of Service
				</Subheading>
				<Link href="https://tosdr.org/en/service/{tosdr.slug}" external size="xs">tosdr.org</Link>
			</div>

			<!-- Grade + meta -->
			<div class="mb-5 flex items-center gap-4">
				<div
					class={cn(
						'flex size-16 items-center justify-center rounded-lg border-2 alert-soft text-4xl font-bold',
						gradeBg[tosdr.rating]
					)}
				>
					{tosdr.rating}
				</div>
				<div class="flex flex-col gap-1">
					<span class={cn(textVariants.base, textVariants.size.default)}>
						Last reviewed: {formatDate(tosdr.updated_at)}
					</span>
					{#if !tosdr.is_comprehensively_reviewed}
						<span class={cn('flex items-center gap-1 text-warning', textVariants.size.xs)}>
							<Icons.warning class="size-3" />
							Review may be incomplete
						</span>
					{/if}
				</div>
			</div>

			<!-- Points -->
			<div class="flex flex-col gap-4">
				{#if good.length > 0}
					<div>
						<Text
							size="xs"
							weight="semibold"
							class="mb-2 flex items-center gap-1.5 text-success uppercase"
						>
							<Icons.circle class="size-3 fill-success" />
							Good ({good.length})
						</Text>
						<ul class="space-y-1.5">
							{#each good as point (point.title)}
								<li
									class={cn('flex items-start gap-2', textVariants.base, textVariants.size.default)}
								>
									<span class="mt-0.5 shrink-0 text-success">✓</span>
									{point.title}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if bad.length > 0}
					<div>
						<Text
							size="xs"
							weight="semibold"
							class="mb-2 flex items-center gap-1.5 text-error uppercase"
						>
							<Icons.circle class="size-3 fill-error" />
							Bad ({bad.length})
						</Text>
						<ul class="space-y-1.5">
							{#each bad as point (point.title)}
								<li
									class={cn('flex items-start gap-2', textVariants.base, textVariants.size.default)}
								>
									<span class="mt-0.5 shrink-0 text-error">✗</span>
									{point.title}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</section>
	{/if}
{/await}
