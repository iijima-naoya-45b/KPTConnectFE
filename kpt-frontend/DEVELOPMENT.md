# KPT Connect フロントエンド 開発ガイド

## 🚀 開発環境のセットアップ

### 必要な環境

- Node.js 18.0.0 以上
- npm 9.0.0 以上

### インストール

```bash
npm install
```

## 🔧 開発コマンド

### 基本コマンド

```bash
# 開発サーバーを起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーを起動
npm start
```

### コード品質管理

```bash
# ESLintでコードをチェック
npm run lint

# ESLintでコードを自動修正
npm run lint:fix

# TypeScriptの型チェック
npm run type-check

# Prettierでコードをフォーマット
npm run format

# Prettierでフォーマットをチェック
npm run format:check
```

### Storybook

```bash
# Storybookを起動
npm run storybook

# Storybookをビルド
npm run build-storybook
```

## 🎯 Git フック（Husky）による自動化

このプロジェクトでは、コードの品質を保つために以下のGitフックが設定されています：

### Pre-commit フック

コミット前に以下が自動実行されます：

- **lint-staged**: ステージされたファイルに対してESLintとPrettierを実行
- **type-check**: TypeScriptの型チェック

### Commit-msg フック

コミットメッセージの形式をチェックします：

#### 正しいコミットメッセージの形式

```
type(scope): description
```

#### 利用可能なtype

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードスタイル（機能に影響しない変更）
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: その他の変更
- `perf`: パフォーマンス改善
- `ci`: CI設定
- `build`: ビルド設定
- `revert`: 変更の取り消し

#### コミットメッセージの例

```bash
git commit -m "feat(auth): ユーザー認証機能を追加"
git commit -m "fix(ui): ボタンのスタイルを修正"
git commit -m "docs: READMEを更新"
git commit -m "refactor(utils): uniqueArray関数を改善"
```

## 📝 コーディング規約

### TypeScript

- 厳密な型定義を使用
- `any`型の使用は避ける
- 関数とクラスには適切なJSDocコメントを記載

### React

- 関数コンポーネントを使用
- カスタムフックで状態管理ロジックを分離
- propsの型定義は必須

### CSS/Styling

- TailwindCSSを使用
- コンポーネント固有のスタイルはCSS Modulesまたはstyled-componentsを使用

### ファイル命名規則

- コンポーネント: PascalCase (`UserProfile.tsx`)
- フック: camelCase with `use` prefix (`useUserData.ts`)
- ユーティリティ: camelCase (`formatDate.ts`)
- 定数: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🛠️ VSCode 設定

推奨拡張機能：

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense
- Error Lens
- Code Spell Checker
- Todo Tree

## 🔍 トラブルシューティング

### Huskyフックが動作しない場合

```bash
# Huskyを再インストール
npm run prepare

# フックファイルに実行権限を付与
chmod +x .husky/pre-commit .husky/commit-msg
```

### 型エラーが発生する場合

```bash
# TypeScriptの型チェックを実行
npm run type-check

# node_modulesの型定義を再インストール
rm -rf node_modules package-lock.json
npm install
```

### ESLintエラーが発生する場合

```bash
# ESLintで自動修正を試行
npm run lint:fix

# Prettierでフォーマットを修正
npm run format
```

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
