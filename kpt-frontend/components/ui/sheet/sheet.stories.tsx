/**
 * @file sheet.stories.tsx
 * @description SheetコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// 基本的な使用例
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>シートを開く</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>シートのタイトル</SheetTitle>
          <SheetDescription>シートの説明文がここに入ります。</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートの内容がここに入ります。</p>
        </div>
        <SheetFooter>
          <Button variant="outline">キャンセル</Button>
          <Button>保存</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// 左側から表示
export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>左側から開く</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>左側のシート</SheetTitle>
          <SheetDescription>
            左側から表示されるシートの例です。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートの内容がここに入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// 上側から表示
export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>上側から開く</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>上側のシート</SheetTitle>
          <SheetDescription>
            上側から表示されるシートの例です。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートの内容がここに入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

// 下側から表示
export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>下側から開く</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>下側のシート</SheetTitle>
          <SheetDescription>
            下側から表示されるシートの例です。
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>シートの内容がここに入ります。</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
