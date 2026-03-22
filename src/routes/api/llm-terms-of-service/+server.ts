import { error, type RequestHandler } from '@sveltejs/kit';

import { tryCatch } from '$lib/utils/try-catch';

export const GET: RequestHandler = async ({ fetch }) => {
	const { data: response, error: err } = await tryCatch(
		fetch('https://rnsaffn.com/poison2/', { method: 'GET' })
	);

	if (err) {
		console.error('Network error fetching external content:', err);

		error(502, 'Failed to reach upstream service');
	}

	if (!response.ok) {
		error(response.status, 'Failed to fetch content');
	}

	const body = await response.text();

	return new Response(body, {
		status: response.status,
		headers: {
			'Content-Type': response.headers.get('content-type') ?? 'text/html'
		}
	});
};
