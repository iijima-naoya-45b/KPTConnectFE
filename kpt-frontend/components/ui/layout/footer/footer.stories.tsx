/**
 * @file footer.stories.tsx
 * @description FooterコンポーネントのStorybookストーリー
 */

import type { Meta, StoryObj } from '@storybook/react';
import Footer from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

// 基本的な使用例
export const Default: Story = {
  render: () => <Footer />,
};

// ダークモードの例
export const DarkMode: Story = {
  render: () => (
    <div className='dark'>
      <Footer />
    </div>
  ),
};
