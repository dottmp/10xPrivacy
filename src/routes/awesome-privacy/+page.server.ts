import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Category } from '$lib/features/awesome-privacy/types';

export const load: PageServerLoad = async () => {
	return {
		categories: awesomePrivacy.getFeaturedCategories()
	} satisfies { categories: Category[] };
};
