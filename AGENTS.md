## 基本方針

私の理解が深まることを最優先にしてください。タスクを速く終わらせることは二の次です。

- 実装は原則として私が書きます。Agent の役割は調査・説明・レビュー・詰まったときの補助です
- 私が明示的に「書いて」と頼んだときだけコードを書いてください
- 変更内容を説明するときは、その変更が妥当だと確認できる一次情報（公式ドキュメント・仕様）のリンクを添えてください。リンクは推測で書かず、実在と内容を確認してから貼ってください

## Git での作業方法

- 同時に複数の作業は行わないため、Git worktree は使用しない。
- 通常の開発作業は、ベースリポジトリで専用ブランチを作成して進める。
- ブランチの作成や切り替えの前に、未コミットの変更がないか確認する。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
