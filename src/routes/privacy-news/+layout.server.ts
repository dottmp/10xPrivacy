import type { LayoutServerLoad } from './$types';

import { rss } from '$lib/features/feed/service';

export const load: LayoutServerLoad = async () => {
	return {
		meta: {
			title: 'Privacy News | 10xPrivacy',
			description:
				'RSS feed aggregator for privacy news from tuta.com, privacyguides.org, and techlore.tech.'
		},
		promisedArticles: rss.getArticles()
	};
};
