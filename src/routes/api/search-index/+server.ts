import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { awesomePrivacy } from '$lib/features/awesome-privacy/service';

export const GET: RequestHandler = ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=3600' });

	return json(awesomePrivacy.getSearchIndex());
};
