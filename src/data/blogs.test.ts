import { describe, expect, it } from "vitest";
import { blogs, feedSources, hasFeed } from "./blogs";

describe("blogs", () => {
	it("should keep the four blogs listed in the homepage4.0 navigation", () => {
		expect(blogs.map((blog) => blog.id)).toEqual([
			"medium",
			"hatena",
			"blogger",
			"lang8",
		]);
	});

	// 型が保証するのはキーの存在までで、空文字は通ってしまう。
	it("should have a name in both languages", () => {
		for (const blog of blogs) {
			expect(blog.name.ja, blog.id).not.toBe("");
			expect(blog.name.en, blog.id).not.toBe("");
		}
	});

	it("should not end before it began", () => {
		for (const blog of blogs.filter(hasFeed)) {
			expect(blog.from, blog.id).toBeLessThanOrEqual(blog.to);
		}
	});

	// 表示側でソートしないため、この配列の順序がそのまま表示順になる。
	it("should list the blogs with a feed from newest to oldest", () => {
		const starts = blogs.filter(hasFeed).map((blog) => blog.from);

		expect(starts).toEqual([...starts].sort((a, b) => b - a));
	});

	it("should place the blogs without a feed after the ones with a feed", () => {
		const firstClosed = blogs.findIndex((blog) => !hasFeed(blog));
		const lastWithFeed = blogs.findLastIndex(hasFeed);

		expect(firstClosed).toBeGreaterThan(lastWithFeed);
	});
});

describe("feedSources", () => {
	it("should hold one feed per blog that has one", () => {
		expect(feedSources.map((feed) => feed.source)).toEqual([
			"medium",
			"hatena",
			"blogger",
		]);
	});

	it("should not fetch the same feed twice", () => {
		const urls = feedSources.map((feed) => feed.url);

		expect(new Set(urls).size).toBe(urls.length);
	});
});
