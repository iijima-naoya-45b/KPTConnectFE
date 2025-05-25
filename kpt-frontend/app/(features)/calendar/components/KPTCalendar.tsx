/**
 * @file KPTCalendar.tsx
 * @description KPTのスケジュールを管理するカレンダーコンポーネント
 *
 * 期間指定データ取得により、過去・未来の振り返りが可能です。
 * スケジュールの状態（完了・予定・キャンセル）を視覚的に表示します。
 *
 * @example
 * ```tsx
 * <KPTCalendar
 *   schedules={schedules}
 *   onEventClick={handleEventClick}
 *   currentDate={currentDate}
 *   onDateChange={handleDateRangeChange}
 * />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ja } from 'date-fns/locale/ja';
import Link from 'next/link';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

interface KPTCalendarProps {
  schedules: KPTSchedule[];
  onEventClick?: (schedule: KPTSchedule) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const KPTCalendar: React.FC<KPTCalendarProps> = ({
  schedules,
  onEventClick,
  currentDate,
  onDateChange,
}) => {
  const [view, setView] = useState<View>('month');

  // イベントのスタイリング（タイプと状態に基づく）
  const eventStyleGetter = (event: KPTSchedule) => {
    let backgroundColor = '';
    let opacity = 0.8;
    let borderStyle = 'solid';

    // タイプ別の色設定
    switch (event.type) {
      case 'keep':
        backgroundColor = '#4F46E5'; // indigo-600
        break;
      case 'problem':
        backgroundColor = '#DC2626'; // red-600
        break;
      case 'try':
        backgroundColor = '#059669'; // green-600
        break;
    }

    // 状態別のスタイル調整
    switch (event.status) {
      case 'completed':
        opacity = 1.0;
        break;
      case 'scheduled':
        opacity = 0.7;
        borderStyle = 'dashed';
        break;
      case 'cancelled':
        opacity = 0.3;
        backgroundColor = '#6B7280'; // gray-500
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity,
        color: 'white',
        border: `2px ${borderStyle} ${backgroundColor}`,
        display: 'block',
        fontSize: '12px',
        padding: '2px 4px',
      },
    };
  };

  // カスタムイベントコンポーネント
  const EventComponent = ({ event }: { event: KPTSchedule }) => {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed':
          return '✓';
        case 'scheduled':
          return '📅';
        case 'cancelled':
          return '✗';
        default:
          return '';
      }
    };

    return (
      <div className='flex items-center space-x-1'>
        <span>{getStatusIcon(event.status)}</span>
        <span className='truncate'>{event.title}</span>
      </div>
    );
  };

  // 日付ナビゲーション処理
  const handleNavigate = (newDate: Date) => {
    onDateChange(newDate);
  };

  // フィルタリング機能
  const [filterType, setFilterType] = useState<'all' | 'keep' | 'problem' | 'try'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'scheduled' | 'cancelled'>(
    'all'
  );

  const filteredSchedules = schedules.filter(schedule => {
    const typeMatch = filterType === 'all' || schedule.type === filterType;
    const statusMatch = filterStatus === 'all' || schedule.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>KPTカレンダー</h1>
          <Link href='/dashboard' className='text-indigo-600 hover:text-indigo-900'>
            ダッシュボードに戻る
          </Link>
        </div>
        <div className='bg-white shadow rounded-lg p-6'>
          {/* フィルタリングコントロール */}
          <div className='mb-6 flex flex-wrap gap-4 items-center justify-between'>
            <div className='flex flex-wrap gap-2'>
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium text-gray-700'>タイプ:</span>
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value as typeof filterType)}
                  className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  aria-label='KPTタイプでフィルタリング'
                >
                  <option value='all'>すべて</option>
                  <option value='keep'>Keep</option>
                  <option value='problem'>Problem</option>
                  <option value='try'>Try</option>
                </select>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium text-gray-700'>状態:</span>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
                  className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  aria-label='スケジュール状態でフィルタリング'
                >
                  <option value='all'>すべて</option>
                  <option value='completed'>完了</option>
                  <option value='scheduled'>予定</option>
                  <option value='cancelled'>キャンセル</option>
                </select>
              </div>
            </div>

            {/* 表示件数 */}
            <div className='text-sm text-gray-500'>
              表示中: {filteredSchedules.length}件 / 全{schedules.length}件
            </div>
          </div>

          {/* 凡例 */}
          <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-700 mb-2'>凡例</h4>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-xs'>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-blue-600 rounded'></div>
                <span>Keep (継続)</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-red-600 rounded'></div>
                <span>Problem (課題)</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='w-4 h-4 bg-green-600 rounded'></div>
                <span>Try (改善)</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>✓</span>
                <span>完了</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>📅</span>
                <span>予定</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>✗</span>
                <span>キャンセル</span>
              </div>
            </div>
          </div>

          {/* カレンダー本体 */}
          <Calendar
            localizer={localizer}
            events={filteredSchedules}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 600 }}
            view={view}
            onView={setView}
            date={currentDate}
            onNavigate={handleNavigate}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={onEventClick}
            components={{
              event: EventComponent,
            }}
            messages={{
              next: '次へ',
              previous: '前へ',
              today: '今日',
              month: '月',
              week: '週',
              day: '日',
              agenda: 'アジェンダ',
              date: '日付',
              time: '時間',
              event: 'イベント',
              noEventsInRange: 'この期間にはイベントがありません',
              showMore: total => `他 ${total} 件`,
            }}
            formats={{
              monthHeaderFormat: date => format(date, 'yyyy年MM月', { locale: ja }),
              dayHeaderFormat: date => format(date, 'MM/dd (E)', { locale: ja }),
              dayRangeHeaderFormat: ({ start, end }) =>
                `${format(start, 'MM/dd', { locale: ja })} - ${format(end, 'MM/dd', { locale: ja })}`,
            }}
          />

          {/* 期間情報表示 */}
          <div className='mt-4 text-center text-sm text-gray-500'>
            {format(currentDate, 'yyyy年MM月', { locale: ja })}の振り返りスケジュール
            {filteredSchedules.length > 0 && (
              <span className='ml-2'>
                （{filteredSchedules.filter(s => s.status === 'completed').length}件完了 /
                {filteredSchedules.filter(s => s.status === 'scheduled').length}件予定）
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTCalendar;
