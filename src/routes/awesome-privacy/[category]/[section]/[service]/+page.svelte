<script lang="ts">
	import { resolve } from '$app/paths';
	import Service from '$lib/features/awesome-privacy/components/service.svelte';
	import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.service.name} | {data.section.name} | Awesome Privacy</title>
	<meta name="description" content={data.service.description} />
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-10">
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
				<a
					href={resolve(`/awesome-privacy/${data.categorySlug}/${data.sectionSlug}`)}
					class="hover:text-primary">{data.section.name}</a
				>
			</li>

			<li>{data.service.name}</li>
		</ul>
	</nav>

	<Service
		related={data.related}
		service={data.service}
		section={data.section}
		categorySlug={data.categorySlug}
		sectionSlug={data.sectionSlug}
	/>
</main>
