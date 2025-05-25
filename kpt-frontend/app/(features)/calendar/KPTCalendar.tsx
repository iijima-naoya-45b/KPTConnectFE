/**
 * @file KPTCalendar.tsx
 * @description KPTのスケジュールを管理するカレンダーコンポーネント
 *
 * @example
 * ```tsx
 * <KPTCalendar />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
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
}

interface KPTCalendarProps {
  schedules: KPTSchedule[];
  onEventClick?: (schedule: KPTSchedule) => void;
}

const KPTCalendar: React.FC<KPTCalendarProps> = ({ schedules, onEventClick }) => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const eventStyleGetter = (event: KPTSchedule) => {
    let backgroundColor = '';
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

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

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
          <Calendar
            localizer={localizer}
            events={schedules}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 600 }}
            view={view}
            onView={newView => setView(newView as typeof view)}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={onEventClick}
            messages={{
              next: '次へ',
              previous: '前へ',
              today: '今日',
              month: '月',
              week: '週',
              day: '日',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default KPTCalendar;
