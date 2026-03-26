import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		meta: {
			title: 'Websites | 10xPrivacy',
			description:
				'A list of websites related to digital privacy. Can be anything from news sites, intresting articles to tools and resources.'
		}
	};
};
