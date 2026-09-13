import { describe, expect, it } from "vitest";
import { hosts } from "./hosting";

describe("hosts", () => {
	// 表示側でソートしないため、この配列の順序がそのまま表示順になる。
	it("should keep the homepage4.0 order and end with the current host", () => {
		expect(hosts.map((host) => host.name)).toEqual([
			"Yahoo!ジオシティーズ",
			"infoseek isweb",
			"land.to",
			"@PAGES",
			"000webhost",
			"Amazon EC2",
			"さくらVPS",
			"Amazon SAM",
			"Cloudflare Workers",
		]);
	});

	// 末尾はこのサイトが今動いている場所。終了扱いになっていたら、移転したのに
	// 追記を忘れているか、closed の付け間違い。
	it("should end with a host that is still running", () => {
		expect(hosts.at(-1)?.closed).toBeUndefined();
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

	// 終了したサービスでは closed.url がリンク先になるので、こちらも同じ条件を課す。
	it("should explain each closed host at an https page", () => {
		for (const host of hosts) {
			if (host.closed) {
				expect(new URL(host.closed.url).protocol, host.name).toBe("https:");
			}
		}
	});

	// このサイトは 2004 年に始まった（history.ts の最古の記録）。それより前に
	// 終わったサービスに置いていたはずがなく、未来の年は書き間違い。
	it("should have a closing year between the site's start and today", () => {
		const thisYear = new Date().getFullYear();

		for (const host of hosts) {
			if (host.closed) {
				expect(host.closed.year, host.name).toBeGreaterThanOrEqual(2004);
				expect(host.closed.year, host.name).toBeLessThanOrEqual(thisYear);
			}
		}
	});
});
