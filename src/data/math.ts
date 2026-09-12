import type { Lang } from "../i18n/ui";

export type Problem = {
	// 1 から始まる連番。解答 PDF の ans{NN}.pdf と対応する。
	number: number;
	topic: Record<Lang, string>;
	// LaTeX。数式は $…$ / $$…$$ / align* で囲む。段落は改行文字で区切る。
	statement: string;
	// 問 14 は解答が誤りだったため取りやめになっていて、PDF も注記だけ。
	withdrawn?: true;
};

// 解答 PDF の名前（拡張子なし）。取りやめの問には無い。
export function answerFile(problem: Problem): string | undefined {
	if (problem.withdrawn) return undefined;
	return `ans${String(problem.number).padStart(2, "0")}`;
}

export type Lecture = {
	// 講義プリントは日本語のみなので、タイトルも翻訳しない。
	title: string;
	// src/assets/math/{file}.pdf
	file: string;
};

// 分野は 10 種類。見出し「問題 N. 分野」の分野だけを翻訳する。
const topics = {
	planeGeometry: { ja: "平面幾何", en: "Plane geometry" },
	expressions: { ja: "数式", en: "Expressions" },
	quadraticFunctions: { ja: "2次関数", en: "Quadratic functions" },
	nestedRadicals: { ja: "二重根号", en: "Nested radicals" },
	algebraAndGeometry: { ja: "代数幾何", en: "Algebra and geometry" },
	degree7Equations: { ja: "7次関数", en: "Degree-7 equations" },
	numberTheory: { ja: "整数問題", en: "Number theory" },
	vectors: { ja: "ベクトル", en: "Vectors" },
	functions: { ja: "関数", en: "Functions" },
	expectedValue: { ja: "期待値", en: "Expected value" },
} satisfies Record<string, Record<Lang, string>>;

