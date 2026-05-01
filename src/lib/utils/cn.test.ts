import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
	it('combines class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('merges conflicting Tailwind classes (last wins)', () => {
		expect(cn('p-2', 'p-4')).toBe('p-4');
	});

	it('ignores falsy values', () => {
		expect(cn('foo', undefined, null, false, 'bar')).toBe('foo bar');
	});

	it('returns empty string when given no arguments', () => {
		expect(cn()).toBe('');
	});
});
