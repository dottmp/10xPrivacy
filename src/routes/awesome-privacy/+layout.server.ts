import type { LayoutServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';
import type { AwesomePrivacyData } from '$lib/features/awesome-privacy/types';

export const load: LayoutServerLoad = ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=3600' });

	const awesomePrivacyData = awesomePrivacy.getData();

	return {
		awesomePrivacyData: awesomePrivacyData
	} satisfies { awesomePrivacyData: AwesomePrivacyData };
};
