import { error } from '@sveltejs/kit';

import { rss } from '$lib/features/feed/service';
import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';
import { tryCatch } from '$lib/utils/try-catch';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		articlesResponse: {
			data: [],
			count: 0
		}
	} satisfies { articlesResponse: ArticlesResponse };
};
