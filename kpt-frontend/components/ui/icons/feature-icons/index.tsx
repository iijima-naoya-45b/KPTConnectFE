/**
 * @file index.tsx
 * @description フィーチャーセクションで使用するアイコンコンポーネント
 */

import React from 'react';

/**
 * 簡単な振り返りアイコン
 * @returns {JSX.Element} SVGアイコン
 */
export const EasyReflectionIcon: React.FC = () => (
  <svg className='h-8 w-8 text-indigo-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    />
  </svg>
);

/**
 * リアルタイム同期アイコン
 * @returns {JSX.Element} SVGアイコン
 */
export const RealTimeSyncIcon: React.FC = () => (
  <svg className='h-8 w-8 text-indigo-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    />
  </svg>
);

/**
 * 進捗管理アイコン
 * @returns {JSX.Element} SVGアイコン
 */
export const ProgressManagementIcon: React.FC = () => (
  <svg className='h-8 w-8 text-indigo-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    />
  </svg>
);
