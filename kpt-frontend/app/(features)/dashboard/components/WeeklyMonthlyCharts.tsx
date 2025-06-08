/**
 * @file WeeklyMonthlyCharts.tsx
 * @description 週次完了率・月次KPT数推移グラフ表示コンポーネント
 *
 * Chart.js（react-chartjs-2）を用いて、週次完了率（%）と月次KPT数推移をカード枠内に表示します。
 * サンプルデータを使用し、グラフ下部にラベル＋数値を表示します。
 *
 * @remarks
 * - データはダミー（API連携なし）
 * - カード枠は共通UIを利用
 * - レスポンシブ対応
 *
 * @component
 */

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card/card';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.jsの登録
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * 週次・月次グラフのサンプルデータ
 */
const weeklyLabels = ['第1週', '第2週', '第3週', '第4週'];
const weeklyData = [92, 88, 95, 85];
const monthlyLabels = ['3ヶ月前', '2ヶ月前', '先月', '今月'];
const monthlyData = [32, 38, 41, 45];

/**
 * 週次完了率グラフのデータ・オプション
 */
const weeklyChartData = {
  labels: weeklyLabels,
  datasets: [
    {
      label: '完了率（%）',
      data: weeklyData,
      borderColor: '#10B981',
      backgroundColor: 'rgba(16,185,129,0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10B981',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      type: 'line' as const,
    },
  ],
};
const weeklyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top' as const },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value: string | number) => typeof value === 'number' ? `${value}%` : value,
        stepSize: 10,
      },
      grid: { color: '#e5e7eb' },
    },
    x: {
      grid: { display: false },
    },
  },
};

/**
 * 月次KPT数推移グラフのデータ・オプション
 */
const monthlyChartData = {
  labels: monthlyLabels,
  datasets: [
    {
      label: 'KPT作成数',
      data: monthlyData,
      backgroundColor: '#3B82F6',
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
};
const monthlyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top' as const },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      },
      grid: { color: '#e5e7eb' },
    },
    x: {
      grid: { display: false },
    },
  },
};

/**
 * 週次・月次グラフ表示コンポーネント
 * @returns {JSX.Element} グラフカード
 */
const WeeklyMonthlyCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-start">
      {/* 週次完了率カード */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">週次完了率</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Line data={weeklyChartData} options={weeklyChartOptions} />
          </div>
          <div className="flex justify-center gap-8 mt-6 px-2">
            {weeklyLabels.map((label, idx) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold text-green-700">{weeklyData[idx]}%</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* 月次KPT数推移カード */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">月次KPT数推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Bar data={monthlyChartData} options={monthlyChartOptions} />
          </div>
          <div className="flex justify-center gap-8 mt-6 px-2">
            {monthlyLabels.map((label, idx) => (
              <div key={label} className="text-center">
                <div className="text-lg font-bold text-blue-700">{monthlyData[idx]}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyMonthlyCharts; 