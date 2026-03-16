import { fetchFeed } from '$lib/rss';
import { FEED_SOURCES } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const results = await Promise.allSettled(FEED_SOURCES.map((source) => fetchFeed(source)));

	const items = results
		.flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
		.sort((a, b) => {
			const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return dateB - dateA;
		});

	return { items };
};
