import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import { rss } from '$lib/features/feed/service';
import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';
import { tryCatch } from '$lib/utils/try-catch';

export const load: LayoutServerLoad = async ({}) => {
	const { data, error: err } = await tryCatch(rss.getArticles());

	if (err) {
		error(500, { message: 'Failed to fetch feed data' });
	}

	return {
		articlesResponse: data
	} satisfies { articlesResponse: ArticlesResponse };
};
