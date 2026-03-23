import { describe, expect, it } from 'vitest';

import { rssXmlParser } from './xml-parser';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rss(items: string, channelTitle = 'Test Channel'): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${channelTitle}</title>
    ${items}
  </channel>
</rss>`;
}

function atom(entries: string, feedTitle = 'Test Feed'): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${feedTitle}</title>
  ${entries}
</feed>`;
}

// ---------------------------------------------------------------------------
// RSS
// ---------------------------------------------------------------------------

describe('RSS ', () => {
	it('parses the channel title', () => {
		const feed = rssXmlParser.parse(rss('', 'My Blog'));
		expect(feed.title).toBe('My Blog');
	});

	it('parses a single item', () => {
		const feed = rssXmlParser.parse(
			rss(`<item>
        <title>Hello World</title>
        <link>https://example.com/hello</link>
        <guid>abc-123</guid>
        <pubDate>Mon, 01 Jan 2024 00:00:00 +0000</pubDate>
        <description>Blahblah</description>
      </item>`)
		);

		expect(feed.items).toHaveLength(1);

		const [item] = feed.items;

		expect(item.title).toBe('Hello World');

		expect(item.link).toBe('https://example.com/hello');

		expect(item.guid).toBe('abc-123');

		expect(item.pubDate).toBe('Mon, 01 Jan 2024 00:00:00 +0000');

		expect(item.content).toBe('Blahblah');
	});

	it('parses multiple items', () => {
		const feed = rssXmlParser.parse(
			rss(`<item><title>One</title></item>
           <item><title>Two</title></item>
           <item><title>Three</title></item>`)
		);

		expect(feed.items).toHaveLength(3);

		expect(feed.items.map((i) => i.title)).toEqual(['One', 'Two', 'Three']);
	});

	it('isoDate from pubDate', () => {
		const feed = rssXmlParser.parse(
			rss(`<item><pubDate>Mon, 01 Jan 2024 00:00:00 +0000</pubDate></item>`)
		);

		expect(feed.items[0].isoDate).toBe('2024-01-01T00:00:00.000Z');
	});

	it('strips HTML tags from description to produce contentSnippet', () => {
		const feed = rssXmlParser.parse(
			rss(`<item><description><![CDATA[<p>Hello <strong>world</strong></p>]]></description></item>`)
		);

		expect(feed.items[0].contentSnippet).toBe('Hello world');
	});

	it('parses content:encoded', () => {
		const feed = rssXmlParser.parse(
			rss(`<item><content:encoded><![CDATA[<p>Full body</p>]]></content:encoded></item>`)
		);

		expect(feed.items[0]['content:encoded']).toBe('<p>Full body</p>');
	});

	it('parses media:content url attribute', () => {
		const feed = rssXmlParser.parse(
			rss(`<item><media:content url="https://example.com/img.jpg" /></item>`)
		);

		expect(feed.items[0]['media:content']?.url).toBe('https://example.com/img.jpg');
	});

	it('returns undefined fields for missing elements', () => {
		const feed = rssXmlParser.parse(rss(`<item></item>`));
		const [item] = feed.items;

		expect(item.title).toBeUndefined();

		expect(item.guid).toBeUndefined();

		expect(item.pubDate).toBeUndefined();

		expect(item.isoDate).toBeUndefined();

		expect(item.contentSnippet).toBeUndefined();
	});

	it('returns empty items array for empty channel', () => {
		const feed = rssXmlParser.parse(rss(''));

		expect(feed.items).toEqual([]);
	});
});

// ---------------------------------------------------------------------------
// Atom
// ---------------------------------------------------------------------------

describe('Atom', () => {
	it('parses the feed title', () => {
		const feed = rssXmlParser.parse(atom('', 'My Atom Feed'));
		expect(feed.title).toBe('My Atom Feed');
	});

	it('parses a single entry', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry>
        <title>Atom Post</title>
        <link href="https://example.com/atom-post"/>
        <id>urn:uuid:atom-1</id>
        <published>2024-03-01T10:00:00Z</published>
        <summary>A brief summary</summary>
      </entry>`)
		);

		expect(feed.items).toHaveLength(1);

		const [item] = feed.items;

		expect(item.title).toBe('Atom Post');

		expect(item.link).toBe('https://example.com/atom-post');

		expect(item.guid).toBe('urn:uuid:atom-1');

		expect(item.pubDate).toBe('2024-03-01T10:00:00Z');

		expect(item.summary).toBe('A brief summary');
	});

	it('prefers published over updated for pubDate', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry>
        <published>2024-01-01T00:00:00Z</published>
        <updated>2024-06-01T00:00:00Z</updated>
      </entry>`)
		);

		expect(feed.items[0].pubDate).toBe('2024-01-01T00:00:00Z');
	});

	it('falls back to updated when published is absent', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry>
        <updated>2024-06-01T00:00:00Z</updated>
      </entry>`)
		);

		expect(feed.items[0].pubDate).toBe('2024-06-01T00:00:00Z');
	});

	it(' isoDate from pubDate', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry><published>2024-03-01T10:00:00Z</published></entry>`)
		);

		expect(feed.items[0].isoDate).toBe('2024-03-01T10:00:00.000Z');
	});

	it('strips HTML from summary to produce contentSnippet', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry><summary><![CDATA[<p>Hello <em>world</em></p>]]></summary></entry>`)
		);

		expect(feed.items[0].contentSnippet).toBe('Hello world');
	});

	it('maps content to content:encoded', () => {
		const feed = rssXmlParser.parse(
			atom(`<entry><content type="html"><![CDATA[<p>Body</p>]]></content></entry>`)
		);

		expect(feed.items[0]['content:encoded']).toBe('<p>Body</p>');
	});
});
