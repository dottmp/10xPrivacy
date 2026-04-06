import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	return {
		headers: Object.entries(locals.securityHeaders).map(([name, value]) => ({ name, value }))
	};
};
