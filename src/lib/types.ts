export type Source = 'tuta' | 'privacyguides' | 'techlore';

export interface FeedItem {
	id: string;
	title: string;
	link: string;
	description: string;
	content: string;
	pubDate: string;
	author?: string;
	imageUrl?: string;
	source: Source;
	slug: string;
}

export interface FeedSource {
	id: Source;
	name: string;
	url: string;
	feedUrl: string;
	color: string;
	badge: string;
}

export const FEED_SOURCES: FeedSource[] = [
	{
		id: 'tuta',
		name: 'Tuta',
		url: 'https://tuta.com',
		feedUrl: 'https://tuta.com/blog/feed.xml',
		color: 'badge-success',
		badge: 'Tuta'
	},
	{
		id: 'privacyguides',
		name: 'Privacy Guides',
		url: 'https://www.privacyguides.org',
		feedUrl: 'https://www.privacyguides.org/rss/',
		color: 'badge-info',
		badge: 'Privacy Guides'
	},
	{
		id: 'techlore',
		name: 'Techlore',
		url: 'https://techlore.tech',
		feedUrl: 'https://techlore.tech/rss/',
		color: 'badge-warning',
		badge: 'Techlore'
	}
];
