import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { awesomePrivacy, type Section } from '$lib/awesome-privacy';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { category: categorySlug, section: sectionSlug } = params;

	const { awesomePrivacyData } = await parent();

	const section = awesomePrivacy.findSection(awesomePrivacyData, categorySlug, sectionSlug);

	if (!section) {
		error(404, `Section "${sectionSlug}" not found`);
	}

	return {
		categorySlug,
		sectionSlug,
		section
	} satisfies {
		categorySlug: string;
		sectionSlug: string;
		section: Section;
	};
};
