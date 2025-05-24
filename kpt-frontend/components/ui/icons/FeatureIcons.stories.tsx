/**
 * @file FeatureIcons.stories.tsx
 * @description 特徴アイコンコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  EasyReflectionIcon,
  RealTimeSyncIcon,
  ProgressManagementIcon,
} from "./FeatureIcons";

const meta: Meta = {
  title: "UI/Icons/FeatureIcons",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// 簡単な振り返りアイコン
export const EasyReflection: StoryObj = {
  render: () => <EasyReflectionIcon />,
};

// リアルタイム同期アイコン
export const RealTimeSync: StoryObj = {
  render: () => <RealTimeSyncIcon />,
};

// 進捗管理アイコン
export const ProgressManagement: StoryObj = {
  render: () => <ProgressManagementIcon />,
};
