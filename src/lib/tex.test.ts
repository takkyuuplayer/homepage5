import { describe, expect, it } from "vitest";
import { parseTex, renderMath, splitTex } from "./tex";

describe("splitTex", () => {
	it("should return plain text as a single segment", () => {
		expect(splitTex("数式のない文")).toEqual([
			{ kind: "text", value: "数式のない文" },
		]);
	});

	it("should split inline math out of the surrounding text", () => {
		expect(splitTex("辺$AC$を$2:1$に内分する")).toEqual([
			{ kind: "text", value: "辺" },
			{ kind: "math", value: "AC", display: false },
			{ kind: "text", value: "を" },
			{ kind: "math", value: "2:1", display: false },
			{ kind: "text", value: "に内分する" },
		]);
	});

	it("should treat $$…$$ as display math without the delimiters", () => {
		expect(splitTex("解を求めよ. $$x^{2}=1$$")).toEqual([
			{ kind: "text", value: "解を求めよ. " },
			{ kind: "math", value: "x^{2}=1", display: true },
		]);
	});

	// align* は環境ごと変換器に渡すので、区切りを削らない。
	it("should keep the align* environment intact as display math", () => {
		const source = String.raw`このとき \begin{align*}a&=b\end{align*} が成り立つ.`;

		expect(splitTex(source)).toEqual([
			{ kind: "text", value: "このとき " },
			{
				kind: "math",
				value: String.raw`\begin{align*}a&=b\end{align*}`,
				display: true,
			},
			{ kind: "text", value: " が成り立つ." },
		]);
	});

	// TeX では $a$$b$ は隣り合った 2 つのインライン数式。$$ に読み替えない。
	it("should not read the end of one inline formula as the start of $$", () => {
		expect(splitTex("$a$$b$")).toEqual([
			{ kind: "math", value: "a", display: false },
			{ kind: "math", value: "b", display: false },
		]);
	});

	it("should keep newlines in text so the caller can split paragraphs", () => {
		expect(splitTex("一行目\n二行目")).toEqual([
			{ kind: "text", value: "一行目\n二行目" },
		]);
	});

	it("should return no segments for an empty string", () => {
		expect(splitTex("")).toEqual([]);
	});

	// 「このとき \\begin{align*}」のような文章と数式の間の空白は、表示の間隔として
	// 必要なので削らない。
	it("should keep whitespace-only text between formulas", () => {
		expect(splitTex("$a$ $b$")).toEqual([
			{ kind: "math", value: "a", display: false },
			{ kind: "text", value: " " },
			{ kind: "math", value: "b", display: false },
		]);
	});

	it("should take delimiters in order of appearance, not of kind", () => {
		const source = String.raw`$a$ と \begin{align*}b\end{align*} と $$c$$`;

		expect(splitTex(source).map((segment) => segment.value)).toEqual([
			"a",
			" と ",
			String.raw`\begin{align*}b\end{align*}`,
			" と ",
			"c",
		]);
	});

	it("should throw on an unclosed $$ instead of reading it as two inline formulas", () => {
		expect(() => splitTex("$$a$")).toThrow("$$ が閉じられていません");
	});

	it("should throw on an unclosed delimiter", () => {
		expect(() => splitTex("閉じない$AC")).toThrow("$ が閉じられていません");
		expect(() => splitTex(String.raw`\begin{align*}a&=b`)).toThrow(
			String.raw`\begin{align*} が閉じられていません`,
		);
	});
});

describe("parseTex", () => {
	it("should make one paragraph per line", () => {
		expect(parseTex("一行目\n二行目$x$")).toEqual([
			{ kind: "paragraph", segments: [{ kind: "text", value: "一行目" }] },
			{
				kind: "paragraph",
				segments: [
					{ kind: "text", value: "二行目" },
					{ kind: "math", value: "x", display: false },
				],
			},
		]);
	});

	// 問 8・15 の形。文の後ろに続く display の数式は段落から出す。
	it("should pull display math out of the paragraph", () => {
		expect(parseTex("解を求めよ. $$x=1$$")).toEqual([
			{
				kind: "paragraph",
				segments: [{ kind: "text", value: "解を求めよ. " }],
			},
			{ kind: "display", value: "x=1" },
		]);
	});

	// 問 3・4 の形。display の後ろに続く文は新しい段落になる。
	it("should start a new paragraph after display math", () => {
		expect(
			parseTex(String.raw`このとき \begin{align*}a&=b\end{align*} が成り立つ.`),
		).toEqual([
			{ kind: "paragraph", segments: [{ kind: "text", value: "このとき " }] },
			{ kind: "display", value: String.raw`\begin{align*}a&=b\end{align*}` },
			{
				kind: "paragraph",
				segments: [{ kind: "text", value: " が成り立つ." }],
			},
		]);
	});

	it("should drop paragraphs that hold only whitespace", () => {
		expect(parseTex("$$a$$ ")).toEqual([{ kind: "display", value: "a" }]);
	});
});

describe("renderMath", () => {
	it("should render MathML with the source TeX as annotation", () => {
		const html = renderMath(String.raw`\frac{a}{b}`, false);

		expect(html).toMatch(/^<math>/);
		expect(html).toContain("<mfrac>");
		expect(html).toContain(
			String.raw`<annotation encoding="application/x-tex">\frac{a}{b}</annotation>`,
		);
	});

	it("should mark display math as a block", () => {
		expect(renderMath("a=b", true)).toContain('display="block"');
	});

	// 問 2・3・4 は align* をそのまま渡す。aligned に書き換えなくても通ることを保証する。
	it("should render an align* environment in display mode", () => {
		const html = renderMath(
			String.raw`\begin{align*}a&=b\\c&=d\end{align*}`,
			true,
		);

		expect(html).toContain('display="block"');
		expect(html).toContain("<mtable");
	});

	it("should not mark inline math as a block", () => {
		expect(renderMath("a=b", false)).not.toContain('display="block"');
	});

	it("should throw on LaTeX that Temml cannot render", () => {
		expect(() => renderMath(String.raw`\mbox{S}`, false)).toThrow();
	});
});
