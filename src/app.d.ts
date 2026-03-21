import type Parser from 'rss-parser';

declare global {
	//----------------------------------------------------------------------
	// raw rss output
	//----------------------------------------------------------------------

	type CustomItem = {
		'media:content': { $?: { url?: string } };
		'content:encoded': string;
	};

	type Output = Record<symbol, never> & Parser.Output<CustomItem>;

	//----------------------------------------------------------------------
	// article
	//----------------------------------------------------------------------

	type Article = Parser.Item & {
		date?: Parser.Item['pubDate'] | Parser.Item['isoDate'];
		thumbnailUrl?: CustomItem['media:content']['$']['url'];
		slug: Parser.Item['title'] | Parser.Item['guid'] | string;
		description: Parser.Item['contentSnippet'] | Parser.Item['summary'] | string;
		source: Source;
	};

	type ArticlesResponse = {
		data: Article[];
		count: number;
	};

	//----------------------------------------------------------------------
	// source
	//----------------------------------------------------------------------

	type SourceId = 'tuta' | 'privacyguides' | 'techlore';
	type SourceSearchParam = SourceId | 'all' | null;

	type Source = {
		id: SourceId;
		name: string;
		url: string;
		feedUrl: string;
	};

	type ParsedSource = {
		source: Source;
		output: Output;
	};

	type SourcesResponse = {
		data: ParsedSource[];
		count: number;
	};

	//----------------------------------------------------------------------
	// svelte internals
	//----------------------------------------------------------------------

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
