import type { LayoutServerLoad } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const load: LayoutServerLoad = ({ setHeaders }) => {
	setHeaders({ 'Cache-Control': 'public, max-age=3600' });

	const awesomePrivacyData = awesomePrivacy.getData();

	return {
		meta: {
			title: 'Awesome Privacy | 10xPrivacy',
			description: 'A curated guide to privacy-respecting software and services.'
		},
		awesomePrivacyData: awesomePrivacyData
	};
};
