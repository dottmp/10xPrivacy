import { marked } from 'marked';

import { sanitizeHtml } from './sanitize';

/**
 * Converts a markdown string to sanitized block HTML (wraps content in <p> tags etc).
 */
export function markdownToHtml(md: string): string {
	return sanitizeHtml(marked.parse(md) as string);
}

/**
 * Converts a markdown string to sanitized inline HTML (no wrapping block elements).
 */
export function markdownToInlineHtml(md: string): string {
	return sanitizeHtml(marked.parseInline(md) as string);
}
