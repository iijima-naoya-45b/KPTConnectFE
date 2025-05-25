/**
 * @file page.tsx
 * @description KPT詳細ページ
 *
 * @example
 * ```tsx
 * <KptDetailPage />
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';

interface KptDetailPageProps {
  params: {
    id: string;
  };
}

const KptDetailPage = ({ params }: KptDetailPageProps) => {
  const { id } = params;

  // TODO: APIからデータを取得
  const kpt = {
    id: id,
    title: '週次振り返り',
    createdAt: '2024-03-20',
    keep: ['チーム内のコミュニケーションが活発', 'タスク管理が効率的に進んでいる'],
    problem: ['ドキュメントの更新が遅れている', 'テストカバレッジが低い'],
    try: ['ドキュメント更新のリマインダーを設定', 'テスト自動化の導入を検討'],
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>KPT詳細</h1>
            <div className='flex items-center space-x-4'>
              <Link
                href={`/dashboard/kpt/${id}/edit`}
                className='text-indigo-600 hover:text-indigo-900'
              >
                編集
              </Link>
              <Link href='/dashboard' className='text-gray-600 hover:text-gray-900'>
                戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white shadow rounded-lg overflow-hidden'>
          {/* タイトルと日付 */}
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-2xl font-bold text-gray-900'>{kpt.title}</h2>
            <p className='text-sm text-gray-500'>作成日: {kpt.createdAt}</p>
          </div>

          {/* Keep */}
          <div className='px-6 py-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Keep</h3>
            <ul className='space-y-2'>
              {kpt.keep.map((item, index) => (
                <li key={index} className='bg-indigo-50 p-3 rounded-md text-indigo-900'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Problem */}
          <div className='px-6 py-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Problem</h3>
            <ul className='space-y-2'>
              {kpt.problem.map((item, index) => (
                <li key={index} className='bg-red-50 p-3 rounded-md text-red-900'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Try */}
          <div className='px-6 py-4'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Try</h3>
            <ul className='space-y-2'>
              {kpt.try.map((item, index) => (
                <li key={index} className='bg-green-50 p-3 rounded-md text-green-900'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KptDetailPage;
