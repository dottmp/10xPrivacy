<script lang="ts">
	import Brand from './brand.svelte';

	import { resolve } from '$app/paths';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';
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
			<ul class="flex space-x-6 px-6 [&_a]:font-semibold">
				<li><Link href={resolve('/privacy-news')}>Privacy News</Link></li>
				<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
				<li><Link href={resolve('/websites')}>Websites</Link></li>
			</ul>
		</div>

		<!-- theme toggle -->
		<ThemeChange />
	</div>

	<!-- mobile nav items  -->
	<div class=" w-full flex-1 sm:hidden">
		<ul class="flex flex-wrap gap-x-6 gap-y-2 [&_a]:font-semibold">
			<li><Link href={resolve('/privacy-news')}>Privacy News</Link></li>
			<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
			<li><Link href={resolve('/websites')}>Websites</Link></li>
		</ul>
	</div>
</nav>
