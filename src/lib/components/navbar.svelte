<script lang="ts">
	import Brand from './brand.svelte';

	import { resolve } from '$app/paths';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';

	const DRAWER_ID = 'navbar-drawer';

	let drawer: HTMLInputElement | undefined;

	function toggleDrawer() {
		const drawer = document.getElementById(DRAWER_ID) as HTMLInputElement;
		if (drawer) {
			drawer.checked = !drawer.checked;
		}
	}

	let navItems = [
		{ href: resolve('/privacy-news'), label: 'Privacy News' },
		{ href: resolve('/awesome-privacy'), label: 'Awesome Privacy' },
		{ href: resolve('/websites'), label: 'Websites' }
	];
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
				{#each navItems as navItem (navItem.href)}
					<li><Link href={navItem.href}>{navItem.label}</Link></li>
				{/each}
			</ul>
		</div>

		<!-- mobile drawer -->
		<div class="drawer drawer-end ml-auto w-fit sm:hidden">
			<input bind:this={drawer} id={DRAWER_ID} type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<label for={DRAWER_ID} class="drawer-button btn btn-square text-base-content/50 btn-ghost">
					<i class="nf nf-md-menu text-lg"></i>
				</label>
			</div>
			<div class="drawer-side">
				<label for={DRAWER_ID} aria-label="close drawer" class="drawer-overlay"></label>

				<div class="flex min-h-full w-80 flex-col bg-base-200 p-4 *:w-full">
					<ul class="menu p-0">
						{#each navItems as navItem (navItem.href)}
							<li><Link href={navItem.href} onclick={toggleDrawer}>{navItem.label}</Link></li>
						{/each}
					</ul>

					<div class="divider mt-auto"></div>
					<ThemeChange variant="select" class=" w-full " />
				</div>
			</div>
		</div>

		<!-- theme toggle -->
		<ThemeChange variant="dropdown" class="hidden sm:block" />
	</div>
</nav>
