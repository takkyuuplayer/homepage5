import { describe, it, expect } from "vitest";
import { defaultLang, langs, localeNames, ui } from "./ui";

describe("ui translations", () => {
	it("should have a display name for every language", () => {
		for (const lang of langs) {
			expect(localeNames[lang]).toBeTruthy();
		}
	});

	// useTranslations は ui[lang][key] を返すだけで、他言語への fallback を持たない。
	// キーの追加や改名が片方の言語にだけ入ると、その言語では undefined が描かれる。
	it("should have the same keys in every language as the default language", () => {
		const defaultKeys = Object.keys(ui[defaultLang]).sort();

		for (const lang of langs) {
			expect(Object.keys(ui[lang]).sort(), lang).toEqual(defaultKeys);
		}
	});

	it("should have non-empty string values", () => {
		for (const lang of langs) {
			for (const value of Object.values(ui[lang])) {
				expect(typeof value).toBe("string");
				expect(value.length).toBeGreaterThan(0);
			}
		}
	});
});
