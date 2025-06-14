/**
 * @file metadata.ts
 * @description ルートページのメタデータ設定
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KPT Connect',
    description: 'KPT Connect - プロジェクト管理とチームコラボレーションのためのプラットフォーム',
    openGraph: {
        title: 'KPT Connect',
        description: 'KPT Connect - プロジェクト管理とチームコラボレーションのためのプラットフォーム',
        type: 'website',
        siteName: 'KPT Connect',
        locale: 'ja_JP',
    },
}; 