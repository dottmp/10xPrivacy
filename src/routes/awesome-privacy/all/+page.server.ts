import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = () => {
	return {
		meta: {
			title: 'All Categories | 10xPrivacy'
		},
		categories: awesomePrivacy.getCategories()
	};
};
