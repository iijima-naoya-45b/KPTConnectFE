/**
 * @file separator.stories.tsx
 * @description SeparatorコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

// 基本的な使用例
export const Default: Story = {
  render: () => <Separator />,
};

// 垂直方向の例
export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center gap-4">
      <div>左</div>
      <Separator orientation="vertical" />
      <div>右</div>
    </div>
  ),
};

// テキスト付きの例
export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">セクション1</h4>
        <p className="text-sm text-muted-foreground">
          セクション1の内容がここに入ります。
        </p>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="text-sm font-medium">セクション2</h4>
        <p className="text-sm text-muted-foreground">
          セクション2の内容がここに入ります。
        </p>
      </div>
    </div>
  ),
};

// カスタムスタイルの例
export const CustomStyle: Story = {
  render: () => (
    <div className="space-y-4">
      <Separator className="bg-blue-500" />
      <Separator className="bg-green-500 h-[2px]" />
      <Separator className="bg-red-500 h-[3px]" />
    </div>
  ),
};
