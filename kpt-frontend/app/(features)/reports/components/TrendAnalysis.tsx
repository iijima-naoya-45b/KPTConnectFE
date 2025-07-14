/**
 * @file TrendAnalysis.tsx
 * @description トレンド分析コンポーネント
 *
 * KPTの時系列トレンドを分析・表示します。
 * 週次・月次のグラフと統計情報を提供します。
 *
 * @example
 * ```tsx
 * <TrendAnalysis trends={trends} kptStats={kptStats} />
 * ```
 */

'use client';

import React, { useState } from 'react';
import {  
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Chart } from 'react-chartjs-2';

// Chart.jsの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyTrend {
  week: string;
  keep: number;
  problem: number;
  try: number;
  completionRate: number;
}

interface MonthlyTrend {
  month: string;
  total: number;
  completed: number;
  avgScore: number;
}

interface KPTStats {
  total: number;
  keep: number;
  problem: number;
  try: number;
  completed: number;
  inProgress: number;
  cancelled: number;
}

interface Trends {
  weekly: WeeklyTrend[];
  monthly: MonthlyTrend[];
}

interface TrendAnalysisProps {
  trends: Trends;
  kptStats: KPTStats;
}

type ViewMode = 'weekly' | 'monthly';

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ trends, kptStats }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');

  // 共通のカラーパレット
  const colors = {
    keep: '#4F46E5',
    problem: '#DC2626',
    try: '#059669',
    completion: '#10B981',
    total: '#6366F1',
    score: '#F59E0B',
  };

  // 週次トレンドデータ
  const weeklyChartData = {
    labels: trends.weekly.map(item => item.week),
    datasets: [
      {
        label: 'Keep',
        data: trends.weekly.map(item => item.keep),
        borderColor: colors.keep,
        backgroundColor: `${colors.keep}20`,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Problem',
        data: trends.weekly.map(item => item.problem),
        borderColor: colors.problem,
        backgroundColor: `${colors.problem}20`,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Try',
        data: trends.weekly.map(item => item.try),
        borderColor: colors.try,
        backgroundColor: `${colors.try}20`,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // 完了率トレンドデータ
  const completionRateData = {
    labels: trends.weekly.map(item => item.week),
    datasets: [
      {
        label: '完了率 (%)',
        data: trends.weekly.map(item => item.completionRate),
        backgroundColor: colors.completion,
        borderColor: colors.completion,
        borderWidth: 1,
      },
    ],
  };

  // 月次トレンドデータ
  const monthlyChartData = {
    labels: trends.monthly.map(item => item.month),
    datasets: [
      {
        label: '総KPT数',
        data: trends.monthly.map(item => item.total),
        backgroundColor: colors.total,
        borderColor: colors.total,
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: '平均スコア',
        data: trends.monthly.map(item => item.avgScore),
        type: 'line' as const,
        borderColor: colors.score,
        backgroundColor: `${colors.score}20`,
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  // チャートオプション
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value: any) {
            return value + '%';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'KPT数',
          color: '#374151',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'スコア',
          color: '#374151',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // 統計計算
  const calculateTrendStats = () => {
    if (viewMode === 'weekly') {
      const totalKPTs = trends.weekly.reduce(
        (sum, week) => sum + week.keep + week.problem + week.try,
        0
      );
      const avgCompletionRate =
        trends.weekly.reduce((sum, week) => sum + week.completionRate, 0) / trends.weekly.length;
      const bestWeek = trends.weekly.reduce((best, week) =>
        week.completionRate > best.completionRate ? week : best
      );

      return {
        totalKPTs,
        avgCompletionRate: Math.round(avgCompletionRate),
        bestWeek: bestWeek.week,
        bestWeekRate: bestWeek.completionRate,
      };
    } else {
      const totalGrowth = trends.monthly[trends.monthly.length - 1].total - trends.monthly[0].total;
      const scoreGrowth =
        trends.monthly[trends.monthly.length - 1].avgScore - trends.monthly[0].avgScore;
      const avgMonthlyTotal =
        trends.monthly.reduce((sum, month) => sum + month.total, 0) / trends.monthly.length;

      return {
        totalGrowth,
        scoreGrowth,
        avgMonthlyTotal: Math.round(avgMonthlyTotal),
      };
    }
  };

  const stats = calculateTrendStats();

  return (
    <div className='bg-white shadow rounded-lg p-6 lg:p-8'>
      <div className='mb-8'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6'>
          <div className='mb-4 lg:mb-0'>
            <h2 className='text-xl lg:text-2xl font-semibold text-gray-900 mb-2'>📈 トレンド分析</h2>
            <p className='text-gray-600 text-sm lg:text-base'>時系列でのKPTの変化パターンと傾向を分析します</p>
          </div>

          {/* ビュー切り替え */}
          <div className='flex space-x-1 bg-gray-100 rounded-lg p-1 self-start lg:self-auto'>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'weekly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              週次
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewMode === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              月次
            </button>
          </div>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10'>
        {viewMode === 'weekly' ? (
          <>
            <div className='bg-blue-50 p-4 lg:p-6 rounded-lg border border-blue-100'>
              <div className='text-2xl lg:text-3xl font-bold text-blue-600 mb-1'>{(stats as any).totalKPTs}</div>
              <div className='text-sm lg:text-base text-blue-800'>総KPT数</div>
            </div>
            <div className='bg-green-50 p-4 lg:p-6 rounded-lg border border-green-100'>
              <div className='text-2xl lg:text-3xl font-bold text-green-600 mb-1'>
                {(stats as any).avgCompletionRate}%
              </div>
              <div className='text-sm lg:text-base text-green-800'>平均完了率</div>
            </div>
            <div className='bg-purple-50 p-4 lg:p-6 rounded-lg border border-purple-100'>
              <div className='text-2xl lg:text-3xl font-bold text-purple-600 mb-1'>{(stats as any).bestWeek}</div>
              <div className='text-sm lg:text-base text-purple-800'>最高週</div>
            </div>
            <div className='bg-yellow-50 p-4 lg:p-6 rounded-lg border border-yellow-100'>
              <div className='text-2xl lg:text-3xl font-bold text-yellow-600 mb-1'>
                {(stats as any).bestWeekRate}%
              </div>
              <div className='text-sm lg:text-base text-yellow-800'>最高完了率</div>
            </div>
          </>
        ) : (
          <>
            <div className='bg-blue-50 p-4 lg:p-6 rounded-lg border border-blue-100'>
              <div className='text-2xl lg:text-3xl font-bold text-blue-600 mb-1'>+{(stats as any).totalGrowth}</div>
              <div className='text-sm lg:text-base text-blue-800'>KPT数成長</div>
            </div>
            <div className='bg-green-50 p-4 lg:p-6 rounded-lg border border-green-100'>
              <div className='text-2xl lg:text-3xl font-bold text-green-600 mb-1'>+{(stats as any).scoreGrowth}</div>
              <div className='text-sm lg:text-base text-green-800'>スコア成長</div>
            </div>
            <div className='bg-purple-50 p-4 lg:p-6 rounded-lg border border-purple-100'>
              <div className='text-2xl lg:text-3xl font-bold text-purple-600 mb-1'>
                {(stats as any).avgMonthlyTotal}
              </div>
              <div className='text-sm lg:text-base text-purple-800'>月平均KPT数</div>
            </div>
            <div className='bg-yellow-50 p-4 lg:p-6 rounded-lg border border-yellow-100'>
              <div className='text-2xl lg:text-3xl font-bold text-yellow-600 mb-1'>
                {Math.round((kptStats.completed / kptStats.total) * 100)}%
              </div>
              <div className='text-sm lg:text-base text-yellow-800'>総合完了率</div>
            </div>
          </>
        )}
      </div>

      {/* チャート表示 */}
      <div className='space-y-8 lg:space-y-0 lg:grid lg:grid-cols-1 xl:grid-cols-2 lg:gap-8 mb-8'>
        <div className='bg-gray-50 rounded-lg p-4 lg:p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {viewMode === 'weekly' ? '週次KPT推移' : '月次総合推移'}
          </h3>
          <div className='h-80 lg:h-96 xl:h-80'>
            {viewMode === 'weekly' ? (
              <Line data={weeklyChartData} options={lineChartOptions} />
            ) : (
              <Chart type='bar' data={monthlyChartData} options={monthlyChartOptions} />
            )}
          </div>
        </div>

        <div className='bg-gray-50 rounded-lg p-4 lg:p-6 border border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {viewMode === 'weekly' ? '週次完了率' : '週次KPT推移'}
          </h3>
          <div className='h-80 lg:h-96 xl:h-80'>
            {viewMode === 'weekly' ? (
              <Bar data={completionRateData} options={barChartOptions} />
            ) : (
              <Line data={weeklyChartData} options={lineChartOptions} />
            )}
          </div>
        </div>
      </div>

      {/* インサイト */}
      <div className='mt-8 p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200'>
        <h4 className='text-base lg:text-lg font-semibold text-gray-700 mb-4 flex items-center'>
          <span className='mr-2'>📊</span>
          トレンドインサイト
        </h4>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-sm lg:text-base text-gray-600'>
          {viewMode === 'weekly' ? (
            <>
              <div className='bg-white p-4 rounded-lg border border-gray-100'>
                <strong className='text-gray-800'>パフォーマンス:</strong>
                <span>
                  {(stats as any).avgCompletionRate >= 90
                    ? ' 非常に安定した完了率を維持'
                    : (stats as any).avgCompletionRate >= 80
                      ? ' 良好な完了率を維持'
                      : ' 完了率の改善が必要'}
                </span>
              </div>
              <div className='bg-white p-4 rounded-lg border border-gray-100'>
                <strong className='text-gray-800'>最適な週:</strong>
                <span> {(stats as any).bestWeek}が最も高い完了率({(stats as any).bestWeekRate}%)を記録</span>
              </div>
            </>
          ) : (
            <>
              <div className='bg-white p-4 rounded-lg border border-gray-100'>
                <strong className='text-gray-800'>成長傾向:</strong>
                <span>
                  {(stats as any).totalGrowth > 0
                    ? ` KPT数が${(stats as any).totalGrowth}件増加`
                    : ' KPT数は横ばい'}
                </span>
              </div>
              <div className='bg-white p-4 rounded-lg border border-gray-100'>
                <strong className='text-gray-800'>品質向上:</strong>
                <span>
                  {(stats as any).scoreGrowth > 0
                    ? ` スコアが${(stats as any).scoreGrowth}ポイント向上`
                    : ' スコアは安定'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
