/**
 * @file SkillAssessment.tsx
 * @description スキル評価コンポーネント
 *
 * 技術分野別のスキルレベルを視覚的に表示し、
 * 現在レベルと目標レベルの比較を提供します。
 *
 * @example
 * ```tsx
 * <SkillAssessment 
 *   technicalAreas={technicalAreas}
 *   overallScore={72}
 * />
 * ```
 */

'use client';

import React from 'react';

interface TechnicalArea {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'design' | 'management';
  currentLevel: number; // 1-5
  targetLevel: number; // 1-5
  priority: 'high' | 'medium' | 'low';
  skills: string[];
  kptCount: {
    keep: number;
    problem: number;
    try: number;
  };
}

interface SkillAssessmentProps {
  /** 技術分野データ */
  technicalAreas: TechnicalArea[];
  /** 総合スコア */
  overallScore: number;
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({
  technicalAreas,
}) => {
  /** 優先度に基づく色の取得 */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      case 'medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

  /** カテゴリアイコンの取得 */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return '🎨';
      case 'backend':
        return '⚙️';
      case 'infrastructure':
        return '🏗️';
      case 'design':
        return '✨';
      case 'management':
        return '📊';
      default:
        return '💻';
    }
  };

  /** レベルバーの描画 */
  const renderLevelBar = (currentLevel: number, targetLevel: number) => {
    const levels = [1, 2, 3, 4, 5];
    
    return (
      <div className='flex items-center space-x-1'>
        {levels.map((level) => (
          <div
            key={level}
            className={`w-6 h-3 rounded-sm ${
              level <= currentLevel
                ? 'bg-indigo-600'
                : level <= targetLevel
                ? 'bg-indigo-200'
                : 'bg-gray-200'
            }`}
          />
        ))}
        <span className='ml-2 text-sm text-gray-600'>
          {currentLevel}/{targetLevel}
        </span>
      </div>
    );
  };

  /** KPT統計の表示 */
  const renderKPTStats = (kptCount: { keep: number; problem: number; try: number }) => {
    const total = kptCount.keep + kptCount.problem + kptCount.try;
    
    return (
      <div className='flex items-center space-x-3 text-xs'>
        <div className='flex items-center'>
          <div className='w-2 h-2 bg-green-500 rounded-full mr-1'></div>
          <span>K: {kptCount.keep}</span>
        </div>
        <div className='flex items-center'>
          <div className='w-2 h-2 bg-red-500 rounded-full mr-1'></div>
          <span>P: {kptCount.problem}</span>
        </div>
        <div className='flex items-center'>
          <div className='w-2 h-2 bg-blue-500 rounded-full mr-1'></div>
          <span>T: {kptCount.try}</span>
        </div>
        <span className='text-gray-500'>({total}件)</span>
      </div>
    );
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>📊 スキル評価</h2>
        <p className='text-gray-600'>
          各技術分野での現在のスキルレベルと目標レベルを表示しています
        </p>
      </div>

      {/* スキル一覧 */}
      <div className='space-y-6'>
        {technicalAreas.map((area) => {
          const priorityColor = getPriorityColor(area.priority);
          const categoryIcon = getCategoryIcon(area.category);
          const progressPercentage = (area.currentLevel / area.targetLevel) * 100;

          return (
            <div
              key={area.id}
              className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center'>
                  <span className='text-2xl mr-3'>{categoryIcon}</span>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>{area.name}</h3>
                    <div className='flex items-center mt-1'>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColor.bg} ${priorityColor.text} ${priorityColor.border} border`}
                      >
                        {area.priority === 'high' && '🔥 高優先度'}
                        {area.priority === 'medium' && '⚡ 中優先度'}
                        {area.priority === 'low' && '📝 低優先度'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 進捗率表示 */}
                <div className='text-right'>
                  <div className='text-2xl font-bold text-indigo-600'>
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className='text-sm text-gray-500'>達成率</div>
                </div>
              </div>

              {/* レベルバー */}
              <div className='mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium text-gray-700'>スキルレベル</span>
                  <span className='text-sm text-gray-500'>
                    現在 → 目標
                  </span>
                </div>
                {renderLevelBar(area.currentLevel, area.targetLevel)}
              </div>

              {/* スキル詳細 */}
              <div className='mb-4'>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>関連スキル</h4>
                <div className='flex flex-wrap gap-2'>
                  {area.skills.map((skill, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* KPT統計 */}
              <div className='border-t border-gray-100 pt-4'>
                <h4 className='text-sm font-medium text-gray-700 mb-2'>KPT活動状況</h4>
                {renderKPTStats(area.kptCount)}
              </div>
            </div>
          );
        })}
      </div>

      {/* サマリー */}
      <div className='mt-8 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-sm font-semibold text-gray-700 mb-3'>📈 評価サマリー</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
          <div>
            <span className='font-medium text-gray-700'>平均達成率:</span>
            <span className='ml-2 text-indigo-600 font-semibold'>
              {Math.round(
                technicalAreas.reduce(
                  (sum, area) => sum + (area.currentLevel / area.targetLevel) * 100,
                  0
                ) / technicalAreas.length
              )}%
            </span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>高優先度分野:</span>
            <span className='ml-2 text-red-600 font-semibold'>
              {technicalAreas.filter(area => area.priority === 'high').length}件
            </span>
          </div>
          <div>
            <span className='font-medium text-gray-700'>総KPT数:</span>
            <span className='ml-2 text-gray-900 font-semibold'>
              {technicalAreas.reduce(
                (sum, area) => sum + area.kptCount.keep + area.kptCount.problem + area.kptCount.try,
                0
              )}件
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment; 