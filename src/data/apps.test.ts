import { describe, expect, it } from "vitest";
import { retiredApps, usableApps, type App } from "./apps";

const allApps: readonly App[] = [...usableApps, ...retiredApps];

describe("apps", () => {
	it("should keep every app migrated from homepage4.0 and the three added later", () => {
		expect(usableApps).toHaveLength(2);
		expect(retiredApps).toHaveLength(14);
	});

	// 型が保証するのはキーの存在までで、空文字は通ってしまう。
	it("should have a description in both languages", () => {
		for (const app of allApps) {
			expect(app.description.ja, app.title).not.toBe("");
			expect(app.description.en, app.title).not.toBe("");
		}
	});

	it("should have a readable date wherever a date is recorded", () => {
		for (const app of retiredApps) {
			for (const date of [app.publishedOn, app.lastUpdatedOn]) {
				if (date === undefined) continue;
				expect(date, app.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
				expect(new Date(date).getTime(), app.title).not.toBeNaN();
			}
		}
	});

	// 移植元の mixi_checker は mixc の行をコピーしていて、最終更新日が公開日より
	// 前になっていた。同じ取り違えを見つけられるようにする。
	it("should not have been updated before it was published", () => {
		const inverted = retiredApps.filter(
			(app) =>
				app.publishedOn &&
				app.lastUpdatedOn &&
				app.lastUpdatedOn < app.publishedOn,
		);

		expect(inverted.map((app) => app.title)).toEqual([]);
	});
});

// 表示側でソートしないため、この配列の順序がそのまま表示順になる。
describe("retiredApps order", () => {
	it("should list dated apps from newest to oldest", () => {
		const dates = retiredApps
			.map((app) => app.publishedOn)
			.filter((date) => date !== undefined);

		expect(dates).toEqual([...dates].sort().reverse());
	});

	it("should put apps without a date at the end", () => {
		const firstUndated = retiredApps.findIndex((app) => !app.publishedOn);
		const tail = firstUndated === -1 ? [] : retiredApps.slice(firstUndated);

		expect(tail.filter((app) => app.publishedOn)).toEqual([]);
	});
});

describe("apps links", () => {
	it("should link every usable app to a public URL", () => {
		for (const app of usableApps) {
			expect(app.url, app.title).toMatch(/^https:\/\//);
		}
	});

	// 移植元は url を組み立てていたため、Sta6DView の空欄が存在しないパスへの
	// リンクになっていた。データとファイルの対応を機械で確かめる。
	it("should ship every bundled zip it links to", () => {
		// glob は @types/node なしでビルド時にパスを列挙できる。値は読まないので
		// 遅延インポートのままキーだけ使う。
		const shipped = new Set(
			Object.keys(import.meta.glob("../../public/software/*.zip")).map((path) =>
				path.replace("../../public", ""),
			),
		);
		const bundled = retiredApps.filter(
			(app) => app.type === "standalone" && app.url?.startsWith("/software/"),
		);

		// 抽出条件を間違えてループが空回りしていないことを確かめる。
		expect(bundled).toHaveLength(6);

		for (const app of bundled) {
			expect(shipped, app.title).toContain(app.url);
		}
	});
});
