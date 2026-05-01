import { describe, expect, it } from 'vitest';

import { markdownToHtml, markdownToInlineHtml } from './markdown';

describe('markdownToHtml', () => {
	it('converts bold markdown to <strong>', () => {
		expect(markdownToHtml('**bold**')).toContain('<strong>bold</strong>');
	});

	it('wraps text in a paragraph', () => {
		expect(markdownToHtml('hello')).toContain('<p>');
	});

	it('strips script tags (XSS)', () => {
		expect(markdownToHtml('<script>alert(1)</script>')).not.toContain('<script>');
	});

	it('returns empty string for empty input', () => {
		expect(markdownToHtml('')).toBe('');
	});
});

describe('markdownToInlineHtml', () => {
	it('converts inline bold without wrapping paragraph', () => {
		const result = markdownToInlineHtml('**bold**');
		expect(result).toContain('<strong>bold</strong>');
		expect(result).not.toContain('<p>');
	});

	it('strips script tags (XSS)', () => {
		expect(markdownToInlineHtml('<script>alert(1)</script>')).not.toContain('<script>');
	});
});
