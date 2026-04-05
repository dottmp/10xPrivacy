import type { LayoutServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { SearchEntry } from '$lib/features/awesome-privacy/types';

export const load: LayoutServerLoad = () => {
	return {
		search: {
			index: Promise.resolve(awesomePrivacy.getSearchIndex()),
			featuredCategories: Promise.resolve(
				awesomePrivacy.getFeaturedCategories().map((category) => ({
					type: 'category' as const,
					name: category.name,
					href: `/awesome-privacy/${awesomePrivacy.slugify(category.name)}`,
					categorySlug: awesomePrivacy.slugify(category.name)
				})) as SearchEntry[]
			)
		}
	};
};
