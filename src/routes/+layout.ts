import { error } from '@sveltejs/kit';

import type { LayoutLoad } from './$types';

import { rss } from '$lib/features/feed/service';
import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';
import { tryCatch } from '$lib/utils/try-catch';

export const load: LayoutLoad = async () => {
	return {
		articlesResponse: {
			data: [],
			count: 0
		}
	} satisfies { articlesResponse: ArticlesResponse };
};
