/**
 * @file types.ts
 * @description ダッシュボード機能の型定義
 * 
 * ダッシュボード機能で使用する共通の型定義を管理します。
 * Feature、ナビゲーション、統計データなどの型を定義します。
 */

import type { ReactNode } from 'react';

export interface DashboardFeature {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

export interface DashboardStats {
  totalKpts: number;
  thisWeekKpts: number;
  completedActions: number;
  pendingActions: number;
}

export interface QuickAction {
  label: string;
  path: string;
  icon: ReactNode;
  variant?: 'primary' | 'secondary';
} 