<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { themeChange } from 'theme-change';

	import { cn } from '$lib/utils/cn';

	type ThemeChangeProps = HTMLAttributes<HTMLDivElement> & {
		variant?: 'dropdown' | 'select';
	};

	let { variant = 'dropdown', class: klass, ...props }: ThemeChangeProps = $props();

	const themes = [
		'vscode',
		'andromeda',
		'ayudark',
		'catppuccin',
		'everforest',
		'flexoki',
		'githubdark',
		'githublight',
		'gruvbox',
		'kanagawa',
		'monokai',
		'nightfox',
		'nightowl',
		'onedarkpro',
		'rosepine',
		'solarized',
		'tokyonight'
	];

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
		<div tabindex="0" role="button" class="btn gap-1 btn-ghost btn-sm">
			<i class="nf nf-md-theme_light_dark"></i>
			<svg
				width="10px"
				height="10px"
				class="inline-block fill-current opacity-60"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 2048 2048"
			>
				<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
			</svg>
		</div>
		<ul
			tabindex="-1"
			class="dropdown-content z-50 mt-1 max-h-96 w-40 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl"
		>
			{#each themes as theme (theme)}
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
		<label for="theme-select" class="sr-only">Select Theme</label>
		<select
			id="theme-select"
			data-choose-theme
			class="select appearance-none"
			aria-label="Select Theme"
		>
			{#each themes as theme (theme)}
				<option class="theme-controller" aria-label={theme} value={theme}>{theme}</option>
			{/each}
		</select>
	{/if}
</div>
