import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = async ({ params }) => {
	const { category: categorySlug } = params;

	const category = awesomePrivacy.getCategory({ categorySlug });

	if (!category) {
		error(404, `Category "${categorySlug}" not found`);
	}

	return {
		meta: {
			title: `${category.name} | 10xPrivacy`
		},
		categorySlug,
		category
	};
};
