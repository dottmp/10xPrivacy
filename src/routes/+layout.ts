import { error } from '@sveltejs/kit';

import { rss } from '$lib/features/feed/service';
import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';
import { tryCatch } from '$lib/utils/try-catch';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ url }) => {
	const sourceSearchParam = url.searchParams.get('source') as SourceSearchParam;

	const { data, error: err } = await tryCatch(rss.getArticles({ source: sourceSearchParam }));

	if (err) {
		error(500, { message: 'Failed to fetch feed data' });
	}

	return {
		articlesResponse: data
	} satisfies { articlesResponse: ArticlesResponse };
};
