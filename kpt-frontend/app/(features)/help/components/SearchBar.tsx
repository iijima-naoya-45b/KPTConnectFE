/**
 * @file SearchBar.tsx
 * @description FAQ検索バーコンポーネント
 * 
 * FAQやヘルプコンテンツを検索するための
 * 検索バーコンポーネントです。
 * 
 * @example
 * ```tsx
 * <SearchBar
 *   searchQuery={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   placeholder="質問を検索..."
 * />
 * ```
 */

import React from 'react';

interface SearchBarProps {
  /** 検索クエリ */
  searchQuery: string;
  /** 検索クエリ変更時のハンドラ */
  onSearchChange: (query: string) => void;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * FAQ検索バーコンポーネント
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = '質問を検索...',
  className = '',
}) => {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className='relative'>
        <input
          type='text'
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
          aria-label='FAQ検索'
        />
        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
          <svg
            className='h-5 w-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 