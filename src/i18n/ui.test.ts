import { describe, it, expect } from "vitest";
import { ui, defaultLang } from "./ui";
import type { Lang, UIKey } from "./ui";

describe("ui translations", () => {
	it("should have all required languages", () => {
		expect(ui).toHaveProperty("ja");
		expect(ui).toHaveProperty("en");
	});

	it("should have default language defined", () => {
		expect(defaultLang).toBe("ja");
		expect(defaultLang in ui).toBe(true);
	});

	it("should have matching keys across all languages", () => {
		const jaKeys = Object.keys(ui.ja).sort();
		const enKeys = Object.keys(ui.en).sort();

		expect(jaKeys).toEqual(enKeys);
	});

	it("should have all required translation keys", () => {
		const requiredKeys: UIKey[] = ["site.title", "logo.alt"];

		for (const key of requiredKeys) {
			expect(ui.ja).toHaveProperty(key);
			expect(ui.en).toHaveProperty(key);
		}
	});

	it("should have non-empty string values", () => {
		for (const lang of Object.keys(ui) as Lang[]) {
			for (const [key, value] of Object.entries(ui[lang])) {
				expect(typeof value).toBe("string");
				expect(value.length).toBeGreaterThan(0);
			}
		}
	});

	it("should have different translations for different languages", () => {
		// At least some keys should have different translations between languages
		const differences = Object.keys(ui.ja).filter(
			(key) => ui.ja[key as UIKey] !== ui.en[key as UIKey]
		);

		expect(differences.length).toBeGreaterThan(0);
	});

	it("ja language translations should contain expected values", () => {
		expect(ui.ja["site.title"]).toContain("卓球");
		expect(ui.ja["logo.alt"]).toContain("ロゴ");
	});

	it("en language translations should be in English", () => {
		expect(ui.en["site.title"]).toContain("takkyuuplayer's");
		expect(ui.en["logo.alt"]).toContain("Logo");
	});
});
