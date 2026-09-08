import { describe, expect, it } from "vitest";
import { history, historyEntries } from "./history";

describe("history", () => {
	it("should keep every record migrated from homepage4.0", () => {
		expect(history).toHaveLength(76);
	});

	it("should have a readable date for every record", () => {
		for (const item of history) {
			expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(new Date(item.date).getTime()).not.toBeNaN();
		}
	});

	it("should have a title for every record", () => {
		for (const item of history) {
			expect(item.title).toBeTruthy();
		}
	});
});

describe("historyEntries", () => {
	it("should order records from newest to oldest", () => {
		const entries = historyEntries();

		expect(entries).toHaveLength(history.length);
		expect(entries[0].publishedAt).toEqual(new Date("2018-11-01"));
		expect(entries.at(-1)?.publishedAt).toEqual(new Date("2004-04-17"));
	});

	it("should sort records that the migrated data listed out of order", () => {
		const dates = historyEntries().map((entry) => entry.publishedAt.getTime());

		expect(dates).toEqual([...dates].sort((a, b) => b - a));
	});

	it("should keep the link of a record that has one", () => {
		const linked = historyEntries().filter((entry) => entry.url);

		expect(linked.map((entry) => entry.url)).toEqual([
			"http://takkyuuplayer.github.io/",
			"http://takkyuuplayer.hatenablog.com/entry/2014/12/02/010000",
		]);
	});
});
