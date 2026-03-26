import type { PageLoad } from './$types';

import { rss } from '$lib/features/feed/service';
import type { ArticlesResponse, SourceSearchParam } from '$lib/features/feed/types';

export const load: PageLoad = async ({ parent, url }) => {
	const sourceSearchParam = url.searchParams.get('source') as SourceSearchParam;

	const { articlesResponse } = await parent();

	const articles = rss.filterArticlesBySource(articlesResponse?.data, {
		source: sourceSearchParam
	});

	return {
		articlesResponse: {
			data: articles,
			count: articles.length
		}
	} satisfies { articlesResponse: ArticlesResponse };
};
