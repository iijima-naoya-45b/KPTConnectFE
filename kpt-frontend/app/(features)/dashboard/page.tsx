/**
 * @file page.tsx
 * @description ダッシュボードページコンポーネント
 *
 * KPT管理システムのメインダッシュボードページです。
 * 各機能へのナビゲーション、統計情報、クイックアクションを提供します。
 * 週次・月次グラフも上部に表示します。
 *
 * @example
 * ```tsx
 * <DashboardPage />
 * ```
 */

'use client';

import React from 'react';
import { FeatureGrid, featuresData } from './components';
// import GithubIssuesSample from './GithubIssuesSample';

const DashboardPage: React.FC = () => {
  return (
    <div className='mt-10 py-8 lg:py-12 min-h-screen bg-gray-50 pt-16'>
      {/* 機能グリッドセクション */}
      <div className='mt-12 lg:mt-16'>
        <FeatureGrid features={featuresData} columns={{ sm: 1, md: 2, lg: 3 }} />
      </div>
      <div>
      {/* <h2>GitHub Issues サンプル</h2>
      <GithubIssuesSample /> */}
    </div>
    </div>
  );
};

export default DashboardPage;
