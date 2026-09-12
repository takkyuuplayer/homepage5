import { afterEach, describe, expect, it, vi } from "vitest";
import blogspot from "./__fixtures__/atom-blogspot.xml?raw";
import hatena from "./__fixtures__/atom-hatena.xml?raw";
import medium from "./__fixtures__/rss-medium.xml?raw";
import { fetchEntries, parseFeed } from "./feed";

describe("parseFeed", () => {
	it("should read an Atom entry whose title carries a type attribute", () => {
		expect(parseFeed(blogspot)).toEqual([
			{
				title: "Product Advertising APIのアカウント管理はイケてない",
				url: "https://takkyuuplayer.blogspot.com/2014/03/product-advertising-api.html",
				publishedAt: new Date("2014-03-02T00:44:00.000+09:00"),
			},
		]);
	});

	it("should read an Atom entry whose link omits rel", () => {
		expect(parseFeed(hatena)).toEqual([
			{
				title: "足し算ではなく掛け算で実装する",
				url: "https://takkyuuplayer.hatenablog.com/entry/2016/12/14/225435",
				publishedAt: new Date("2016-12-14T22:54:35+09:00"),
			},
		]);
	});

	it("should read an RSS feed that holds a single item", () => {
		expect(parseFeed(medium)).toEqual([
			{
				title: "Image hosting in the 2010s’ way",
				url: "https://medium.com/@takkyuuplayer/image-hosting-in-the-2010s-way-e346bdba3dfd",
				publishedAt: new Date("Wed, 16 Jan 2019 03:52:29 GMT"),
			},
		]);
	});

	function rssWithLink(link: string): string {
		return `<rss version="2.0"><channel><item>
			<title>linked</title>
			<link>${link}</link>
			<pubDate>Wed, 16 Jan 2019 03:52:29 GMT</pubDate>
		</item></channel></rss>`;
	}

	it("should drop only the source query from an RSS link", () => {
		const xml = rssWithLink("https://example.com/a?source=rss-x------2&page=2");

		expect(parseFeed(xml)[0].url).toBe("https://example.com/a?page=2");
	});

	it("should leave an RSS link that is not a URL as it is", () => {
		expect(parseFeed(rssWithLink("not a url"))[0].url).toBe("not a url");
	});

	it("should keep a numeric title as a string", () => {
		const xml = `<rss version="2.0"><channel><item>
			<title>2024</title>
			<link>https://example.com/a</link>
			<pubDate>Wed, 16 Jan 2019 03:52:29 GMT</pubDate>
		</item></channel></rss>`;

		expect(parseFeed(xml)[0].title).toBe("2024");
	});

	it("should fall back to updated when published is missing", () => {
		const xml = `<feed xmlns="http://www.w3.org/2005/Atom"><entry>
			<title>no published</title>
			<link href="https://example.com/a"/>
			<updated>2016-12-14T22:54:35+09:00</updated>
		</entry></feed>`;

		expect(parseFeed(xml)[0].publishedAt).toEqual(
			new Date("2016-12-14T22:54:35+09:00"),
		);
	});

	it.each([
		[
			"no readable date",
			`<title>undated</title>
			<link href="https://example.com/a"/>`,
		],
		[
			"no alternate link",
			`<title>replies only</title>
			<link rel="replies" href="https://example.com/comments"/>
			<published>2016-12-14T22:54:35+09:00</published>`,
		],
		[
			"no title",
			`<link href="https://example.com/a"/>
			<published>2016-12-14T22:54:35+09:00</published>`,
		],
	])("should drop an entry with %s", (_, entry) => {
		const xml = `<feed xmlns="http://www.w3.org/2005/Atom"><entry>${entry}</entry></feed>`;

		expect(parseFeed(xml)).toEqual([]);
	});

	it("should return no entries for an unknown root element", () => {
		expect(parseFeed("<html><body>not a feed</body></html>")).toEqual([]);
	});
});

describe("fetchEntries", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	function stubFetch(bodies: Record<string, string | number | Error>) {
		vi.stubGlobal(
			"fetch",
			vi.fn(async (url: string) => {
				const body = bodies[url];
				if (body instanceof Error) throw body;
				if (typeof body === "number") {
					return new Response("", { status: body });
				}
				return new Response(body);
			}),
		);
	}

	it("should merge every feed newest first", async () => {
		stubFetch({
			"https://blogspot.example/feed": blogspot,
			"https://hatena.example/feed": hatena,
			"https://medium.example/feed": medium,
		});

		const entries = await fetchEntries([
			{ url: "https://blogspot.example/feed", source: "blogger" },
			{ url: "https://hatena.example/feed", source: "hatena" },
			{ url: "https://medium.example/feed", source: "medium" },
		]);

		expect(entries.map((entry) => entry.publishedAt.getUTCFullYear())).toEqual([
			2019, 2016, 2014,
		]);
	});

	// 出典はフィードの中身ではなく、どのフィードを読んだかで決まる。fixture の
	// 架空ホストでも正しく付くことで、記事 URL から推測していないことを確かめる。
	it("should mark every entry with the source of its feed", async () => {
		stubFetch({
			"https://hatena.example/feed": hatena,
			"https://medium.example/feed": medium,
		});

		const entries = await fetchEntries([
			{ url: "https://hatena.example/feed", source: "hatena" },
			{ url: "https://medium.example/feed", source: "medium" },
		]);

		expect(entries.map((entry) => [entry.source, entry.url])).toEqual([
			[
				"medium",
				"https://medium.com/@takkyuuplayer/image-hosting-in-the-2010s-way-e346bdba3dfd",
			],
			[
				"hatena",
				"https://takkyuuplayer.hatenablog.com/entry/2016/12/14/225435",
			],
		]);
	});

	it.each([
		["a request that rejects", new Error("ECONNREFUSED")],
		["an error status", 429],
	])("should keep the surviving feeds despite %s", async (_, failure) => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		stubFetch({
			"https://hatena.example/feed": hatena,
			"https://broken.example/feed": failure,
		});

		const entries = await fetchEntries([
			{ url: "https://hatena.example/feed", source: "hatena" },
			{ url: "https://broken.example/feed", source: "blogger" },
		]);

		expect(entries).toHaveLength(1);
		expect(warn).toHaveBeenCalledOnce();
	});
});
