/**
 * @file button.stories.tsx
 * @description ButtonコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基本的な使用例
export const Default: Story = {
  args: {
    children: 'ボタン',
  },
};

// バリアントの例
export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button variant='default'>デフォルト</Button>
      <Button variant='destructive'>削除</Button>
      <Button variant='outline'>アウトライン</Button>
      <Button variant='secondary'>セカンダリ</Button>
      <Button variant='ghost'>ゴースト</Button>
      <Button variant='link'>リンク</Button>
    </div>
  ),
};

// サイズの例
export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Button size='sm'>小</Button>
      <Button size='default'>中</Button>
      <Button size='lg'>大</Button>
      <Button size='icon'>🔍</Button>
    </div>
  ),
};

// アイコン付きの例
export const WithIcon: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M5 12h14' />
          <path d='m12 5 7 7-7 7' />
        </svg>
        次へ
      </Button>
      <Button variant='outline'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M19 12H5' />
          <path d='m12 19-7-7 7-7' />
        </svg>
        戻る
      </Button>
    </div>
  ),
};

// 無効状態の例
export const Disabled: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Button disabled>無効</Button>
      <Button variant='destructive' disabled>
        削除
      </Button>
      <Button variant='outline' disabled>
        アウトライン
      </Button>
    </div>
  ),
};
