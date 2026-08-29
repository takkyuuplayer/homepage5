import { describe, it, expect } from "vitest";
import { isLang, useTranslations } from "./utils";
import type { UIKey } from "./ui";

describe("isLang", () => {
	it("should return true for valid language codes", () => {
		expect(isLang("ja")).toBe(true);
		expect(isLang("en")).toBe(true);
	});

	it("should return false for invalid language codes", () => {
		expect(isLang("fr")).toBe(false);
		expect(isLang("de")).toBe(false);
		expect(isLang("es")).toBe(false);
	});

	it("should return false for undefined", () => {
		expect(isLang(undefined)).toBe(false);
	});

	it("should return false for empty string", () => {
		expect(isLang("")).toBe(false);
	});
});

describe("useTranslations", () => {
	it("should return translation function", () => {
		const t = useTranslations("ja");
		expect(typeof t).toBe("function");
	});

	it("should translate keys for valid language (ja)", () => {
		const t = useTranslations("ja");
		expect(t("site.title" as UIKey)).toBe("卓球Playerの遊び場");
	});

	it("should translate keys for valid language (en)", () => {
		const t = useTranslations("en");
		expect(t("site.title" as UIKey)).toBe("takkyuuplayer's playground");
	});

	it("should fallback to default language (ja)", () => {
		const t = useTranslations("fr");
		expect(t("site.title" as UIKey)).toBe("卓球Playerの遊び場");
	});

	it("should handle missing keys gracefully", () => {
		const t = useTranslations("en");
		// @ts-ignore - Testing runtime behavior with non-existent key
		const result = t("non.existent");
		expect(result).toBeUndefined();
	});

	it("should use correct language when language changes", () => {
		const tJa = useTranslations("ja");
		const tEn = useTranslations("en");

		expect(tJa("site.title" as UIKey)).toBe("卓球Playerの遊び場");
		expect(tEn("site.title" as UIKey)).toBe("takkyuuplayer's playground");
	});
});
