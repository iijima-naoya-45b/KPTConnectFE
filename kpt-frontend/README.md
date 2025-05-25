# KPT Connect Frontend

KPT Connect のフロントエンドアプリケーション - チーム振り返りを効率化する KPT プラットフォーム

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI コンポーネント**: Radix UI
- **状態管理**: Zustand
- **フォーム**: React Hook Form
- **バリデーション**: カスタムバリデーション関数
- **テスト**: Vitest + Playwright
- **開発ツール**: Storybook, ESLint, Prettier

## 📁 プロジェクト構造

```
kpt-frontend/
├── app/                          # Next.js App Router
│   ├── (features)/              # フィーチャーページ
│   │   ├── calendar/           # カレンダー管理
│   │   ├── dashboard/          # ダッシュボード
│   │   ├── profile/            # プロフィール管理
│   │   ├── notifications/      # 通知設定
│   │   ├── integrations/       # 外部連携
│   │   ├── help/               # ヘルプ・FAQ
│   │   ├── onboarding/         # オンボーディング
│   │   ├── feedback/           # フィードバック
│   │   ├── login/              # ログイン
│   │   ├── contact/            # お問い合わせ
│   │   └── legal/              # 利用規約・プライバシー
│   ├── store/                   # Zustand ストア
│   ├── globals.css             # グローバルスタイル
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # ホームページ
├── components/                  # UIコンポーネント
│   └── ui/                     # 基本UIコンポーネント
│       ├── layout/             # レイアウトコンポーネント
│       │   ├── header/         # ヘッダー
│       │   ├── footer/         # フッター
│       │   └── sidebar/        # サイドバー
│       ├── icons/              # アイコンコンポーネント
│       ├── feature-card/       # フィーチャーカード
│       ├── button/             # ボタン
│       ├── input/              # 入力フィールド
│       ├── label/              # ラベル
│       ├── separator/          # セパレーター
│       ├── skeleton/           # スケルトン
│       ├── tooltip/            # ツールチップ
│       └── sheet/              # シート
├── hooks/                       # カスタムフック
│   ├── use-local-storage.ts    # ローカルストレージ管理
│   ├── use-debounce.ts         # デバウンス処理
│   ├── use-toggle.ts           # トグル状態管理
│   └── index.ts                # フック集約
├── lib/                         # ライブラリ・ユーティリティ
│   ├── constants.ts            # 定数定義
│   ├── validations.ts          # バリデーション関数
│   └── utils.ts                # ユーティリティ関数（shadcn/ui）
├── types/                       # 型定義
│   └── index.ts                # 共通型定義
├── utils/                       # ユーティリティ関数
│   └── index.ts                # 共通ヘルパー関数
├── stories/                     # Storybook ストーリー
├── public/                      # 静的ファイル
└── tests/                       # テストファイル
```

## 🛠️ 開発環境セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# ESLint実行
npm run lint

# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook

# テスト実行
npm run test

# テストカバレッジ
npm run test:coverage
```

## 📋 開発ガイドライン

### コーディング規約

#### 命名規則

- **変数・関数**: lowerCamelCase (`userName`, `handleSubmit`)
- **コンポーネント**: PascalCase (`UserProfile`, `KptItem`)
- **ファイル・ディレクトリ**: kebab-case (`user-profile`, `kpt-item`)
- **定数**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)

#### TypeScript

- 厳密な型定義を使用
- `any` 型の使用を避ける
- 適切なジェネリクスの活用
- JSDoc コメントの記載

#### React

- 関数コンポーネントを使用
- カスタムフックで状態ロジックを分離
- props の型定義を必須とする
- useCallback と useMemo を適切に使用

### ファイル構成

#### コンポーネント

```typescript
// components/ui/button/index.tsx
/**
 * @fileoverview ボタンコンポーネント
 * @description 再利用可能なボタンUIコンポーネント
 */

import React from "react";
import { cn } from "@/utils";

interface ButtonProps {
  /** ボタンのバリアント */
  variant?: "default" | "destructive" | "outline";
  /** ボタンのサイズ */
  size?: "default" | "sm" | "lg";
  /** 子要素 */
  children: React.ReactNode;
  /** クリックハンドラー */
  onClick?: () => void;
}

/**
 * ボタンコンポーネント
 * @param props - ボタンのプロパティ
 * @returns ボタン要素
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "bg-destructive text-destructive-foreground":
            variant === "destructive",
          "border border-input": variant === "outline",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 px-3": size === "sm",
          "h-11 px-8": size === "lg",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### カスタムフック

```typescript
// hooks/use-api.ts
/**
 * @fileoverview API通信カスタムフック
 * @description APIリクエストの状態管理を行うフック
 */

import { useState, useCallback } from 'react';
import type { ApiResponse } from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * API通信フック
 * @template T - レスポンスデータの型
 * @returns API状態と実行関数
 */
export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'エラーが発生しました',
      });
    }
  }, []);

  return { ...state, execute };
}
```

### 状態管理

Zustand を使用してグローバル状態を管理：

```typescript
// app/store/auth-store.ts
/**
 * @fileoverview 認証状態管理ストア
 * @description ユーザー認証に関する状態を管理
 */

import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  /** 現在のユーザー */
  user: User | null;
  /** 認証状態 */
  isAuthenticated: boolean;
  /** ローディング状態 */
  loading: boolean;
  /** ログイン処理 */
  login: (email: string, password: string) => Promise<void>;
  /** ログアウト処理 */
  logout: () => void;
  /** ユーザー情報更新 */
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      // API呼び出し処理
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  updateUser: (user: User) => {
    set({ user });
  },
}));
```

### エラーハンドリング

```typescript
// utils/error-handler.ts
/**
 * @fileoverview エラーハンドリングユーティリティ
 * @description アプリケーション全体のエラー処理を統一
 */

import { parseApiError } from '@/utils';
import type { AppError } from '@/types';

/**
 * エラーを適切に処理し、ユーザーフレンドリーなメッセージを返す
 * @param error - エラーオブジェクト
 * @returns 処理されたエラー情報
 */
export function handleError(error: unknown): AppError {
  const parsedError = parseApiError(error);

  // ログ出力（開発環境のみ）
  if (process.env.NODE_ENV === 'development') {
    console.error('Error occurred:', parsedError);
  }

  // エラー追跡サービスに送信（本番環境）
  if (process.env.NODE_ENV === 'production') {
    // Sentry等のエラー追跡サービスに送信
  }

  return parsedError;
}
```

### テスト

#### コンポーネントテスト

```typescript
// components/ui/button/button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("正常にレンダリングされる", () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("クリックイベントが正常に動作する", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### E2E テスト

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('ログイン機能', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.fill('[data-testid="password-input"]', 'password123');
  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL('/dashboard');
});
```

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Indigo (600, 700)
- **Secondary**: Gray (100-900)
- **Success**: Green (100-800)
- **Warning**: Yellow (100-800)
- **Error**: Red (100-800)

### タイポグラフィ

- **見出し**: Inter フォント
- **本文**: Inter フォント
- **コード**: JetBrains Mono フォント

### スペーシング

- **基本単位**: 4px (0.25rem)
- **コンポーネント間**: 16px (1rem)
- **セクション間**: 32px (2rem)

## 🚀 デプロイ

### Vercel（推奨）

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel --prod
```

### 環境変数

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.kpt-connect.com
NEXT_PUBLIC_APP_ENV=production
```

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🤝 コントリビューション

1. フィーチャーブランチを作成
2. 変更を実装
3. テストを追加・実行
4. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照
