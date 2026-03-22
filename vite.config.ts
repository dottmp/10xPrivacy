import { execSync } from 'child_process';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

const commitHash = (() => {
	try {
		return execSync('git rev-parse --short HEAD').toString().trim();
	} catch {
		return 'unknown';
	}
})();

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__COMMIT_HASH__: JSON.stringify(commitHash)
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
