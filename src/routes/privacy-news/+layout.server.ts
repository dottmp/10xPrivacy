import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { rss } from '$lib/features/feed/service';
import { tryCatch } from '$lib/utils/try-catch';

export const load: LayoutServerLoad = async () => {
	const { data, error: err } = await tryCatch(rss.getArticles());

	if (err) {
		error(500, { message: 'Failed to fetch feed data' });
	}

	return {
		meta: {
			title: 'Privacy News | 10xPrivacy',
			description:
				'RSS feed aggregator for privacy news from tuta.com, privacyguides.org, and techlore.tech.'
		},
		articlesResponse: data
	};
};
