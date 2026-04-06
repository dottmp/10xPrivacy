import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, data }) => {
	const response = await fetch('/security');

	//NOTE: This is a workaround to get the security headers from the server response.
	const csp = response.headers.get('content-security-policy');

	data.headers.push({ name: 'Content-Security-Policy', value: csp ?? '' });

	return data;
};
