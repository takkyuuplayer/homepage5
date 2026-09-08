import { describe, expect, it } from "vitest";
import { sortByPublishedAt } from "./entries";

describe("sortByPublishedAt", () => {
	const entries = [
		{ title: "old", publishedAt: new Date("2004-04-17") },
		{ title: "new", publishedAt: new Date("2019-01-16") },
		{ title: "middle", publishedAt: new Date("2016-12-14") },
	];

	it("should order entries from newest to oldest", () => {
		expect(sortByPublishedAt(entries).map((entry) => entry.title)).toEqual([
			"new",
			"middle",
			"old",
		]);
	});

	it("should not mutate the input", () => {
		sortByPublishedAt(entries);

		expect(entries.map((entry) => entry.title)).toEqual([
			"old",
			"new",
			"middle",
		]);
	});
});
