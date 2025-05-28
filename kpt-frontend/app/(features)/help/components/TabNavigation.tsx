/**
 * @file TabNavigation.tsx
 * @description タブナビゲーションコンポーネント
 * 
 * ヘルプページのタブ切り替えを行うための
 * ナビゲーションコンポーネントです。
 * 
 * @example
 * ```tsx
 * <TabNavigation
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 */

import React from 'react';
import { TabType } from './types';

interface TabNavigationProps {
  /** アクティブなタブ */
  activeTab: TabType;
  /** タブ変更時のハンドラ */
  onTabChange: (tab: TabType) => void;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * タブ情報の設定
 */
const tabLabels: Record<TabType, string> = {
  help: 'ヘルプ・FAQ',
  feedback: 'フィードバック',
};

/**
 * タブナビゲーションコンポーネント
 */
const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  const tabs: TabType[] = ['help', 'feedback'];

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className='-mb-px flex space-x-8 px-6'>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-selected={activeTab === tab}
            role='tab'
          >
            {tabLabels[tab]}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation; 