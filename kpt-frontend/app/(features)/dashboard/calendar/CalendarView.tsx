import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
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

const getEventStyle = (event: Event) => {
  // KPTレビューの場合は緑の丸ポチ風
  if (event.resource && event.resource.isKpt) {
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
  const todoEvents: Event[] = items.map(item => ({
    id: item.id,
    title: item.content,
    start: item.start_date ? new Date(item.start_date) : new Date(item.created_at),
    end: item.end_date ? new Date(item.end_date) : new Date(item.created_at),
    resource: item
  }));

  // KPTレビューを緑の丸ポチイベントとして追加
  const kptEvents: Event[] = kptReviews.map(review => ({
    id: `kpt-${review.id}`,
    title: '',
    start: new Date(review.created_at),
    end: new Date(review.created_at),
    resource: { ...review, isKpt: true }
  }));

  const allEvents = [...todoEvents, ...kptEvents];

  // KPTレビューイベントの場合は該当日のKPT一覧ページに遷移
  const handleSelectEvent = (event: Event) => {
    if (event.resource && event.resource.isKpt) {
      const dateStr = moment(event.start).format('YYYY-MM-DD');
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
      <style>{`
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