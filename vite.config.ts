import { execSync } from 'child_process';

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

const commitHash = (() => {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim();
	} catch {
		return 'unknown';
	}
})();

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteTesting()],
	define: {
		__COMMIT_HASH__: JSON.stringify(commitHash)
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
