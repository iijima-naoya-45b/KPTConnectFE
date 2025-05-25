/**
 * @file PeriodComparison.tsx
 * @description 期間比較コンポーネント
 *
 * 現在期間と前期間のKPTスコアを比較分析します。
 * 変化の可視化と詳細な比較データを提供します。
 *
 * @example
 * ```tsx
 * <PeriodComparison
 *   currentPeriod={currentPeriod}
 *   previousPeriod={previousPeriod}
 *   periodLabel={periodLabel}
 * />
 * ```
 */

'use client';

import React from 'react';

interface PeriodScore {
  overall: number;
  keep: number;
  problem: number;
  try: number;
}

interface PeriodComparisonProps {
  currentPeriod: PeriodScore;
  previousPeriod: PeriodScore;
  periodLabel: string;
}

const PeriodComparison: React.FC<PeriodComparisonProps> = ({
  currentPeriod,
  previousPeriod,
  periodLabel,
}) => {
  // 変化量を計算
  const calculateChange = (current: number, previous: number) => {
    return current - previous;
  };

  // 変化率を計算
  const calculateChangeRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // 変化の表示スタイルを取得
  const getChangeStyle = (change: number) => {
    if (change > 0) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: '↗️',
        label: '改善',
      };
    } else if (change < 0) {
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '↘️',
        label: '低下',
      };
    } else {
      return {
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: '→',
        label: '変化なし',
      };
    }
  };

  // 各項目の変化データを計算
  const overallChange = calculateChange(currentPeriod.overall, previousPeriod.overall);
  const keepChange = calculateChange(currentPeriod.keep, previousPeriod.keep);
  const problemChange = calculateChange(currentPeriod.problem, previousPeriod.problem);
  const tryChange = calculateChange(currentPeriod.try, previousPeriod.try);

  const overallChangeRate = calculateChangeRate(currentPeriod.overall, previousPeriod.overall);
  const keepChangeRate = calculateChangeRate(currentPeriod.keep, previousPeriod.keep);
  const problemChangeRate = calculateChangeRate(currentPeriod.problem, previousPeriod.problem);
  const tryChangeRate = calculateChangeRate(currentPeriod.try, previousPeriod.try);

  const overallStyle = getChangeStyle(overallChange);
  const keepStyle = getChangeStyle(keepChange);
  const problemStyle = getChangeStyle(problemChange);
  const tryStyle = getChangeStyle(tryChange);

  // 比較項目のデータ
  const comparisonItems = [
    {
      label: '総合スコア',
      current: currentPeriod.overall,
      previous: previousPeriod.overall,
      change: overallChange,
      changeRate: overallChangeRate,
      style: overallStyle,
      color: 'indigo',
    },
    {
      label: 'Keep',
      current: currentPeriod.keep,
      previous: previousPeriod.keep,
      change: keepChange,
      changeRate: keepChangeRate,
      style: keepStyle,
      color: 'blue',
    },
    {
      label: 'Problem',
      current: currentPeriod.problem,
      previous: previousPeriod.problem,
      change: problemChange,
      changeRate: problemChangeRate,
      style: problemStyle,
      color: 'red',
    },
    {
      label: 'Try',
      current: currentPeriod.try,
      previous: previousPeriod.try,
      change: tryChange,
      changeRate: tryChangeRate,
      style: tryStyle,
      color: 'green',
    },
  ];

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>📊 期間比較分析</h2>
        <p className='text-gray-600'>{periodLabel}と前期間のスコア比較と変化の分析</p>
      </div>

      {/* 比較グリッド */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {comparisonItems.map((item, index) => (
          <div key={index} className='bg-gray-50 rounded-lg p-4'>
            <div className='text-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{item.label}</h3>

              {/* 現在のスコア */}
              <div className='mb-3'>
                <div className={`text-3xl font-bold text-${item.color}-600 mb-1`}>
                  {item.current}
                </div>
                <div className='text-sm text-gray-500'>今期</div>
              </div>

              {/* 前期のスコア */}
              <div className='mb-3'>
                <div className='text-xl text-gray-600 mb-1'>{item.previous}</div>
                <div className='text-xs text-gray-500'>前期</div>
              </div>

              {/* 変化表示 */}
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full border ${item.style.bgColor} ${item.style.borderColor}`}
              >
                <span className='mr-1'>{item.style.icon}</span>
                <span className={`text-sm font-medium ${item.style.color}`}>
                  {item.change > 0 ? '+' : ''}
                  {item.change}
                </span>
                <span className={`text-xs ml-1 ${item.style.color}`}>
                  ({item.changeRate > 0 ? '+' : ''}
                  {item.changeRate.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* プログレスバー比較 */}
            <div className='space-y-2'>
              <div>
                <div className='flex justify-between text-xs text-gray-600 mb-1'>
                  <span>今期</span>
                  <span>{item.current}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.current}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className='flex justify-between text-xs text-gray-500 mb-1'>
                  <span>前期</span>
                  <span>{item.previous}%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-1'>
                  <div
                    className='bg-gray-400 h-1 rounded-full transition-all duration-500'
                    style={{ width: `${item.previous}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細分析 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* 改善された領域 */}
        <div className='bg-green-50 rounded-lg p-4 border border-green-200'>
          <h4 className='text-lg font-semibold text-green-800 mb-3 flex items-center'>
            <span className='mr-2'>📈</span>
            改善された領域
          </h4>
          <div className='space-y-2'>
            {comparisonItems
              .filter(item => item.change > 0)
              .map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span className='text-green-700'>{item.label}</span>
                  <span className='text-green-800 font-medium'>
                    +{item.change} ({item.changeRate.toFixed(1)}%)
                  </span>
                </div>
              ))}
            {comparisonItems.filter(item => item.change > 0).length === 0 && (
              <p className='text-green-700 text-sm'>改善された項目はありません</p>
            )}
          </div>
        </div>

        {/* 低下した領域 */}
        <div className='bg-red-50 rounded-lg p-4 border border-red-200'>
          <h4 className='text-lg font-semibold text-red-800 mb-3 flex items-center'>
            <span className='mr-2'>📉</span>
            注意が必要な領域
          </h4>
          <div className='space-y-2'>
            {comparisonItems
              .filter(item => item.change < 0)
              .map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span className='text-red-700'>{item.label}</span>
                  <span className='text-red-800 font-medium'>
                    {item.change} ({item.changeRate.toFixed(1)}%)
                  </span>
                </div>
              ))}
            {comparisonItems.filter(item => item.change < 0).length === 0 && (
              <p className='text-red-700 text-sm'>低下した項目はありません</p>
            )}
          </div>
        </div>
      </div>

      {/* 総合評価 */}
      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h4 className='text-sm font-semibold text-gray-700 mb-2'>📋 期間比較サマリー</h4>
        <div className='text-sm text-gray-600'>
          {overallChange > 0 ? (
            <p>
              <strong className='text-green-600'>総合的に改善傾向</strong>にあります。 特に
              {comparisonItems
                .filter(item => item.change > 0)
                .map(item => item.label)
                .join('、')}
              で 良い成果が見られます。
            </p>
          ) : overallChange < 0 ? (
            <p>
              <strong className='text-red-600'>総合的に注意が必要</strong>な状況です。
              {comparisonItems
                .filter(item => item.change < 0)
                .map(item => item.label)
                .join('、')}
              の 改善に取り組むことをお勧めします。
            </p>
          ) : (
            <p>
              <strong className='text-gray-600'>総合的に安定</strong>しています。
              現在の取り組みを継続しつつ、さらなる向上を目指しましょう。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeriodComparison;
