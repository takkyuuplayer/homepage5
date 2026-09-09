// 一覧に並べられるものの共通形。フィードの記事と歴史の記録が流れ込む。
export type ListEntry = {
	title: string;
	url?: string;
	publishedAt: Date;
};
