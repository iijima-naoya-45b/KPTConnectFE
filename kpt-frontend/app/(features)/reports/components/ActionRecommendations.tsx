/**
 * @file ActionRecommendations.tsx
 * @description 推奨アクションコンポーネント
 *
 * AIによる分析結果に基づいた具体的な改善アクションを提案します。
 * 優先度、インパクト、実施期間などの詳細情報を含みます。
 *
 * @example
 * ```tsx
 * <ActionRecommendations recommendations={recommendations} />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

interface Recommendation {
  category: 'keep' | 'problem' | 'try';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: number;
}

interface ActionRecommendationsProps {
  recommendations: Recommendation[];
}

type FilterCategory = 'all' | 'keep' | 'problem' | 'try';
type SortBy = 'priority' | 'impact' | 'category';

const ActionRecommendations: React.FC<ActionRecommendationsProps> = ({ recommendations }) => {
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortBy>('priority');
  const [selectedActions, setSelectedActions] = useState<Set<number>>(new Set());

  // カテゴリ別の色設定
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'keep':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'problem':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'try':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // 優先度別の色設定
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // 優先度の数値変換（ソート用）
  const getPriorityValue = (priority: string) => {
    switch (priority) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 0;
    }
  };

  // フィルタリング
  const filteredRecommendations = recommendations.filter(
    rec => filterCategory === 'all' || rec.category === filterCategory
  );

  // ソート
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return getPriorityValue(b.priority) - getPriorityValue(a.priority);
      case 'impact':
        return b.estimatedImpact - a.estimatedImpact;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // アクション選択の切り替え
  const toggleActionSelection = (index: number) => {
    const newSelected = new Set(selectedActions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedActions(newSelected);
  };

  // 全選択/全解除
  const toggleSelectAll = () => {
    if (selectedActions.size === sortedRecommendations.length) {
      setSelectedActions(new Set());
    } else {
      setSelectedActions(new Set(sortedRecommendations.map((_, index) => index)));
    }
  };

  // 選択されたアクションのエクスポート
  const exportSelectedActions = () => {
    const selectedRecs = sortedRecommendations.filter((_, index) => selectedActions.has(index));
    const exportData = {
      exportDate: new Date().toISOString(),
      selectedActions: selectedRecs,
      totalCount: selectedRecs.length,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kpt-action-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>🎯 推奨アクション</h2>
        <p className='text-gray-600'>AIによる分析結果に基づいた具体的な改善アクションプランです</p>
      </div>

      {/* フィルタとソートコントロール */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0'>
        <div className='flex flex-wrap items-center space-x-4'>
          {/* カテゴリフィルタ */}
          <div className='flex space-x-1 bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                filterCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全て
            </button>
            <button
              onClick={() => setFilterCategory('keep')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                filterCategory === 'keep'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Keep
            </button>
            <button
              onClick={() => setFilterCategory('problem')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                filterCategory === 'problem'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Problem
            </button>
            <button
              onClick={() => setFilterCategory('try')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                filterCategory === 'try'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Try
            </button>
          </div>

          {/* ソート */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className='px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <option value='priority'>優先度順</option>
            <option value='impact'>インパクト順</option>
            <option value='category'>カテゴリ順</option>
          </select>
        </div>

        {/* アクションボタン */}
        <div className='flex items-center space-x-2'>
          <Button onClick={toggleSelectAll} variant='outline' size='sm'>
            {selectedActions.size === sortedRecommendations.length ? '全解除' : '全選択'}
          </Button>
          <Button
            onClick={exportSelectedActions}
            disabled={selectedActions.size === 0}
            size='sm'
            className='bg-indigo-600 hover:bg-indigo-700'
          >
            選択項目をエクスポート ({selectedActions.size})
          </Button>
        </div>
      </div>

      {/* 推奨アクション一覧 */}
      <div className='space-y-4'>
        {sortedRecommendations.map((recommendation, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              selectedActions.has(index)
                ? 'border-indigo-300 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className='flex items-start space-x-4'>
              {/* 選択チェックボックス */}
              <input
                type='checkbox'
                checked={selectedActions.has(index)}
                onChange={() => toggleActionSelection(index)}
                className='mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />

              <div className='flex-1'>
                {/* ヘッダー */}
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center space-x-3'>
                    <h3 className='text-lg font-semibold text-gray-900'>{recommendation.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(recommendation.category)}`}
                    >
                      {recommendation.category.toUpperCase()}
                    </span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    {/* 優先度インジケーター */}
                    <div className='flex items-center space-x-1'>
                      <div
                        className={`w-3 h-3 rounded-full ${getPriorityColor(recommendation.priority)}`}
                      ></div>
                      <span className='text-sm text-gray-600'>
                        {recommendation.priority === 'high'
                          ? '高優先度'
                          : recommendation.priority === 'medium'
                            ? '中優先度'
                            : '低優先度'}
                      </span>
                    </div>

                    {/* インパクトスコア */}
                    <div className='text-sm text-gray-600'>
                      インパクト:{' '}
                      <span className='font-medium'>{recommendation.estimatedImpact}%</span>
                    </div>
                  </div>
                </div>

                {/* 説明 */}
                <p className='text-gray-700 mb-3'>{recommendation.description}</p>

                {/* インパクトバー */}
                <div className='mb-3'>
                  <div className='flex justify-between text-xs text-gray-600 mb-1'>
                    <span>期待されるインパクト</span>
                    <span>{recommendation.estimatedImpact}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        recommendation.estimatedImpact >= 80
                          ? 'bg-green-500'
                          : recommendation.estimatedImpact >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${recommendation.estimatedImpact}%` }}
                    ></div>
                  </div>
                </div>

                {/* アクションボタン */}
                <div className='flex items-center space-x-2'>
                  <Button size='sm' variant='outline'>
                    詳細を見る
                  </Button>
                  <Button size='sm' className='bg-indigo-600 hover:bg-indigo-700'>
                    アクションプランに追加
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* サマリー */}
      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h4 className='text-sm font-semibold text-gray-700 mb-2'>📋 アクションプランサマリー</h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div>
            <span className='text-gray-600'>総推奨アクション数:</span>
            <span className='ml-2 font-medium'>{recommendations.length}件</span>
          </div>
          <div>
            <span className='text-gray-600'>高優先度アクション:</span>
            <span className='ml-2 font-medium text-red-600'>
              {recommendations.filter(r => r.priority === 'high').length}件
            </span>
          </div>
          <div>
            <span className='text-gray-600'>平均期待インパクト:</span>
            <span className='ml-2 font-medium text-green-600'>
              {Math.round(
                recommendations.reduce((sum, r) => sum + r.estimatedImpact, 0) /
                  recommendations.length
              )}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionRecommendations;
