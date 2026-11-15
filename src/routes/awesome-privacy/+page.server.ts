import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '#lib/features/awesome-privacy/service.ts';

export const load: PageServerLoad = async () => {
	return {
		categories: awesomePrivacy.getFeaturedCategories()
	};
};
