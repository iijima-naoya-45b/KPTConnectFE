'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
  const [view, setView] = useState<any>(Views.MONTH);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        let startDate, endDate;

        if (view === Views.MONTH) {
          startDate = startOfWeek(startOfMonth(date));
          endDate = endOfWeek(endOfMonth(date));
        } else if (view === Views.WEEK) {
          startDate = startOfWeek(date);
          endDate = endOfWeek(date);
        } else { // DAY view
          startDate = startOfDay(date);
          endDate = endOfDay(date);
        }

        const response = await fetch(`${BACKEND_URL}/api/v1/kpt_sessions?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('カレンダーデータの取得に失敗しました');
        }
        const responseData = await response.json();
        const kptEvents = responseData.data.sessions.map((session: any) => ({
          title: session.title,
          start: new Date(session.session_date),
          end: new Date(session.completed_at || session.session_date),
          allDay: true,
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
  }, [date, view]);

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