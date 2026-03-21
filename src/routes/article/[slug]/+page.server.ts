import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import type { Article } from '$lib/features/feed/types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { articlesResponse } = await parent();

	const article = articlesResponse.data.find((article) => article.slug === params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	return { article } satisfies { article: Article };
};
