import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

import type { Article } from '$lib/features/feed/types';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { articlesResponse } = await parent();

	const article = articlesResponse.data.find((article) => article.slug === params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	return { article } satisfies { article: Article };
};
