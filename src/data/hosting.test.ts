import { describe, expect, it } from "vitest";
import { hosts } from "./hosting";

describe("hosts", () => {
	// 表示側でソートしないため、この配列の順序がそのまま表示順になる。
	it("should keep the homepage4.0 order and end with the current host", () => {
		expect(hosts.map((host) => host.name)).toEqual([
			"Yahoo",
			"Infoseek",
			"land.to",
			"@PAGES",
			"000webhost",
			"Amazon EC2",
			"さくらVPS",
			"Amazon SAM",
			"Cloudflare Workers",
		]);
	});

	it("should not list the same host twice", () => {
		const names = hosts.map((host) => host.name);

		expect(new Set(names).size).toBe(names.length);
	});

	it("should have an absolute url for every host", () => {
		for (const host of hosts) {
			expect(() => new URL(host.url), host.name).not.toThrow();
		}
	});

	// 生きているリンク先は転送に頼らず最終 URL を書く。https でないものは
	// 転送先に置き換え忘れている可能性が高い。
	it("should link to https for hosts that are still running", () => {
		for (const host of hosts.filter((host) => !host.closed)) {
			expect(new URL(host.url).protocol, host.name).toBe("https:");
		}
	});
});
