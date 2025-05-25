/**
 * @file FeatureCard.tsx
 * @description 機能カードコンポーネント
 *
 * ダッシュボードに表示する各機能のカードを管理します。
 * アイコン、タイトル、説明、リンクなどを表示します。
 */

import React from 'react';
import Link from 'next/link';
import type { DashboardFeature } from './types';

interface FeatureCardProps {
  feature: DashboardFeature;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, className = '' }) => {
  return (
    <Link
      href={feature.path}
      className={`
        relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm 
        flex items-center space-x-3 hover:border-gray-400 hover:shadow-md
        focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      <div className='flex-shrink-0'>
        <div className='h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600'>
          {feature.icon}
        </div>
      </div>
      <div className='flex-1 min-w-0'>
        <span className='absolute inset-0' aria-hidden='true' />
        <p className='text-sm font-medium text-gray-900'>{feature.title}</p>
        <p className='text-sm text-gray-500 truncate'>{feature.description}</p>
      </div>
      <div className='flex-shrink-0'>
        <svg
          className='h-5 w-5 text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </div>
    </Link>
  );
};

export default FeatureCard;
