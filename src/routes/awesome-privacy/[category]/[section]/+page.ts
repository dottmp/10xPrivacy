import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Section } from '$lib/features/awesome-privacy/types';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const { category: categorySlug, section: sectionSlug } = params;

	const section = awesomePrivacy.getSection({ categorySlug, sectionSlug });

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
