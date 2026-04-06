import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, setHeaders }) => {
	setHeaders({ 'Cache-Control': 'public, max-age=1800' });

	return {
		headers: Object.entries(locals.securityHeaders).map(([name, value]) => ({ name, value }))
	};
};
