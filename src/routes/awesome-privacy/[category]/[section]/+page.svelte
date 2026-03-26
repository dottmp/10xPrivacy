<script lang="ts">
	import { resolve } from '$app/paths';
	import Section from '$lib/features/awesome-privacy/components/section.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

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
				<a href={resolve(`/awesome-privacy/${data.categorySlug}`)}>
					{awesomePrivacy.slugToName(data.categorySlug)}
				</a>
			</li>
			<li>
				{data.section.name}
			</li>
		</ul>
	</nav>

	<Section categorySlug={data.categorySlug} sectionSlug={data.sectionSlug} section={data.section} />
</main>
