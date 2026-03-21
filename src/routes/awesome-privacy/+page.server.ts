import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Category } from '$lib/features/awesome-privacy/types';

export const load: PageServerLoad = async ({ parent }) => {
	const { awesomePrivacyData } = await parent();

	return {
		categories: awesomePrivacy.findFeaturedCategories(awesomePrivacyData)
	} satisfies { categories: Category[] };
};
