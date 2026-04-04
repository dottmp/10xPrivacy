import { resolve } from '$app/paths';

export const FEATURED_CATEGORIES = Object.freeze([
	'Essentials',
	'Communication',
	'Networking',
	'Security Tools',
	'Operating Systems',
	'Productivity'
]);

export const THEMES = Object.freeze([
	'vscode',
	'andromeda',
	'ayudark',
	'catppuccin',
	'everforest',
	'flexoki',
	'githubdark',
	'githublight',
	'gruvbox',
	'kanagawa',
	'monokai',
	'nightfox',
	'nightowl',
	'onedarkpro',
	'rosepine',
	'solarized',
	'tokyonight'
] as const);

export const NAV_ITMES = Object.freeze([
	{ href: resolve('/privacy-news'), label: 'Privacy News' },
	{ href: resolve('/awesome-privacy'), label: 'Awesome Privacy' },
	{ href: resolve('/websites'), label: 'Websites' }
] satisfies { href: string; label: string }[]);
