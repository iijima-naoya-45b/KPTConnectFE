/**
 * @file feature-card/index.tsx
 * @description 機能カードコンポーネント
 * 
 * 機能やサービスの特徴をカード形式で表示するコンポーネントです。
 * アイコン、タイトル、説明文を組み合わせて表示します。
 * 
 * @example
 * ```tsx
 * <FeatureCard 
 *   icon={<SomeIcon />}
 *   title="個人振り返り機能"
 *   description="直感的なインターフェースで、個人の振り返りを簡単に行えます。"
 * />
 * ```
 */

import React from 'react';

interface FeatureCardProps {
  /** アイコン */
  icon: React.ReactNode;
  /** タイトル */
  title: string;
  /** 説明文 */
  description: string;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * 機能カードコンポーネント
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className='bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-gray-900 mb-2'>{title}</h3>
      <p className='text-gray-600 text-sm leading-relaxed'>{description}</p>
    </div>
  );
};

export default FeatureCard;
