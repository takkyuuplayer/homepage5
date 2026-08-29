// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare(),

	i18n: {
		locales: ["ja", "en"],
		defaultLocale: "ja",
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
		},
	},

	site: "https://homepage5.takkyuuplayer.workers.dev",

	vite: {
		plugins: [tailwindcss()],
	},
});
