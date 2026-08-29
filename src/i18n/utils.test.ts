import { describe, it, expect } from "vitest";
import {
	getPathWithoutLocale,
	isLang,
	resolveLang,
	useTranslations,
} from "./utils";

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

describe("resolveLang", () => {
	it("should keep a valid language code", () => {
		expect(resolveLang("en")).toBe("en");
	});

	it("should fall back to the default language", () => {
		expect(resolveLang("fr")).toBe("ja");
		expect(resolveLang(undefined)).toBe("ja");
	});
});

describe("useTranslations", () => {
	it("should translate keys for valid language (ja)", () => {
		const t = useTranslations("ja");
		expect(t("site.title")).toBe("卓球Playerの遊び場");
	});

	it("should translate keys for valid language (en)", () => {
		const t = useTranslations("en");
		expect(t("site.title")).toBe("takkyuuplayer's playground");
	});
});

describe("getPathWithoutLocale", () => {
	it("should strip the locale prefix", () => {
		expect(getPathWithoutLocale("/ja/blog/foo")).toBe("blog/foo");
		expect(getPathWithoutLocale("/en/blog/foo")).toBe("blog/foo");
	});

	it("should return an empty string for a locale root", () => {
		expect(getPathWithoutLocale("/ja")).toBe("");
		expect(getPathWithoutLocale("/ja/")).toBe("");
	});

	it("should return an empty string for the site root", () => {
		expect(getPathWithoutLocale("/")).toBe("");
	});

	it("should keep paths without a locale prefix", () => {
		expect(getPathWithoutLocale("/blog/foo")).toBe("blog/foo");
	});

	it("should not strip a segment that merely starts with a locale code", () => {
		expect(getPathWithoutLocale("/january")).toBe("january");
		expect(getPathWithoutLocale("/english/foo")).toBe("english/foo");
	});

	it("should strip only the leading locale segment", () => {
		expect(getPathWithoutLocale("/ja/en/foo")).toBe("en/foo");
	});

	it("should drop the trailing slash", () => {
		expect(getPathWithoutLocale("/ja/blog/")).toBe("blog");
	});
});
