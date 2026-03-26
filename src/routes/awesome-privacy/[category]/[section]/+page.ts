import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const { category: categorySlug, section: sectionSlug } = params;

	const section = awesomePrivacy.getSection({ categorySlug, sectionSlug });

	if (!section) {
		error(404, `Section "${sectionSlug}" not found`);
	}

	return {
		meta: {
			title: `${section.name} | 10xPrivacy`,
			description: section.intro
		},
		categorySlug,
		sectionSlug,
		section
	};
};
