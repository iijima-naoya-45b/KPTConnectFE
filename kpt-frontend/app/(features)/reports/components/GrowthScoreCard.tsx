/**
 * @file GrowthScoreCard.tsx
 * @description 成長スコアカードコンポーネント
 *
 * KPTの成長スコアを視覚的に表示します。
 * 総合スコア、Keep/Problem/Try別スコア、前期比較を提供します。
 *
 * @example
 * ```tsx
 * <GrowthScoreCard growthScore={growthScore} />
 * ```
 */

'use client';

import React from 'react';

interface GrowthScore {
  overall: number;
  keep: number;
  problem: number;
  try: number;
  previousPeriod: {
    overall: number;
    keep: number;
    problem: number;
    try: number;
  };
}

interface GrowthScoreCardProps {
  growthScore: GrowthScore;
}

const GrowthScoreCard: React.FC<GrowthScoreCardProps> = ({ growthScore }) => {
  // スコアの変化を計算
  const calculateChange = (current: number, previous: number) => {
    return current - previous;
  };

  // 変化の表示用アイコンとスタイルを取得
  const getChangeDisplay = (change: number) => {
    if (change > 0) {
      return {
        icon: '↗️',
        text: `+${change}`,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    } else if (change < 0) {
      return {
        icon: '↘️',
        text: `${change}`,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      };
    } else {
      return {
        icon: '→',
        text: '±0',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
      };
    }
  };

  // スコアに基づく色を取得
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // プログレスバーの色を取得
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const overallChange = calculateChange(growthScore.overall, growthScore.previousPeriod.overall);
  const keepChange = calculateChange(growthScore.keep, growthScore.previousPeriod.keep);
  const problemChange = calculateChange(growthScore.problem, growthScore.previousPeriod.problem);
  const tryChange = calculateChange(growthScore.try, growthScore.previousPeriod.try);

  const overallDisplay = getChangeDisplay(overallChange);
  const keepDisplay = getChangeDisplay(keepChange);
  const problemDisplay = getChangeDisplay(problemChange);
  const tryDisplay = getChangeDisplay(tryChange);

  return (
    <div className='bg-white shadow rounded-lg p-6 lg:p-8'>
      <div className='mb-8'>
        <h2 className='text-xl lg:text-2xl font-semibold text-gray-900 mb-2'>🎯 成長スコア分析</h2>
        <p className='text-gray-600 text-sm lg:text-base'>
          KPTの取り組み状況を0-100のスコアで評価し、前期との比較を表示します
        </p>
      </div>

      {/* 総合スコア */}
      <div className='mb-10 p-6 lg:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 shadow-sm'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
          <h3 className='text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-0'>総合成長スコア</h3>
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-full ${overallDisplay.bgColor} self-start sm:self-auto`}
          >
            <span className='text-sm'>{overallDisplay.icon}</span>
            <span className={`text-sm font-medium ${overallDisplay.color}`}>
              {overallDisplay.text}
            </span>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6'>
          <div className={`text-5xl lg:text-6xl font-bold ${getScoreColor(growthScore.overall)}`}>
            {growthScore.overall}
          </div>
          <div className='flex-1'>
            <div className='w-full bg-gray-200 rounded-full h-4'>
              <div
                className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(growthScore.overall)}`}
                style={{ width: `${growthScore.overall}%` }}
              ></div>
            </div>
            <div className='flex justify-between text-xs text-gray-500 mt-2'>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPT別スコア */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8'>
        {/* Keep スコア */}
        <div className='p-5 lg:p-6 bg-blue-50 rounded-xl border border-blue-100 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm'>
                <span className='text-white font-semibold'>K</span>
              </div>
              <h4 className='font-semibold text-gray-900 text-lg'>Keep</h4>
            </div>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full ${keepDisplay.bgColor}`}
            >
              <span className='text-xs'>{keepDisplay.icon}</span>
              <span className={`text-xs font-medium ${keepDisplay.color}`}>{keepDisplay.text}</span>
            </div>
          </div>

          <div className={`text-3xl lg:text-4xl font-bold ${getScoreColor(growthScore.keep)} mb-3`}>
            {growthScore.keep}
          </div>

          <div className='w-full bg-blue-200 rounded-full h-3 mb-3'>
            <div
              className='bg-blue-500 h-3 rounded-full transition-all duration-500'
              style={{ width: `${growthScore.keep}%` }}
            ></div>
          </div>

          <p className='text-sm text-gray-600'>継続的な取り組みの維持度</p>
        </div>

        {/* Problem スコア */}
        <div className='p-5 lg:p-6 bg-red-50 rounded-xl border border-red-100 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-sm'>
                <span className='text-white font-semibold'>P</span>
              </div>
              <h4 className='font-semibold text-gray-900 text-lg'>Problem</h4>
            </div>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full ${problemDisplay.bgColor}`}
            >
              <span className='text-xs'>{problemDisplay.icon}</span>
              <span className={`text-xs font-medium ${problemDisplay.color}`}>
                {problemDisplay.text}
              </span>
            </div>
          </div>

          <div className={`text-3xl lg:text-4xl font-bold ${getScoreColor(growthScore.problem)} mb-3`}>
            {growthScore.problem}
          </div>

          <div className='w-full bg-red-200 rounded-full h-3 mb-3'>
            <div
              className='bg-red-500 h-3 rounded-full transition-all duration-500'
              style={{ width: `${growthScore.problem}%` }}
            ></div>
          </div>

          <p className='text-sm text-gray-600'>問題解決の効率性</p>
        </div>

        {/* Try スコア */}
        <div className='p-5 lg:p-6 bg-green-50 rounded-xl border border-green-100 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-sm'>
                <span className='text-white font-semibold'>T</span>
              </div>
              <h4 className='font-semibold text-gray-900 text-lg'>Try</h4>
            </div>
            <div
              className={`flex items-center space-x-1 px-2 py-1 rounded-full ${tryDisplay.bgColor}`}
            >
              <span className='text-xs'>{tryDisplay.icon}</span>
              <span className={`text-xs font-medium ${tryDisplay.color}`}>{tryDisplay.text}</span>
            </div>
          </div>

          <div className={`text-3xl lg:text-4xl font-bold ${getScoreColor(growthScore.try)} mb-3`}>
            {growthScore.try}
          </div>

          <div className='w-full bg-green-200 rounded-full h-3 mb-3'>
            <div
              className='bg-green-500 h-3 rounded-full transition-all duration-500'
              style={{ width: `${growthScore.try}%` }}
            ></div>
          </div>

          <p className='text-sm text-gray-600'>新しい取り組みの実行力</p>
        </div>
      </div>

      {/* スコア評価基準 */}
      <div className='p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200'>
        <h4 className='text-sm lg:text-base font-semibold text-gray-700 mb-4 flex items-center'>
          <span className='mr-2'>📊</span>
          評価基準
        </h4>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
          <div className='flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100'>
            <div className='w-4 h-4 bg-green-500 rounded-full'></div>
            <span className='text-gray-600'>80-100: 優秀</span>
          </div>
          <div className='flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100'>
            <div className='w-4 h-4 bg-yellow-500 rounded-full'></div>
            <span className='text-gray-600'>60-79: 良好</span>
          </div>
          <div className='flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-100'>
            <div className='w-4 h-4 bg-red-500 rounded-full'></div>
            <span className='text-gray-600'>0-59: 要改善</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthScoreCard;
