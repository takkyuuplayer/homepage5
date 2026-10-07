// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({ imageService: "compile" }),

	i18n: {
		locales: ["ja", "en"],
		defaultLocale: "ja",
		routing: {
			prefixDefaultLocale: true,
			// true のままだと Astro が / のリダイレクト経路を持ち、
			// src/pages/index.astro と / を取り合って build が warning を出す。
			// / の振り分けは src/pages/index.astro で行う。
			redirectToDefaultLocale: false,
		},
	},

	// 静的サイトで session を使わない。既定のままだとアダプタが SESSION の KV
	// binding を足し、preview と本番で同じ binding を引き継ぐことになる。
	session: false,

	site: "https://takkyuuplayer.com",

	vite: {
		plugins: [tailwindcss()],
	},
});
