import type { PageServerLoad } from './$types';

import { type Category } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = async ({ parent }) => {
	const { awesomePrivacyData } = await parent();

	return { categories: awesomePrivacyData.categories } satisfies { categories: Category[] };
};
