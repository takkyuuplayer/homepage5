import { describe, expect, it } from "vitest";
import { formatDate, toDateString } from "./date";

describe("formatDate", () => {
	it("should format a date for each locale", () => {
		const date = new Date("2016-12-14T22:54:35+09:00");

		expect(formatDate(date, "ja")).toBe("2016/12/14");
		expect(formatDate(date, "en")).toBe("12/14/2016");
	});

	it("should show the date in the author's time zone", () => {
		// UTC では 2019-01-16 だが、+09:00 では 2019-01-17 になる時刻。
		const date = new Date("2019-01-16T20:00:00Z");

		expect(formatDate(date, "ja")).toBe("2019/01/17");
	});

	it("should keep a date-only value on the same day", () => {
		expect(formatDate(new Date("2004-04-17"), "ja")).toBe("2004/04/17");
	});
});

describe("toDateString", () => {
	it("should return a machine readable date", () => {
		expect(toDateString(new Date("2016-12-14T22:54:35+09:00"))).toBe(
			"2016-12-14",
		);
	});

	it("should agree with what is displayed", () => {
		const date = new Date("2019-01-16T20:00:00Z");

		expect(toDateString(date)).toBe("2019-01-17");
		expect(formatDate(date, "ja")).toBe("2019/01/17");
	});
});
