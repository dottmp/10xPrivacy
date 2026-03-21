<script lang="ts">
	import { resolve } from '$app/paths';
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
				<ul class=" menu-horizontal px-1 sm:px-3 [&_a]:btn [&_a]:btn-link">
					<li><a href={resolve('/')}>Privacy News</a></li>
					<li><a href={resolve('/awesome-privacy')}>Awesome privacy</a></li>
					<li><a href={resolve('/about')}>About</a></li>
				</ul>
			</div>

			<!-- theme toggle -->
			<div class="dropdown dropdown-end ml-auto">
				<div tabindex="0" role="button" class="btn gap-1 btn-ghost btn-sm">
					<i class="nf nf-fa-paint_brush"></i>
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
					{#each ['nord', 'dark', 'vscode', 'andromeda', 'ayudark', 'catppuccin', 'everforest', 'flexoki', 'githubdark', 'githublight', 'gruvbox', 'kanagawa', 'monokai', 'nightfox', 'nightowl', 'onedarkpro', 'rosepine', 'solarized', 'tokyonight'] as theme (theme)}
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
			<ul class=" menu-horizontal space-x-4 [&_a]:btn [&_a]:px-0 [&_a]:btn-link">
				<li><a href={resolve('/')}>Privacy News</a></li>
				<li><a href={resolve('/awesome-privacy')}>Awesome privacy</a></li>
				<li><a href={resolve('/about')}>About</a></li>
			</ul>
		</div>
	</nav>

	{@render children()}
</div>
