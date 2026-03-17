import type Parser from 'rss-parser';

export {};

declare global {
	type SourceId = 'tuta' | 'privacyguides' | 'techlore';

	type SourceSearchParam = SourceId | 'all' | null;

	type CustomData = {
		'media:content': { $: { url: string } };
		'content:encoded': string;
	};

	type ParsedFeed = Record<string, never> & Parser.Output<CustomData>;

	interface FeedItem {
		id: string;
		title: string;
		link: string;
		description: string;
		content: string;
		pubDate: string | null;
		author: string | null;
		imageUrl: string | null;
		source: Source;
		slug: string;
	}

	interface Source {
		id: SourceId;
		name: string;
		url: string;
		feedUrl: string;
	}

	type FeedResponse = {
		data: FeedItem[];
		count: number;
	};

	type SourcesResponse = {
		data: {
			feed: ParsedFeed;
			source: Source;
		}[];
		count: number;
	};

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
