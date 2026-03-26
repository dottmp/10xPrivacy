<script lang="ts">
	import { resolve } from '$app/paths';
	import { Heading } from '$lib/components/headings';
	import Categories from '$lib/features/awesome-privacy/components/categories.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-4xl px-4 py-8">
	<!-- Breadcrumb -->
	<nav
		class="breadcrumbs mb-4 text-sm font-medium text-base-content/50 capitalize [&_a]:hover:text-primary"
	>
		<ul>
			<li><a href={resolve('/awesome-privacy')}>Awesome Privacy</a></li>
			<li>All</li>
		</ul>
	</nav>

	<header class="mb-8">
		<Heading size="display">All Categories</Heading>
	</header>

	<Categories categories={data.categories} />
</main>
