import { BarChart, Calendar, FileText,
   Bell, List } from 'lucide-react';

export const featuresData = [
  {
    icon: <FileText className='w-8 h-8 text-indigo-600' />,
    title: 'Todo作成',
    description: '新しいTodoを作成して管理',
    href: '/dashboard/new',
  },
  {
    icon: <Calendar className='w-8 h-8 text-indigo-600' />,
    title: 'カレンダー',
    description: 'Todoをカレンダー形式で可視化',
    href: '/dashboard/calendar',
  },
  {
    icon: <BarChart className='w-8 h-8 text-indigo-600' />,
    title: 'ガントチャート',
    description: 'Todoをガントチャートで管理',
    href: '/dashboard/gantt',
  },
  {
    icon: <List className='w-8 h-8 text-indigo-600' />,
    title: 'Todo一覧',
    description: '作成したTodoを一覧形式で管理',
    href: '/dashboard/todos',
  },
  {
    icon: <BarChart className='w-8 h-8 text-indigo-600' />,
    title: 'レポート',
    description: '成長の軌跡と傾向を分析',
    href: '/reports',
  },
  {
    icon: <Bell className='w-8 h-8 text-indigo-600' />,
    title: '通知設定',
    description: '学習リマインダーと成長アラート',
    href: '/notifications',
  },
];
