import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatDate } from './date';

describe('formatDate', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-01-24T12:00:00.000Z'));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns empty string for null', () => {
		expect(formatDate(null)).toBe('');
	});

	it('returns "Today" for the same day', () => {
		expect(formatDate('2026-01-24T08:00:00.000Z')).toBe('Today');
	});

	it('returns "Yesterday" for 1 day ago', () => {
		expect(formatDate('2026-01-23T08:00:00.000Z')).toBe('Yesterday');
	});

	it('returns days ago for 2-6 days ago', () => {
		expect(formatDate('2026-01-21T08:00:00.000Z')).toBe('3d ago');
	});

	it('returns formatted date without year for 8 days ago', () => {
		expect(formatDate('2026-01-16T08:00:00.000Z')).toBe('Jan 16');
	});

	it('returns formatted date with year for a date in a previous year', () => {
		expect(formatDate('2025-01-20T08:00:00.000Z')).toBe('Jan 20, 2025');
	});

	it('returns formatted date with year for Dec of last year (less than 365 days ago)', () => {
		expect(formatDate('2025-12-20T08:00:00.000Z')).toBe('Dec 20, 2025');
	});
});
