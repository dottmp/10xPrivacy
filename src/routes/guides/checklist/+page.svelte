<script lang="ts">
	import { resolve } from '$app/paths';
	import { type Pathname } from '$app/types';
	import Heading from '$lib/components/headings/heading.svelte';
	import Subheading, { subheadingVariants } from '$lib/components/headings/subheading.svelte';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import Text, { textVariants } from '$lib/components/text/text.svelte';
	import ServiceLogo from '$lib/features/awesome-privacy/components/service-logo.svelte';
	import { cn } from '$lib/utils/cn';

	let { data } = $props();

	let completed = $state<string[]>([]);
	let loading = $state(true);

	function toggleItem(id: string) {
		if (completed.includes(id)) {
			completed = completed.filter((item) => item !== id);
		} else {
			completed = [...completed, id];
		}
		localStorage.setItem('privacy-checklist', JSON.stringify(completed));
	}

	let progress = $derived(Math.round((completed.length / data.checklistItems.length) * 100));
	let done = $derived(progress === 100);

	let isScrolledToBottom = $state(false);

	$effect(() => {
		const stored = localStorage.getItem('privacy-checklist');
		if (stored) {
			try {
				completed = JSON.parse(stored);
				loading = false;
			} catch {
				completed = [];
			}
		}

		function onScroll() {
			const scrollPosition = window.innerHeight + window.scrollY;
			const threshold = document.body.offsetHeight - 100;
			isScrolledToBottom = scrollPosition >= threshold;
		}

		onScroll();

		document.addEventListener('scroll', onScroll, { passive: true });
		return () => document.removeEventListener('scroll', onScroll);
	});
</script>

<main class="mx-auto w-full max-w-3xl px-4 py-16">
	<header class="mb-8">
		<Heading size="display" class="mb-4">Privacy Checklist</Heading>
		<Text size="lg">
			Starting your digital privacy journey can be overwhelming, thats why we've created this simple
			checklist to help you take it one step at a time. Each item is a small action you can take to
			improve your online privacy.

			<span class="mt-4 block">
				PS: Don't worry we only store your progress locally in your browser's localStorage
			</span>
		</Text>
	</header>

	<div
		class="my-12 alert flex flex-col items-start alert-outline alert-info sm:flex-row sm:items-center"
	>
		<div>
			<Subheading size="xs" class="mb-2 text-info">Friendly reminder ( ˘ ³˘(◡‿◡˶)</Subheading>
			<Text class="text-info">
				Privacy is not binary — you don't have to do everything or everything at once. Start with
				what feels manageable!
			</Text>
		</div>

		<a href={resolve('/guides/get-started')} class="btn whitespace-nowrap btn-info sm:btn-sm">
			Learn the basics
		</a>
	</div>

	{#if loading}
		<Icons.loading class="mx-auto size-8" />
	{:else}
		<ul class="flex flex-col gap-2">
			{#each data.checklistItems as item (item.id)}
				{@const itemCompleted = completed.includes(item.id)}
				<li class="rounded-lg bg-base-100 p-4">
					<label class="cursor-pointer gap-3 py-3" for="checkbox-{item.id}">
						<div class="flex w-full items-center gap-4">
							<input
								type="checkbox"
								class="checkbox checkbox-primary"
								id="checkbox-{item.id}"
								checked={itemCompleted}
								onchange={() => toggleItem(item.id)}
							/>
							<span
								class={cn(
									subheadingVariants.base,
									subheadingVariants.size.sm,
									itemCompleted && 'text-base-300 line-through'
								)}
							>
								{item.title}
							</span>
						</div>

						{#if item.services.length > 0}
							<div class="mt-2 flex w-fit flex-wrap gap-1.5 pl-11">
								{#each item.services as service (service.name)}
									<a
										href={resolve(service.href as Pathname)}
										class="badge bg-base-300 hover:bg-base-200"
									>
										<ServiceLogo {service} class="size-4" />
										{service.name}
									</a>
								{/each}
							</div>
						{/if}
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<!-- progressbar -->
<div
	class={cn(
		'fixed right-0 bottom-0 z-10 h-fit w-full bg-base-100 p-2 transition-all sm:m-4 sm:w-fit sm:rounded-md',
		isScrolledToBottom && 'translate-y-40 sm:translate-y-0'
	)}
>
	<div class="flex items-center justify-between">
		<Subheading size="xs">Progress</Subheading>
		<span class={cn(textVariants.base, textVariants.size.default, 'font-mono')}
			>{completed.length}/{data.checklistItems.length}</span
		>
	</div>
	<progress
		class={cn('progress w-full progress-primary', done && 'progress-success')}
		value={progress}
		max="100"
	></progress>
	<Text class={cn('text-center', done && 'text-success')}
		>{progress}% complete

		{#if done}
			🎉
		{/if}
	</Text>
</div>
