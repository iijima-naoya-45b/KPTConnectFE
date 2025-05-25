/**
 * @file page.tsx
 * @description ダッシュボードページコンポーネント
 *
 * @example
 * ```tsx
 * <DashboardPage />
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const features = [
    {
      title: 'KPT管理',
      description: 'チームの振り返りを効率的に管理',
      path: '/dashboard/kpt',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
          />
        </svg>
      ),
    },
    {
      title: 'カレンダー',
      description: 'KPTのスケジュールをカレンダーで管理',
      path: '/calendar',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      ),
    },
    {
      title: 'テンプレート',
      description: 'KPTテンプレートの作成と管理',
      path: '/dashboard/templates',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
          />
        </svg>
      ),
    },
    {
      title: '通知設定',
      description: 'KPTの通知設定を管理',
      path: '/notifications',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
          />
        </svg>
      ),
    },
    {
      title: '外部連携',
      description: '外部サービスとの連携設定',
      path: '/integrations',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
          />
        </svg>
      ),
    },
    {
      title: 'ヘルプ',
      description: 'ヘルプセンターとフィードバック',
      path: '/help',
      icon: (
        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
    },
  ];

  return (
    <div className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>ダッシュボード</h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='py-4'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map(feature => (
              <Link
                key={feature.path}
                href={feature.path}
                className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
              >
                <div className='flex-shrink-0'>
                  <div className='h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center'>
                    {feature.icon}
                  </div>
                </div>
                <div className='flex-1 min-w-0'>
                  <span className='absolute inset-0' aria-hidden='true' />
                  <p className='text-sm font-medium text-gray-900'>{feature.title}</p>
                  <p className='text-sm text-gray-500'>{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
