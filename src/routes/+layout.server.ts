import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const load = () => {
	return {
		searchIndex: Promise.resolve(awesomePrivacy.getSearchIndex())
	};
};
