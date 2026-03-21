import type Parser from 'rss-parser';

//----------------------------------------------------------------------
// raw rss output
//----------------------------------------------------------------------

export type CustomItem = {
	'media:content': { $?: { url?: string } };
	'content:encoded': string;
};

export type Output = Record<symbol, never> & Parser.Output<CustomItem>;

//----------------------------------------------------------------------
// source
//----------------------------------------------------------------------

export type SourceId = 'tuta' | 'privacyguides' | 'techlore';
export type SourceSearchParam = SourceId | 'all' | null;

export type Source = {
	id: SourceId;
	name: string;
	url: string;
	feedUrl: string;
};

export type ParsedSource = {
	source: Source;
	output: Output;
};

export type SourcesResponse = {
	data: ParsedSource[];
	count: number;
};

//----------------------------------------------------------------------
// article
//----------------------------------------------------------------------

export type Article = Parser.Item & {
	date?: Parser.Item['pubDate'] | Parser.Item['isoDate'];
	thumbnailUrl?: string;
	slug: Parser.Item['title'] | Parser.Item['guid'] | string;
	description: Parser.Item['contentSnippet'] | Parser.Item['summary'] | string;
	source: Source;
};

export type ArticlesResponse = {
	data: Article[];
	count: number;
};
