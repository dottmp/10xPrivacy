import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { Category } from '$lib/features/awesome-privacy/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return { categories: awesomePrivacy.getCategories() } satisfies { categories: Category[] };
};
