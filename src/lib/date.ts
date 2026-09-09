import type { Lang } from "../i18n/ui";

// フィードの日付は +09:00 で、履歴は時刻を持たない。ビルド時（実行環境の
// タイムゾーン）とリクエスト時（Workers は UTC）で表示日がずれないよう、
// 書き手のタイムゾーンに固定する。
const timeZone = "Asia/Tokyo";

const options: Intl.DateTimeFormatOptions = {
	timeZone,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
};

// フォーマッタの生成はロケール解決を伴い format() より重い。エントリごとに
// 作り直さないよう、ロケールごとに 1 つだけ持つ。
const formatters = new Map<Lang, Intl.DateTimeFormat>();

function formatterFor(lang: Lang): Intl.DateTimeFormat {
	let formatter = formatters.get(lang);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(lang, options);
		formatters.set(lang, formatter);
	}
	return formatter;
}

export function formatDate(date: Date, lang: Lang): string {
	return formatterFor(lang).format(date);
}

const partsFormatter = new Intl.DateTimeFormat("en-US", options);

// <time datetime> は機械可読な形式でなければならないため、表示と同じ
// タイムゾーンで YYYY-MM-DD を組み立てる。
export function toDateString(date: Date): string {
	const parts = partsFormatter.formatToParts(date);
	const valueOf = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? "";
	return `${valueOf("year")}-${valueOf("month")}-${valueOf("day")}`;
}
