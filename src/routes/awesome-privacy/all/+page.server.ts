import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '#lib/features/awesome-privacy/service.ts';

export const load: PageServerLoad = () => {
	return {
		meta: {
			title: 'All Categories | Awesome Privacy | 10xPrivacy',
			description: 'A curated guide to privacy-respecting software and services.'
		},
		categories: awesomePrivacy.getCategories()
	};
};
