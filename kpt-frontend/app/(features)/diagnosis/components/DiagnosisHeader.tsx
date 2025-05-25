/**
 * @file DiagnosisHeader.tsx
 * @description 診断ページのヘッダーコンポーネント
 *
 * 総合スコアの表示、カテゴリフィルター、診断概要を提供します。
 *
 * @example
 * ```tsx
 * <DiagnosisHeader 
 *   overallScore={72}
 *   selectedCategory="frontend"
 *   onCategoryChange={handleCategoryChange}
 * />
 * ```
 */

'use client';

import React from 'react';

interface DiagnosisHeaderProps {
  /** 総合スコア (0-100) */
  overallScore: number;
  /** 選択されたカテゴリ */
  selectedCategory: string;
  /** カテゴリ変更ハンドラー */
  onCategoryChange: (category: string) => void;
}

const DiagnosisHeader: React.FC<DiagnosisHeaderProps> = ({
  overallScore,
  selectedCategory,
  onCategoryChange,
}) => {
  /** カテゴリオプション */
  const categories = [
    { id: 'all', name: 'すべて', icon: '🎯' },
    { id: 'frontend', name: 'フロントエンド', icon: '🎨' },
    { id: 'backend', name: 'バックエンド', icon: '⚙️' },
    { id: 'infrastructure', name: 'インフラ', icon: '🏗️' },
    { id: 'design', name: 'デザイン', icon: '✨' },
    { id: 'management', name: '管理', icon: '📊' },
  ];

  /** スコアに基づく評価レベルの取得 */
  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'エキスパート', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 80) return { level: '上級者', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 70) return { level: '中級者', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 60) return { level: '初級者', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: '学習者', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const scoreLevel = getScoreLevel(overallScore);

  return (
    <div className='mb-8'>
      {/* メインヘッダー */}
      <div className='bg-white shadow rounded-lg p-6 mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              🔍 KPT技術診断
            </h1>
            <p className='text-gray-600'>
              あなたのKPTデータを分析して、技術分野別の向上ポイントを特定します
            </p>
          </div>
          
          {/* 総合スコア表示 */}
          <div className='text-center'>
            <div className='relative w-24 h-24 mx-auto mb-2'>
              <svg className='w-24 h-24 transform -rotate-90' viewBox='0 0 100 100'>
                {/* 背景円 */}
                <circle
                  cx='50'
                  cy='50'
                  r='40'
                  stroke='#E5E7EB'
                  strokeWidth='8'
                  fill='none'
                />
                {/* 進捗円 */}
                <circle
                  cx='50'
                  cy='50'
                  r='40'
                  stroke='#4F46E5'
                  strokeWidth='8'
                  fill='none'
                  strokeDasharray={`${(overallScore / 100) * 251.2} 251.2`}
                  strokeLinecap='round'
                />
              </svg>
              <div className='absolute inset-0 flex items-center justify-center'>
                <span className='text-2xl font-bold text-gray-900'>{overallScore}</span>
              </div>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${scoreLevel.bgColor} ${scoreLevel.color}`}>
              {scoreLevel.level}
            </div>
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className='border-t border-gray-200 pt-6'>
          <h3 className='text-sm font-medium text-gray-700 mb-3'>技術分野で絞り込み</h3>
          <div className='flex flex-wrap gap-2'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className='mr-2'>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 診断概要 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
          <div className='flex items-center mb-3'>
            <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3'>
              <span className='text-white text-sm font-bold'>1</span>
            </div>
            <h3 className='text-lg font-semibold text-blue-900'>現状分析</h3>
          </div>
          <p className='text-blue-800 text-sm'>
            KPTデータから現在のスキルレベルと課題を特定
          </p>
        </div>

        <div className='bg-green-50 p-6 rounded-lg border border-green-200'>
          <div className='flex items-center mb-3'>
            <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3'>
              <span className='text-white text-sm font-bold'>2</span>
            </div>
            <h3 className='text-lg font-semibold text-green-900'>改善提案</h3>
          </div>
          <p className='text-green-800 text-sm'>
            優先度付きの具体的な学習・改善アクションを提示
          </p>
        </div>

        <div className='bg-purple-50 p-6 rounded-lg border border-purple-200'>
          <div className='flex items-center mb-3'>
            <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3'>
              <span className='text-white text-sm font-bold'>3</span>
            </div>
            <h3 className='text-lg font-semibold text-purple-900'>学習パス</h3>
          </div>
          <p className='text-purple-800 text-sm'>
            段階的な成長プランとマイルストーンを設定
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHeader; 