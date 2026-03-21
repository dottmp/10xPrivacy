import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { awesomePrivacy, type Category } from '$lib/awesome-privacy';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { category: categorySlug } = params;

	const { awesomePrivacyData } = await parent();

	const category = awesomePrivacy.findCategory(awesomePrivacyData, categorySlug);

	if (!category) {
		error(404, `Category "${categorySlug}" not found`);
	}

	return {
		categorySlug,
		category
	} satisfies {
		categorySlug: string;
		category: Category;
	};
};
