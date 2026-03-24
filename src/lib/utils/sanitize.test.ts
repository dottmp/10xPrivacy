import { describe, expect, it } from 'vitest';

import { isSafeUrl } from './sanitize';

describe('isSafeUrl', () => {
	it('returns true for https URLs', () => {
		expect(isSafeUrl('https://example.com')).toBe(true);
	});

	it('returns false for http URLs', () => {
		expect(isSafeUrl('http://example.com')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(isSafeUrl('')).toBe(false);
	});

	it('returns false for invalid URLs', () => {
		expect(isSafeUrl('not a url')).toBe(false);
	});
});
