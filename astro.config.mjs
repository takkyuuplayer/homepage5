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
			// true のままだと Astro が / のリダイレクト経路を持ち、必須の
			// src/pages/index.astro と / を取り合って build が warning を出す。
			// / のリダイレクトは下の redirects で 1 本だけ持つ。
			redirectToDefaultLocale: false,
		},
	},

	// 既定は 301 だが、301 はブラウザに永続キャッシュされ、あとで / の振り分けを
	// 変えても訪問者に届かない。/ の行き先は変えうるので 302 にする。
	// 既定ロケールを変えるときは defaultLocale と一緒にここも変える。
	redirects: {
		"/": { status: 302, destination: "/ja/" },
	},

	site: "https://homepage5.takkyuuplayer.workers.dev",

	vite: {
		plugins: [tailwindcss()],
	},
});
