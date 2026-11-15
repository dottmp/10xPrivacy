import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

import { version } from './package.json';

export default defineConfig({
	// TODO: Fix this Plugin types from vite and vitest/config are incompatible
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			csp: {
				mode: 'auto',
				directives: {
					'default-src': ['self'],
					'script-src': [
						'self',
						'unsafe-hashes',
						'sha256-7dQwUgLau1NFCCGjfn9FsYptB6ZtWxJin6VohGIu20I='
					],
					'style-src': [
						'self',
						'unsafe-hashes',
						'sha256-S8qMpvofolR8Mpjy4kQvEm7m1q8clzU4dfDH0AmvZjo='
					],
					'font-src': ['self'],
					'img-src': ['self', 'data:', 'https:'],
					'connect-src': ['self', 'https://api.tosdr.org'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['self'],
					'frame-ancestors': ['none']
				}
			}
		}),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		svelteTesting() as any
	],
	define: { __APP_VERSION__: JSON.stringify(version) },
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
