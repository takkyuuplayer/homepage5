import { XMLParser } from "fast-xml-parser";
import { feedSources, type BlogSource, type FeedSource } from "../data/blogs";
import type { ListEntry } from "./entries";

// フィードから読み取った 1 記事。必ずリンクを持つ。出典はフィードの中身からは
// 分からないため、どのフィードから読んだかを知っている fetchEntries が付ける。
export type ParsedEntry = ListEntry & { url: string };

export type Entry = ParsedEntry & { source: BlogSource };

// ignoreAttributes は既定 true で、Atom の link から rel/href が落ちる。
// parseTagValue は既定 true で、<title>2024</title> が数値 2024 になる。
// isArray は、記事が 1 件のフィード（medium）で item が配列にならない差を吸収する。
// link は jPath で Atom に限る。RSS の link はテキストノードで、配列にすると
// 剥がす処理が増えるだけ。
const parser = new XMLParser({
	ignoreAttributes: false,
	parseTagValue: false,
	isArray: (name, jPath) =>
		name === "entry" || name === "item" || jPath === "feed.entry.link",
});

type Node = Record<string, unknown>;

function asNode(value: unknown): Node | undefined {
	return typeof value === "object" && value !== null
		? (value as Node)
		: undefined;
}

// isArray で配列化されるタグにしか使わないため、単一要素を包む必要はない。
function nodesOf(value: unknown): Node[] {
	if (!Array.isArray(value)) return [];
	return value
		.map((item) => asNode(item))
		.filter((node): node is Node => node !== undefined);
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
	for (const link of nodesOf(links)) {
		const rel = link["@_rel"];
		if (rel !== undefined && rel !== "alternate") continue;
		const href = link["@_href"];
		if (typeof href === "string" && href !== "") return href;
	}
	return "";
}

// ISO 8601 と toUTCString 形式（RSS の pubDate はこれに一致する）だけが
// Date.parse で保証されている形式のため、読めなかった値は捨てる。
function dateOf(value: unknown): Date | undefined {
	if (typeof value !== "string") return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

// 日付でソートしたうえで表示するため、3 つのいずれかを欠くエントリは扱えない。
function toEntry(
	title: string,
	url: string,
	publishedAt: Date | undefined,
): ParsedEntry | undefined {
	if (title === "" || url === "" || publishedAt === undefined) return undefined;
	return { title, url, publishedAt };
}

function fromAtomEntry(entry: Node): ParsedEntry | undefined {
	return toEntry(
		textOf(entry.title),
		atomHref(entry.link),
		// published は Atom で必須ではない（RFC 4287 §4.2.9）。
		dateOf(entry.published) ?? dateOf(entry.updated),
	);
}

// Medium の RSS は link に source=rss-… という追跡用のクエリを付けてくる。
// 訪問者に渡す理由がないので落とす。URL として読めない値は手を加えずに返し、
// 捨てるかどうかの判断は toEntry に任せる。
function withoutTrackingQuery(url: string): string {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return url;
	}
	parsed.searchParams.delete("source");
	return parsed.toString();
}

function fromRssItem(item: Node): ParsedEntry | undefined {
	return toEntry(
		textOf(item.title),
		withoutTrackingQuery(textOf(item.link)),
		dateOf(item.pubDate),
	);
}

export function parseFeed(xml: string): ParsedEntry[] {
	const doc = asNode(parser.parse(xml));

	const feed = asNode(doc?.feed);
	if (feed) return nodesOf(feed.entry).flatMap((e) => fromAtomEntry(e) ?? []);

	const channel = asNode(asNode(doc?.rss)?.channel);
	if (channel)
		return nodesOf(channel.item).flatMap((i) => fromRssItem(i) ?? []);

	return [];
}

export async function fetchEntries(
	sources: readonly FeedSource[] = feedSources,
): Promise<Entry[]> {
	const results = await Promise.allSettled(
		sources.map(async ({ url, source }) => {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}: ${url}`);
			}
			return parseFeed(await response.text()).map((entry) => ({
				...entry,
				source,
			}));
		}),
	);

	return results
		.flatMap((result) => {
			if (result.status === "fulfilled") return result.value;
			// 1 本落ちても残りは出す。prerender = false に切り替えた日に、
			// 外部フィードの一時障害でページ全体を 500 にしたくない。
			console.warn("[feed] skipped a feed:", result.reason);
			return [];
		})
		.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
