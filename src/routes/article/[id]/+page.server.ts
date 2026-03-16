import { fetchFeed } from '$lib/rss';
import { FEED_SOURCES } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const source = url.searchParams.get('source');
	const idParam = params.id;

	// Decode the id from the slug__base64id format
	const separatorIdx = idParam.lastIndexOf('__');
	let originalId = '';
	if (separatorIdx !== -1) {
		const encoded = idParam.slice(separatorIdx + 2);
		try {
			// Add back stripped padding
			const padded =
				encoded + '=='.slice((encoded.length + 2) % 4 === 0 ? 2 : (encoded.length + 2) % 4);
			originalId = decodeURIComponent(escape(atob(padded)));
		} catch {
			// Fall through if decode fails
		}
	}

	// Determine which sources to search
	const sourcesToSearch = source ? FEED_SOURCES.filter((s) => s.id === source) : FEED_SOURCES;

	const results = await Promise.allSettled(sourcesToSearch.map((s) => fetchFeed(s)));
	const allItems = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

	// Find by decoded id, then by slug, then by partial match
	const item =
		allItems.find((i) => i.id === originalId) ||
		allItems.find((i) => i.slug === idParam.split('__')[0]) ||
		allItems.find((i) => i.id.includes(originalId) && originalId.length > 5);

	if (!item) {
		error(404, 'Article not found');
	}

	return { item };
};
