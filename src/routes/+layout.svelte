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
			<div class="ml-auto">
				<label class="swap swap-rotate">
					<input type="checkbox" value="vscode" class="theme-controller" />
					<!-- sun icon -->
					<i class="nf nf-fa-sun swap-off"></i>
					<!-- moon icon -->
					<i class="nf nf-fa-moon swap-on"></i>
				</label>
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
