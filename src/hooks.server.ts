import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { dev } from '$app/environment';

const csp = {
	'default-src': ['self'],
	'script-src': ['self'],
	'style-src': ['self', 'unsafe-hashes', 'sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo='],
	'font-src': ['self'],
	'img-src': ['self', 'data:', 'https:'],
	'connect-src': ['self'],
	'object-src': ['none'],
	'base-uri': ['self'],
	'form-action': ['self'],
	'frame-ancestors': ['none']
};

const handleHeaders: Handle = async ({ event, resolve }) => {
	const headers: Record<string, string> = {
		'X-Frame-Options': 'DENY',
		'X-Content-Type-Options': 'nosniff',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
		'Cross-Origin-Embedder-Policy': 'unsafe-none',
		'Cross-Origin-Opener-Policy': 'same-origin',
		'Cross-Origin-Resource-Policy': 'cross-origin'
	};

	if (!dev) {
		headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
	}

	event.locals.securityHeaders = {
		...headers,
		['Content-Security-Policy']: Object.entries(csp)
			.map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
			.join('; ')
	};

	const response = await resolve(event);

	for (const [name, value] of Object.entries(headers)) {
		response.headers.set(name, value);
	}

	return response;
};

export const handle = sequence(handleHeaders);
