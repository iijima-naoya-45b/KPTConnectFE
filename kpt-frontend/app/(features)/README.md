# Features Directory

このディレクトリには、KPT Connect アプリケーションの各機能（フィーチャー）が含まれています。

## ディレクトリ構造

```
app/(features)/
├── README.md                    # このファイル
├── calendar/                    # カレンダー機能
│   ├── page.tsx                # カレンダーメインページ
│   └── KPTCalendar.tsx         # カレンダーコンポーネント
├── contact/                     # お問い合わせ機能
│   └── page.tsx                # お問い合わせページ
├── dashboard/                   # ダッシュボード機能
│   ├── page.tsx                # ダッシュボードメインページ
│   ├── kpt/                    # KPT管理
│   ├── settings/               # 設定
│   └── templates/              # テンプレート管理
├── feedback/                    # フィードバック機能
│   └── page.tsx                # フィードバック送信ページ
├── help/                        # ヘルプ・サポート機能
│   ├── page.tsx                # ヘルプメインページ
│   ├── HelpCenter.tsx          # ヘルプセンターコンポーネント
│   └── FeedbackForm.tsx        # フィードバックフォーム
├── integrations/                # 外部連携機能
│   ├── page.tsx                # 外部連携メインページ
│   └── IntegrationSettings.tsx # 連携設定コンポーネント
├── legal/                       # 法的情報
│   └── page.tsx                # 利用規約・プライバシーポリシー
├── login/                       # ログイン機能
│   └── page.tsx                # ログインページ
├── notifications/               # 通知機能
│   ├── page.tsx                # 通知設定メインページ
│   └── NotificationSettings.tsx # 通知設定コンポーネント
├── onboarding/                  # オンボーディング機能
│   └── page.tsx                # 初回ユーザー向けチュートリアル
└── profile/                     # プロフィール管理機能
    └── page.tsx                # プロフィール設定ページ
```

## 各フィーチャーの詳細

### 🗓️ Calendar (`/calendar`)

**機能**: KPT スケジュール管理

- KPT の振り返りスケジュールをカレンダー形式で表示
- Keep、Problem、Try の予定を色分けして管理
- 統計情報の表示（各タイプの予定数）

### 📞 Contact (`/contact`)

**機能**: お問い合わせ

- ユーザーからの問い合わせフォーム
- サポートチームへの連絡手段

### 📊 Dashboard (`/dashboard`)

**機能**: メインダッシュボード

- KPT 管理の中心となるページ
- 各機能へのナビゲーション
- 統計情報とクイックアクセス

### 💬 Feedback (`/feedback`)

**機能**: フィードバック送信

- バグ報告、機能要望、改善提案の送信
- カテゴリ別のフィードバック分類
- 優先度設定と詳細な説明機能

### ❓ Help (`/help`)

**機能**: ヘルプ・サポート

- よくある質問（FAQ）
- ユーザーガイド
- フィードバック送信機能

### 🔗 Integrations (`/integrations`)

**機能**: 外部サービス連携

- GitHub、Slack、Trello などとの連携設定
- API 連携の管理
- 同期設定

### ⚖️ Legal (`/legal`)

**機能**: 法的情報

- 利用規約
- プライバシーポリシー
- その他法的文書

### 🔐 Login (`/login`)

**機能**: 認証

- ユーザーログイン
- Google OAuth 認証
- セッション管理

### 🔔 Notifications (`/notifications`)

**機能**: 通知設定

- KPT リマインダー設定
- メール通知設定
- システム通知の管理

### 🎯 Onboarding (`/onboarding`)

**機能**: 初回ユーザー向けガイド

- KPT の基本概念説明
- アプリケーションの使い方チュートリアル
- 段階的なセットアップガイド

### 👤 Profile (`/profile`)

**機能**: プロフィール管理

- ユーザー情報編集
- アカウント設定
- セキュリティ設定
- 通知設定

## 開発ガイドライン

### フィーチャー追加時の規則

1. **ディレクトリ命名**: kebab-case（例: `user-settings`）
2. **必須ファイル**: 各フィーチャーには必ず`page.tsx`を含める
3. **コンポーネント分離**: 複雑な機能は別コンポーネントに分離
4. **型定義**: TypeScript の型定義を適切に行う

### ファイル構成例

```
new-feature/
├── page.tsx                    # メインページ（必須）
├── components/                 # フィーチャー固有のコンポーネント
│   ├── FeatureComponent.tsx
│   └── SubComponent.tsx
├── hooks/                      # フィーチャー固有のカスタムフック
│   └── useFeature.ts
├── types/                      # 型定義
│   └── index.ts
└── utils/                      # ユーティリティ関数
    └── helpers.ts
```

### コメント規則

- ファイル先頭に JSDoc コメントを記載
- 機能の概要、使用例を含める
- 日本語でのコメントを推奨

### ルーティング

- Next.js App Router の規則に従う
- `(features)`グループ内のページは`/feature-name`でアクセス可能
- 動的ルートは`[param]`形式で定義

## 注意事項

- 新しいフィーチャーを追加する際は、この README も更新してください
- 共通で使用するコンポーネントは`/components/ui`に配置してください
- フィーチャー固有のコンポーネントは各フィーチャーディレクトリ内に配置してください
- API との連携が必要な場合は、適切なエラーハンドリングを実装してください
