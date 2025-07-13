'use client';

import React from 'react';
import Link from 'next/link';

// カードデータの型定義
interface CardData {
  href: string;
  title: string;
  description: string;
  icon: {
    bgColor: string;
    textColor: string;
    path: string;
  };
}

// カードデータの配列
const cardData: CardData[] = [
  {
    href: '/dashboard',
    title: 'ダッシュボード',
    description: 'KPT管理の中心となるページ。統計情報とクイックアクセス',
    icon: {
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
  },
  {
    href: '/calendar',
    title: 'カレンダー',
    description: 'KPTスケジュールをカレンダー形式で管理・可視化',
    icon: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    }
  },
  {
    href: '/profile',
    title: 'プロフィール',
    description: 'アカウント情報とセキュリティ設定の管理',
    icon: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    }
  },
  {
    href: '/notifications',
    title: '通知設定',
    description: 'KPTリマインダーとメール通知の設定',
    icon: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
      path: 'M15 17h5l-5 5v-5zM4.257 9.962c0-1.69.853-3.183 2.147-4.066C7.696 4.91 9.284 4.5 11 4.5s3.304.41 4.596 1.396c1.294.883 2.147 2.376 2.147 4.066 0 1.69-.853 3.183-2.147 4.066C14.304 15.09 12.716 15.5 11 15.5s-3.304-.41-4.596-1.396C5.11 13.145 4.257 11.652 4.257 9.962z'
    }
  },
  {
    href: '/help',
    title: 'ヘルプ',
    description: 'よくある質問とフィードバック送信',
    icon: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      path: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  },
  // {
  //   href: '/pricing',
  //   title: '料金プラン',
  //   description: 'プラン比較と詳細レポート機能のご案内',
  //   icon: {
  //     bgColor: 'bg-indigo-100',
  //     textColor: 'text-indigo-600',
  //     path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
  //   }
  // },
  {
    href: '/reports/sample',
    title: '詳細レポート',
    description: '高度な分析とインサイト（プロプラン限定）',
    icon: {
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
  }
];

export default function FunctionCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {cardData.map((card) => (
        <Link key={card.href} href={card.href} className='group h-full flex'>
          <div className='w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col'>
            <div className='flex items-center mb-4'>
              <div className={`w-12 h-12 ${card.icon.bgColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                <svg
                  className={`w-6 h-6 ${card.icon.textColor}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={card.icon.path}
                  />
                </svg>
              </div>
              <h4 className={`text-lg font-semibold text-gray-900 group-hover:${card.icon.textColor}`}>
                {card.title}
              </h4>
            </div>
            <p className='text-gray-600 text-sm flex-grow'>{card.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
} 