export const defaultLang = "ja";

export const ui = {
	ja: {
		"site.title": "卓球Playerの遊び場",
		"logo.alt": "ロゴ",
		"nav.language": "言語",
	},
	en: {
		"site.title": "takkyuuplayer's playground",
		"logo.alt": "Logo",
		"nav.language": "Language",
	},
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)[typeof defaultLang];

export const langs = Object.keys(ui) as Lang[];

export const localeNames: Record<Lang, string> = {
	ja: "日本語",
	en: "English",
};
