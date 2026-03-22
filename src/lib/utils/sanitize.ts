import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes an HTML string to prevent XSS.
 * Safe to call on both server (Node/SSR) and client.
 */
export function sanitizeHtml(html: string): string {
	return DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true }
	});
}

/**
 * Checks if a URL is safe (i.e., uses http or https protocol).
 */
export function isSafeUrl(url: string | undefined): url is string {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'https:' || parsed.protocol === 'http:';
	} catch {
		return false;
	}
}
