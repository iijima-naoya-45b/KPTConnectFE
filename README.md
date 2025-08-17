# KPTアプリ「KPT-Connect」の概要

## ■サービスURL 
https://www.kpt-connect.biz/

### repository
`Next：`https://github.com/iijima-naoya-45b/KPTConnectFE

※画面などのポイントは上記をご覧ください。

`Rails：`https://github.com/iijima-naoya-45b/KPTConnectBE

※処理などのポイントは上記をご覧ください。

## ■サービス概要
「KPT」と呼ばれる週毎での振り返りができるサービスとなっております。

## ■作成背景
アプリを作成するにあたって、日々の進捗や課題などを整理する時間が必要だと考えております。
本アプリでは、忙しい日々でも振り返りを行える＋目標達成に向かって課題を設定することができる２点にフォーカスしております。

これらのギャップを解消しつつ、Todoアプリなどの差別化として以下の点を意識しております。

`AIによる振り返り自動レビュー`
`達成率による評価分析機能`

こちらを意識し、ユーザーライクなサービスになることを意識しております。

## ターゲット層

・日々の振り返りを行いたい人
・新しい目標を設定したい人
・自分のやったことを明瞭化したい人

◼︎機能
・新規登録・ログイン(Oauth)
・お問い合わせ機能
・ダッシュボード機能
・カレンダー機能
・プロフィール機能
・通知機能
・ヘルプ機能
・詳細レポート

## ◼︎画面紹介

| AI目標設定機能 | 通知機能 |
| --- | --- |
[![AI目標設定機能](https://i.gyazo.com/7cb16c6bdead2c515e0fb9c569bba400.gif)](https://i.gyazo.com/7cb16c6bdead2c515e0fb9c569bba400.gif)| [![通知機能](https://i.gyazo.com/8d9d9c0d1d7f6fdd551fede73fbe4bf1.gif)](https://i.gyazo.com/8d9d9c0d1d7f6fdd551fede73fbe4bf1.gif)
|  カレンダー機能 | ヘルプ機能 |
| [![Image from Gyazo](https://i.gyazo.com/721d604ed58493f8ea3ff3113c6ed17a.png)](https://gyazo.com/721d604ed58493f8ea3ff3113c6ed17a) | [![Image from Gyazo](https://i.gyazo.com/962524efef4a8ccd4b252c61e3f76ad9.png)](https://gyazo.com/962524efef4a8ccd4b252c61e3f76ad9)
| 週次レポート機能 | ガントチャート機能 |
[![Image from Gyazo](https://i.gyazo.com/60d6f8eab86a38df27c88c7ce1765c84.png)](https://gyazo.com/60d6f8eab86a38df27c88c7ce1765c84)|[![ガントチャート機能][![Image from Gyazo](https://i.gyazo.com/aaa31cf336ea2bae92fee0ae213eae1a.png)](https://gyazo.com/aaa31cf336ea2bae92fee0ae213eae1a)
| Todo機能 | ログイン機能 |
[![Image from Gyazo](https://i.gyazo.com/95b2017850c980e124c757a82d44131a.png)](https://gyazo.com/95b2017850c980e124c757a82d44131a)| [![Image from Gyazo](https://i.gyazo.com/bd8880b069874c2a613a2aca5b57c361.gif)](https://gyazo.com/bd8880b069874c2a613a2aca5b57c361) 


## 作業する上で気をつけたポイント

・Vibeコーディングによる高速な仮説検証: アイデアを迅速に形にし、実際に動作させて検証する 「vibeコーディング」 を積極的に活用しました。これにより、試行錯誤のサイクルを高速化し、効率的に開発を進めました。

・AI活用と多角的な検証: AI技術を組み込むため、さまざまなライブラリやフレームワークを実際に試しながら、動作の安定性やパフォーマンスを検証しました。単一の手法に固執せず、複数のアプローチを比較検討することで、より堅牢で信頼性の高い実装を目指しました。


## ◼︎こだわりポイント

### AIによるフィードバック機能と課題設定

本アプリケーションには、AIを活用した以下の独自機能が搭載されています。

`フィードバック機能:` ユーザーの入力内容に基づき、AIがパーソナライズされたフィードバックを生成します。

`課題設定機能:` ユーザーの目標や現在の進捗に合わせて、AIが最適な課題や学習プランを提案します。

これらの機能により、ユーザーはより効率的かつ効果的に学習やスキルアップに取り組むことができます。

###  認証について

本アプリケーションは、認証機構としてOAuth 2.0を導入しています。認証フローを通じて発行されるJWT (JSON Web Token) を利用することで、ステートレスな認証を可能にしています。セキュリティの観点から、JWTはHttpOnlyとSecure属性を付与したCookieに格納され、クロスサイトスクリプティング（XSS）などの攻撃リスクを低減しています。これにより、高いセキュリティレベルを維持し、ユーザーデータを保護しています。

## システム要件・バージョン

### 言語・フレームワーク
- **Node.js**: 23.11.0
- **Next.js**: 最新版（プロジェクトで使用中のバージョンを記載）

### 使用技術

- **Tailwind CSS**: 最新版
- **TypeScript**: 最新版

## 主な仕様

### フロントエンド（Next.js）

- SSR による高速な初期表示
- インタラクティブなダッシュボード
- レスポンシブデザイン
- リアルタイムデータ更新

## 使用技術・バージョン管理

[![言語バッジ](https://img.shields.io/badge/-Ruby-CC342D.svg?logo=ruby&style=flat-square&logoColor=white)](https://www.ruby-lang.org/)
[![フレームワークバッジ](https://img.shields.io/badge/-Ruby%20on%20Rails-CC0000.svg?logo=ruby-on-rails&style=flat-square&logoColor=white)](https://rubyonrails.org/)
[![Dockerバッジ](https://img.shields.io/badge/-Docker-2496ED.svg?logo=docker&style=flat-square&logoColor=white)](https://www.docker.com/)
[![HTMLバッジ](https://img.shields.io/badge/-HTML5-E34F26.svg?logo=html5&style=flat-square&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML)
[![CSSバッジ](https://img.shields.io/badge/-CSS3-1572B6.svg?logo=css3&style=flat-square&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Next.jsバッジ](https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=flat-square&logoColor=white)](https://nextjs.org/)
[![Nginxバッジ](https://img.shields.io/badge/-Nginx-009639.svg?logo=nginx&style=flat-square&logoColor=white)](https://www.nginx.com/)


## 使用技術

| 技術                 | 用途                                      |
| -------------------- | ----------------------------------------- |
| Next.js              | フロントエンド開発、UI/UX 設計            |
| Tailwind CSS         | スタイリング、レスポンシブデザイン         |
| Radix UI             | アクセシブルな UI コンポーネント          |
| Heroicons / Lucide React | アイコンライブラリ                   |
| Sonner / React Toastify | 通知・トーストメッセージの表示         |
| Slack API            | メッセージ送受信、KPI データ取得          |
| OAuth                | 認証フローの実装、セキュリティ確保        |
| Axios                | API 通信                                  |
| Gantt-Task-React     | ガントチャート表示                        |
| React Big Calendar   | カレンダー機能                            |
| Chart.js             | データ可視化、グラフ表示                  |
| React Markdown       | Markdown → HTML 変換                      |
| React Hook Form      | フォーム状態管理・バリデーション          |
| Husky / lint-staged  | Git コミット前の Linter・Formatter 自動実行 |
| Storybook            | UI コンポーネントのカタログ化・開発        |
| Vitest / Playwright  | 単体テスト・E2E テスト                    |
| Stripe               | 決済機能の実装                            |
