import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: 'Get Started | 10xPrivacy',
			description:
				'New to digital privacy? This guide will help you understand the basics and what changes you can make.'
		}
	};
};
