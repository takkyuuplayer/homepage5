import type { Lang } from "../i18n/ui";

// homepage4.0 の Navbar.tsx にあった「ブログ」ドロップダウンと feed.go のフィード一覧を
// 1 か所にまとめたもの。どのブログがあるかを記述する唯一の場所で、ブログページの
// 紹介と、記事一覧に流し込むフィードの両方がここから導かれる。

// 記事一覧で出典を示す識別子。アイコンと読み上げ用の名前がこれで決まる。
export type BlogSource = "medium" | "hatena" | "blogger";

// 記事一覧に流れ込むブログ。期間はフィードの記事日付から確認した年（西暦）。
export type FeedBlog = {
	id: BlogSource;
	name: Record<Lang, string>;
	note?: Record<Lang, string>;
	url: string;
	feedUrl: string;
	from: number;
	to: number;
};

// 紹介にだけ載るブログ。lang-8 はサービスが終了していてリンク先が消えており、
// いつ書いていたかも記録が無い。書いていた場所の記録として url は残す。
export type ClosedBlog = {
	id: "lang8";
	name: Record<Lang, string>;
	note?: Record<Lang, string>;
	url: string;
	closed: true;
};

export type Blog = FeedBlog | ClosedBlog;

export function hasFeed(blog: Blog): blog is FeedBlog {
	return "feedUrl" in blog;
}

// 新しい順。期間の無い lang-8 は末尾に置く。
export const blogs: readonly Blog[] = [
	{
		id: "medium",
		name: { ja: "Medium", en: "Medium" },
		note: { ja: "英語の技術記事", en: "Tech posts in English" },
		url: "https://medium.com/@takkyuuplayer",
		feedUrl: "https://medium.com/feed/@takkyuuplayer",
		from: 2019,
		to: 2019,
	},
	{
		id: "hatena",
		name: { ja: "はてなブログ", en: "Hatena Blog" },
		url: "https://takkyuuplayer.hatenablog.com/",
		feedUrl: "https://takkyuuplayer.hatenablog.com/feed",
		from: 2014,
		to: 2016,
	},
	{
		id: "blogger",
		name: { ja: "Blogger", en: "Blogger" },
		url: "https://takkyuuplayer.blogspot.com/",
		// Blogger のフィードは既定で 25 件しか返さない。max-results で件数を指定できる
		// （Blogger Developer's Guide: Protocol の「Retrieving posts using query parameters」）。
		// 全 37 件を取るため、上限に余裕を持たせた値を付ける。
		feedUrl:
			"https://takkyuuplayer.blogspot.com/feeds/posts/summary?max-results=150",
		from: 2010,
		to: 2014,
	},
	{
		id: "lang8",
		name: { ja: "lang-8", en: "lang-8" },
		note: { ja: "英語の日記", en: "Diary in English" },
		url: "http://lang-8.com/44064/journals",
		closed: true,
	},
];

// fetchEntries の既定の取得先。フィードを持つブログの URL と出典の組。
export type FeedSource = { url: string; source: BlogSource };

export const feedSources: readonly FeedSource[] = blogs
	.filter(hasFeed)
	.map((blog) => ({ url: blog.feedUrl, source: blog.id }));
