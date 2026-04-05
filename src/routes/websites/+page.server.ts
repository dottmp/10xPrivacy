import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ setHeaders }) => {
	setHeaders({ 'Cache-Control': 'public, max-age=86400' });

	return {
		meta: {
			title: 'Websites | 10xPrivacy',
			description:
				'A list of websites related to digital privacy. Can be anything from news sites, intresting articles to tools and resources.'
		}
	};
};
