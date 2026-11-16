import type { PageServerLoad } from './$types';

import { awesomePrivacy } from '#lib/features/awesome-privacy/service.ts';
import { buildStackGroups } from '#lib/features/awesome-privacy/stack.ts';

// DOMPurify needs a DOM, which the Workers runtime does not provide. Render this
// page in the browser only, like the other markdown-heavy routes.
export const ssr = false;

export const load: PageServerLoad = ({ url }) => ({
	meta: {
		title: 'Used by 10xPrivacy',
		description: 'The tools 10xPrivacy runs day to day. Not a ranking, and not sponsored.',
		url: url.href
	},
	stackGroups: buildStackGroups(),
	notableMentions: awesomePrivacy.getStackNotableMentions()
});
