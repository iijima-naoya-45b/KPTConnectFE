/**
 * @file page.tsx
 * @description カレンダーページ - KPTスケジュール管理
 *
 * KPTの振り返りスケジュールをカレンダー形式で表示・管理するページです。
 *
 * @example
 * ```tsx
 * // /calendar でアクセス可能
 * ```
 */

'use client';

import React, { useState, useEffect } from 'react';
import KPTCalendar from './components/KPTCalendar';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface KPTSchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'keep' | 'problem' | 'try';
  description?: string;
}

const CalendarPage: React.FC = () => {
  const [schedules, setSchedules] = useState<KPTSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  // サンプルデータ（実際のAPIから取得する想定）
  useEffect(() => {
    const sampleSchedules: KPTSchedule[] = [
      {
        id: '1',
        title: '週次振り返り - Keep',
        start: new Date(2024, 11, 15, 10, 0),
        end: new Date(2024, 11, 15, 11, 0),
        type: 'keep',
        description: '今週うまくいったことを振り返る',
      },
      {
        id: '2',
        title: '問題点の洗い出し',
        start: new Date(2024, 11, 16, 14, 0),
        end: new Date(2024, 11, 16, 15, 0),
        type: 'problem',
        description: '今週の課題を整理する',
      },
      {
        id: '3',
        title: '改善アクション計画',
        start: new Date(2024, 11, 17, 9, 0),
        end: new Date(2024, 11, 17, 10, 0),
        type: 'try',
        description: '来週の改善アクションを決める',
      },
    ];

    // 実際のAPI呼び出しをシミュレート
    setTimeout(() => {
      setSchedules(sampleSchedules);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEventClick = (schedule: KPTSchedule) => {
    // イベントクリック時の処理
    console.log('Selected schedule:', schedule);
    // 詳細モーダルを開く、編集ページに遷移するなどの処理
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>カレンダーを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>KPTカレンダー</h1>
              <p className='mt-2 text-gray-600'>
                振り返りスケジュールを管理し、継続的な改善を促進します
              </p>
            </div>
            <div className='flex space-x-3'>
              <Link href='/dashboard/kpt/new'>
                <Button className='bg-indigo-600 hover:bg-indigo-700'>新しいKPTを作成</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>

          {/* 統計情報 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-semibold'>K</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Keep予定</dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {schedules.filter(s => s.type === 'keep').length}件
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-semibold'>P</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Problem予定</dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {schedules.filter(s => s.type === 'problem').length}件
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-semibold'>T</span>
                    </div>
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>Try予定</dt>
                      <dd className='text-lg font-medium text-gray-900'>
                        {schedules.filter(s => s.type === 'try').length}件
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* カレンダーコンポーネント */}
          <KPTCalendar schedules={schedules} onEventClick={handleEventClick} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
