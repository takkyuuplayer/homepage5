import type { BlogSource } from "../data/blogs";

// 一覧に並べられるものの共通形。フィードの記事と歴史の記録が流れ込む。
// 出典はフィードの記事だけが持ち、歴史の記録には無い。
export type ListEntry = {
	title: string;
	url?: string;
	publishedAt: Date;
	source?: BlogSource;
};
