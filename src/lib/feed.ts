import { XMLParser } from "fast-xml-parser";
import { sortByPublishedAt } from "./entries";

export type Entry = {
	title: string;
	url: string;
	publishedAt: Date;
};

export const feedUrls = [
	"https://takkyuuplayer.blogspot.com/feeds/posts/summary",
	"https://takkyuuplayer.hatenablog.com/feed",
	"https://medium.com/feed/@takkyuuplayer",
] as const;

// ignoreAttributes は既定 true で、Atom の link から rel/href が落ちる。
// parseTagValue は既定 true で、<title>2024</title> が数値 2024 になる。
// isArray は、記事が 1 件のフィード（medium）で item が配列にならない差を吸収する。
const parser = new XMLParser({
	ignoreAttributes: false,
	parseTagValue: false,
	isArray: (name) => name === "entry" || name === "item" || name === "link",
});

type Node = Record<string, unknown>;

function asNode(value: unknown): Node | undefined {
	return typeof value === "object" && value !== null
		? (value as Node)
		: undefined;
}

function toArray(value: unknown): unknown[] {
	if (value === undefined || value === null) return [];
	return Array.isArray(value) ? value : [value];
}

// 属性を持つ要素は { "#text": "…", "@_type": "text" } になり、持たない要素は
// 文字列になる。blogspot の title は type 属性付き、hatena は素の文字列。
function textOf(value: unknown): string {
	if (typeof value === "string") return value;
	const text = asNode(value)?.["#text"];
	return typeof text === "string" ? text : "";
}

// rel が無い link は alternate として扱う（RFC 4287 §4.2.7.2）。
// これで hatena の rel なし link と blogspot の rel='alternate' を同じ規則で拾い、
// replies / edit / self / enclosure を落とせる。
function atomHref(links: unknown): string {
	for (const link of toArray(links)) {
		const node = asNode(link);
		if (!node) continue;
		const rel = node["@_rel"];
		if (rel !== undefined && rel !== "alternate") continue;
		const href = node["@_href"];
		if (typeof href === "string" && href !== "") return href;
	}
	return "";
}

// RSS 2.0 の link はテキストノードなので、Atom と違い属性を持たない。
function rssHref(links: unknown): string {
	for (const link of toArray(links)) {
		if (typeof link === "string" && link !== "") return link;
	}
	return "";
}

// ISO 8601 と toUTCString 形式（RSS の pubDate はこれに一致する）だけが
// Date.parse で保証されている形式のため、読めなかった値は捨てる。
function dateOf(...values: unknown[]): Date | undefined {
	for (const value of values) {
		if (typeof value !== "string") continue;
		const date = new Date(value);
		if (!Number.isNaN(date.getTime())) return date;
	}
	return undefined;
}

// 日付でソートしたうえで表示するため、3 つのいずれかを欠くエントリは扱えない。
function toEntry(
	title: string,
	url: string,
	publishedAt: Date | undefined,
): Entry | undefined {
	if (title === "" || url === "" || publishedAt === undefined) return undefined;
	return { title, url, publishedAt };
}

function fromAtomEntry(entry: unknown): Entry | undefined {
	const node = asNode(entry);
	if (!node) return undefined;
	return toEntry(
		textOf(node.title),
		atomHref(node.link),
		// published は Atom で必須ではない（RFC 4287 §4.2.9）。
		dateOf(node.published, node.updated),
	);
}

function fromRssItem(item: unknown): Entry | undefined {
	const node = asNode(item);
	if (!node) return undefined;
	return toEntry(textOf(node.title), rssHref(node.link), dateOf(node.pubDate));
}

export function parseFeed(xml: string): Entry[] {
	const doc = asNode(parser.parse(xml));

	const feed = asNode(doc?.feed);
	if (feed) return toArray(feed.entry).flatMap((e) => fromAtomEntry(e) ?? []);

	const channel = asNode(asNode(doc?.rss)?.channel);
	if (channel)
		return toArray(channel.item).flatMap((i) => fromRssItem(i) ?? []);

	return [];
}

export async function fetchEntries(
	urls: readonly string[] = feedUrls,
): Promise<Entry[]> {
	const results = await Promise.allSettled(
		urls.map(async (url) => {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}: ${url}`);
			}
			return parseFeed(await response.text());
		}),
	);

	return sortByPublishedAt(
		results.flatMap((result) => {
			if (result.status === "fulfilled") return result.value;
			// 1 本落ちても残りは出す。prerender = false に切り替えた日に、
			// 外部フィードの一時障害でページ全体を 500 にしたくない。
			console.warn("[feed] skipped a feed:", result.reason);
			return [];
		}),
	);
}
