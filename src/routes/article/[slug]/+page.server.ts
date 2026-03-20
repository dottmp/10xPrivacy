import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { feed } = await parent();

	const article = feed.data.find(
		(article) => article.slug === params.slug || article.slug === params.slug
	);

	if (!article) {
		error(404, 'Article not found');
	}

	return { article };
};
