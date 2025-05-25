/**
 * @file OnboardingSteps.tsx
 * @description オンボーディングステップデータ
 *
 * オンボーディングの各ステップのコンテンツとデータを定義します。
 * ステップの内容、説明、表示コンテンツを管理します。
 * 各ステップのコンテンツ高さを統一し、スムーズな切り替えを実現します。
 */

import React from 'react';

export interface OnboardingStepData {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const onboardingSteps: OnboardingStepData[] = [
  {
    id: 1,
    title: 'KPT Connectへようこそ！',
    description: '個人開発者のための振り返りプラットフォームです',
    content: (
      <div className='text-center space-y-6 flex flex-col justify-center h-full'>
        <div className='w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto'>
          <svg
            className='w-12 h-12 text-indigo-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>継続的な改善で成長を加速</h3>
          <p className='text-gray-600 max-w-md mx-auto'>
            KPT（Keep・Problem・Try）手法を使って、個人開発プロジェクトの振り返りを効率的に行い、
            継続的なスキルアップを実現しましょう。
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'KPTとは？',
    description: '振り返りの基本フレームワークを理解しましょう',
    content: (
      <div className='space-y-8 flex flex-col justify-center h-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center p-6 bg-blue-50 rounded-lg'>
            <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-white font-bold text-xl'>K</span>
            </div>
            <h4 className='text-lg font-semibold text-gray-900 mb-2'>Keep</h4>
            <p className='text-gray-600 text-sm'>
              うまくいったこと、継続したいことを記録します。成功体験を積み重ねましょう。
            </p>
          </div>
          <div className='text-center p-6 bg-red-50 rounded-lg'>
            <div className='w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-white font-bold text-xl'>P</span>
            </div>
            <h4 className='text-lg font-semibold text-gray-900 mb-2'>Problem</h4>
            <p className='text-gray-600 text-sm'>
              課題や問題点を洗い出します。改善のきっかけを見つけましょう。
            </p>
          </div>
          <div className='text-center p-6 bg-green-50 rounded-lg'>
            <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-white font-bold text-xl'>T</span>
            </div>
            <h4 className='text-lg font-semibold text-gray-900 mb-2'>Try</h4>
            <p className='text-gray-600 text-sm'>次に試したいこと、改善アクションを計画します。</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: '主な機能',
    description: 'KPT Connectで利用できる機能をご紹介します',
    content: (
      <div className='space-y-6 flex flex-col justify-center h-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg'>
            <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-indigo-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>KPT作成・管理</h4>
              <p className='text-sm text-gray-600'>直感的なインターフェースで振り返りを記録</p>
            </div>
          </div>
          <div className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg'>
            <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-indigo-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>カレンダー管理</h4>
              <p className='text-sm text-gray-600'>振り返りスケジュールを視覚的に管理</p>
            </div>
          </div>
          <div className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg'>
            <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-indigo-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>進捗可視化</h4>
              <p className='text-sm text-gray-600'>成長の軌跡をグラフで確認</p>
            </div>
          </div>
          <div className='flex items-start space-x-4 p-4 bg-gray-50 rounded-lg'>
            <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0'>
              <svg
                className='w-6 h-6 text-indigo-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>テンプレート</h4>
              <p className='text-sm text-gray-600'>効率的な振り返りのためのテンプレート</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'はじめましょう！',
    description: '準備完了です。最初のKPTを作成してみましょう',
    content: (
      <div className='text-center space-y-8 flex flex-col justify-center h-full'>
        <div className='w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
          <svg
            className='w-16 h-16 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>準備完了！</h3>
          <p className='text-gray-600 max-w-lg mx-auto mb-6'>
            これでKPT Connectを使い始める準備が整いました。
            最初のKPTを作成して、継続的な改善の旅を始めましょう！
          </p>
          <div className='bg-indigo-50 p-6 rounded-lg max-w-md mx-auto'>
            <h4 className='font-semibold text-indigo-900 mb-2'>💡 ヒント</h4>
            <p className='text-sm text-indigo-700'>
              週1回の定期的な振り返りから始めることをお勧めします。
              小さな改善の積み重ねが大きな成長につながります。
            </p>
          </div>
        </div>
      </div>
    ),
  },
];
