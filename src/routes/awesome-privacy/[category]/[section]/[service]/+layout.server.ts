import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const ssr = false;

export const load: LayoutServerLoad = async ({ params }) => {
	const { category: categorySlug, section: sectionSlug, service: serviceSlug } = params;

	const section = awesomePrivacy.getSection({ categorySlug, sectionSlug });

	if (!section) {
		error(404, `Section "${sectionSlug}" not found`);
	}

	const service = awesomePrivacy.getService({ categorySlug, sectionSlug, serviceSlug });

	if (!service) {
		error(404, `Service "${serviceSlug}" not found`);
	}

	const related = section.services
		.filter((s) => awesomePrivacy.slugify(s.name) !== serviceSlug)
		.slice(0, 4);

	return {
		meta: {
			title: `${service.name} | 10xPrivacy`,
			description: service.description
		},
		categorySlug,
		sectionSlug,
		serviceSlug,
		section,
		service,
		related
	};
};
