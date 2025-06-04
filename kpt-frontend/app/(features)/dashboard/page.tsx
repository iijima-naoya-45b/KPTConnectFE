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
import { DashboardHeader, FeatureGrid, featuresData } from './components';

const DashboardPage: React.FC = () => {
  return (
    <div className='mt-10 py-8 lg:py-12 min-h-screen bg-gray-50 pt-16'>
      {/* ヘッダーセクション */}
      <DashboardHeader userName='開発太郎' showQuickActions={true} />

      {/* 機能グリッドセクション */}
      <div className='mt-12 lg:mt-16'>
        <FeatureGrid features={featuresData} columns={{ sm: 1, md: 2, lg: 3 }} />
      </div>
    </div>
  );
};

export default DashboardPage;
