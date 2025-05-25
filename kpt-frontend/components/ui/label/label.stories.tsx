/**
 * @file label.stories.tsx
 * @description LabelコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from '../input/input';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

// 基本的な使用例
export const Default: Story = {
  args: {
    children: 'ラベル',
  },
};

// 入力フィールドとの組み合わせ
export const WithInput: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>メールアドレス</Label>
      <Input type='email' id='email' placeholder='example@example.com' />
    </div>
  ),
};

// 複数の入力フィールド
export const MultipleInputs: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-4'>
      <div className='grid gap-1.5'>
        <Label htmlFor='name'>お名前</Label>
        <Input type='text' id='name' placeholder='山田 太郎' />
      </div>
      <div className='grid gap-1.5'>
        <Label htmlFor='phone'>電話番号</Label>
        <Input type='tel' id='phone' placeholder='090-1234-5678' />
      </div>
    </div>
  ),
};

// 無効状態の例
export const Disabled: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='disabled'>無効なフィールド</Label>
      <Input type='text' id='disabled' disabled />
    </div>
  ),
};
