import { BarChart, Calendar, FileText,
   Bell, List, Target, TrendingUp } from 'lucide-react';

export const featuresData = [
  {
    icon: <Target className='w-8 h-8 text-indigo-600' />,
    title: '目標設定',
    description: '学習目標や達成状況を確認',
    href: '/dashboard/goals',
  },
  {
    icon: <Bell className='w-8 h-8 text-indigo-600' />,
    title: '通知設定',
    description: '学習リマインダーと成長アラート',
    href: '/notifications',
  },
  {
    icon: <FileText className='w-8 h-8 text-indigo-600' />,
    title: 'KPT作成',
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
    icon: <TrendingUp className='w-8 h-8 text-indigo-600' />,
    title: '週次レポート',
    description: '週単位での目標達成状況とKPT分析',
    href: '/reports/weekly',
  },
];
