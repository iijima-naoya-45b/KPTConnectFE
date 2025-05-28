/**
 * @file FAQSection.tsx
 * @description FAQセクションコンポーネント
 * 
 * よくある質問と回答を表示するための
 * セクションコンポーネントです。
 * 
 * @example
 * ```tsx
 * <FAQSection
 *   faqs={filteredFaqs}
 *   className="max-w-3xl mx-auto"
 * />
 * ```
 */

import React from 'react';
import { FAQ } from './types';

interface FAQSectionProps {
  /** 表示するFAQ一覧 */
  faqs: FAQ[];
  /** 追加のクラス名 */
  className?: string;
}

/**
 * FAQセクションコンポーネント
 */
const FAQSection: React.FC<FAQSectionProps> = ({ faqs, className = '' }) => {
  if (faqs.length === 0) {
    return (
      <div className={`max-w-3xl mx-auto ${className}`}>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>よくある質問</h2>
        <div className='bg-white shadow rounded-lg p-6 text-center'>
          <p className='text-gray-500'>該当するFAQが見つかりませんでした。</p>
          <p className='text-gray-500 mt-2'>検索条件を変更してお試しください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>よくある質問</h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-white shadow rounded-lg p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>{faq.question}</h3>
            <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection; 