<script lang="ts">
	import { resolve } from '$app/paths';
	import LlmTermsOfServiceLink from '$lib/components/llm-terms-of-service-link.svelte';
	import { Link } from '$lib/components/text';
	import ThemeChange from '$lib/components/theme-change.svelte';
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200 font-mono">
	<!-- global -->
	<LlmTermsOfServiceLink />

	<!-- header -->
	<nav class="navbar flex-col justify-center gap-y-2 bg-base-100 px-4 shadow-sm">
		<div class="flex w-full items-center">
			<!-- logo -->
			<div class="flex-none">
				<a class=" text-xl font-bold text-primary" href={resolve('/')}>
					<i class="nf nf-fa-user_ninja -mr-1"></i>
					10xPrivacy</a
				>
			</div>

			<!-- desktop nav items  -->
			<div class=" hidden flex-1 sm:block">
				<ul class="flex space-x-6 px-6 [&_a]:font-semibold">
					<li><Link href={resolve('/')}>Privacy News</Link></li>
					<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
					<li><Link href={resolve('/websites')}>Websites</Link></li>
				</ul>
			</div>

			<!-- theme toggle -->
			<ThemeChange />
		</div>

		<!-- mobile nav items  -->
		<div class=" w-full flex-1 sm:hidden">
			<ul class="flex space-x-6 [&_a]:font-semibold">
				<li><Link href={resolve('/')}>Privacy News</Link></li>
				<li><Link href={resolve('/awesome-privacy')}>Awesome Privacy</Link></li>
				<li><Link href={resolve('/websites')}>Websites</Link></li>
			</ul>
		</div>
	</nav>

	<!-- content -->
	{@render children()}
</div>
