<script lang="ts">
	import Brand from './brand.svelte';

	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Icons } from '$lib/components/icons/icons.svelte';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';
	import { NAV_ITMES } from '$lib/configs';
	import Search from '$lib/features/awesome-privacy/components/search.svelte';
	import { cn } from '$lib/utils/cn';

	const drawerId = 'navbar-drawer';

	let drawer: HTMLInputElement | undefined;

	function toggleDrawer() {
		const drawer = document.getElementById(drawerId) as HTMLInputElement;
		if (drawer) {
			drawer.checked = !drawer.checked;
		}
	}
</script>

<nav class="w-full bg-base-100 shadow-sm">
	<div class="navbar mx-auto w-full max-w-6xl flex-col items-start gap-y-2 bg-base-100 px-4">
		<div class="flex w-full items-center">
			<!-- logo -->
			<a class="text-xl" href={resolve('/')}>
				<Brand size="xs" />
				<span class="sr-only">Home</span>
			</a>

			<div class="ml-auto flex items-center gap-2">
				<!-- awesome-privacy search trigger (desktop) -->
				<div
					class={cn(
						'hidden',
						$page.url.pathname.startsWith(resolve('/awesome-privacy')) && 'block'
					)}
				>
					<Search />
				</div>

				<!-- theme toggle -->
				<ThemeChange variant="dropdown" class="hidden md:block" />

				<!-- mobile drawer -->
				<div class="drawer drawer-end ml-auto w-fit md:hidden">
					<input bind:this={drawer} id={drawerId} type="checkbox" class="drawer-toggle" />
					<div class="drawer-content">
						<label
							for={drawerId}
							class="drawer-button btn btn-square text-base-content/50 btn-ghost"
						>
							<Icons.menu class="text-lg" />
						</label>
					</div>
					<div class="drawer-side">
						<label for={drawerId} aria-label="close drawer" class="drawer-overlay"></label>

						<div class="flex min-h-full w-80 flex-col bg-base-200 *:w-full">
							<div class="w-full bg-base-100 pt-2 pb-1">
								<a href={resolve('/')} onclick={toggleDrawer}>
									<Brand size="xs" class="px-4" />
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
