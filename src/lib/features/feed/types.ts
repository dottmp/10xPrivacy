//----------------------------------------------------------------------
// raw rss output
//----------------------------------------------------------------------

export type CustomItem = {
	'media:content': { $?: { url?: string } };
	'content:encoded': string;
};

export type FeedItem = CustomItem & {
	title?: string;
	link?: string;
	guid?: string;
	pubDate?: string;
	isoDate?: string;
	content?: string;
	contentSnippet?: string;
	summary?: string;
	[key: string]: unknown;
};

export type Output = {
	title?: string;
	items: FeedItem[];
};

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

export type Article = FeedItem & {
	date?: string;
	thumbnailUrl?: string;
	slug: string;
	description: string | undefined;
	source: Source;
};

export type ArticlesResponse = {
	data: Article[];
	count: number;
};
