import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
import unusedImports from 'eslint-plugin-unused-imports';
import checkFilePlugin from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},

	//----------------------------------------------------------------------
	// general
	//----------------------------------------------------------------------
	{
		files: ['**/*.ts', '**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		plugins: { 'unused-imports': unusedImports, import: importPlugin },
		rules: {
			'unused-imports/no-unused-imports': 'warn',
			'import/no-cycle': ['error', { ignoreExternal: true }],
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true }
				}
			]
		}
	},

	//----------------------------------------------------------------------
	// file naming convention
	//----------------------------------------------------------------------
	{
		files: ['**/*.ts', '**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['src/routes/**/*.{ts,svelte}'],
		plugins: {
			'check-file': checkFilePlugin
		},
		rules: {
			'check-file/filename-naming-convention': [
				'error',
				{
					'**/*.{ts,svelte}': 'KEBAB_CASE'
				},
				{ ignoreMiddleExtensions: true }
			],
			'check-file/folder-naming-convention': [
				'error',
				{
					'!(src/routes)/**/*': 'KEBAB_CASE',
					'!(**/__tests__)/**/*': 'KEBAB_CASE'
				}
			]
		}
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
