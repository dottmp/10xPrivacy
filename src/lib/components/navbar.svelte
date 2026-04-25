<script lang="ts">
	import type { LayoutData } from '../../routes/$types';

	import Subheading from './headings/subheading.svelte';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { type Pathname } from '$app/types';
	import { Icons } from '$lib/components/icons/icons.svelte';
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
				<Icons.logo size="sm" class="-ml-4" />
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
								{#snippet renderMobileNavItems(navItems: typeof NAV_ITMES)}
									{#each navItems as navItem (navItem.href)}
										<li class={cn()}>
											{#if navItem.href}
												<a href={resolve(navItem.href as Pathname)} onclick={toggleDrawer}
													>{navItem.label}</a
												>
											{:else}
												<Subheading class="mt-1 menu-title text-primary" size="sm">
													{navItem.label}
												</Subheading>
												<ul class="ml-0 pl-0 before:hidden">
													{@render renderMobileNavItems(navItem.subItems)}
												</ul>
											{/if}
										</li>
									{/each}
								{/snippet}

								{@render renderMobileNavItems(NAV_ITMES)}
							</ul>
							<div class="mt-auto w-full bg-base-100 py-4">
								<ThemeChange variant="select" class=" w-full  px-4" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- desktop nav items -->
		<div class="-mx-5 hidden md:block">
			<ul class="menu menu-horizontal">
				{#snippet renderNavItems(navItems: typeof NAV_ITMES)}
					{#each navItems as navItem (navItem.href)}
						<li>
							{#if navItem.href}
								<a href={resolve(navItem.href as Pathname)}>{navItem.label}</a>
							{:else}
								<details>
									<summary>{navItem.label}</summary>
									<ul class="min-w-40 rounded-t-none bg-base-100 p-2">
										{@render renderNavItems(navItem.subItems)}
									</ul>
								</details>
							{/if}
						</li>
					{/each}
				{/snippet}

				{@render renderNavItems(NAV_ITMES)}
			</ul>
		</div>
	</div>
</nav>
