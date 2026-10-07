# homepage5

[![CI](https://github.com/takkyuuplayer/homepage5/actions/workflows/ci.yml/badge.svg)](https://github.com/takkyuuplayer/homepage5/actions/workflows/ci.yml)

## Architecture

### Frontend

- [Astro](https://astro.build/)
- 多言語は `ja` / `en`。`/` は Accept-Language で振り分ける（[Internationalization](https://docs.astro.build/en/guides/internationalization/)）
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-vite) を `@tailwindcss/vite` で使う

### Infrastructure

- [Astro · Cloudflare Workers docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) アダプタ（`imageService: "compile"`、`session: false`）

### CI / CD

- [Version URL](https://developers.cloudflare.com/workers/configuration/previews/) を発行する。
