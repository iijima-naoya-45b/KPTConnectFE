/**
 * @file page.tsx
 * @description カレンダーページ - KPTスケジュール管理
 *
 * KPTの振り返りスケジュールをカレンダー形式で表示・管理するページです。
 * 期間指定データ取得により、過去・未来の振り返りが可能です。
 * カレンダー、ガントチャート、グラフの3つのビューを提供します。
 *
 * @example
 * ```tsx
 * // /calendar でアクセス可能
 * ```
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { KPTCalendar, KPTGanttChart, KPTCharts } from './components';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';

interface KPTSchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'keep' | 'problem' | 'try';
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface DateRange {
  start: Date;
  end: Date;
}

type ViewMode = 'calendar' | 'gantt' | 'charts';

const CalendarPage: React.FC = () => {
  const [schedules, setSchedules] = useState<KPTSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  // 期間指定でKPTスケジュールを取得する関数
  const fetchSchedulesByDateRange = useCallback(async (range: DateRange) => {
    setLoading(true);
    try {
      // 実際のAPI呼び出し（現在はサンプルデータで代替）
      const sampleSchedules = generateSampleSchedules(range.start, range.end);

      // APIコール例:
      // const response = await fetch(`/api/kpt/schedules?start=${range.start.toISOString()}&end=${range.end.toISOString()}`);
      // const data = await response.json();

      setTimeout(() => {
        setSchedules(sampleSchedules);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('スケジュール取得エラー:', error);
      setLoading(false);
    }
  }, []);

  // サンプルデータ生成関数（実際のAPIに置き換え予定）
  const generateSampleSchedules = (startDate: Date, endDate: Date): KPTSchedule[] => {
    const schedules: KPTSchedule[] = [];
    const currentMonth = startDate.getMonth();
    const currentYear = startDate.getFullYear();

    // 過去のデータ（完了済み）
    if (currentMonth <= new Date().getMonth() && currentYear <= new Date().getFullYear()) {
      schedules.push(
        {
          id: `past-${currentMonth}-1`,
          title: '週次振り返り - Keep',
          start: new Date(currentYear, currentMonth, 5, 10, 0),
          end: new Date(currentYear, currentMonth, 5, 11, 0),
          type: 'keep',
          description: 'プロジェクトで成功した点を振り返る',
          status: 'completed',
          createdAt: new Date(currentYear, currentMonth, 1),
        },
        {
          id: `past-${currentMonth}-2`,
          title: '問題点の分析',
          start: new Date(currentYear, currentMonth, 12, 14, 0),
          end: new Date(currentYear, currentMonth, 12, 15, 30),
          type: 'problem',
          description: 'コードレビューで見つかった課題を整理',
          status: 'completed',
          createdAt: new Date(currentYear, currentMonth, 8),
        },
        {
          id: `past-${currentMonth}-3`,
          title: '改善アクション実行',
          start: new Date(currentYear, currentMonth, 20, 9, 0),
          end: new Date(currentYear, currentMonth, 20, 10, 30),
          type: 'try',
          description: 'テスト自動化の導入を検討',
          status: 'completed',
          createdAt: new Date(currentYear, currentMonth, 15),
        },
        {
          id: `past-${currentMonth}-4`,
          title: 'スプリント振り返り',
          start: new Date(currentYear, currentMonth, 25, 15, 0),
          end: new Date(currentYear, currentMonth, 27, 16, 0),
          type: 'keep',
          description: '2週間スプリントの成果確認',
          status: 'completed',
          createdAt: new Date(currentYear, currentMonth, 20),
        }
      );
    }

    // 現在・未来のデータ（予定）
    if (currentMonth >= new Date().getMonth() && currentYear >= new Date().getFullYear()) {
      schedules.push(
        {
          id: `future-${currentMonth}-1`,
          title: 'スプリント振り返り',
          start: new Date(currentYear, currentMonth, 25, 15, 0),
          end: new Date(currentYear, currentMonth, 25, 16, 0),
          type: 'keep',
          description: '今スプリントの成果を振り返る',
          status: 'scheduled',
          createdAt: new Date(),
        },
        {
          id: `future-${currentMonth}-2`,
          title: 'パフォーマンス課題検討',
          start: new Date(currentYear, currentMonth, 28, 13, 0),
          end: new Date(currentYear, currentMonth, 28, 14, 0),
          type: 'problem',
          description: 'アプリケーションの速度改善について',
          status: 'scheduled',
          createdAt: new Date(),
        },
        {
          id: `future-${currentMonth}-3`,
          title: 'UI/UX改善計画',
          start: new Date(currentYear, currentMonth, 30, 10, 0),
          end: new Date(currentYear, currentMonth + 1, 2, 12, 0),
          type: 'try',
          description: 'ユーザビリティ向上のための改善案検討',
          status: 'scheduled',
          createdAt: new Date(),
        }
      );
    }

    return schedules.filter(schedule => schedule.start >= startDate && schedule.start <= endDate);
  };

  // 日付範囲変更時の処理
  const handleDateRangeChange = useCallback(
    (newDate: Date) => {
      const newRange = {
        start: startOfMonth(newDate),
        end: endOfMonth(newDate),
      };
      setCurrentDate(newDate);
      setDateRange(newRange);
      fetchSchedulesByDateRange(newRange);
    },
    [fetchSchedulesByDateRange]
  );

  // 前月・次月ナビゲーション
  const navigateToPreviousMonth = () => {
    const prevMonth = subMonths(currentDate, 1);
    handleDateRangeChange(prevMonth);
  };

  const navigateToNextMonth = () => {
    const nextMonth = addMonths(currentDate, 1);
    handleDateRangeChange(nextMonth);
  };

  const navigateToToday = () => {
    handleDateRangeChange(new Date());
  };

  // 初期データ取得
  useEffect(() => {
    fetchSchedulesByDateRange(dateRange);
  }, [fetchSchedulesByDateRange, dateRange]);

  const handleEventClick = (schedule: KPTSchedule) => {
    console.log('Selected schedule:', schedule);
    // 詳細モーダルを開く、編集ページに遷移するなどの処理
  };

  // 期間別統計の計算
  const getStatistics = () => {
    const completed = schedules.filter(s => s.status === 'completed');
    const scheduled = schedules.filter(s => s.status === 'scheduled');

    return {
      keep: {
        completed: completed.filter(s => s.type === 'keep').length,
        scheduled: scheduled.filter(s => s.type === 'keep').length,
      },
      problem: {
        completed: completed.filter(s => s.type === 'problem').length,
        scheduled: scheduled.filter(s => s.type === 'problem').length,
      },
      try: {
        completed: completed.filter(s => s.type === 'try').length,
        scheduled: scheduled.filter(s => s.type === 'try').length,
      },
    };
  };

  const stats = getStatistics();

  // タブボタンのスタイル
  const getTabButtonClass = (tab: ViewMode) => {
    const baseClass = 'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200';
    const activeClass = 'bg-indigo-600 text-white';
    const inactiveClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

    return `${baseClass} ${viewMode === tab ? activeClass : inactiveClass}`;
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
                {format(currentDate, 'yyyy年MM月', { locale: require('date-fns/locale/ja') })}
                の振り返りスケジュール
              </p>
            </div>
            <div className='flex space-x-3'>
              <Button onClick={navigateToToday} variant='outline'>
                今月に戻る
              </Button>
              <Link href='/dashboard/kpt/new'>
                <Button className='bg-indigo-600 hover:bg-indigo-700'>新しいKPTを作成</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>

          {/* ビュー切り替えタブ */}
          <div className='flex space-x-2 mb-6'>
            <button
              onClick={() => setViewMode('calendar')}
              className={getTabButtonClass('calendar')}
            >
              📅 カレンダー
            </button>
            <button onClick={() => setViewMode('gantt')} className={getTabButtonClass('gantt')}>
              📊 ガントチャート
            </button>
            <button onClick={() => setViewMode('charts')} className={getTabButtonClass('charts')}>
              📈 分析グラフ
            </button>
          </div>

          {/* 期間ナビゲーション（カレンダーとガントチャートのみ） */}
          {(viewMode === 'calendar' || viewMode === 'gantt') && (
            <div className='flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow'>
              <Button onClick={navigateToPreviousMonth} variant='outline'>
                ← 前月
              </Button>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {format(currentDate, 'yyyy年MM月', { locale: require('date-fns/locale/ja') })}
                </h2>
                <p className='text-sm text-gray-500'>
                  {format(dateRange.start, 'MM/dd')} - {format(dateRange.end, 'MM/dd')}
                </p>
              </div>
              <Button onClick={navigateToNextMonth} variant='outline'>
                次月 →
              </Button>
            </div>
          )}

          {/* 統計情報（カレンダービューのみ） */}
          {viewMode === 'calendar' && (
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>Keep</dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          完了: {stats.keep.completed}件 / 予定: {stats.keep.scheduled}件
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>Problem</dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          完了: {stats.problem.completed}件 / 予定: {stats.problem.scheduled}件
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
                        <dt className='text-sm font-medium text-gray-500 truncate'>Try</dt>
                        <dd className='text-lg font-medium text-gray-900'>
                          完了: {stats.try.completed}件 / 予定: {stats.try.scheduled}件
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ビュー別コンテンツ */}
          {viewMode === 'calendar' && (
            <KPTCalendar
              schedules={schedules}
              onEventClick={handleEventClick}
              currentDate={currentDate}
              onDateChange={handleDateRangeChange}
            />
          )}

          {viewMode === 'gantt' && (
            <KPTGanttChart
              schedules={schedules}
              onTaskClick={handleEventClick}
              dateRange={dateRange}
            />
          )}

          {viewMode === 'charts' && <KPTCharts schedules={schedules} dateRange={dateRange} />}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
