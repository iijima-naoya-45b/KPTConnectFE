/**
 * @file PageHeader.tsx
 * @description ページヘッダーコンポーネント
 * 
 * ページのタイトル、説明、戻るボタンなどを含む
 * 再利用可能なヘッダーコンポーネントです。
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   title="フィードバック"
 *   description="ご意見、ご要望をお聞かせください"
 *   backButton={{
 *     href: "/dashboard",
 *     label: "ダッシュボードに戻る"
 *   }}
 * />
 * ```
 */

import React from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface BackButtonConfig {
  /** リンク先URL */
  href: string;
  /** ボタンのラベル */
  label: string;
  /** ボタンのバリアント */
  variant?: 'default' | 'outline' | 'destructive' | 'ghost' | 'link' | 'secondary';
}

interface PageHeaderProps {
  /** ページタイトル */
  title: string;
  /** ページの説明 */
  description?: string;
  /** 戻るボタンの設定 */
  backButton?: BackButtonConfig;
  /** 追加のアクションボタン */
  children?: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * ページヘッダーコンポーネント
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backButton,
  children,
  className = '',
}) => {
  return (
    <div className={`flex justify-between items-center mb-6 ${className}`}>
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
        {description && <p className='mt-2 text-gray-600'>{description}</p>}
      </div>
      <div className='flex items-center space-x-3'>
        {children}
        {backButton && (
          <Link href={backButton.href}>
            <Button variant={backButton.variant || 'outline'}>{backButton.label}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 