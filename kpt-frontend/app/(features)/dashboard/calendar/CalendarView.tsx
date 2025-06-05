import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TodoItem } from './types';

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  items: TodoItem[];
}

const getEventStyle = (event: Event) => {
  const item = event.resource as TodoItem;
  let backgroundColor = '#e5e7eb'; // default gray
  let color = '#111827';
  switch (item.status) {
    case 'open':
      backgroundColor = '#e5e7eb'; // gray-200
      color = '#374151'; // gray-700
      break;
    case 'in_progress':
      backgroundColor = '#dbeafe'; // blue-100
      color = '#2563eb'; // blue-600
      break;
    case 'completed':
      backgroundColor = '#bbf7d0'; // green-200
      color = '#15803d'; // green-700
      break;
    case 'cancelled':
      backgroundColor = '#fecaca'; // red-200
      color = '#b91c1c'; // red-700
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

const CalendarView: React.FC<CalendarViewProps> = ({ items }) => {
  // TodoItemをreact-big-calendarのイベント形式に変換
  const events: Event[] = items.map(item => ({
    id: item.id,
    title: item.content,
    start: item.start_date ? new Date(item.start_date) : new Date(item.created_at),
    end: item.end_date ? new Date(item.end_date) : new Date(item.created_at),
    resource: item
  }));

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 600 }}
        eventPropGetter={getEventStyle}
      />
    </div>
  );
};

export default CalendarView; 