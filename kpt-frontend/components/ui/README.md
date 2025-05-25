# UI コンポーネント

このディレクトリには、KPT Connect アプリケーションで使用される再利用可能な UI コンポーネントが含まれています。

## ディレクトリ構造

```
components/ui/
├── index.ts                 # 全コンポーネントのエクスポート
├── README.md               # このファイル
│
├── layout/                 # レイアウト関連コンポーネント
│   ├── header/            # ヘッダーコンポーネント
│   ├── footer/            # フッターコンポーネント
│   └── sidebar/           # サイドバーコンポーネント
│
├── icons/                  # アイコンコンポーネント
│   ├── index.ts           # アイコンのエクスポート
│   └── feature-icons/     # フィーチャー用アイコン
│
├── feature-card/          # 特徴カードコンポーネント
│
└── [基本UIコンポーネント]
    ├── button/            # ボタンコンポーネント
    ├── input/             # 入力フィールドコンポーネント
    ├── label/             # ラベルコンポーネント
    ├── separator/         # セパレーターコンポーネント
    ├── sheet/             # シートコンポーネント
    ├── skeleton/          # スケルトンローディングコンポーネント
    └── tooltip/           # ツールチップコンポーネント
```

## 使用方法

### 基本的な使用方法

```tsx
import { Button, Input, Label } from "@/components/ui";

const MyComponent = () => {
  return (
    <div>
      <Label htmlFor="email">メールアドレス</Label>
      <Input id="email" type="email" />
      <Button>送信</Button>
    </div>
  );
};
```

### レイアウトコンポーネント

```tsx
import { Header, Footer, Sidebar } from "@/components/ui";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};
```

### アイコンコンポーネント

```tsx
import {
  EasyReflectionIcon,
  RealTimeSyncIcon,
  ProgressManagementIcon,
} from "@/components/ui";

const FeatureSection = () => {
  return (
    <div>
      <EasyReflectionIcon />
      <RealTimeSyncIcon />
      <ProgressManagementIcon />
    </div>
  );
};
```

### 特徴カードコンポーネント

```tsx
import { FeatureCard, EasyReflectionIcon } from "@/components/ui";

const Features = () => {
  return (
    <FeatureCard
      icon={<EasyReflectionIcon />}
      title="簡単な振り返り"
      description="直感的なインターフェースで、個人開発プロジェクトの振り返りを簡単に記録できます。"
    />
  );
};
```

## コンポーネント分類

### 基本 UI コンポーネント

- **Button**: 各種ボタン（プライマリ、セカンダリ等）
- **Input**: テキスト入力フィールド
- **Label**: フォームラベル
- **Separator**: 区切り線
- **Sheet**: モーダル・ドロワー
- **Skeleton**: ローディング状態表示
- **Tooltip**: ツールチップ

### レイアウトコンポーネント

- **Header**: アプリケーションヘッダー
- **Footer**: アプリケーションフッター
- **Sidebar**: サイドバーナビゲーション

### 特殊コンポーネント

- **FeatureCard**: 機能紹介カード
- **Icons**: 各種アイコン（フィーチャー用）

## 開発ガイドライン

### 命名規則

- ディレクトリ名: kebab-case（例: `feature-card`）
- コンポーネント名: PascalCase（例: `FeatureCard`）
- ファイル名: kebab-case（例: `feature-card.tsx`）

### ファイル構成

各コンポーネントディレクトリには以下のファイルを含めることを推奨：

- `index.tsx` または `[component-name].tsx`: メインコンポーネント
- `stories.tsx`: Storybook ストーリー（オプション）
- `types.ts`: 型定義（必要に応じて）

### コメント規則

- ファイル先頭に JSDoc コメントを記載
- 各コンポーネント、関数に日本語コメントを記載
- 使用例を含める

## 注意事項

- 新しいコンポーネントを追加した場合は、必ず `index.ts` でエクスポートしてください
- 責務が特定のフィーチャーに限定される場合は、`app/(features)/[feature-name]/components/` に配置することを検討してください
- 基本 UI コンポーネントは汎用性を保ち、特定のビジネスロジックを含めないでください
