/**
 * @file TechnicalAreaAnalysis.tsx
 * @description 技術分野別分析コンポーネント
 *
 * 技術分野ごとの詳細分析と強み・弱みの特定結果を表示します。
 *
 * @example
 * ```tsx
 * <TechnicalAreaAnalysis 
 *   technicalAreas={technicalAreas}
 *   strengths={strengths}
 *   weaknesses={weaknesses}
 * />
 * ```
 */

'use client';

import React from 'react';

interface TechnicalArea {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'design' | 'management';
  currentLevel: number;
  targetLevel: number;
  priority: 'high' | 'medium' | 'low';
  skills: string[];
  kptCount: {
    keep: number;
    problem: number;
    try: number;
  };
}

interface TechnicalAreaAnalysisProps {
  /** 技術分野データ */
  technicalAreas: TechnicalArea[];
  /** 強み一覧 */
  strengths: string[];
  /** 弱み一覧 */
  weaknesses: string[];
}

const TechnicalAreaAnalysis: React.FC<TechnicalAreaAnalysisProps> = ({
  technicalAreas,
  strengths,
  weaknesses,
}) => {
  /** 分野別のパフォーマンス分析 */
  const analyzePerformance = (area: TechnicalArea) => {
    const totalKPT = area.kptCount.keep + area.kptCount.problem + area.kptCount.try;
    const problemRatio = totalKPT > 0 ? (area.kptCount.problem / totalKPT) * 100 : 0;
    const keepRatio = totalKPT > 0 ? (area.kptCount.keep / totalKPT) * 100 : 0;
    const progressGap = area.targetLevel - area.currentLevel;

    let status = 'good';
    let message = '順調に成長しています';
    let color = 'text-green-600';
    let bgColor = 'bg-green-50';
    let borderColor = 'border-green-200';

    if (problemRatio > 60) {
      status = 'needs-attention';
      message = '課題が多く、重点的な改善が必要です';
      color = 'text-red-600';
      bgColor = 'bg-red-50';
      borderColor = 'border-red-200';
    } else if (progressGap > 2) {
      status = 'improvement-needed';
      message = '目標達成に向けて学習を加速する必要があります';
      color = 'text-yellow-600';
      bgColor = 'bg-yellow-50';
      borderColor = 'border-yellow-200';
    } else if (keepRatio > 70) {
      status = 'excellent';
      message = '優秀な成果を維持しています';
      color = 'text-blue-600';
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
    }

    return {
      status,
      message,
      color,
      bgColor,
      borderColor,
      metrics: {
        problemRatio: Math.round(problemRatio),
        keepRatio: Math.round(keepRatio),
        progressGap,
      },
    };
  };

  /** ステータスアイコンの取得 */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return '🌟';
      case 'good':
        return '✅';
      case 'improvement-needed':
        return '⚠️';
      case 'needs-attention':
        return '🚨';
      default:
        return '📊';
    }
  };

  return (
    <div className='space-y-8'>
      {/* 技術分野別詳細分析 */}
      <div className='bg-white shadow rounded-lg p-6'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>🔍 技術分野別分析</h2>
          <p className='text-gray-600'>
            各技術分野のKPTデータを分析し、現状と改善ポイントを特定しています
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {technicalAreas.map((area) => {
            const analysis = analyzePerformance(area);
            
            return (
              <div
                key={area.id}
                className={`border rounded-lg p-6 ${analysis.borderColor} ${analysis.bgColor}`}
              >
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                      {area.name}
                    </h3>
                    <div className={`flex items-center ${analysis.color}`}>
                      <span className='mr-2'>{getStatusIcon(analysis.status)}</span>
                      <span className='text-sm font-medium'>{analysis.message}</span>
                    </div>
                  </div>
                </div>

                {/* メトリクス */}
                <div className='grid grid-cols-3 gap-4 mb-4'>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-green-600'>
                      {analysis.metrics.keepRatio}%
                    </div>
                    <div className='text-xs text-gray-600'>Keep率</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-red-600'>
                      {analysis.metrics.problemRatio}%
                    </div>
                    <div className='text-xs text-gray-600'>Problem率</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-lg font-bold text-indigo-600'>
                      {analysis.metrics.progressGap}
                    </div>
                    <div className='text-xs text-gray-600'>レベル差</div>
                  </div>
                </div>

                {/* KPT詳細 */}
                <div className='border-t border-gray-200 pt-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Keep: {area.kptCount.keep}件</span>
                    <span className='text-gray-600'>Problem: {area.kptCount.problem}件</span>
                    <span className='text-gray-600'>Try: {area.kptCount.try}件</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 強み・弱み分析 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* 強み */}
        <div className='bg-white shadow rounded-lg p-6'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>💪 あなたの強み</h2>
            <p className='text-gray-600'>
              KPTデータから特定された技術的な強みです
            </p>
          </div>

          <div className='space-y-4'>
            {strengths.map((strength, index) => (
              <div
                key={index}
                className='flex items-start p-4 bg-green-50 border border-green-200 rounded-lg'
              >
                <div className='flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-white text-sm font-bold'>✓</span>
                </div>
                <div>
                  <p className='text-green-800 text-sm leading-relaxed'>{strength}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 p-4 bg-green-100 rounded-lg'>
            <h4 className='text-sm font-semibold text-green-800 mb-2'>💡 活用のヒント</h4>
            <p className='text-green-700 text-sm'>
              これらの強みを活かして、チームでの知識共有やメンタリングに取り組むことで、
              さらなる成長とチーム全体のレベルアップに貢献できます。
            </p>
          </div>
        </div>

        {/* 弱み */}
        <div className='bg-white shadow rounded-lg p-6'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>🎯 改善ポイント</h2>
            <p className='text-gray-600'>
              成長のために重点的に取り組むべき分野です
            </p>
          </div>

          <div className='space-y-4'>
            {weaknesses.map((weakness, index) => (
              <div
                key={index}
                className='flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg'
              >
                <div className='flex-shrink-0 w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                  <span className='text-white text-sm font-bold'>!</span>
                </div>
                <div>
                  <p className='text-yellow-800 text-sm leading-relaxed'>{weakness}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 p-4 bg-yellow-100 rounded-lg'>
            <h4 className='text-sm font-semibold text-yellow-800 mb-2'>🚀 改善のヒント</h4>
            <p className='text-yellow-700 text-sm'>
              これらの分野は段階的に学習を進めることが重要です。
              まずは基礎から固めて、実践的なプロジェクトで経験を積みましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAreaAnalysis; 