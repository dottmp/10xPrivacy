import type { LayoutServerLoad } from './$types';

import { awesomePrivacy, type AwesomePrivacyData } from '$lib/awesome-privacy';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const awesomePrivacyData = await awesomePrivacy.fetchData(fetch);

	return {
		awesomePrivacyData: awesomePrivacyData
	} satisfies { awesomePrivacyData: AwesomePrivacyData };
};
