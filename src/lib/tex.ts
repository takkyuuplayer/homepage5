import temml from "temml";

// 問題文は「日本語の文章 + $…$ の数式」が混ざった LaTeX の文字列で持つ。表示側は
// text 断片をそのまま出し、math 断片だけを MathML に変換する。
export type TexSegment =
	| { kind: "text"; value: string }
	| { kind: "math"; value: string; display: boolean };

type Delimiter = {
	open: string;
	close: string;
	display: boolean;
	// align* は環境ごと Temml に渡す必要があるので、区切りを value に残す。
	keepDelimiters: boolean;
};

// 同じ位置に複数の区切りが当たるときは先に書いたものを取る。$$ を $ より先に
// 置かないと、$$ が空のインライン数式に見える。
const delimiters: readonly Delimiter[] = [
	{
		open: "\\begin{align*}",
		close: "\\end{align*}",
		display: true,
		keepDelimiters: true,
	},
	{ open: "$$", close: "$$", display: true, keepDelimiters: false },
	{ open: "$", close: "$", display: false, keepDelimiters: false },
];

function findNextDelimiter(
	source: string,
	from: number,
): { delimiter: Delimiter; index: number } | undefined {
	let found: { delimiter: Delimiter; index: number } | undefined;
	for (const delimiter of delimiters) {
		const index = source.indexOf(delimiter.open, from);
		if (index === -1) continue;
		if (found === undefined || index < found.index) {
			found = { delimiter, index };
		}
	}
	return found;
}

export function splitTex(source: string): TexSegment[] {
	const segments: TexSegment[] = [];
	const pushText = (value: string) => {
		if (value !== "") segments.push({ kind: "text", value });
	};

	let position = 0;
	while (position < source.length) {
		const next = findNextDelimiter(source, position);
		if (next === undefined) {
			pushText(source.slice(position));
			break;
		}

		const { delimiter, index } = next;
		const start = index + delimiter.open.length;
		const end = source.indexOf(delimiter.close, start);
		if (end === -1) {
			throw new Error(
				`${delimiter.open} が閉じられていません: ${source.slice(index, index + 40)}`,
			);
		}

		pushText(source.slice(position, index));
		segments.push({
			kind: "math",
			value: delimiter.keepDelimiters
				? source.slice(index, end + delimiter.close.length)
				: source.slice(start, end),
			display: delimiter.display,
		});
		position = end + delimiter.close.length;
	}

	return segments;
}

export type TexBlock =
	| { kind: "paragraph"; segments: TexSegment[] }
	| { kind: "display"; value: string };

// 段落は改行文字で区切る。display の数式は折り返せず、狭い画面では横にはみ出すので
// <p> に入れず単独のブロックとして返す。入れ物の作り方は表示側が決める。
export function parseTex(source: string): TexBlock[] {
	const blocks: TexBlock[] = [];
	for (const paragraph of source.split("\n")) {
		let segments: TexSegment[] = [];
		const flush = () => {
			// display の前後に残った空白だけの断片は段落にしない。
			const hasContent = segments.some(
				(segment) => segment.kind === "math" || segment.value.trim() !== "",
			);
			if (hasContent) blocks.push({ kind: "paragraph", segments });
			segments = [];
		};
		for (const segment of splitTex(paragraph)) {
			if (segment.kind === "math" && segment.display) {
				flush();
				blocks.push({ kind: "display", value: segment.value });
			} else {
				segments.push(segment);
			}
		}
		flush();
	}
	return blocks;
}

// MathML だけを出す。ブラウザがネイティブに描くので、クライアントに JS や CSS は
// 配らない。annotation に元の TeX を残すのは、コピーや支援技術のため。
// 変換できない LaTeX はビルドで止める（throwOnError）。
export function renderMath(value: string, display: boolean): string {
	return temml.renderToString(value, {
		displayMode: display,
		annotate: true,
		throwOnError: true,
	});
}
