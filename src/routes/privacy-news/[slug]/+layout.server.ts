import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, url, parent }) => {
	const { promisedArticles } = await parent();

	const articles = await promisedArticles;

	const article = articles.find((article) => article.slug === params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	return {
		meta: {
			title: `${article.title} | Privacy News | 10xPrivacy`,
			description: article.description,
			url: url.href
		},
		article
	};
};
