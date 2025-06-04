/**
 * @file FeatureGrid.tsx
 * @description 機能グリッドコンポーネント
 *
 * ダッシュボードの機能カードをグリッドレイアウトで表示します。
 * レスポンシブデザインに対応し、カードの配置を管理します。
 */

import React from 'react';
import FeatureCard from './FeatureCard';
import type { DashboardFeature } from './types';

interface FeatureGridProps {
  features: DashboardFeature[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = { sm: 1, md: 2, lg: 3 },
  className = '',
}) => {
  // featuresがundefinedまたは空配列の場合の処理
  if (!features || features.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='py-6 lg:py-8 text-center'>
          <p className='text-gray-500'>機能データを読み込み中...</p>
        </div>
      </div>
    );
  }

  const gridClasses = `
    grid gap-6 lg:gap-8
    grid-cols-${columns.sm} 
    sm:grid-cols-${columns.md} 
    lg:grid-cols-${columns.lg}
    ${className}
  `;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
      <div className='py-6 lg:py-8'>
        <div className={gridClasses}>
          {features.map(feature => (
            <FeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
