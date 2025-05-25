/**
 * @file header.stories.tsx
 * @description HeaderコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

// 基本的な使用例
export const Default: Story = {
  render: () => <Header />,
};

// ダークモードの例
export const DarkMode: Story = {
  render: () => (
    <div className='dark'>
      <Header />
    </div>
  ),
};

// スクロール時の例
export const Scrolled: Story = {
  render: () => (
    <div className='h-[200vh]'>
      <Header />
      <div className='h-screen flex items-center justify-center'>
        <p className='text-gray-500'>スクロールしてヘッダーの動作を確認してください</p>
      </div>
    </div>
  ),
};
