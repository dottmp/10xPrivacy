import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { AwesomePrivacyData } from '$lib/features/awesome-privacy/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	const awesomePrivacyData = awesomePrivacy.getData();

	return {
		awesomePrivacyData: awesomePrivacyData
	} satisfies { awesomePrivacyData: AwesomePrivacyData };
};