// String.raw で \ をそのまま書く。TeX の行末（スペース扱い）は 1 行につないである。
export const problems: readonly Problem[] = [
	{
		number: 1,
		topic: topics.planeGeometry,
		statement: String.raw`$AC=6, BC=3$の$\triangle ABC$で辺$AC$を$2:1$に内分する点を$D, $辺$BC$を$1:4$に外分する点を$E$とする. $AD=DE$のとき$BD$の長さを求めよ.`,
	},
	{
		number: 2,
		topic: topics.expressions,
		statement: String.raw`次のような式が成り立つとき, $a$の値を求めよ \begin{align*}\frac{x-y+2}{y-z}&=\frac{y-z+3}{z-x}=\frac{z-x-a}{x-y}\end{align*}`,
	},
	{
		number: 3,
		topic: topics.planeGeometry,
		statement: String.raw`$\triangle ABC$において, 辺$AC, BC$上に点$D, E$を取る. このとき \begin{align*}\quad \angle ABD: \angle CBD=3:1, \quad AB=DE=EC, \quad DB=DC\end{align*} が成り立つ. $ \angle BAC$の大きさを求めよ.`,
	},
	{
		number: 4,
		topic: topics.quadraticFunctions,
		statement: String.raw`頂点$(x, y)=(p, q)$の2次関数$y$がある. \begin{align*}y&=ax^{2}-a\left( a^{2}-6a-13 \right) \left( 2x-a^{2}+6a+13 \right) +a^{2}-5a-12 \qquad \left( p \leqq x \leqq q \right) \end{align*} $y$の最大値が$0$のとき$(p, q)$を求めよ.`,
	},
	{
		number: 5,
		topic: topics.nestedRadicals,
		statement: String.raw`$a, b$を正の有理数として二重根号$\sqrt{a+\sqrt{b}}$が外せる条件を示せ.`,
	},
	{
		number: 6,
		topic: topics.algebraAndGeometry,
		statement: String.raw`長さが$2, 6, 7, 9$の４つの線分で, 円に内接する四角形$ABCD$を作る. 対角線の交点を$E$とするとき, $\sin \angle AEB$の最大値を求めよ.`,
	},
	{
		number: 7,
		topic: topics.algebraAndGeometry,
		statement: String.raw`外接円の半径が$5/2, $内接円の半径が$1$の$\triangle ABC$について, $AB \cdot BC \cdot CA=60$のとき, $\triangle ABC$の各辺の長さを求めよ.`,
	},
	{
		number: 8,
		topic: topics.degree7Equations,
		statement: String.raw`複素数の範囲まで考えて, 以下の方程式の解を求めよ. $$128x^{7}+64x^{6}-224x^{5}-112x^{4}+104x^{3}+52x^{2}-6x-3=0$$`,
	},
	{
		number: 9,
		topic: topics.planeGeometry,
		statement: String.raw`$AB=AC$の$\triangle ABC$の辺$BC$上に$AD+DC=BD$となるように点$D$を取った. $ \angle ADB$の大きさを求めよ.`,
	},
	{
		number: 10,
		topic: topics.numberTheory,
		statement: [
			String.raw`ある整数$A$は$2$で割ると$1$余り, かつ$3$で割ると$2$余り, $ \cdots $かつ$n$で割ると$n-1$余る. $\left( n \geqq 2 \right) $`,
			String.raw`$\left( 1 \right) A$を自然数として, その例をひとつ示せ`,
			String.raw`$\left( 2 \right) \left| A \right| $が最小となる$A$を求めよ.`,
		].join("\n"),
	},
	{
		number: 11,
		topic: topics.numberTheory,
		statement: String.raw`$k$を$\left| k \right|  \geqq 2$を満たす整数とし, $A\left( k \right) =\displaystyle \sum_{n=0}^{ \infty }k^{-n}$とする. $\max A-\min A$を求めよ.`,
	},
	{
		number: 12,
		topic: topics.numberTheory,
		statement: String.raw`自然数$N$に対して, 各桁の和を$S_{1}\left( N \right) $とおく. $S_{1}\left( S_{1}\left( N \right)  \right) $を$S_{2}\left( N \right) $とおく. $S_{n}\left( N \right) $は同様の操作を$n$回したことを表す. $S_{n}\left( 2004^{n} \right) $が取りうる値を全て求めよ. ただし$n$は自然数.`,
	},
	{
		number: 13,
		topic: topics.numberTheory,
		statement: String.raw`各位に$0$を含まないような自然数の集合を$\mathbf{S}$とし, $\mathbf{S}$の要素のうち各位の和が$n$になるものの個数を$S\left( n \right) $で表す. $S\left( 15 \right) $を求めよ.`,
	},
	{
		number: 14,
		topic: topics.vectors,
		statement:
			"こちらの用意した解答が間違えで, さらにこの問題は有名な問題らしいので取りやめます. 東北大の入試にも出たことがあるらしいので気になる方は「フェルマー点」について調べてみてください.",
		withdrawn: true,
	},
	{
		number: 15,
		topic: topics.functions,
		statement: String.raw`以下の条件を満たす実数値連続関数$f\left( x \right) $を全て求めよ. $$f\left( x+y \right) +f\left( x-y \right) =2f\left( x \right) +2f\left( y \right) $$`,
	},
	{
		number: 16,
		topic: topics.expectedValue,
		statement:
			"選択式の問題がある. これは$n$個の解答欄に$n+k$個の選択肢の中から答えを選び記入していくタイプで答えに重複はないものとする. 出題の傾向などは無視することにして, 全く解答の検討がつかない場合, 得点の期待値を最大にする回答方法を示せ.",
	},
	{
		number: 17,
		topic: topics.numberTheory,
		statement: String.raw`$7493x+5273y=2006$を満たす整数$x, y$に対し$\left| x+y \right| $の最小値を求めよ.`,
	},
	{
		number: 18,
		topic: topics.numberTheory,
		statement: String.raw`$a, b$を互いに素なある定まった自然数とする. $0$以上の整数$x, y$を用いて整数$k=ax+by$を考える. $k$で表せない自然数の個数$S\left( a, b \right) $を求めよ`,
	},
];

// 移植元の math_class.tsx の並び順。
export const lectures: readonly Lecture[] = [
	{ title: "第一余弦定理", file: "lec_yogen" },
	{ title: "関数の対称点移動", file: "lec_kansu" },
	{ title: "円に内接する四角形", file: "lec_circle" },
	{ title: "固有ベクトル", file: "lec_senkei" },
];
