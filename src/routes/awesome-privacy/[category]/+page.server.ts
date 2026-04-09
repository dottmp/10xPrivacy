import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = async ({ params, url }) => {
	const { category: categorySlug } = params;

	const category = awesomePrivacy.getCategory({ categorySlug });

	if (!category) {
		error(404, `Category "${categorySlug}" not found`);
	}

	return {
		meta: {
			title: `${category.name} | Awesome Privacy | 10xPrivacy`,
			description: `Curated list of privacy-respecting software and services in the ${category.name} category.`,
			url: url.href
		},
		categorySlug,
		category
	};
};
