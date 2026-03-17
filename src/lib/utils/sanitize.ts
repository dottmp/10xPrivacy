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
