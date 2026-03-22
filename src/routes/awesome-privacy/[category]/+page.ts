import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Category } from '$lib/features/awesome-privacy/types';

export const load: PageLoad = async ({ params }) => {
	const { category: categorySlug } = params;

	const category = awesomePrivacy.getCategory({ categorySlug });

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
