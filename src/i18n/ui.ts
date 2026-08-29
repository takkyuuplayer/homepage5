export const defaultLang = "ja";


export const ui = {
    ja: {
        "site.title": "卓球Playerの遊び場",
        "logo.alt": "ロゴ"
    },
    en: {
        "site.title": "takkyuuplayer's playground",
        "logo.alt": "Logo"
    }
} as const;

export type Lang = keyof typeof ui;
export type UIKey  = keyof (typeof ui)[typeof defaultLang];