/**
 * @file HelpCenter.tsx
 * @description ヘルプセンターとサポート機能を提供するコンポーネント
 *
 * @example
 * ```tsx
 * <HelpCenter />
 * ```
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'kpt' | 'integration' | 'notification';
}

const faqs: FAQ[] = [
  {
    question: 'KPTとは何ですか？',
    answer:
      'KPTは、Keep（継続すること）、Problem（問題点）、Try（試してみること）の頭文字を取った振り返り手法です。チームの改善と成長を促進するための効果的な方法です。',
    category: 'general',
  },
  {
    question: 'テンプレートの共有はどのように行いますか？',
    answer:
      'テンプレート作成時に「テンプレートを共有する」オプションを選択することで、チーム内でテンプレートを共有できます。共有されたテンプレートは、チームの全メンバーが利用可能になります。',
    category: 'kpt',
  },
  {
    question: '外部サービスとの連携はどのように設定しますか？',
    answer:
      '設定画面の「インテグレーション」タブから、各種外部サービスとの連携を設定できます。対応しているサービスは、プロジェクト管理ツール（Jira、Trello、Asana）、チャットツール（Slack、Discord、Teams）、カレンダーツール（Google Calendar、Outlook）です。',
    category: 'integration',
  },
  {
    question: '通知の設定はどこで行えますか？',
    answer:
      '設定画面の「通知」タブから、メール通知、プッシュ通知、カスタムアラートの設定が可能です。各通知タイプごとに詳細な設定を行うことができます。',
    category: 'notification',
  },
];

const HelpCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FAQ['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* ヘッダー */}
      <div className='text-center mb-12'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>ヘルプセンター</h1>
        <p className='text-lg text-gray-600'>
          よくある質問を確認して、KPTをより効果的に活用しましょう。
        </p>
      </div>

      {/* 検索バー */}
      <div className='max-w-2xl mx-auto mb-8'>
        <div className='relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder='質問を検索...'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            <svg
              className='h-5 w-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
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

      {/* カテゴリーフィルター */}
      <div className='flex justify-center space-x-4 mb-8'>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setSelectedCategory('general')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'general'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          一般
        </button>
        <button
          onClick={() => setSelectedCategory('kpt')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'kpt'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          KPT
        </button>
        <button
          onClick={() => setSelectedCategory('integration')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'integration'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          連携
        </button>
        <button
          onClick={() => setSelectedCategory('notification')}
          className={`px-4 py-2 rounded-md ${
            selectedCategory === 'notification'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          通知
        </button>
      </div>

      {/* FAQセクション */}
      <div className='max-w-3xl mx-auto mb-12'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>よくある質問</h2>
        <div className='space-y-4'>
          {filteredFaqs.map((faq, index) => (
            <div key={index} className='bg-white shadow rounded-lg p-6'>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>{faq.question}</h3>
              <p className='text-gray-600'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* フィードバックセクション */}
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow rounded-lg p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>フィードバックを送信</h2>
          <p className='text-gray-600 mb-6'>
            ご意見やご要望がございましたら、お気軽にお知らせください。
          </p>
          <Link
            href='/feedback'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            フィードバックフォームを開く
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
