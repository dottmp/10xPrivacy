import type { PageServerLoad } from './$types';

import { awesomePrivacy, type Category } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = async ({ parent }) => {
	const { awesomePrivacyData } = await parent();

	return {
		categories: awesomePrivacy.findFeaturedCategories(awesomePrivacyData)
	} satisfies { categories: Category[] };
};
