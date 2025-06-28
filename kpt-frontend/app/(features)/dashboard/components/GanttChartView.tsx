'use client';

import React, { useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

interface GanttChartViewProps {
  items: Task[];
  viewType: 'sessions' | 'goals';
}

const GanttChartView: React.FC<GanttChartViewProps> = ({ items, viewType }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Month);
  const [listCellWidth, setListCellWidth] = useState('200px');

  const getViewModeLabel = (mode: ViewMode): string => {
    switch (mode) {
      case ViewMode.Hour:
        return '時間';
      case ViewMode.QuarterDay:
        return '6時間';
      case ViewMode.HalfDay:
        return '12時間';
      case ViewMode.Day:
        return '日';
      case ViewMode.Week:
        return '週';
      case ViewMode.Month:
        return '月';
      case ViewMode.Year:
        return '年';
      default:
        return '月';
    }
  };

  const getStatusLegend = () => {
    if (viewType === 'sessions') {
      return (
        <div className='flex flex-wrap gap-4 text-sm'>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-red-500 rounded mr-2'></div>
            <span>下書き</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-yellow-500 rounded mr-2'></div>
            <span>進行中</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-green-500 rounded mr-2'></div>
            <span>完了</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex flex-wrap gap-4 text-sm'>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-red-600 rounded mr-2'></div>
            <span>高優先度</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-yellow-500 rounded mr-2'></div>
            <span>中優先度</span>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-gray-500 rounded mr-2'></div>
            <span>低優先度</span>
          </div>
        </div>
      );
    }
  };

  // 日本語のローカル設定
  const japaneseLocale = {
    name: 'ja',
    weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    weekdaysMin: ['日', '月', '火', '水', '木', '金', '土'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  };

  return (
    <div className='space-y-6'>
      {/* コントロールパネル */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg'>
        <div>
          <h3 className='text-sm font-medium text-gray-900 mb-2'>表示設定</h3>
          <div className='flex flex-wrap gap-2'>
            {[ViewMode.Day, ViewMode.Week, ViewMode.Month, ViewMode.Year].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  viewMode === mode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {getViewModeLabel(mode)}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className='text-sm font-medium text-gray-900 mb-2'>凡例</h3>
          {getStatusLegend()}
        </div>
      </div>

      {/* ガントチャート */}
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className='p-4 border-b border-gray-200 bg-gray-50'>
          <h3 className='text-lg font-medium text-gray-900'>
            📊 {viewType === 'sessions' ? 'KPTセッション' : '目標'}のガントチャート
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            {viewMode === ViewMode.Month ? '月単位' : 
             viewMode === ViewMode.Week ? '週単位' : 
             viewMode === ViewMode.Day ? '日単位' : '年単位'}で表示中
          </p>
        </div>
        
        <div style={{ height: 600, overflow: 'auto' }}>
          <Gantt
            tasks={items}
            viewMode={viewMode}
            listCellWidth={listCellWidth}
            barFill={60}
            locale="ja-JP"
            rtl={false}
            fontSize="14px"
            fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif"
            columnWidth={viewMode === ViewMode.Month ? 100 : viewMode === ViewMode.Week ? 80 : 60}
            rowHeight={50}
          />
        </div>
      </div>

      {/* 統計情報 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h4 className='text-sm font-medium text-gray-900 mb-2'>総数</h4>
          <p className='text-3xl font-bold text-indigo-600'>{items.length}</p>
          <p className='text-sm text-gray-600'>
            {viewType === 'sessions' ? 'セッション' : '目標'}
          </p>
        </div>
        
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h4 className='text-sm font-medium text-gray-900 mb-2'>平均進捗</h4>
          <p className='text-3xl font-bold text-green-600'>
            {items.length > 0 ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length) : 0}%
          </p>
          <p className='text-sm text-gray-600'>完了率</p>
        </div>
        
        <div className='bg-white p-6 rounded-lg border border-gray-200'>
          <h4 className='text-sm font-medium text-gray-900 mb-2'>完了済み</h4>
          <p className='text-3xl font-bold text-purple-600'>
            {items.filter(item => item.progress === 100).length}
          </p>
          <p className='text-sm text-gray-600'>
            {viewType === 'sessions' ? 'セッション' : '目標'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GanttChartView;
