export const defaultLang = "ja";

export const ui = {
	ja: {
		"site.title": "卓球Playerの遊び場",
		"site.description":
			"卓球Playerの個人サイト。自作アプリ、数学の問題、ブログをまとめています。",
		"site.author": "卓球Player",
		"logo.alt": "ロゴ",
		"nav.language": "言語",
		"nav.main": "メインメニュー",
		"nav.menu": "メニューを開く",
		"nav.skip": "本文へスキップ",
		"nav.apps": "アプリ",
		"nav.math": "数学",
		"nav.blog": "ブログ",
		"nav.about": "ご挨拶",
		"footer.social": "ソーシャルリンク",
	},
	en: {
		"site.title": "takkyuuplayer's playground",
		"site.description":
			"Personal site of takkyuuplayer, collecting homemade apps, math quizzes and blog posts.",
		"site.author": "takkyuuplayer",
		"logo.alt": "Logo",
		"nav.language": "Language",
		"nav.main": "Main menu",
		"nav.menu": "Open menu",
		"nav.skip": "Skip to content",
		"nav.apps": "Apps",
		"nav.math": "Math",
		"nav.blog": "Blog",
		"nav.about": "About",
		"footer.social": "Social links",
	},
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export const langs = Object.keys(ui) as Lang[];

export const localeNames: Record<Lang, string> = {
	ja: "日本語",
	en: "English",
};
