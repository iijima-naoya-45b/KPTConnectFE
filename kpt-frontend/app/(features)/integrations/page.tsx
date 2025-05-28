/**
 * @file page.tsx
 * @description 外部連携設定ページ
 *
 * 外部サービス（GitHub、Slack、Trelloなど）との連携設定を管理するページです。
 *
 * @example
 * ```tsx
 * // /integrations でアクセス可能
 * ```
 */

'use client';

import React from 'react';
import IntegrationSettings from './components/IntegrationSettings';
import { Button } from '@/components/ui';
import Link from 'next/link';

const IntegrationsPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>外部連携設定</h1>
              <p className='mt-2 text-gray-600'>
                GitHub、Slack、Trelloなどの外部サービスとの連携を設定します
              </p>
            </div>
            <Link href='/dashboard'>
              <Button variant='outline'>ダッシュボードに戻る</Button>
            </Link>
          </div>

          {/* 外部連携設定コンポーネント */}
          <div className='bg-white shadow rounded-lg'>
            <IntegrationSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
