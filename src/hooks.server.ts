import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

import { dev } from '$app/environment';

export const limiter = new RetryAfterRateLimiter({
	IP: [1000, 'd'],
	IPUA: [100, 'm']
});

const handleRateLimit: Handle = async ({ event, resolve }) => {
	const status = await limiter.check(event);
	if (status.limited) {
		const response = new Response(
			`You are being rate limited. Please try after ${status.retryAfter} seconds.`,
			{
				status: 429,
				headers: { 'Retry-After': status.retryAfter.toString() }
			}
		);
		return response;
	}
	const response = await resolve(event);
	return response;
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

	event.locals.securityHeaders = headers;

	const response = await resolve(event);

	for (const [name, value] of Object.entries(headers)) {
		response.headers.set(name, value);
	}

	return response;
};

export const handle = sequence(handleRateLimit, handleHeaders);
