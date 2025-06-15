'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card/card';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

// 週次完了率
const weeklyLabels = ['第1週', '第2週', '第3週', '第4週'];
const weeklyData = [92, 88, 95, 85];
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

// 月次KPT数
const monthlyLabels = ['3ヶ月前', '2ヶ月前', '先月', '今月'];
const monthlyData = [32, 38, 41, 45];
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

// 完了状況分布（ドーナツ）
const statusLabels = ['完了', '進行中', 'キャンセル'];
const statusData = [38, 5, 2];
const statusChartData = {
  labels: statusLabels,
  datasets: [
    {
      data: statusData,
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 2,
      borderColor: '#fff',
    },
  ],
};
const statusChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'bottom' as const },
    tooltip: { enabled: true },
  },
};

// スキル成長レーダー
const skillLabels = ['継続性', '問題解決', '実行力', '改善提案'];
const skillData = [85, 78, 72, 69];
const skillChartData = {
  labels: skillLabels,
  datasets: [
    {
      label: 'スキルスコア',
      data: skillData,
      backgroundColor: 'rgba(59,130,246,0.2)',
      borderColor: '#3B82F6',
      borderWidth: 2,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
};
const skillChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: { stepSize: 20 },
      pointLabels: { font: { size: 14 } },
      grid: { color: '#e5e7eb' },
    },
  },
};

const ReportChartsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 週次完了率 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">週次完了率</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Line data={weeklyChartData} options={weeklyChartOptions} />
          </div>
        </CardContent>
      </Card>
      {/* 月次KPT数推移 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">月次KPT数推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Bar data={monthlyChartData} options={monthlyChartOptions} />
          </div>
        </CardContent>
      </Card>
      {/* 完了状況分布 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">完了状況分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Doughnut data={statusChartData} options={statusChartOptions} />
          </div>
        </CardContent>
      </Card>
      {/* スキル成長レーダー */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center w-full">スキル成長レーダー</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            <Radar data={skillChartData} options={skillChartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportChartsGrid; 