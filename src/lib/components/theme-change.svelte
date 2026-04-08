<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { themeChange } from 'theme-change';

	import { Icons } from '$lib/components/icons/icons.svelte';
	import { THEMES } from '$lib/configs';
	import { cn } from '$lib/utils/cn';

	type ThemeChangeProps = HTMLAttributes<HTMLDivElement> & {
		variant?: 'dropdown' | 'select';
	};

	let { variant = 'dropdown', class: klass, ...props }: ThemeChangeProps = $props();

	onMount(() => {
		themeChange(false);
	});
</script>

<div
	class={cn(
		variant === 'dropdown' && 'dropdown dropdown-end',
		variant === 'select' && 'flex flex-col items-start',
		klass
	)}
	{...props}
>
	{#if variant === 'dropdown'}
		<button tabindex="0" role="button" class="btn gap-1 btn-ghost btn-sm">
			<span class="sr-only">Select Theme</span>
			<Icons.theme class="size-4" />

			<Icons.chevronDown class="inline-block  size-4 opacity-60" />
		</button>
		<ul
			tabindex="-1"
			class="dropdown-content z-50 mt-1 max-h-96 w-40 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl"
		>
			{#each THEMES as theme (theme)}
				<li>
					<input
						type="radio"
						name="theme-dropdown"
						data-set-theme={theme}
						data-act-class="btn-active"
						class="theme-controller btn btn-block w-full justify-start capitalize btn-ghost sm:btn-sm"
						aria-label={theme}
						value={theme}
					/>
				</li>
			{/each}
		</ul>
	{:else}
		<select data-choose-theme class="select appearance-none" aria-label="Select Theme">
			{#each THEMES as theme (theme)}
				<option class="theme-controller" aria-label={theme} value={theme}>{theme}</option>
			{/each}
		</select>
	{/if}
</div>
