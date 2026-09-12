export const defaultLang = "ja";

export const ui = {
	ja: {
		"site.title": "卓球Playerの遊び場",
		"site.description":
			"卓球Playerの個人サイト。自作アプリ、数学の問題、ブログをまとめています。",
		"site.author": "卓球Player",
		"logo.alt": "ロゴ",
		"link.newTab": "（新しいタブで開く）",
		"service.closed": "（サービス終了）",
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
		"blog.lead":
			"時期によって書く場所を変えてきました。どこに書いた記事も、ここに新しい順で並べています。",
		"blog.posts": "記事",
		"blog.description":
			"卓球Playerがこれまでに書いたブログ記事の一覧。はてなブログ、Blogger、Medium の記事をまとめています。",
		"apps.usable": "今も使えるもの",
		"apps.retired": "今は、もう、動かない",
		"apps.published": "公開",
		"apps.updated": "更新",
		"apps.description":
			"卓球Playerが作ったアプリの一覧。今も使えるものと、もう動かなくなったものをまとめています。",
		"math.kingdom": "数学王国",
		"math.kingdom.message": "学生時代、数学の問題を作るのが趣味でした",
		"math.class": "数学教室",
		"math.problem": "問題",
		"math.answer": "答え",
		"math.description":
			"学生時代に作った数学の問題と、その解答・講義プリント。",
	},
	en: {
		"site.title": "takkyuuplayer's playground",
		"site.description":
			"Personal site of takkyuuplayer, collecting homemade apps, math quizzes and blog posts.",
		"site.author": "takkyuuplayer",
		"logo.alt": "Logo",
		"link.newTab": "(opens in a new tab)",
		"service.closed": "(service closed)",
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
		"blog.lead":
			"I have moved between platforms over the years. Posts from all of them are listed here, newest first. Most of them are in Japanese.",
		"blog.posts": "Posts",
		"blog.description":
			"Every blog post by takkyuuplayer so far, collected from Hatena Blog, Blogger and Medium.",
		"apps.usable": "Still usable",
		"apps.retired": "No longer working",
		"apps.published": "Published",
		"apps.updated": "Updated",
		"apps.description":
			"A list of apps made by takkyuuplayer, both the ones still usable and the ones that no longer work.",
		"math.kingdom": "Math Kingdom (Japanese only)",
		"math.kingdom.message":
			"One of my hobbies was making math quizzes when I was a student.",
		"math.class": "Math Class (Japanese only)",
		"math.problem": "Problem",
		"math.answer": "Answer",
		"math.description":
			"Math quizzes made in my student days, with answers and lecture notes (Japanese only).",
	},
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export const langs = Object.keys(ui) as Lang[];

export const localeNames: Record<Lang, string> = {
	ja: "日本語",
	en: "English",
};
