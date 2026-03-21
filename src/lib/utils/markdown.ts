import { marked } from 'marked';

import { sanitizeHtml } from './sanitize';

/**
 * Converts a markdown string to sanitized block HTML (wraps content in <p> tags etc).
 * Use inside block-level containers (div, section, etc.), NOT inside <p> tags.
 * Safe to call on both server (SSR) and client.
 */
export function markdownToHtml(md: string): string {
	return sanitizeHtml(marked.parse(md) as string);
}

/**
 * Converts a markdown string to sanitized inline HTML (no wrapping block elements).
 * Use inside inline containers like <p>, <span>, etc.
 * Safe to call on both server (SSR) and client.
 */
export function markdownToInlineHtml(md: string): string {
	return sanitizeHtml(marked.parseInline(md) as string);
}
