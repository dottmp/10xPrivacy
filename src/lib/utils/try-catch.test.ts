import { describe, expect, it } from 'vitest';

import { tryCatch } from './try-catch';

describe('tryCatch', () => {
	it('returns data on success', async () => {
		const { data, error } = await tryCatch(Promise.resolve(42));
		expect(data).toBe(42);
		expect(error).toBeNull();
	});

	it('returns error on rejection', async () => {
		const { data, error } = await tryCatch(Promise.reject(new Error('oops')));
		expect(data).toBeNull();
		expect((error as Error).message).toBe('oops');
	});

	it('handles resolved falsy values', async () => {
		const { data, error } = await tryCatch(Promise.resolve(null));
		expect(data).toBeNull();
		expect(error).toBeNull();
	});
});
