import { ui, defaultLang, type Lang, type UIKey } from "./ui";

export function isLang(value: string| undefined): value is Lang {
    return value !== undefined && value in ui;
}   

export function useTranslations(lang: string |undefined) {
    const l = isLang(lang) ? lang : defaultLang;
    return (key:UIKey) => ui[l][key] ?? ui[defaultLang][key];
}
