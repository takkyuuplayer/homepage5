export const defaultLang = "ja";

export const ui = {
	ja: {
		"site.title": "卓球Playerの遊び場",
		"site.description":
			"卓球Playerの個人サイト。自作アプリ、数学の問題、ブログをまとめています。",
		"site.author": "卓球Player",
		"logo.alt": "ロゴ",
		"link.newTab": "（新しいタブで開く）",
		"nav.language": "言語",
		"nav.languageSwitch": "言語を切り替える",
		"nav.home": "ホーム",
		"nav.main": "メインメニュー",
		"nav.menu": "メニュー",
		"nav.skip": "本文へスキップ",
		"nav.apps": "アプリ",
		"nav.math": "数学",
		"nav.blog": "ブログ",
		"nav.about": "ご挨拶",
		"footer.social": "ソーシャルリンク",
		"top.latestPosts": "最新の記事",
		"top.allPosts": "ブログをすべて見る",
		"top.postsUnavailable": "記事を取得できませんでした",
		"top.history": "歴史",
		"top.olderHistory": "古い記録を見る",
	},
	en: {
		"site.title": "takkyuuplayer's playground",
		"site.description":
			"Personal site of takkyuuplayer, collecting homemade apps, math quizzes and blog posts.",
		"site.author": "takkyuuplayer",
		"logo.alt": "Logo",
		"link.newTab": "(opens in a new tab)",
		"nav.language": "Language",
		"nav.languageSwitch": "Switch language",
		"nav.home": "Home",
		"nav.main": "Main menu",
		"nav.menu": "Menu",
		"nav.skip": "Skip to content",
		"nav.apps": "Apps",
		"nav.math": "Math",
		"nav.blog": "Blog",
		"nav.about": "About",
		"footer.social": "Social links",
		"top.latestPosts": "Latest posts",
		"top.allPosts": "See all posts",
		"top.postsUnavailable": "Could not load the posts",
		"top.history": "History (Japanese only)",
		"top.olderHistory": "Show older records",
	},
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export const langs = Object.keys(ui) as Lang[];

export const localeNames: Record<Lang, string> = {
	ja: "日本語",
	en: "English",
};
