import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '#lib/features/awesome-privacy/service.ts';
import { buildStackGroups } from '#lib/features/awesome-privacy/stack.ts';

export const load: PageServerLoad = ({ url }) => ({
	meta: {
		title: 'Used by 10xPrivacy',
		description: 'The tools 10xPrivacy runs day to day. Not a ranking, and not sponsored.',
		url: url.href
	},
	stackGroups: buildStackGroups(),
	notableMentions: awesomePrivacy.getStackNotableMentions()
});
