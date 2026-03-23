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

//----------------------------------------------------------------------
// raw item (as parsed from XML)
//----------------------------------------------------------------------

export type RawItem = {
	title?: string;
	link?: string;
	guid?: string;
	pubDate?: string;
	isoDate?: string;
	summary?: string;
	content?: string;
	contentSnippet?: string;
	creator?: string;
	'content:encoded'?: string;
	'media:content'?: { url?: string };
};

export type Feed = {
	title?: string;
	items: RawItem[];
};

export type ParsedSource = {
	source: Source;
	feed: Feed;
};

export type SourcesResponse = {
	data: ParsedSource[];
	count: number;
};

//----------------------------------------------------------------------
// article
//----------------------------------------------------------------------

export type Article = RawItem & {
	date?: RawItem['pubDate'] | RawItem['isoDate'];
	thumbnailUrl?: string;
	slug: RawItem['guid'] | RawItem['title'] | string;
	description: RawItem['contentSnippet'] | RawItem['summary'] | string;
	content: RawItem['content:encoded'] | RawItem['content'] | RawItem['summary'] | string;
	source: Source;
};

export type ArticlesResponse = {
	data: Article[];
	count: number;
};
