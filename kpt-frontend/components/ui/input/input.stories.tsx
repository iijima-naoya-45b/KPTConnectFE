/**
 * @file input.stories.tsx
 * @description InputコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

// 基本的な使用例
export const Default: Story = {
  args: {
    placeholder: "入力してください",
  },
};

// 入力タイプの例
export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Input type="text" placeholder="テキスト" />
      <Input type="email" placeholder="メールアドレス" />
      <Input type="password" placeholder="パスワード" />
      <Input type="number" placeholder="数値" />
      <Input type="tel" placeholder="電話番号" />
      <Input type="url" placeholder="URL" />
    </div>
  ),
};

// 無効状態の例
export const Disabled: Story = {
  args: {
    placeholder: "無効な入力フィールド",
    disabled: true,
  },
};

// エラー状態の例
export const Error: Story = {
  args: {
    placeholder: "エラー状態の入力フィールド",
    className: "border-red-500 focus-visible:ring-red-500",
  },
};

// ファイルアップロードの例
export const FileUpload: Story = {
  args: {
    type: "file",
  },
};
