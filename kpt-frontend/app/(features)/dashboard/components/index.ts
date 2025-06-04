/**
 * @file index.ts
 * @description ダッシュボードコンポーネントのエクスポート管理
 * 
 * ダッシュボード機能で使用するコンポーネントの
 * 一元的なエクスポートを提供します。
 */

export { default as DashboardHeader } from './DashboardHeader';
export { default as FeatureCard } from './FeatureCard';
export { default as FeatureGrid } from './FeatureGrid';
export { featuresData } from './featuresData';
export type {
  DashboardFeature,
  DashboardStats,
  QuickAction
} from './types'; 