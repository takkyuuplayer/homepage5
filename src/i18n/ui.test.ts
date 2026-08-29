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

	it("should have non-empty string values", () => {
		for (const lang of Object.keys(ui) as Lang[]) {
			for (const [key, value] of Object.entries(ui[lang])) {
				expect(typeof value).toBe("string");
				expect(value.length).toBeGreaterThan(0);
			}
		}
	});
});
