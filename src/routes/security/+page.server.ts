import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, setHeaders }) => {
	setHeaders({ 'Cache-Control': 'public, max-age=1800' });

	return {
		meta: {
			title: 'Security | 10xPrivacy',
			description:
				'Transparency is cool, 10xPrivacy will allways be cool. Below are the security scores from Mozilla HTTP Observatory and the HTTP headers set on every response.'
		},
		headers: Object.entries(locals.securityHeaders).map(([name, value]) => ({ name, value }))
	};
};
