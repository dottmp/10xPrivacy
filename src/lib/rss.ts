import type { FeedItem, FeedSource } from './types';

function extractCdata(xml: string, tag: string): string {
	const idx = xml.indexOf(`<${tag}`);
	if (idx === -1) return '';
	const start = xml.indexOf('>', idx) + 1;
	const end = xml.indexOf(`</${tag}>`, start);
	if (end === -1) return '';
	let content = xml.slice(start, end);
	// Strip CDATA wrapper
	const cdataStart = content.indexOf('<![CDATA[');
	if (cdataStart !== -1) {
		content = content.slice(cdataStart + 9);
		const cdataEnd = content.lastIndexOf(']]>');
		if (cdataEnd !== -1) content = content.slice(0, cdataEnd);
	}
	return content.trim();
}

function extractAttrValue(xml: string, tag: string, attr: string): string {
	const regex = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
	const match = regex.exec(xml);
	return match ? match[1] : '';
}

function slugify(str: string): string {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.slice(0, 80);
}

function stripHtml(html: string): string {
	return html.replace(/<[^>]+>/g, '').trim();
}

function extractImage(item: string): string | undefined {
	// Try media:content url attribute
	const mediaMatch = /media:content[^>]*url="([^"]+)"/.exec(item);
	if (mediaMatch) return mediaMatch[1];

	// Try first img tag src
	const imgMatch = /<img[^>]*src="([^"]+)"/.exec(item);
	if (imgMatch) return imgMatch[1];

	return undefined;
}

function extractContentEncoded(item: string): string {
	// Find content:encoded tag and extract raw content
	const startTag = '<content:encoded>';
	const endTag = '</content:encoded>';
	const start = item.indexOf(startTag);
	if (start === -1) return '';
	const contentStart = start + startTag.length;
	const end = item.indexOf(endTag, contentStart);
	if (end === -1) return '';
	let content = item.slice(contentStart, end);
	// Strip CDATA wrapper if present
	const cdataStart = content.indexOf('<![CDATA[');
	if (cdataStart !== -1) {
		content = content.slice(cdataStart + 9);
		const cdataEnd = content.lastIndexOf(']]>');
		if (cdataEnd !== -1) content = content.slice(0, cdataEnd);
	}
	return content.trim();
}

function extractDescription(item: string): string {
	const startTag = '<description>';
	const endTag = '</description>';
	const start = item.indexOf(startTag);
	if (start === -1) return '';
	const contentStart = start + startTag.length;
	const end = item.indexOf(endTag, contentStart);
	if (end === -1) return '';
	let content = item.slice(contentStart, end);
	const cdataStart = content.indexOf('<![CDATA[');
	if (cdataStart !== -1) {
		content = content.slice(cdataStart + 9);
		const cdataEnd = content.lastIndexOf(']]>');
		if (cdataEnd !== -1) content = content.slice(0, cdataEnd);
	}
	return content.trim();
}

function parseItems(xml: string, source: FeedSource): FeedItem[] {
	const itemRegex = /<item>([\s\S]*?)<\/item>/g;
	const items: FeedItem[] = [];
	let match;

	while ((match = itemRegex.exec(xml)) !== null) {
		const item = match[1];

		const title = stripHtml(extractCdata(item, 'title'));
		const link = extractCdata(item, 'link') || extractAttrValue(item, 'atom:link', 'href');

		const description = stripHtml(extractDescription(item));
		const content = extractContentEncoded(item) || extractDescription(item);

		const pubDate = extractCdata(item, 'pubDate');
		const author = extractCdata(item, 'dc:creator') || extractCdata(item, 'author');

		const imageUrl = extractImage(item);
		const slug = slugify(title);
		const id = extractCdata(item, 'guid') || link || slug;

		if (title && link) {
			items.push({
				id,
				title,
				link,
				description,
				content,
				pubDate,
				author: author || undefined,
				imageUrl,
				source: source.id,
				slug
			});
		}
	}

	return items;
}

export async function fetchFeed(source: FeedSource): Promise<FeedItem[]> {
	const response = await fetch(source.feedUrl, {
		headers: { Accept: 'application/rss+xml, application/xml, text/xml' }
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch feed from ${source.feedUrl}: ${response.status}`);
	}

	const xml = await response.text();
	return parseItems(xml, source);
}
