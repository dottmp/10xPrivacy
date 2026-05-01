<script lang="ts">
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link, textVariants } from '$lib/components/text';
	import { Subheading } from '$lib/components/headings';
	import { cn } from '$lib/utils/cn';
	import { tryCatch } from '$lib/utils/try-catch';

	type Props = { tosdrId: string };
	let { tosdrId }: Props = $props();

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

	const gradeColor: Record<string, string> = {
		A: 'text-success',
		B: 'text-success',
		C: 'text-warning',
		D: 'text-error',
		E: 'text-error'
	};

	const gradeBg: Record<string, string> = {
		A: 'bg-success/10 border-success/30',
		B: 'bg-success/10 border-success/30',
		C: 'bg-warning/10 border-warning/30',
		D: 'bg-error/10 border-error/30',
		E: 'bg-error/10 border-error/30'
	};

	async function fetchTosdr(id: string): Promise<TosdrData | null> {
		const { data, error } = await tryCatch<{ parameters: TosdrData }>(
			fetch(`https://api.tosdr.org/service/v2/?id=${id}`).then((r) => r.json())
		);
		if (error || !data?.parameters?.rating) return null;
		return data.parameters;
	}

	const tosdrPromise = $derived(fetchTosdr(tosdrId));

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
	}
</script>

{#await tosdrPromise}
	<!-- skeleton -->
	<div class="mb-8 rounded-lg bg-base-100 p-5 shadow-sm animate-pulse">
		<div class="mb-4 flex items-center justify-between">
			<div class="h-4 w-32 rounded bg-base-300"></div>
			<div class="h-4 w-16 rounded bg-base-300"></div>
		</div>
		<div class="mb-4 h-12 w-20 rounded bg-base-300"></div>
		<div class="space-y-2">
			<div class="h-3 w-3/4 rounded bg-base-300"></div>
			<div class="h-3 w-2/3 rounded bg-base-300"></div>
			<div class="h-3 w-1/2 rounded bg-base-300"></div>
		</div>
	</div>
{:then tosdr}
	{#if tosdr}
		{@const good = tosdr.points.filter((p) => p.case.classification === 'good')}
		{@const bad = tosdr.points.filter((p) => p.case.classification === 'bad')}

		<section class="mb-8 rounded-lg bg-base-100 p-5 shadow-sm">
			<!-- Header -->
			<div class="mb-4 flex items-center justify-between">
				<Subheading size="xs" class={cn('tracking-widest uppercase', textVariants.base)}>
					Terms of Service
				</Subheading>
				<Link href="https://tosdr.org/en/service/{tosdr.slug}" external class="text-xs">
					tosdr.org
				</Link>
			</div>

			<!-- Grade + meta -->
			<div class="mb-5 flex items-center gap-4">
				<div
					class={cn(
						'flex size-16 items-center justify-center rounded-lg border-2 font-bold text-4xl',
						gradeBg[tosdr.rating] ?? 'bg-base-200 border-base-300',
						gradeColor[tosdr.rating] ?? 'text-base-content'
					)}
				>
					{tosdr.rating}
				</div>
				<div class="flex flex-col gap-1">
					<span class={cn(textVariants.base, 'text-sm')}>
						Last reviewed: {formatDate(tosdr.updated_at)}
					</span>
					{#if !tosdr.is_comprehensively_reviewed}
						<span class="flex items-center gap-1 text-xs text-warning">
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
						<p class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
							<Icons.circle class="size-3 fill-success" />
							Good ({good.length})
						</p>
						<ul class="space-y-1.5">
							{#each good as point (point.title)}
								<li class={cn('flex items-start gap-2 text-sm', textVariants.base)}>
									<span class="mt-0.5 shrink-0 text-success">✓</span>
									{point.title}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if bad.length > 0}
					<div>
						<p class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-error">
							<Icons.circle class="size-3 fill-error" />
							Bad ({bad.length})
						</p>
						<ul class="space-y-1.5">
							{#each bad as point (point.title)}
								<li class={cn('flex items-start gap-2 text-sm', textVariants.base)}>
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
