import { tryCatch } from '$lib/utils/try-catch';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { rss } from '$lib/rss';

export const load: LayoutServerLoad = async ({ url }) => {
	const sourceSearchParam = url.searchParams.get('source') as SourceSearchParam;

	const { data: feed, error: err } = await tryCatch(rss.getFeed({ source: sourceSearchParam }));

	if (err) {
		error(500, { message: 'Failed to fetch feed data' });
	}

	return {
		feed
	};
};
