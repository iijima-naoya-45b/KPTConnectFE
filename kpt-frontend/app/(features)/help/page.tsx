'use client';

import React, { useState } from 'react';
import HelpCenter from './components/HelpCenter';
import FeedbackForm from './components/FeedbackForm';
import { Button } from '@/components/ui';
import Link from 'next/link';

type TabType = 'help' | 'feedback';

const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('help');

  return (
    <div className='  bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>ヘルプセンター</h1>
              <p className='mt-2 text-gray-600'>
                よくある質問の確認やフィードバックの送信ができます
              </p>
            </div>
            <Link href='/dashboard'>
              <Button variant='outline'>ダッシュボードに戻る</Button>
            </Link>
          </div>

          {/* タブナビゲーション */}
          <div className='bg-white shadow rounded-lg'>
            <div className='border-b border-gray-200'>
              <nav className='-mb-px flex space-x-8 px-6'>
                <button
                  onClick={() => setActiveTab('help')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'help'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  ヘルプ・FAQ
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'feedback'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  フィードバック
                </button>
              </nav>
            </div>

            {/* タブコンテンツ */}
            <div className='p-6'>
              {activeTab === 'help' && <HelpCenter />}
              {activeTab === 'feedback' && <FeedbackForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
