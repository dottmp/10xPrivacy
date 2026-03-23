import { XMLParser } from 'fast-xml-parser';

import type { Feed, RawItem } from './types';

type XMLNode = string | Record<string, unknown> | undefined;

type RssItem = {
	title?: XMLNode;
	link?: string;
	guid?: XMLNode;
	pubDate?: string;
	description?: XMLNode;
	'content:encoded'?: string;
	'media:content'?: XMLNode;
};

type AtomEntry = {
	title?: XMLNode;
	link?: XMLNode;
	id?: XMLNode;
	published?: string;
	updated?: string;
	summary?: XMLNode;
	content?: XMLNode;
};

function isElement(node: unknown): node is Record<string, unknown> {
	return typeof node === 'object' && node !== null;
}

export class RssXmlParser {
	//----------------------------------------------------------------------
	// private
	//----------------------------------------------------------------------

	private readonly _parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '',
		textNodeName: '#text',
		isArray: (name) => name === 'item' || name === 'entry'
	});

	/** Returns the string value of an XML node */
	private _extractText(node: unknown) {
		if (typeof node === 'string') {
			return node || undefined;
		}

		if (isElement(node) && '#text' in node) {
			const text = node['#text'];

			return typeof text === 'string' ? text || undefined : undefined;
		}
	}

	/** Returns the value of a named XML attribute from an element object. */
	private _extractAttr(node: unknown, attr: string) {
		if (!isElement(node)) {
			return;
		}

		const value = node[attr];

		return typeof value === 'string' ? value || undefined : undefined;
	}

	/** Maps a single RSS 2.0 `<item>` node to a `RawItem`. */
	private _normaliseRssItem(item: RssItem): RawItem {
		const description = this._extractText(item.description);

		return {
			title: this._extractText(item.title),
			link: item.link,
			guid: this._extractText(item.guid),
			pubDate: item.pubDate,
			isoDate: item.pubDate ? new Date(item.pubDate).toISOString() : undefined,
			'content:encoded': item['content:encoded'],
			content: description,
			contentSnippet: description ? description.replace(/<[^>]*>/g, '').trim() : undefined,
			'media:content': { url: this._extractAttr(item['media:content'], 'url') }
		};
	}

	/** Maps a single Atom `<entry>` node to a `RawItem`. */
	private _normaliseAtomEntry(entry: AtomEntry): RawItem {
		const pubDate = entry.published ?? entry.updated;
		const summary = this._extractText(entry.summary);
		const content = this._extractText(entry.content);

		return {
			title: this._extractText(entry.title),
			link: this._extractAttr(entry.link, 'href') ?? this._extractText(entry.link),
			guid: this._extractText(entry.id),
			pubDate,
			isoDate: pubDate ? new Date(pubDate).toISOString() : undefined,
			summary,
			content,
			contentSnippet: summary ? summary.replace(/<[^>]*>/g, '').trim() : undefined,
			'content:encoded': content
		};
	}

	private _normaliseFeed(raw: Record<string, XMLNode>): Feed {
		const rssRoot = raw['rss'];

		if (isElement(rssRoot)) {
			const channel = rssRoot['channel'];

			if (isElement(channel)) {
				const items = Array.isArray(channel['item']) ? (channel['item'] as RssItem[]) : [];

				return {
					title: this._extractText(channel['title']),
					items: items.map((item) => this._normaliseRssItem(item))
				};
			}
		}

		const atomRoot = raw['feed'];

		if (!isElement(atomRoot)) {
			return { items: [] };
		}

		const entries = Array.isArray(atomRoot['entry']) ? (atomRoot['entry'] as AtomEntry[]) : [];

		return {
			title: this._extractText(atomRoot['title']),
			items: entries.map((entry) => this._normaliseAtomEntry(entry))
		};
	}

	//----------------------------------------------------------------------
	// public
	//----------------------------------------------------------------------

	public parse(xml: string): Feed {
		const raw = this._parser.parse(xml) as Record<string, XMLNode>;
		return this._normaliseFeed(raw);
	}
}

export const rssXmlParser = new RssXmlParser();
