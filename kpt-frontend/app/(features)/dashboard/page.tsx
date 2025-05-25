/**
 * @file page.tsx
 * @description ダッシュボードページコンポーネント
 *
 * KPT管理システムのメインダッシュボードページです。
 * 各機能へのナビゲーション、統計情報、クイックアクションを提供します。
 *
 * @example
 * ```tsx
 * <DashboardPage />
 * ```
 */

'use client';

import React from 'react';
import { DashboardHeader, FeatureGrid, dashboardFeatures } from './components';

const DashboardPage: React.FC = () => {
  return (
    <div className='py-6 min-h-screen bg-gray-50'>
      {/* ヘッダーセクション */}
      <DashboardHeader userName='開発太郎' showQuickActions={true} />

      {/* 機能グリッドセクション */}
      <div className='mt-8'>
        <FeatureGrid features={dashboardFeatures} columns={{ sm: 1, md: 2, lg: 3 }} />
      </div>
    </div>
  );
};

export default DashboardPage;
