<script lang="ts">
	import { resolve } from '$app/paths';
	import { Link } from '$lib/components/text';
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200 font-mono">
	<nav class="navbar flex-col justify-center gap-y-2 bg-base-100 px-4 shadow-sm">
		<div class="flex w-full items-center">
			<!-- logo -->
			<div class="flex-none">
				<a class=" text-xl font-bold text-primary" href={resolve('/')}>10xPrivacy</a>
			</div>

			<!-- desktop nav items  -->
			<div class=" hidden flex-1 sm:block">
				<ul class="flex space-x-6 px-6 [&_a]:font-semibold">
					<li><Link href={resolve('/')}>Privacy News</Link></li>
					<li><Link href={resolve('/awesome-privacy')}>Awesome privacy</Link></li>
					<li><Link href={resolve('/about')}>About</Link></li>
				</ul>
			</div>

			<!-- theme toggle -->
			<div class="dropdown dropdown-end ml-auto">
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
					{#each ['vscode', 'andromeda', 'ayudark', 'catppuccin', 'everforest', 'flexoki', 'githubdark', 'githublight', 'gruvbox', 'kanagawa', 'monokai', 'nightfox', 'nightowl', 'onedarkpro', 'rosepine', 'solarized', 'tokyonight'] as theme (theme)}
						<li>
							<input
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-block w-full justify-start capitalize btn-ghost btn-xs"
								aria-label={theme}
								value={theme}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- mobile nav items  -->
		<div class=" w-full flex-1 sm:hidden">
			<ul class="flex space-x-6 [&_a]:font-semibold">
				<li><Link href={resolve('/')}>Privacy News</Link></li>
				<li><Link href={resolve('/awesome-privacy')}>Awesome privacy</Link></li>
				<li><Link href={resolve('/about')}>About</Link></li>
			</ul>
		</div>
	</nav>

	{@render children()}
</div>
