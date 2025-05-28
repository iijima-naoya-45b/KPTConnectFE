/**
 * @file FeedbackSection.tsx
 * @description フィードバックセクションコンポーネント
 * 
 * フィードバック送信案内を表示するための
 * セクションコンポーネントです。
 * 
 * @example
 * ```tsx
 * <FeedbackSection className="max-w-3xl mx-auto" />
 * ```
 */

import React from 'react';
import Link from 'next/link';

interface FeedbackSectionProps {
  /** 追加のクラス名 */
  className?: string;
}

/**
 * フィードバックセクションコンポーネント
 */
const FeedbackSection: React.FC<FeedbackSectionProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>フィードバックを送信</h2>
        <p className='text-gray-600 mb-6'>
          ご意見やご要望がございましたら、お気軽にお知らせください。
          いただいたフィードバックは今後のサービス改善に活用させていただきます。
        </p>
        <Link
          href='/feedback'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
        >
          フィードバックフォームを開く
        </Link>
      </div>
    </div>
  );
};

export default FeedbackSection; 