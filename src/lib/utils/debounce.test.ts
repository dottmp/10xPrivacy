import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('calls the function after the delay', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 200);

		debounced();
		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(200);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('only calls the function once when invoked multiple times within the delay', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 200);

		debounced();
		debounced();
		debounced();
		vi.advanceTimersByTime(200);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('resets the timer on each call', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 200);

		debounced();
		vi.advanceTimersByTime(100);
		debounced();
		vi.advanceTimersByTime(100);

		expect(fn).not.toHaveBeenCalled();

		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('passes the latest arguments to the function', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 200);

		debounced('first');
		debounced('second');
		debounced('third');
		vi.advanceTimersByTime(200);

		expect(fn).toHaveBeenCalledWith('third');
	});

	it('calls the function again after a subsequent invocation past the delay', () => {
		const fn = vi.fn();
		const debounced = debounce(fn, 200);

		debounced();
		vi.advanceTimersByTime(200);
		expect(fn).toHaveBeenCalledTimes(1);

		debounced();
		vi.advanceTimersByTime(200);
		expect(fn).toHaveBeenCalledTimes(2);
	});
});
