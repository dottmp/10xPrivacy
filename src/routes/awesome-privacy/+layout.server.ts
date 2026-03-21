import type { LayoutServerLoad } from './$types';

import { awesomePrivacy, type AwesomePrivacyData } from '$lib/features/awesome-privacy/service';

export const load: LayoutServerLoad = () => {
	const awesomePrivacyData = awesomePrivacy.getData();

	return {
		awesomePrivacyData: awesomePrivacyData
	} satisfies { awesomePrivacyData: AwesomePrivacyData };
};
