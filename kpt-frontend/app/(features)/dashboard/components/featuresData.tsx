/**
 * @file featuresData.tsx
 * @description ダッシュボード機能データ
 *
 * ダッシュボードで表示する機能カードのデータを定義します。
 * 各機能の説明とリンク先を管理します。
 */

import { BarChart, Calendar, FileText, User, Bell, Link, List } from 'lucide-react';

export const featuresData = [
  {
    icon: <FileText className='w-8 h-8 text-indigo-600' />,
    title: 'Todo作成',
    description: '新しいTodoを作成して管理',
    href: '/dashboard/todo',
  },
  {
    icon: <List className='w-8 h-8 text-indigo-600' />,
    title: 'Todo一覧',
    description: '作成したTodoをカレンダー形式で管理',
    href: '/dashboard/calendar',
  },
  {
    icon: <Calendar className='w-8 h-8 text-indigo-600' />,
    title: '個人振り返りカレンダー',
    description: '個人成長スケジュールと振り返りの可視化',
    href: '/dashboard/calendar',
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
  {
    icon: <Link className='w-8 h-8 text-indigo-600' />,
    title: '外部連携',
    description: 'GitHub、Calendar等との連携設定',
    href: '/integrations',
  },
  {
    icon: <User className='w-8 h-8 text-indigo-600' />,
    title: 'プロフィール',
    description: 'アカウント情報と設定管理',
    href: '/profile',
  },
];
