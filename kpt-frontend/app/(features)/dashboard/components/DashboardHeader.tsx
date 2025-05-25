/**
 * @file DashboardHeader.tsx
 * @description ダッシュボードヘッダーコンポーネント
 *
 * ダッシュボードページのヘッダー部分を管理します。
 * タイトル、ユーザー情報、クイックアクションなどを表示します。
 */

import React from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface DashboardHeaderProps {
  userName?: string;
  showQuickActions?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = 'ユーザー',
  showQuickActions = true,
}) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>ダッシュボード</h1>
          <p className='mt-2 text-gray-600'>おかえりなさい、{userName}さん</p>
        </div>

        {showQuickActions && (
          <div className='flex space-x-3'>
            <Link href='/dashboard/kpt/new'>
              <Button className='bg-indigo-600 hover:bg-indigo-700'>新しいKPTを作成</Button>
            </Link>
            <Link href='/calendar'>
              <Button variant='outline'>カレンダーを見る</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
