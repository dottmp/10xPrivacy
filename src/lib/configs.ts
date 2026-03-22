import type { Source } from '$lib/features/feed/types';

export const SOURCE_REGISTRY = Object.freeze([
	{
		id: 'tuta',
		name: 'Tuta',
		url: 'https://tuta.com',
		feedUrl: 'https://tuta.com/blog/feed.xml'
	},
	{
		id: 'privacyguides',
		name: 'Privacy Guides',
		url: 'https://www.privacyguides.org',
		feedUrl: 'https://www.privacyguides.org/rss/'
	},
	{
		id: 'techlore',
		name: 'Techlore',
		url: 'https://techlore.tech',
		feedUrl: 'https://techlore.tech/rss/'
	}
] as const satisfies Source[]);

export const FEATURED_CATEGORIES = Object.freeze([
	'Essentials',
	'Communication',
	'Networking',
	'Security Tools',
	'Operating Systems',
	'Productivity'
]);

export const WEBSITES = Object.freeze([
	'https://theyseeyourphotos.com',
	'https://privacyguides.org',
	'https://techlore.tech',
	'https://reddit.com/r/privacy',
	'https://awesome-privacy.xyz',
	'https://tuta.com/blog',
	'https://privacytools.io',
	'https://github.com/brandonhimpfen/awesome-privacy',
	'https://mullvad.net/en/why-privacy-matters',
	'https://privacypack.org',
	'https://www.poisonfountain.org',
	'https://rnsaffn.com/poison3',
	'https://haveibeenpwned.com',
	'https://prism-break.org',
	'https://github.com/pluja/awesome-privacy',
	'https://ssd.eff.org',
	'https://reddit.com/r/thehatedone',
	'https://browserleaks.com/',
	'https://mullvad.net/en/servers',
	'https://protonvpn.com/vpn-servers',
	'https://haveibeenpwned.com/Passwords',
	'https://discuss.privacyguides.net',
	'https://coveryourtracks.eff.org',
	'https://github.com/privacytoolsIO/privacy-tools',
	'https://proton.me/blog'
]);
