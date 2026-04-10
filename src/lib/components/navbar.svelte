<script lang="ts">
	import type { LayoutData } from '../../routes/$types';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';
	import { NAV_ITMES } from '$lib/configs';
	import Search from '$lib/features/awesome-privacy/components/search.svelte';
	import { cn } from '$lib/utils/cn';

	const DRAWER_ID = 'navbar-drawer';

	let drawer: HTMLInputElement | undefined;

	function isPath(base: string) {
		const pathname = page.url.pathname;

		return pathname === base || pathname.startsWith(base + '/');
	}

	function toggleDrawer() {
		const drawer = document.getElementById(DRAWER_ID) as HTMLInputElement;

		if (drawer) {
			drawer.checked = !drawer.checked;
		}
	}

	let { search }: { search: LayoutData['search'] } = $props();
</script>

<nav class="w-full bg-base-100 shadow-sm">
	<div class="navbar mx-auto w-full max-w-6xl flex-col items-start gap-y-2 bg-base-100 px-4">
		<div class="flex w-full items-center">
			<!-- logo -->
			<a class="text-xl" href={resolve('/')}>
				<Icons.logo size="sm" class="-ml-2" />
				<span class="sr-only">Home</span>
			</a>

			<div class="ml-auto flex items-center gap-2">
				<!-- awesome-privacy search trigger (desktop) -->
				<div class={cn('hidden', isPath(resolve('/awesome-privacy')) && 'block')}>
					<Search {search} />
				</div>

				<!-- theme toggle -->
				<ThemeChange variant="dropdown" class="hidden md:block" />

				<!-- mobile drawer -->
				<div class="drawer drawer-end ml-auto w-fit md:hidden">
					<input bind:this={drawer} id={DRAWER_ID} type="checkbox" class="drawer-toggle" />
					<div class="drawer-content">
						<label
							for={DRAWER_ID}
							class="drawer-button btn btn-square text-base-content/50 btn-ghost"
						>
							<Icons.menu class="text-lg" />
						</label>
					</div>
					<div class="drawer-side">
						<label for={DRAWER_ID} aria-label="close drawer" class="drawer-overlay"></label>

						<div class="flex min-h-full w-80 flex-col bg-base-200 *:w-full">
							<div class="w-full bg-base-100 pt-2 pb-1">
								<a href={resolve('/')} onclick={toggleDrawer}>
									<Icons.logo size="sm" />

									<span class="sr-only">Home</span>
								</a>
							</div>
							<ul class="menu py-4">
								{#each NAV_ITMES as navItem (navItem.href)}
									<li><Link href={navItem.href} onclick={toggleDrawer}>{navItem.label}</Link></li>
								{/each}
							</ul>

							<div class="mt-auto w-full bg-base-100 py-4">
								<ThemeChange variant="select" class=" w-full  px-4" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- desktop nav items  -->
		<div class=" -mx-3 hidden md:block">
			<ul
				class="flex [&_a]:btn [&_a]:font-semibold [&_a]:btn-link [&_a]:no-underline [&_a]:hover:underline"
			>
				{#each NAV_ITMES as navItem (navItem.href)}
					<li><Link href={navItem.href}>{navItem.label}</Link></li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
