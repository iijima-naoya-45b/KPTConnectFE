import React from 'react';
import { Calendar, momentLocalizer, Event as RBCEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TodoItem } from './types';

const localizer = momentLocalizer(moment);

interface KptReview {
  id: number;
  title: string;
  description: string;
  keep: string;
  problem: string;
  try: string;
  created_at: string;
  user_id: number;
}

interface CalendarViewProps {
  items: TodoItem[];
  kptReviews?: KptReview[];
}

interface CalendarEvent extends RBCEvent {
  id: string;
  resource: TodoItem | { isKpt: true; date: string };
}

const getEventStyle = (event: CalendarEvent) => {
  // KPTレビューの場合は緑の丸ポチ風
  if (event.resource && 'isKpt' in event.resource && event.resource.isKpt) {
    return {
      style: {
        backgroundColor: 'transparent',
        color: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
      className: 'kpt-dot-event',
    };
  }
  // Todo色分け
  const item = event.resource as TodoItem;
  let backgroundColor = '#e5e7eb'; // default gray
  let color = '#111827';
  switch (item.status) {
    case 'open':
      backgroundColor = '#e5e7eb';
      color = '#374151';
      break;
    case 'in_progress':
      backgroundColor = '#dbeafe';
      color = '#2563eb';
      break;
    case 'completed':
      backgroundColor = '#bbf7d0';
      color = '#15803d';
      break;
    case 'cancelled':
      backgroundColor = '#fecaca';
      color = '#b91c1c';
      break;
  }
  return {
    style: {
      backgroundColor,
      color,
      borderRadius: '6px',
      border: 'none',
      fontWeight: 500,
      opacity: 0.95,
      paddingLeft: 8,
      paddingRight: 8,
    }
  };
};

const CalendarView: React.FC<CalendarViewProps> = ({ items, kptReviews = [] }) => {
  // TodoItemをreact-big-calendarのイベント形式に変換
  const todoEvents: CalendarEvent[] = items.map(item => ({
    id: item.id,
    title: item.content,
    start: item.start_date ? new Date(item.start_date) : new Date(item.created_at),
    end: item.end_date ? new Date(item.end_date) : new Date(item.created_at),
    resource: item
  }));

  // KPTレビューをJST日付で日付ごとにグループ化し、1日につき1つのイベントとして追加
  const kptEventsByDate = kptReviews.reduce((acc, review) => {
    // JST変換は不要。created_atをそのままmomentで日付抽出
    const dateStr = moment(review.created_at).format('YYYY-MM-DD');
    if (!acc[dateStr]) {
      // 日付の0時0分0秒でDateオブジェクトを作成
      const dateObj = moment(review.created_at).startOf('day').toDate();
      acc[dateStr] = {
        id: `kpt-${dateStr}`,
        title: '',
        start: dateObj,
        end: dateObj,
        resource: { isKpt: true, date: dateStr }
      };
    }
    return acc;
  }, {} as Record<string, CalendarEvent>);

  const kptEvents = Object.values(kptEventsByDate);
  const allEvents = [...todoEvents, ...kptEvents];

  // KPTレビューイベントの場合は該当日のKPT一覧ページに遷移
  const handleSelectEvent = (event: CalendarEvent) => {
    if (event.resource && 'isKpt' in event.resource && event.resource.isKpt) {
      const dateStr = event.resource.date;
      window.location.href = `/dashboard/kpt?date=${dateStr}`;
    }
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 600 }}
        eventPropGetter={getEventStyle}
        onSelectEvent={handleSelectEvent}
      />
      <style jsx global>{`
        .kpt-dot-event .rbc-event-content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .kpt-dot-event .rbc-event-content::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default CalendarView; 