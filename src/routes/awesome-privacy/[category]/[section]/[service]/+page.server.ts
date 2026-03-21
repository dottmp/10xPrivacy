import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { awesomePrivacy, type Section, type Service } from '$lib/features/awesome-privacy/service';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { category: categorySlug, section: sectionSlug, service: serviceSlug } = params;

	const { awesomePrivacyData } = await parent();

	const section = awesomePrivacy.findSection(awesomePrivacyData, categorySlug, sectionSlug);
	if (!section) {
		error(404, `Section "${sectionSlug}" not found`);
	}

	const service = awesomePrivacy.findService(
		awesomePrivacyData,
		categorySlug,
		sectionSlug,
		serviceSlug
	);
	if (!service) {
		error(404, `Service "${serviceSlug}" not found`);
	}

	const related = section.services
		.filter((s) => awesomePrivacy.slugify(s.name) !== serviceSlug)
		.slice(0, 4);

	return {
		categorySlug,
		sectionSlug,
		serviceSlug,
		section,
		service,
		related
	} satisfies {
		categorySlug: string;
		sectionSlug: string;
		serviceSlug: string;
		section: Section;
		service: Service;
		related: Service[];
	};
};
