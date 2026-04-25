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

type NavItem =
	| {
			href: string;
			label: string;
	  }
	| {
			label: string;
			subItems: NavItem[];
	  };

export const NAV_ITMES = Object.freeze([
	{ href: resolve('/privacy-news'), label: 'Privacy News' },
	{ href: resolve('/awesome-privacy'), label: 'Awesome Privacy' },
	{ href: resolve('/websites'), label: 'Websites' },
	{
		label: 'Guides',
		subItems: [
			{ label: 'Get Started', href: resolve('/guides/get-started') },
			{ label: 'Checklist', href: resolve('/guides/checklist') }
		]
	}
] satisfies NavItem[]);
