import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ setHeaders }) => {
	setHeaders({ 'Cache-Control': 'public, max-age=86400' });

	return {
		meta: {
			title: '10xPrivacy',
			description:
				'10xPrivacy educates users about digital privacy by providing a curated feed of news, resources, and tools to protect them selves from surveillance capitalism.'
		}
	};
};
