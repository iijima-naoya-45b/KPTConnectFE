'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetcher } from '@/lib/api';

const locales = {
  'ja': ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ja }),
  getDay,
  locales,
});

const CalendarPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [view, setView] = useState<typeof Views.MONTH | typeof Views.WEEK | typeof Views.DAY>(Views.MONTH);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetcher('/api/v1/kpt_sessions');
        const kptEvents = data.map((session: any) => ({
          title: session.title,
          start: new Date(session.started_at),
          end: new Date(session.ended_at || session.started_at),
          allDay: false,
          resource: { type: 'kpt', ...session },
        }));
        setMyEvents(kptEvents);
      } catch (error) {
        console.error('Failed to fetch KPT sessions:', error);
        setError('カレンダーデータの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [date]);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: date,
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    [date]
  );

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>カレンダー</h1>
              <p className='mt-2 text-gray-600'>Todo項目をカレンダー形式で可視化</p>
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {error && <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'><p className='text-red-800'>{error}</p></div>}
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            defaultView={view}
            defaultDate={defaultDate}
            scrollToTime={scrollToTime}
            onNavigate={handleNavigate}
            onView={(newView: any) => setView(newView)}
            messages={{
              next: "次",
              previous: "前",
              today: "今日",
              month: "月",
              week: "週",
              day: "日"
            }}
          />
        )}
      </main>
    </div>
  );
};

export default CalendarPage; 