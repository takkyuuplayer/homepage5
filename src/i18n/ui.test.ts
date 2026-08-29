import { describe, it, expect } from "vitest";
import { langs, localeNames, ui } from "./ui";

describe("ui translations", () => {
	it("should have a display name for every language", () => {
		for (const lang of langs) {
			expect(localeNames[lang]).toBeTruthy();
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
