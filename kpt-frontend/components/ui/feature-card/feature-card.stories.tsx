/**
 * @file stories.tsx
 * @description FeatureCardコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from '@storybook/react';
import FeatureCard from './index';
import {
  EasyReflectionIcon,
  RealTimeSyncIcon,
  ProgressManagementIcon,
} from '../icons/feature-icons';

const meta: Meta<typeof FeatureCard> = {
  title: 'UI/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

// 基本的な使用例
export const Default: Story = {
  args: {
    icon: <EasyReflectionIcon />,
    title: '簡単な振り返り',
    description: '直感的なインターフェースで、チームの振り返りを簡単に行えます。',
  },
};

// リアルタイム同期の例
export const RealTimeSync: Story = {
  args: {
    icon: <RealTimeSyncIcon />,
    title: 'リアルタイム同期',
    description: 'チームメンバーとリアルタイムで同期し、効率的な振り返りを実現します。',
  },
};

// 進捗管理の例
export const ProgressManagement: Story = {
  args: {
    icon: <ProgressManagementIcon />,
    title: '進捗管理',
    description: 'チームの成長を可視化し、継続的な改善をサポートします。',
  },
};
