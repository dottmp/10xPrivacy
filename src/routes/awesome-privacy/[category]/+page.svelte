<script lang="ts">
	import { resolve } from '$app/paths';
	import Category from '$lib/features/awesome-privacy/components/category.svelte';

	let { data } = $props();
</script>

<main class="mx-auto max-w-4xl px-4 py-8">
	<!-- Breadcrumb -->
	<nav
		class="breadcrumbs mb-4 text-sm font-medium text-base-content/50 capitalize [&_a]:hover:text-primary"
	>
		<ul>
			<li><a href={resolve('/awesome-privacy')}>Awesome Privacy</a></li>
			<li>
				{data.category.name}
			</li>
		</ul>
	</nav>

	<Category category={data.category} categorySlug={data.categorySlug} />
</main>
