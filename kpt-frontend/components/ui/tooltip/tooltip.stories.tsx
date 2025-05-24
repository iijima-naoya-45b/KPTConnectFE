/**
 * @file tooltip.stories.tsx
 * @description TooltipコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// 基本的な使用例
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>ホバーしてください</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ツールチップの内容</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

// 複数のツールチップ
export const MultipleTooltips: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">保存</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>変更を保存します</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive">削除</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>アイテムを削除します</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

// カスタムスタイルの例
export const CustomStyle: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>カスタムスタイル</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-blue-500 text-white">
          <p>カスタムスタイルのツールチップ</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

// アイコン付きの例
export const WithIcon: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ヘルプ情報</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
