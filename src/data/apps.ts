import type { Lang } from "../i18n/ui";

// homepage4.0 の web/src/data/apps.ts（TSV）と web/etc/i18n/homepage.tsv の app.* 行を
// 移植したもの。移植元の active / inactive という語は使わず、「今、説明どおりの手順で
// 使えるか」で二分している。Heroku の無料プラン終了でデプロイ手順が成立しなくなった
// ものは、コードが残っていても retiredApps 側に置く。

export type App = {
	title: string;
	description: Record<Lang, string>;
	// Sta6DView のように、配布物も配布先も残っていないものがある。
	url?: string;
	// 押すと何が起こるかを url の拡張子からは導かない。GitHub の archive URL は
	// リポジトリ側の都合で形が変わるため、作者の意図としてここに持つ。
	type: "web" | "standalone";
};

// 動作環境・公開日・バージョンは、記録が残っているものと残っていないものがある。
// 日付は ISO 8601。表示時に Date へ変換する。
export type RetiredApp = App & {
	env?: string;
	publishedOn?: string;
	version?: string;
	lastUpdatedOn?: string;
};

// 公開日を持たないので並べる軸がない。移植元の相対順をそのまま保つ。
export const usableApps: readonly App[] = [
	{
		title: "google-drive-transfer",
		description: {
			ja: "Google Drive のアカウント移行に",
			en: "To migrate google accounts.",
		},
		url: "https://github.com/takkyuuplayer/google-drive-transfer#google-drive-transfer",
		type: "web",
	},
	{
		title: "v-anki",
		description: {
			ja: "英英辞典を使って Anki 用の単語帳を作る（V 言語版）",
			en: "To generate flashcards for Anki with online English-English dictionaries, written in V.",
		},
		url: "https://github.com/takkyuuplayer/v-anki",
		type: "web",
	},
];

// 公開日の降順。日付の記録がないものは末尾にまとめ、その中は実際の新しさ順に置く。
// ただし hackme（問題編）と hackyou（解答編）だけは内容上の順序を優先する。
export const retiredApps: readonly RetiredApp[] = [
	{
		title: "AutoIE",
		description: { ja: "IE を自動で動かす", en: "To automate IE." },
		url: "/software/autoie.zip",
		type: "standalone",
		env: "WindowsXP, Vista",
		publishedOn: "2010-06-18",
	},
	{
		title: "mixi_checker",
		description: {
			ja: "日記の更新，コメントへの返信をメールでお知らせ",
			en: "To get email notification when your mixi diary gets comments or friends write new entries.",
		},
		url: "/software/mixi_checker.zip",
		type: "standalone",
		env: "WindowsXP, Vista",
		publishedOn: "2009-11-04",
	},
	{
		title: "mixc",
		description: {
			ja: "mixiの日記に出てきた単語数，コメント回数などを計算",
			en: "To count words and comments in a diary in mixi.",
		},
		url: "/software/mixc.zip",
		type: "standalone",
		env: "WindowsXP, Vista",
		publishedOn: "2009-03-31",
		version: "1.10",
		lastUpdatedOn: "2009-10-25",
	},
	{
		title: "Gufa",
		description: {
			ja: "DL-Videoのエンジンを利用して，表示中のページからリンクされている全ての動画をダウンロード。家にインターネットを引いていなかったので、とある種類の動画を大学でこっそりダウンロードするために作った。",
			en: "To download all movies linked from a web page. I developed this software to download a sort of movies in the university secretly, as I didn't have the internet connection at home.",
		},
		url: "/software/gufa.zip",
		type: "standalone",
		env: "WindowsXP, Vista",
		publishedOn: "2008-05-17",
		version: "2.03",
		lastUpdatedOn: "2009-03-02",
	},
	{
		title: "Sta6DView",
		description: {
			ja: "「Stage6勝手にDB」にある動画の存在チェック",
			en: 'To check deadlink in "Stage6勝手にDB".',
		},
		type: "standalone",
		env: "WindowsXP, Vista",
		publishedOn: "2007-11-27",
		lastUpdatedOn: "2007-12-07",
	},
	{
		title: "Cipher",
		description: {
			ja: "ファイルの暗号化ソフトです。ＲＳＡで暗号化しているので非常に時間がかかります。 １ＭＢを暗号化するとパスワードにもよりますが約30秒かかります。",
			en: "To encrypt file. It takes a long time as its algorithm is RSA. It took about 30 sec to encrypt 30MB file.",
		},
		url: "/software/cipher.zip",
		type: "standalone",
		env: "WindowsXP",
		publishedOn: "2004-12-19",
		version: "1.01",
		lastUpdatedOn: "2004-12-30",
	},
	{
		title: "PcEnd",
		description: {
			ja: "どうしてもパソコンを起動してしまう人向け。指定時間帯はパソコンを起動できなくする。 指定時間前から使用を続けていた場合は、そのまま使用続行。",
			en: "To force your PC shutdown when you boot it in a forbidden duration. You can continue to use PC if you booted before the forbidden time.",
		},
		url: "/software/pcend.zip",
		type: "standalone",
		env: "WindowsXP",
		publishedOn: "2004-10-06",
		version: "1.05",
		lastUpdatedOn: "2004-12-20",
	},
	{
		title: "ts-coc-clanwarleague-stats",
		description: {
			ja: "Clash of Clans のクラン対戦リーグの戦績を Google スプレッドシートに集計する",
			en: "To collect Clan War League records for Clash of Clans into a Google spreadsheet.",
		},
		url: "https://github.com/takkyuuplayer/ts-coc-clanwarleague-stats",
		type: "web",
	},
	{
		title: "go-anki",
		description: {
			ja: "英英辞典を使って Anki 用の単語帳を生成する",
			en: "To generate flashcards for Anki with online English-English dictionaries.",
		},
		url: "https://github.com/takkyuuplayer/go-anki#go-anki",
		type: "web",
	},
	{
		title: "github-inviter",
		description: {
			ja: "github organization への招待リンクを作成",
			en: "To generate invitation link to github organization.",
		},
		url: "https://github.com/takkyuuplayer/github-inviter#github-inviter",
		type: "web",
	},
	{
		title: "hackme",
		description: {
			ja: "攻撃して学ぶ、ウェブセキュリティ（問題編）",
			en: "To practice web security through attacks. (Quizzes)",
		},
		url: "https://github.com/takkyuuplayer/hackme#hackme-",
		type: "web",
	},
	{
		title: "hackyou",
		description: {
			ja: "攻撃して学ぶ、ウェブセキュリティ（解答編）",
			en: "To practice web security through attacks. (Solutions)",
		},
		url: "https://github.com/takkyuuplayer/hackyou#hackyou",
		type: "web",
	},
	{
		title: "anki",
		description: {
			ja: "アルクを使って Anki 用の単語帳を生成する",
			en: "To generate flashcards for Anki with アルク.",
		},
		url: "https://github.com/takkyuuplayer/anki/archive/master.zip",
		type: "standalone",
	},
	{
		title: "amwator",
		description: {
			ja: "アムウェイの報酬体系をシミュレートし、勧誘した人数から報酬額を計算する",
			en: "To simulate Amway's compensation plan and calculate the payout from the number of people you recruit.",
		},
		url: "https://github.com/takkyuuplayer/amwator",
		type: "web",
	},
];
