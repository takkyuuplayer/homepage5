import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { langs } from "../i18n/ui";
import { renderMath, splitTex } from "../lib/tex";
import { lectures, problems } from "./math";

function assetPath(file: string): string {
	return fileURLToPath(new URL(`../assets/math/${file}`, import.meta.url));
}

describe("problems", () => {
	it("should keep every problem migrated from homepage4.0", () => {
		expect(problems).toHaveLength(18);
	});

	// 表示側でソートしないため、この配列の順序がそのまま表示順になる。番号は
	// 解答 PDF の名前と対応するので、抜けや重複があると別の問題の答えを出す。
	it("should be numbered 1 to 18 in order", () => {
		expect(problems.map((problem) => problem.number)).toEqual(
			Array.from({ length: 18 }, (_, index) => index + 1),
		);
	});

	it("should have a statement and a topic in both languages", () => {
		for (const problem of problems) {
			expect(problem.statement, String(problem.number)).not.toBe("");
			for (const lang of langs) {
				expect(problem.topic[lang], String(problem.number)).not.toBe("");
			}
		}
	});

	it("should mark only problem 14 as withdrawn", () => {
		const withdrawn = problems.filter((problem) => problem.withdrawn);

		expect(withdrawn.map((problem) => problem.number)).toEqual([14]);
	});

	// ビルドでも同じ失敗は見つかるが、LaTeX の誤りを直すループはこちらの方が速い。
	it("should have statements that Temml can render", () => {
		for (const problem of problems) {
			for (const paragraph of problem.statement.split("\n")) {
				for (const segment of splitTex(paragraph)) {
					if (segment.kind !== "math") continue;
					expect(
						() => renderMath(segment.value, segment.display),
						`問 ${problem.number}: ${segment.value}`,
					).not.toThrow();
				}
			}
		}
	});

	it("should ship an answer PDF for every problem that is not withdrawn", () => {
		for (const problem of problems) {
			const file = `ans${String(problem.number).padStart(2, "0")}.pdf`;
			expect(existsSync(assetPath(file)), file).toBe(!problem.withdrawn);
		}
	});
});

describe("lectures", () => {
	it("should keep every lecture migrated from homepage4.0", () => {
		expect(lectures).toHaveLength(4);
	});

	it("should have a title and a distinct file for every lecture", () => {
		const files = lectures.map((lecture) => lecture.file);

		expect(new Set(files).size).toBe(lectures.length);
		for (const lecture of lectures) {
			expect(lecture.title).not.toBe("");
		}
	});

	it("should ship every lecture PDF it links to", () => {
		for (const lecture of lectures) {
			expect(existsSync(assetPath(`${lecture.file}.pdf`)), lecture.file).toBe(
				true,
			);
		}
	});
});
