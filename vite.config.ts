import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

import { version } from './package.json';

export default defineConfig({
	// TODO: Fix this Plugin types from vite and vitest/config are incompatible
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	plugins: [tailwindcss(), sveltekit(), svelteTesting() as any],
	define: {
		__APP_VERSION__: JSON.stringify(version)
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
		coverage: {
			provider: 'v8',
			reporter: ['text'],
			include: ['src/**/*.{ts,svelte}'],
			exclude: ['src/routes/**']
		}
	}
});
