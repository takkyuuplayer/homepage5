import type { Lang } from "../i18n/ui";
import { sortByPublishedAt, type ListEntry } from "../lib/entries";

export type HistoryItem = {
	// 時刻を持たない記録なので ISO 8601 の日付だけを持つ。
	date: string;
	title: Record<Lang, string>;
	url?: string;
};

// homepage4.0 の src/components/History.tsx から移植。日本語は原文のまま。
// 旧データは日付順に並んでいない箇所があるため、表示側でソートする。
export const history: readonly HistoryItem[] = [
	{
		date: "2018-11-01",
		title: { ja: "ホームページをリニューアル", en: "Homepage renewal" },
	},
	{
		date: "2015-02-12",
		title: { ja: "Web App Bank 公開", en: "Released Web App Bank" },
		url: "http://takkyuuplayer.github.io/",
	},
	{
		date: "2014-12-01",
		title: {
			ja: "一人アドベントカレンダー 開始",
			en: "Started a solo Advent Calendar",
		},
		url: "http://takkyuuplayer.hatenablog.com/entry/2014/12/02/010000",
	},
	{
		date: "2013-06-15",
		title: {
			ja: "Twitter Bootstrap 利用にデザイン変更",
			en: "Redesigned the site with Twitter Bootstrap",
		},
	},
	{
		date: "2013-02-16",
		title: {
			ja: "プライベート図書館 Pribrary 公開",
			en: "Released Pribrary, a private library",
		},
	},
	{
		date: "2011-06-04",
		title: {
			ja: "レイアウト更新に伴うサーバー移転",
			en: "Moved the server as part of a layout update",
		},
	},
	{ date: "2011-03-21", title: { ja: "当てったー追加", en: "Added Atetter" } },
	{ date: "2010-06-18", title: { ja: "AutoIE追加", en: "Added AutoIE" } },
	{
		date: "2010-05-09",
		title: { ja: "Java＞twitter追加", en: "Added Java > twitter" },
	},
	{
		date: "2009-11-04",
		title: { ja: "Java＞mixi_checker追加", en: "Added Java > mixi_checker" },
	},
	{
		date: "2009-10-25",
		title: { ja: "Java＞mixc バージョンUP", en: "Updated Java > mixc" },
	},
	{
		date: "2009-03-31",
		title: { ja: "Java＞mixc 追加", en: "Added Java > mixc" },
	},
	{
		date: "2009-03-11",
		title: { ja: "Java＞Gufa バージョンUP", en: "Updated Java > Gufa" },
	},
	{
		date: "2009-03-01",
		title: { ja: "Java＞Gufa バージョンUP", en: "Updated Java > Gufa" },
	},
	{
		date: "2009-02-25",
		title: { ja: "Java＞Gufa バージョンUP", en: "Updated Java > Gufa" },
	},
	{
		date: "2008-11-23",
		title: { ja: "Java＞Gufa バージョンUP", en: "Updated Java > Gufa" },
	},
	{
		date: "2008-08-01",
		title: { ja: "Java＞Gufa バージョンUP", en: "Updated Java > Gufa" },
	},
	{
		date: "2008-06-14",
		title: { ja: "Java＞Gufa バージョンアップ", en: "Updated Java > Gufa" },
	},
	{
		date: "2008-05-17",
		title: { ja: "Java＞Gufa 追加", en: "Added Java > Gufa" },
	},
	{
		date: "2007-12-07",
		title: {
			ja: "Java＞Sta6DView バージョンUP",
			en: "Updated Java > Sta6DView",
		},
	},
	{
		date: "2007-11-27",
		title: { ja: "Java＞Sta6DView 追加", en: "Added Java > Sta6DView" },
	},
	{
		date: "2007-04-18",
		title: {
			ja: "レポート置き場のセキュリティ向上",
			en: "Improved the security of Report Storage",
		},
	},
	{
		date: "2007-03-21",
		title: {
			ja: "数学王国→問17,18追加",
			en: "Added quizzes 17 and 18 to Math Kingdom",
		},
	},
	{
		date: "2007-03-06",
		title: {
			ja: "物理学科→レポート置き場に変更",
			en: "Renamed Physics Department to Report Storage",
		},
	},
	{
		date: "2007-03-02",
		title: { ja: "掲示板追加", en: "Added a message board" },
	},
	{
		date: "2007-02-10",
		title: {
			ja: "物理学科＞物理ゼミ＞全解答例一部訂正",
			en: "Corrected some model answers in Physics Department > Physics Seminar",
		},
	},
	{
		date: "2007-02-10",
		title: {
			ja: "数学教室＞円に内接する四角形追加",
			en: "Added 'Cyclic quadrilaterals' to Math Class",
		},
	},
	{
		date: "2007-02-10",
		title: {
			ja: "数学教室＞固有ベクトル追加",
			en: "Added 'Eigenvectors' to Math Class",
		},
	},
	{
		date: "2007-02-10",
		title: {
			ja: "数学王国＞解答のページ追加",
			en: "Added an answers page to Math Kingdom",
		},
	},
	{
		date: "2007-01-16",
		title: {
			ja: "物理学科＞数学Ａ更新",
			en: "Updated Physics Department > Math A",
		},
	},
	{
		date: "2007-01-16",
		title: {
			ja: "物理学科＞物理ゼミ更新",
			en: "Updated Physics Department > Physics Seminar",
		},
	},
	{
		date: "2007-01-12",
		title: {
			ja: "物理学科＞英語更新",
			en: "Updated Physics Department > English",
		},
	},
	{
		date: "2007-01-10",
		title: {
			ja: "物理学科＞場の数理＞レポート訂正(２回目)",
			en: "Corrected the report in Physics Department > Mathematics of Fields (2nd time)",
		},
	},
	{
		date: "2006-12-25",
		title: {
			ja: "物理学科＞場の数理＞レポート訂正",
			en: "Corrected the report in Physics Department > Mathematics of Fields",
		},
	},
	{
		date: "2006-12-20",
		title: {
			ja: "物理学科＞数学Ａ＞線形空間・行列式演習訂正",
			en: "Corrected the linear space and determinant exercises in Physics Department > Math A",
		},
	},
	{
		date: "2006-12-14",
		title: { ja: "掲示板停止", en: "Shut down the message board" },
	},
	{
		date: "2006-12-13",
		title: {
			ja: "物理学科＞物理ゼミ更新",
			en: "Updated Physics Department > Physics Seminar",
		},
	},
	{
		date: "2006-12-13",
		title: {
			ja: "物理学科＞数学Ａ更新",
			en: "Updated Physics Department > Math A",
		},
	},
	{
		date: "2006-12-13",
		title: {
			ja: "物理学科＞場の数理更新",
			en: "Updated Physics Department > Mathematics of Fields",
		},
	},
	{
		date: "2006-12-13",
		title: {
			ja: "物理学科＞実験１Ｂ更新",
			en: "Updated Physics Department > Experiment 1B",
		},
	},
	{
		date: "2006-12-08",
		title: {
			ja: "物理学科＞物理ゼミ更新",
			en: "Updated Physics Department > Physics Seminar",
		},
	},
	{
		date: "2006-11-26",
		title: {
			ja: "物理学科＞数学Ａ更新",
			en: "Updated Physics Department > Math A",
		},
	},
	{
		date: "2006-11-15",
		title: {
			ja: "物理学科＞英語Ⅰ更新",
			en: "Updated Physics Department > English I",
		},
	},
	{
		date: "2006-11-15",
		title: {
			ja: "物理学科＞実験１Ｂ更新",
			en: "Updated Physics Department > Experiment 1B",
		},
	},
	{
		date: "2006-11-15",
		title: {
			ja: "物理学科＞物理ゼミ更新",
			en: "Updated Physics Department > Physics Seminar",
		},
	},
	{
		date: "2006-10-27",
		title: {
			ja: "物理学科＞実験１Ｂ更新",
			en: "Updated Physics Department > Experiment 1B",
		},
	},
	{
		date: "2006-10-25",
		title: {
			ja: "物理学科＞実験１Ｂ更新",
			en: "Updated Physics Department > Experiment 1B",
		},
	},
	{
		date: "2006-09-30",
		title: {
			ja: "物理学科＞物理ゼミ更新",
			en: "Updated Physics Department > Physics Seminar",
		},
	},
	{ date: "2006-09-27", title: { ja: "Java更新", en: "Updated Java" } },
	{ date: "2006-09-23", title: { ja: "Java更新", en: "Updated Java" } },
	{ date: "2006-08-30", title: { ja: "ちょっと進化", en: "Evolved a little" } },
	{
		date: "2006-06-09",
		title: { ja: "物理ゼミナール発信", en: "Launched the Physics Seminar" },
	},
	{
		date: "2006-03-16",
		title: { ja: "更新再開宣言", en: "Announced that updates would resume" },
	},
	{
		date: "2005-07-30",
		title: { ja: "更新中断宣言", en: "Announced a pause in updates" },
	},
	{
		date: "2005-04-19",
		title: {
			ja: "数学教室「おもりの原理」追加。",
			en: "Added 'The principle of weights' to Math Class",
		},
	},
	{
		date: "2005-03-28",
		title: {
			ja: "数学教室「倍数判定」追加。",
			en: "Added 'Divisibility tests' to Math Class",
		},
	},
	{
		date: "2005-03-17",
		title: {
			ja: "数学教室「第１余弦定理」追加。",
			en: "Added 'The first law of cosines' to Math Class",
		},
	},
	{
		date: "2005-03-10",
		title: {
			ja: "不評なのでトップページとバナーを改変。",
			en: "Reworked the top page and the banner after poor feedback",
		},
	},
	{
		date: "2005-03-09",
		title: {
			ja: "ソースコード失って開発できなくなったので「StudyTool」を一般公開。",
			en: "Released StudyTool to the public after losing its source code",
		},
	},
	{
		date: "2005-02-28",
		title: { ja: "数学王国リニューアル。", en: "Renewed Math Kingdom" },
	},
	{
		date: "2005-01-17",
		title: {
			ja: "数学教室「ベクトルの外積」追加。",
			en: "Added 'Cross products' to Math Class",
		},
	},
	{ date: "2005-01-05", title: { ja: "リンク追加", en: "Added links" } },
	{
		date: "2004-12-30",
		title: { ja: "Cipherをバージョンアップ", en: "Updated Cipher" },
	},
	{ date: "2004-12-26", title: { ja: "リンク追加", en: "Added links" } },
	{
		date: "2004-12-20",
		title: { ja: "PcEndをバージョンアップ", en: "Updated PcEnd" },
	},
	{
		date: "2004-12-19",
		title: { ja: "javaにソフト「Cipher」追加。", en: "Added Cipher to Java" },
	},
	{
		date: "2004-11-14",
		title: { ja: "PcEndをバージョンアップ", en: "Updated PcEnd" },
	},
	{
		date: "2004-10-17",
		title: { ja: "数学教室更新。", en: "Updated Math Class" },
	},
	{
		date: "2004-10-17",
		title: { ja: "PcEndをバージョンアップ", en: "Updated PcEnd" },
	},
	{
		date: "2004-10-12",
		title: { ja: "PcEndをバージョンアップ", en: "Updated PcEnd" },
	},
	{
		date: "2004-10-08",
		title: { ja: "PcEndをバージョンアップ", en: "Updated PcEnd" },
	},
	{
		date: "2004-10-06",
		title: { ja: "javaにソフト追加。", en: "Added software to Java" },
	},
	{
		date: "2004-09-23",
		title: {
			ja: "バナー追加。リンクを強化。",
			en: "Added a banner and expanded the links",
		},
	},
	{
		date: "2004-09-19",
		title: {
			ja: "ホームページの歴史を書き始める。",
			en: "Started writing the history of this homepage",
		},
	},
	{
		date: "2004-09-19",
		title: {
			ja: "数学教室更新。数学王国更新。",
			en: "Updated Math Class and Math Kingdom",
		},
	},
	{
		date: "2004-04-17",
		title: {
			ja: "ホームページ作成開始",
			en: "Started building this homepage",
		},
	},
];

export function historyEntries(lang: Lang): ListEntry[] {
	return sortByPublishedAt(
		history.map((item) => ({
			title: item.title[lang],
			url: item.url,
			publishedAt: new Date(item.date),
		})),
	);
}
