import { ui, defaultLang, type Lang, type UIKey } from "./ui";

export function isLang(value: string | undefined): value is Lang {
	return value !== undefined && value in ui;
}

export function resolveLang(value: string | undefined): Lang {
	return isLang(value) ? value : defaultLang;
}

export function useTranslations(lang: Lang) {
	return (key: UIKey) => ui[lang][key];
}

export function getPathWithoutLocale(pathname: string): string {
	const segments = pathname.split("/").filter(Boolean);
	if (isLang(segments[0])) {
		segments.shift();
	}
	return segments.join("/");
}
