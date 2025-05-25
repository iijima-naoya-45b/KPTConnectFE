/**
 * @file DetailedReportHeader.tsx
 * @description 詳細レポートヘッダーコンポーネント
 *
 * レポートのタイトル、期間選択、日付変更機能を提供します。
 *
 * @example
 * ```tsx
 * <DetailedReportHeader
 *   period={period}
 *   selectedPeriod={selectedPeriod}
 *   onPeriodChange={handlePeriodChange}
 *   onDateChange={handleDateChange}
 *   currentDate={currentDate}
 * />
 * ```
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { format, addMonths, subMonths } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

interface Period {
  start: Date;
  end: Date;
  label: string;
}

type ReportPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

interface DetailedReportHeaderProps {
  period: Period;
  selectedPeriod: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
  onDateChange: (date: Date) => void;
  currentDate: Date;
}

const DetailedReportHeader: React.FC<DetailedReportHeaderProps> = ({
  period,
  selectedPeriod,
  onPeriodChange,
  onDateChange,
  currentDate,
}) => {
  const handlePreviousPeriod = () => {
    const newDate = subMonths(currentDate, 1);
    onDateChange(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = addMonths(currentDate, 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  const getPeriodButtonClass = (period: ReportPeriod) => {
    const baseClass = 'px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200';
    const activeClass = 'bg-indigo-600 text-white';
    const inactiveClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

    return `${baseClass} ${selectedPeriod === period ? activeClass : inactiveClass}`;
  };

  return (
    <div className='bg-white shadow rounded-lg p-6 mb-8'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
        {/* タイトルセクション */}
        <div className='mb-4 lg:mb-0'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>📊 詳細レポート</h1>
          <p className='text-lg text-gray-600'>{period.label}の包括的なKPT分析レポート</p>
          <p className='text-sm text-gray-500 mt-1'>
            {format(period.start, 'yyyy/MM/dd', { locale: ja })} -
            {format(period.end, 'yyyy/MM/dd', { locale: ja })}
          </p>
        </div>

        {/* コントロールセクション */}
        <div className='flex flex-col space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row lg:items-center'>
          {/* 期間選択 */}
          <div className='flex space-x-1 bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => onPeriodChange('weekly')}
              className={getPeriodButtonClass('weekly')}
            >
              週次
            </button>
            <button
              onClick={() => onPeriodChange('monthly')}
              className={getPeriodButtonClass('monthly')}
            >
              月次
            </button>
            <button
              onClick={() => onPeriodChange('quarterly')}
              className={getPeriodButtonClass('quarterly')}
            >
              四半期
            </button>
            <button
              onClick={() => onPeriodChange('yearly')}
              className={getPeriodButtonClass('yearly')}
            >
              年次
            </button>
          </div>

          {/* 日付ナビゲーション */}
          <div className='flex items-center space-x-2'>
            <Button
              onClick={handlePreviousPeriod}
              variant='outline'
              size='sm'
              className='px-3 py-1'
            >
              ← 前月
            </Button>
            <Button onClick={handleToday} variant='outline' size='sm' className='px-3 py-1'>
              今月
            </Button>
            <Button onClick={handleNextPeriod} variant='outline' size='sm' className='px-3 py-1'>
              次月 →
            </Button>
          </div>
        </div>
      </div>

      {/* 概要統計 */}
      <div className='mt-6 pt-6 border-t border-gray-200'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-indigo-600'>78</div>
            <div className='text-sm text-gray-600'>総合スコア</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>45</div>
            <div className='text-sm text-gray-600'>総KPT数</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>84%</div>
            <div className='text-sm text-gray-600'>完了率</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-purple-600'>+7</div>
            <div className='text-sm text-gray-600'>前月比</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReportHeader;
