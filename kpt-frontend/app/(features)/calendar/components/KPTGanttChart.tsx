/**
 * @file KPTGanttChart.tsx
 * @description KPTスケジュール用ガントチャートコンポーネント
 *
 * KPTの振り返りスケジュールをガントチャート形式で表示します。
 * タスクの期間、進捗、依存関係を視覚的に管理できます。
 *
 * @example
 * ```tsx
 * <KPTGanttChart
 *   schedules={schedules}
 *   onTaskClick={handleTaskClick}
 *   dateRange={dateRange}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo } from 'react';
import { format, differenceInDays, addDays } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

interface KPTSchedule {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'keep' | 'problem' | 'try';
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  progress?: number; // 進捗率 (0-100)
}

interface DateRange {
  start: Date;
  end: Date;
}

interface KPTGanttChartProps {
  schedules: KPTSchedule[];
  onTaskClick?: (schedule: KPTSchedule) => void;
  dateRange: DateRange;
}

const KPTGanttChart: React.FC<KPTGanttChartProps> = ({ schedules, onTaskClick, dateRange }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // 日付グリッドの生成
  const dateGrid = useMemo(() => {
    const days: Date[] = [];
    const totalDays = differenceInDays(dateRange.end, dateRange.start) + 1;

    for (let i = 0; i < totalDays; i++) {
      days.push(addDays(dateRange.start, i));
    }

    return days;
  }, [dateRange]);

  // タスクバーの位置とサイズを計算
  const calculateTaskBar = (schedule: KPTSchedule) => {
    const startDay = Math.max(0, differenceInDays(schedule.start, dateRange.start));
    const endDay = Math.min(dateGrid.length - 1, differenceInDays(schedule.end, dateRange.start));
    const duration = endDay - startDay + 1;

    return {
      left: `${(startDay / dateGrid.length) * 100}%`,
      width: `${(duration / dateGrid.length) * 100}%`,
      startDay,
      duration,
    };
  };

  // タイプ別の色設定
  const getTypeColor = (type: string, status: string) => {
    const colors = {
      keep: { bg: '#4F46E5', border: '#3730A3' },
      problem: { bg: '#DC2626', border: '#B91C1C' },
      try: { bg: '#059669', border: '#047857' },
    };

    const baseColor = colors[type as keyof typeof colors] || colors.keep;

    if (status === 'cancelled') {
      return { bg: '#6B7280', border: '#4B5563' };
    }

    return baseColor;
  };

  // 進捗率の取得（サンプルデータ）
  const getProgress = (schedule: KPTSchedule) => {
    if (schedule.status === 'completed') return 100;
    if (schedule.status === 'cancelled') return 0;

    // サンプル進捗率
    const sampleProgress = {
      keep: 75,
      problem: 50,
      try: 25,
    };

    return sampleProgress[schedule.type] || 0;
  };

  const handleTaskClick = (schedule: KPTSchedule) => {
    setSelectedTask(selectedTask === schedule.id ? null : schedule.id);
    onTaskClick?.(schedule);
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>ガントチャート</h3>
        <p className='text-sm text-gray-600'>
          {format(dateRange.start, 'yyyy/MM/dd', { locale: ja })} -
          {format(dateRange.end, 'yyyy/MM/dd', { locale: ja })}
        </p>
      </div>

      <div className='overflow-x-auto'>
        <div className='min-w-[800px]'>
          {/* ヘッダー（日付） */}
          <div className='flex border-b border-gray-200'>
            <div className='w-64 p-3 bg-gray-50 border-r border-gray-200'>
              <span className='font-medium text-gray-700'>タスク</span>
            </div>
            <div className='flex-1 flex'>
              {dateGrid.map((date, index) => (
                <div
                  key={index}
                  className='flex-1 p-2 text-center border-r border-gray-100 bg-gray-50'
                  style={{ minWidth: '40px' }}
                >
                  <div className='text-xs text-gray-600'>
                    {format(date, 'MM/dd', { locale: ja })}
                  </div>
                  <div className='text-xs text-gray-500'>{format(date, 'E', { locale: ja })}</div>
                </div>
              ))}
            </div>
          </div>

          {/* タスク行 */}
          {schedules.map(schedule => {
            const taskBar = calculateTaskBar(schedule);
            const colors = getTypeColor(schedule.type, schedule.status);
            const progress = getProgress(schedule);
            const isSelected = selectedTask === schedule.id;

            return (
              <div
                key={schedule.id}
                className={`flex border-b border-gray-100 hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50' : ''
                }`}
              >
                {/* タスク情報 */}
                <div className='w-64 p-3 border-r border-gray-200'>
                  <div className='flex items-center space-x-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: colors.bg }}
                    ></div>
                    <div className='flex-1 min-w-0'>
                      <div className='text-sm font-medium text-gray-900 truncate'>
                        {schedule.title}
                      </div>
                      <div className='text-xs text-gray-500 capitalize'>
                        {schedule.type} • {schedule.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ガントバー */}
                <div className='flex-1 relative p-2'>
                  <div className='relative h-8 bg-gray-100 rounded'>
                    {taskBar.duration > 0 && (
                      <div
                        className='absolute top-0 h-full rounded cursor-pointer transition-all duration-200 hover:opacity-80'
                        style={{
                          left: taskBar.left,
                          width: taskBar.width,
                          backgroundColor: colors.bg,
                          border: `2px solid ${colors.border}`,
                        }}
                        onClick={() => handleTaskClick(schedule)}
                      >
                        {/* 進捗バー */}
                        <div
                          className='h-full bg-white bg-opacity-30 rounded-sm'
                          style={{ width: `${progress}%` }}
                        ></div>

                        {/* タスクラベル */}
                        <div className='absolute inset-0 flex items-center justify-center'>
                          <span className='text-xs text-white font-medium truncate px-1'>
                            {schedule.title}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 進捗率表示 */}
                  <div className='text-xs text-gray-500 mt-1 text-center'>{progress}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 選択されたタスクの詳細 */}
      {selectedTask && (
        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          {(() => {
            const task = schedules.find(s => s.id === selectedTask);
            if (!task) return null;

            return (
              <div>
                <h4 className='font-medium text-blue-900 mb-2'>{task.title}</h4>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-blue-700 font-medium'>期間:</span>
                    <span className='ml-2 text-blue-800'>
                      {format(task.start, 'MM/dd HH:mm', { locale: ja })} -
                      {format(task.end, 'MM/dd HH:mm', { locale: ja })}
                    </span>
                  </div>
                  <div>
                    <span className='text-blue-700 font-medium'>状態:</span>
                    <span className='ml-2 text-blue-800 capitalize'>{task.status}</span>
                  </div>
                  <div>
                    <span className='text-blue-700 font-medium'>タイプ:</span>
                    <span className='ml-2 text-blue-800 capitalize'>{task.type}</span>
                  </div>
                  <div>
                    <span className='text-blue-700 font-medium'>進捗:</span>
                    <span className='ml-2 text-blue-800'>{getProgress(task)}%</span>
                  </div>
                </div>
                {task.description && (
                  <div className='mt-2'>
                    <span className='text-blue-700 font-medium'>説明:</span>
                    <p className='ml-2 text-blue-800'>{task.description}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 凡例 */}
      <div className='mt-6 p-3 bg-gray-50 rounded-lg'>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>凡例</h4>
        <div className='flex flex-wrap gap-4 text-xs'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-blue-600 rounded'></div>
            <span>Keep (継続)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-red-600 rounded'></div>
            <span>Problem (課題)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-4 bg-green-600 rounded'></div>
            <span>Try (改善)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-2 bg-white bg-opacity-30 border border-gray-400'></div>
            <span>進捗バー</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTGanttChart;
