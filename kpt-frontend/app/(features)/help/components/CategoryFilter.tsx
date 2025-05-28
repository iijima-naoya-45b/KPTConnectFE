/**
 * @file CategoryFilter.tsx
 * @description FAQカテゴリーフィルターコンポーネント
 * 
 * FAQをカテゴリー別にフィルタリングするための
 * ボタン群コンポーネントです。
 * 
 * @example
 * ```tsx
 * <CategoryFilter
 *   selectedCategory={selectedCategory}
 *   onCategoryChange={setSelectedCategory}
 * />
 * ```
 */

import React from 'react';
import { FAQCategory } from './types';

interface CategoryFilterProps {
  /** 選択されたカテゴリー */
  selectedCategory: FAQCategory | 'all';
  /** カテゴリー変更時のハンドラ */
  onCategoryChange: (category: FAQCategory | 'all') => void;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * カテゴリー情報の設定
 */
const categoryLabels: Record<FAQCategory | 'all', string> = {
  all: 'すべて',
  general: '一般',
  kpt: 'KPT',
  integration: '連携',
  notification: '通知',
};

/**
 * FAQカテゴリーフィルターコンポーネント
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  className = '',
}) => {
  const categories: (FAQCategory | 'all')[] = ['all', 'general', 'kpt', 'integration', 'notification'];

  return (
    <div className={`flex justify-center space-x-4 ${className}`}>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-pressed={selectedCategory === category}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 