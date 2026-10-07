# homepage5

[![CI](https://github.com/takkyuuplayer/homepage5/actions/workflows/ci.yml/badge.svg)](https://github.com/takkyuuplayer/homepage5/actions/workflows/ci.yml)

## Architecture

### Frontend

- [Astro](https://astro.build/)
- 多言語は `ja` / `en`。`/` は Accept-Language で振り分ける（[Internationalization](https://docs.astro.build/en/guides/internationalization/)）
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation/using-vite) を `@tailwindcss/vite` で使う
- ビルド時に外部フィード（Blogger / はてな / Medium）を取得して記事一覧を作る

### Infrastructure

- [Astro · Cloudflare Workers docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
- [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) アダプタ（`imageService: "compile"`、`session: false`）
- 配信先は `takkyuuplayer.com` の [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)。workers.dev は閉じている
- DNS・Custom Domain・Cloudflare Access は別リポジトリ `tf-infra` の Terraform で管理する

### CI / CD

- `ci.yml`: PR と main で `format:check` / `check` / `test` / `build`。main のみ `wrangler deploy`
- `preview.yml`: PR ごとに alias `pr-<番号>` の [Version URL](https://developers.cloudflare.com/workers/configuration/previews/) を発行する。Cloudflare Access の後ろにある
- [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates): 毎月 1 日に GitHub Actions と npm をまとめて更新する。この PR では Preview を skip する

### Tooling

- Node 22.12 以上（`mise.toml` は `lts`）
- Prettier、Vitest、`astro check`
- ロゴは `texsvg` で生成する（`mise` の `build-logo`）
