/**
 * @file StrengthWeaknessAnalysis.tsx
 * @description 強み・改善点分析コンポーネント
 *
 * KPTデータから抽出された強みと改善点を分析・表示します。
 * AIによる自動分析結果と具体的な改善提案を提供します。
 *
 * @example
 * ```tsx
 * <StrengthWeaknessAnalysis
 *   strengths={strengths}
 *   improvements={improvements}
 * />
 * ```
 */

'use client';

import React, { useState } from 'react';

interface StrengthWeaknessAnalysisProps {
  strengths: string[];
  improvements: string[];
}

type ViewMode = 'strengths' | 'improvements' | 'both';

const StrengthWeaknessAnalysis: React.FC<StrengthWeaknessAnalysisProps> = ({
  strengths,
  improvements,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [expandedStrengths, setExpandedStrengths] = useState<Set<number>>(new Set());
  const [expandedImprovements, setExpandedImprovements] = useState<Set<number>>(new Set());

  // 強みの詳細情報（実際はAI分析結果）
  const strengthDetails = [
    {
      impact: 'high',
      category: 'プロセス',
      actionable: '他チームへの横展開を検討',
    },
    {
      impact: 'high',
      category: '実行力',
      actionable: 'ベストプラクティスとして文書化',
    },
    {
      impact: 'medium',
      category: 'コミュニケーション',
      actionable: '定期的な振り返り会の継続',
    },
    {
      impact: 'medium',
      category: '姿勢',
      actionable: 'モチベーション維持の仕組み作り',
    },
    {
      impact: 'medium',
      category: '創造性',
      actionable: 'アイデア創出の場を増やす',
    },
  ];

  // 改善点の詳細情報（実際はAI分析結果）
  const improvementDetails = [
    {
      priority: 'high',
      category: '効率性',
      solution: 'プロセス標準化とツール導入',
      timeline: '1-2ヶ月',
    },
    {
      priority: 'high',
      category: '実行管理',
      solution: 'マイルストーン設定と進捗確認',
      timeline: '2-3週間',
    },
    {
      priority: 'medium',
      category: '測定',
      solution: 'KPI設定とダッシュボード作成',
      timeline: '1ヶ月',
    },
    {
      priority: 'medium',
      category: 'フォローアップ',
      solution: '定期レビュー会の設定',
      timeline: '1週間',
    },
    {
      priority: 'low',
      category: '知識共有',
      solution: '社内Wiki・勉強会の活用',
      timeline: '1-2ヶ月',
    },
  ];

  const toggleStrengthExpansion = (index: number) => {
    const newExpanded = new Set(expandedStrengths);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedStrengths(newExpanded);
  };

  const toggleImprovementExpansion = (index: number) => {
    const newExpanded = new Set(expandedImprovements);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedImprovements(newExpanded);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>🔍 強み・改善点分析</h2>
            <p className='text-gray-600'>
              AIによるKPTデータ分析から抽出された強みと改善点を表示します
            </p>
          </div>

          {/* ビュー切り替え */}
          <div className='flex space-x-1 bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => setViewMode('strengths')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'strengths'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              強み
            </button>
            <button
              onClick={() => setViewMode('improvements')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'improvements'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              改善点
            </button>
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'both'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              両方
            </button>
          </div>
        </div>
      </div>

      <div
        className={`grid gap-8 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}
      >
        {/* 強み分析 */}
        {(viewMode === 'strengths' || viewMode === 'both') && (
          <div>
            <div className='flex items-center mb-4'>
              <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3'>
                <span className='text-white font-semibold'>💪</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>特定された強み</h3>
              <span className='ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
                {strengths.length}件
              </span>
            </div>

            <div className='space-y-3'>
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className='border border-green-200 rounded-lg p-4 bg-green-50 hover:bg-green-100 transition-colors duration-200'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <p className='text-gray-800 font-medium'>{strength}</p>

                      {expandedStrengths.has(index) && strengthDetails[index] && (
                        <div className='mt-3 pt-3 border-t border-green-200'>
                          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-sm'>
                            <div>
                              <span className='text-gray-600'>インパクト:</span>
                              <span
                                className={`ml-2 px-2 py-1 rounded-full text-xs border ${getImpactColor(strengthDetails[index].impact)}`}
                              >
                                {strengthDetails[index].impact === 'high'
                                  ? '高'
                                  : strengthDetails[index].impact === 'medium'
                                    ? '中'
                                    : '低'}
                              </span>
                            </div>
                            <div>
                              <span className='text-gray-600'>カテゴリ:</span>
                              <span className='ml-2 text-gray-800'>
                                {strengthDetails[index].category}
                              </span>
                            </div>
                            <div>
                              <span className='text-gray-600'>活用方法:</span>
                              <p className='text-gray-800 mt-1'>
                                {strengthDetails[index].actionable}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleStrengthExpansion(index)}
                      className='ml-3 text-green-600 hover:text-green-800 transition-colors duration-200'
                    >
                      {expandedStrengths.has(index) ? '▼' : '▶'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 改善点分析 */}
        {(viewMode === 'improvements' || viewMode === 'both') && (
          <div>
            <div className='flex items-center mb-4'>
              <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3'>
                <span className='text-white font-semibold'>🎯</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>改善が必要な領域</h3>
              <span className='ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full'>
                {improvements.length}件
              </span>
            </div>

            <div className='space-y-3'>
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  className='border border-red-200 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition-colors duration-200'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <p className='text-gray-800 font-medium'>{improvement}</p>

                      {expandedImprovements.has(index) && improvementDetails[index] && (
                        <div className='mt-3 pt-3 border-t border-red-200'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-sm'>
                            <div>
                              <span className='text-gray-600'>優先度:</span>
                              <span
                                className={`ml-2 px-2 py-1 rounded-full text-xs border ${getPriorityColor(improvementDetails[index].priority)}`}
                              >
                                {improvementDetails[index].priority === 'high'
                                  ? '高'
                                  : improvementDetails[index].priority === 'medium'
                                    ? '中'
                                    : '低'}
                              </span>
                            </div>
                            <div>
                              <span className='text-gray-600'>カテゴリ:</span>
                              <span className='ml-2 text-gray-800'>
                                {improvementDetails[index].category}
                              </span>
                            </div>
                            <div>
                              <span className='text-gray-600'>解決策:</span>
                              <p className='text-gray-800 mt-1'>
                                {improvementDetails[index].solution}
                              </p>
                            </div>
                            <div>
                              <span className='text-gray-600'>実施期間:</span>
                              <span className='ml-2 text-gray-800'>
                                {improvementDetails[index].timeline}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleImprovementExpansion(index)}
                      className='ml-3 text-red-600 hover:text-red-800 transition-colors duration-200'
                    >
                      {expandedImprovements.has(index) ? '▼' : '▶'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 分析サマリー */}
      <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
        <h4 className='text-sm font-semibold text-gray-700 mb-3'>🤖 AI分析サマリー</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div className='bg-green-100 p-3 rounded-lg'>
            <div className='font-medium text-green-800 mb-1'>強みの活用度</div>
            <div className='text-green-700'>
              継続的な振り返り文化が根付いており、チームの学習能力が高い。
              特にKeepの実行率が優秀で、良い取り組みを維持する力がある。
            </div>
          </div>
          <div className='bg-red-100 p-3 rounded-lg'>
            <div className='font-medium text-red-800 mb-1'>改善の重点領域</div>
            <div className='text-red-700'>
              Problemの解決プロセスとTryの実行管理に課題がある。
              定量的な測定と継続的なフォローアップの仕組み作りが急務。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthWeaknessAnalysis;
