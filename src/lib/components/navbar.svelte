<script lang="ts">
	import Brand from './brand.svelte';

	import { resolve } from '$app/paths';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';

	const DRAWER_ID = 'navbar-drawer';
</script>

<nav class="navbar flex-col justify-center gap-y-2 bg-base-100 px-4 shadow-sm">
	<div class="flex w-full items-center">
		<!-- logo -->
		<div class="flex-none">
			<a class=" text-xl font-bold text-primary" href={resolve('/')}>
				<Brand size="xs" />
			</a>
		</div>

		<!-- desktop nav items  -->
		<div class=" hidden flex-1 sm:block">
			<ul
				class="flex md:px-6 [&_a]:btn [&_a]:font-semibold [&_a]:btn-link [&_a]:no-underline [&_a]:hover:underline"
			>
				<li><Link href={resolve('/privacy-news')}>Privacy News</Link></li>
				<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
				<li><Link href={resolve('/websites')}>Websites</Link></li>
			</ul>
		</div>

		<!-- mobile nav items  -->
		<div class="drawer drawer-end ml-auto w-fit sm:hidden">
			<input id={DRAWER_ID} type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<label for={DRAWER_ID} class="drawer-button btn btn-square btn-ghost">
					<i class="nf nf-md-menu text-lg"></i>
				</label>
			</div>
			<div class="drawer-side">
				<label for={DRAWER_ID} aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu min-h-full w-80 bg-base-200 p-4">
					<!-- Sidebar content here -->
					<li><Link href={resolve('/privacy-news')}>Privacy News</Link></li>
					<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
					<li><Link href={resolve('/websites')}>Websites</Link></li>
					<li class="mt-auto">
						<ThemeChange variant="select" />
					</li>
				</ul>
			</div>
		</div>

		<!-- theme toggle -->
		<div class="hidden sm:block">
			<ThemeChange variant="dropdown" />
		</div>
	</div>
</nav>
