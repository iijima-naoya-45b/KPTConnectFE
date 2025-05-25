/**
 * @file ImprovementRecommendations.tsx
 * @description 改善提案コンポーネント
 *
 * 優先度付きの具体的な学習・改善アクションを表示し、
 * 学習リソースと推定時間を提供します。
 *
 * @example
 * ```tsx
 * <ImprovementRecommendations 
 *   recommendations={recommendations}
 *   selectedCategory="frontend"
 * />
 * ```
 */

'use client';

import React, { useState } from 'react';

interface Recommendation {
  area: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  resources: string[];
}

interface ImprovementRecommendationsProps {
  /** 改善提案一覧 */
  recommendations: Recommendation[];
  /** 選択されたカテゴリ */
  selectedCategory: string;
}

const ImprovementRecommendations: React.FC<ImprovementRecommendationsProps> = ({
  recommendations,
  selectedCategory,
}) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  /** 優先度に基づく色とアイコンの取得 */
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          badge: 'bg-red-600',
          icon: '🔥',
          label: '高優先度',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          badge: 'bg-yellow-600',
          icon: '⚡',
          label: '中優先度',
        };
      case 'low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          badge: 'bg-green-600',
          icon: '📝',
          label: '低優先度',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          badge: 'bg-gray-600',
          icon: '📋',
          label: '通常',
        };
    }
  };

  /** カテゴリフィルタリング */
  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => {
        const categoryMap: { [key: string]: string[] } = {
          frontend: ['フロントエンド', 'UI/UX', 'デザイン'],
          backend: ['バックエンド', 'API', 'データベース', 'セキュリティ'],
          infrastructure: ['インフラ', 'DevOps', 'Docker', 'AWS'],
          design: ['デザイン', 'UI/UX'],
          management: ['管理', 'プロジェクト', 'チーム'],
        };
        
        const categoryKeywords = categoryMap[selectedCategory] || [];
        return categoryKeywords.some(keyword => rec.area.includes(keyword));
      });

  /** 優先度順にソート */
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const toggleExpanded = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>🎯 改善提案</h2>
        <p className='text-gray-600'>
          あなたのKPTデータに基づいた、具体的な学習・改善アクションです
        </p>
      </div>

      {/* 統計サマリー */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-red-50 p-4 rounded-lg border border-red-200'>
          <div className='text-2xl font-bold text-red-600'>
            {sortedRecommendations.filter(r => r.priority === 'high').length}
          </div>
          <div className='text-sm text-red-800'>🔥 高優先度</div>
        </div>
        <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
          <div className='text-2xl font-bold text-yellow-600'>
            {sortedRecommendations.filter(r => r.priority === 'medium').length}
          </div>
          <div className='text-sm text-yellow-800'>⚡ 中優先度</div>
        </div>
        <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
          <div className='text-2xl font-bold text-green-600'>
            {sortedRecommendations.filter(r => r.priority === 'low').length}
          </div>
          <div className='text-sm text-green-800'>📝 低優先度</div>
        </div>
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <div className='text-2xl font-bold text-blue-600'>
            {sortedRecommendations.length}
          </div>
          <div className='text-sm text-blue-800'>📋 総提案数</div>
        </div>
      </div>

      {/* 提案一覧 */}
      <div className='space-y-4'>
        {sortedRecommendations.map((recommendation, index) => {
          const style = getPriorityStyle(recommendation.priority);
          const isExpanded = expandedCard === index;

          return (
            <div
              key={index}
              className={`border rounded-lg transition-all duration-200 ${style.border} ${
                isExpanded ? 'shadow-md' : 'hover:shadow-sm'
              }`}
            >
              <div
                className={`p-6 cursor-pointer ${style.bg}`}
                onClick={() => toggleExpanded(index)}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center mb-2'>
                      <span className='text-lg mr-2'>{style.icon}</span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${style.badge}`}
                      >
                        {style.label}
                      </span>
                      <span className='ml-3 text-sm text-gray-600'>{recommendation.area}</span>
                    </div>
                    
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      {recommendation.title}
                    </h3>
                    
                    <p className={`text-sm ${style.text} leading-relaxed`}>
                      {recommendation.description}
                    </p>
                    
                    <div className='flex items-center mt-3 text-sm text-gray-600'>
                      <span className='mr-4'>
                        ⏱️ 推定時間: <span className='font-medium'>{recommendation.estimatedTime}</span>
                      </span>
                      <span>
                        📚 リソース: <span className='font-medium'>{recommendation.resources.length}件</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className='ml-4'>
                    <button className='text-gray-400 hover:text-gray-600 transition-colors duration-200'>
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* 展開コンテンツ */}
              {isExpanded && (
                <div className='border-t border-gray-200 p-6 bg-white'>
                  <h4 className='text-sm font-semibold text-gray-700 mb-3'>📚 学習リソース</h4>
                  <div className='space-y-2'>
                    {recommendation.resources.map((resource, resourceIndex) => (
                      <div
                        key={resourceIndex}
                        className='flex items-center p-3 bg-gray-50 rounded-lg'
                      >
                        <div className='w-2 h-2 bg-indigo-600 rounded-full mr-3'></div>
                        <span className='text-sm text-gray-700'>{resource}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className='mt-6 flex space-x-3'>
                    <button className='px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200'>
                      学習を開始
                    </button>
                    <button className='px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                      後で確認
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* フィルタリング結果が空の場合 */}
      {sortedRecommendations.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 text-6xl mb-4'>🎯</div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            該当する改善提案がありません
          </h3>
          <p className='text-gray-600'>
            他のカテゴリを選択するか、「すべて」で全体を確認してください
          </p>
        </div>
      )}

      {/* アクションヒント */}
      {sortedRecommendations.length > 0 && (
        <div className='mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h4 className='text-sm font-semibold text-blue-800 mb-2'>💡 効果的な学習のコツ</h4>
          <ul className='text-blue-700 text-sm space-y-1'>
            <li>• 高優先度の項目から順番に取り組みましょう</li>
            <li>• 1つの分野に集中して、確実にスキルを身につけてから次に進みましょう</li>
            <li>• 学習した内容は実際のプロジェクトで実践して定着させましょう</li>
            <li>• 定期的に進捗を振り返り、KPTで改善点を見つけましょう</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImprovementRecommendations; 