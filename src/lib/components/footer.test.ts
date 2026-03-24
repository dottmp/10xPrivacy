import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Footer from './footer.svelte';

describe('Footer component', () => {
	it('GitHub repo link has correct href', () => {
		render(Footer);

		const repoLink = screen.getByRole('link', { name: /GitHub repo/i });

		expect(repoLink.getAttribute('href')).toBe('https://github.com/dottmp/10xprivacy');
	});

	it('MIT License link has correct href', () => {
		render(Footer);

		const licenseLink = screen.getByRole('link', { name: /MIT License/i });

		expect(licenseLink.getAttribute('href')).toBe(
			'https://github.com/dottmp/10xprivacy/blob/main/LICENSE'
		);
	});
});
