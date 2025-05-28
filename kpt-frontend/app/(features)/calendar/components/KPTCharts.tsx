/**
 * @file KPTCharts.tsx
 * @description KPT分析用チャートコンポーネント
 *
 * Chart.jsを使用してKPTデータを様々なグラフで可視化します。
 * 円グラフ、棒グラフ、線グラフ、レーダーチャートなどを提供します。
 *
 * @example
 * ```tsx
 * <KPTCharts
 *   schedules={schedules}
 *   dateRange={dateRange}
 * />
 * ```
 */

'use client';

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { format, startOfWeek, endOfWeek, eachWeekOfInterval } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

// Chart.jsの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

interface KPTSchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'keep' | 'problem' | 'try';
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface DateRange {
  start: Date;
  end: Date;
}

interface KPTChartsProps {
  schedules: KPTSchedule[];
  dateRange: DateRange;
}

// 共通のカラーパレット（コンポーネント外で定数として定義）
const colors = {
  keep: '#4F46E5',
  problem: '#DC2626',
  try: '#059669',
  completed: '#10B981',
  scheduled: '#F59E0B',
  cancelled: '#6B7280',
} as const;

const KPTCharts: React.FC<KPTChartsProps> = ({ schedules, dateRange }) => {

  // 1. KPTタイプ別分布（ドーナツチャート）
  const typeDistributionData = useMemo(() => {
    const typeCounts = schedules.reduce(
      (acc, schedule) => {
        acc[schedule.type]++;
        return acc;
      },
      { keep: 0, problem: 0, try: 0 }
    );

    return {
      labels: ['Keep (継続)', 'Problem (課題)', 'Try (改善)'],
      datasets: [
        {
          data: [typeCounts.keep, typeCounts.problem, typeCounts.try],
          backgroundColor: [colors.keep, colors.problem, colors.try],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }, [schedules]);

  // 2. 状態別分布（ドーナツチャート）
  const statusDistributionData = useMemo(() => {
    const statusCounts = schedules.reduce(
      (acc, schedule) => {
        acc[schedule.status]++;
        return acc;
      },
      { completed: 0, scheduled: 0, cancelled: 0 }
    );

    return {
      labels: ['完了', '予定', 'キャンセル'],
      datasets: [
        {
          data: [statusCounts.completed, statusCounts.scheduled, statusCounts.cancelled],
          backgroundColor: [colors.completed, colors.scheduled, colors.cancelled],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }, [schedules]);

  // 3. 週別進捗（棒グラフ）
  const weeklyProgressData = useMemo(() => {
    const weeks = eachWeekOfInterval(dateRange, { locale: ja });
    const weeklyData = weeks.map(week => {
      const weekStart = startOfWeek(week, { locale: ja });
      const weekEnd = endOfWeek(week, { locale: ja });

      const weekSchedules = schedules.filter(
        schedule => schedule.start >= weekStart && schedule.start <= weekEnd
      );

      return {
        week: format(weekStart, 'MM/dd', { locale: ja }),
        keep: weekSchedules.filter(s => s.type === 'keep').length,
        problem: weekSchedules.filter(s => s.type === 'problem').length,
        try: weekSchedules.filter(s => s.type === 'try').length,
      };
    });

    return {
      labels: weeklyData.map(d => d.week),
      datasets: [
        {
          label: 'Keep',
          data: weeklyData.map(d => d.keep),
          backgroundColor: colors.keep,
          borderColor: colors.keep,
          borderWidth: 1,
        },
        {
          label: 'Problem',
          data: weeklyData.map(d => d.problem),
          backgroundColor: colors.problem,
          borderColor: colors.problem,
          borderWidth: 1,
        },
        {
          label: 'Try',
          data: weeklyData.map(d => d.try),
          backgroundColor: colors.try,
          borderColor: colors.try,
          borderWidth: 1,
        },
      ],
    };
  }, [schedules, dateRange]);

  // 4. 完了率推移（線グラフ）
  const completionTrendData = useMemo(() => {
    const weeks = eachWeekOfInterval(dateRange, { locale: ja });
    const trendData = weeks.map(week => {
      const weekStart = startOfWeek(week, { locale: ja });
      const weekEnd = endOfWeek(week, { locale: ja });

      const weekSchedules = schedules.filter(
        schedule => schedule.start >= weekStart && schedule.start <= weekEnd
      );

      const completed = weekSchedules.filter(s => s.status === 'completed').length;
      const total = weekSchedules.length;
      const completionRate = total > 0 ? (completed / total) * 100 : 0;

      return {
        week: format(weekStart, 'MM/dd', { locale: ja }),
        completionRate,
        total,
      };
    });

    return {
      labels: trendData.map(d => d.week),
      datasets: [
        {
          label: '完了率 (%)',
          data: trendData.map(d => d.completionRate),
          borderColor: colors.completed,
          backgroundColor: `${colors.completed}20`,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [schedules, dateRange]);

  // 5. KPTバランス（レーダーチャート）
  const balanceData = useMemo(() => {
    const typeCounts = schedules.reduce(
      (acc, schedule) => {
        if (schedule.status === 'completed') {
          acc[schedule.type]++;
        }
        return acc;
      },
      { keep: 0, problem: 0, try: 0 }
    );

    return {
      labels: ['Keep (継続)', 'Problem (課題)', 'Try (改善)'],
      datasets: [
        {
          label: '完了済みタスク数',
          data: [typeCounts.keep, typeCounts.problem, typeCounts.try],
          backgroundColor: `${colors.keep}30`,
          borderColor: colors.keep,
          borderWidth: 2,
          pointBackgroundColor: colors.keep,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    };
  }, [schedules]);

  // チャートオプション
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className='space-y-8'>
      <div className='bg-white shadow rounded-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-6'>KPT分析ダッシュボード</h3>

        {/* 上段：分布チャート */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>KPTタイプ別分布</h4>
            <div className='h-64'>
              <Doughnut data={typeDistributionData} options={chartOptions} />
            </div>
          </div>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>ステータス別分布</h4>
            <div className='h-64'>
              <Doughnut data={statusDistributionData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* 中段：進捗チャート */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>週別タスク数</h4>
            <div className='h-64'>
              <Bar data={weeklyProgressData} options={barOptions} />
            </div>
          </div>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>完了率推移</h4>
            <div className='h-64'>
              <Line data={completionTrendData} options={lineOptions} />
            </div>
          </div>
        </div>

        {/* 下段：バランスチャート */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>KPTバランス</h4>
            <div className='h-64'>
              <Radar data={balanceData} options={radarOptions} />
            </div>
          </div>
          <div>
            <h4 className='text-md font-medium text-gray-700 mb-4'>統計サマリー</h4>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>{schedules.length}</div>
                  <div className='text-sm text-blue-800'>総タスク数</div>
                </div>
                <div className='bg-green-50 p-4 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    {schedules.filter(s => s.status === 'completed').length}
                  </div>
                  <div className='text-sm text-green-800'>完了タスク</div>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                <div className='bg-indigo-50 p-3 rounded text-center'>
                  <div className='text-lg font-semibold text-indigo-600'>
                    {schedules.filter(s => s.type === 'keep').length}
                  </div>
                  <div className='text-xs text-indigo-800'>Keep</div>
                </div>
                <div className='bg-red-50 p-3 rounded text-center'>
                  <div className='text-lg font-semibold text-red-600'>
                    {schedules.filter(s => s.type === 'problem').length}
                  </div>
                  <div className='text-xs text-red-800'>Problem</div>
                </div>
                <div className='bg-green-50 p-3 rounded text-center'>
                  <div className='text-lg font-semibold text-green-600'>
                    {schedules.filter(s => s.type === 'try').length}
                  </div>
                  <div className='text-xs text-green-800'>Try</div>
                </div>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <div className='text-sm text-gray-600'>完了率</div>
                <div className='text-xl font-bold text-gray-900'>
                  {schedules.length > 0
                    ? Math.round(
                        (schedules.filter(s => s.status === 'completed').length /
                          schedules.length) *
                          100
                      )
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTCharts;
