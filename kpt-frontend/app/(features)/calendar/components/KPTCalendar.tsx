'use client';

import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ja } from 'date-fns/locale/ja';
import Link from 'next/link';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/navigation';

const locales = {
  ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

interface KPTCalendarProps {
  schedules: KPTSchedule[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const KPTCalendar: React.FC<KPTCalendarProps> = ({
  schedules,
  currentDate,
  onDateChange,
}) => {
  const [view, setView] = useState<View>('month');
  // 新規Todo作成用の状態
  const [showInput, setShowInput] = useState<{ open: boolean; date: Date | null }>({ open: false, date: null });
  const [inputTitle, setInputTitle] = useState('');
  const [localSchedules, setLocalSchedules] = useState<KPTSchedule[]>(schedules);
  const router = useRouter();

  /**
   * @description カレンダーイベントのカスタム表示用コンポーネント
   * @remarks 現状はアイコンのみ表示し、event引数は未使用のため削除
   */
  const EventComponent = () => {
    return (
      <div className='flex items-center justify-center'>
        {/* 汎用リストアイコン */}
        <span role='img' aria-label='todo' className='text-lg'>📝</span>
      </div>
    );
  };

  // 日付ナビゲーション処理
  const handleNavigate = (newDate: Date) => {
    onDateChange(newDate);
  };

  // フィルタリング機能
  const [filterType, setFilterType] = useState<'all' | 'keep' | 'problem' | 'try'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'scheduled' | 'cancelled'>(
    'all'
  );

  // 日付セルクリック時の処理
  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    // 日付をyyyy-mm-dd形式で整形
    const date = slotInfo.start;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    // 遷移
    router.push(`/dashboard/calendar?tab=board&date=${dateStr}`);
  };

  // Todo追加処理
  const handleAddTodo = () => {
    if (!showInput.date || !inputTitle.trim()) {
      setShowInput({ open: false, date: null });
      setInputTitle('');
      return;
    }
    // ダミーID生成
    const newId = `dummy-${Date.now()}`;
    // 新規Todo（KPTSchedule）を作成
    const newTodo: KPTSchedule = {
      id: newId,
      title: inputTitle,
      start: showInput.date,
      end: showInput.date,
      type: 'keep', // 暫定値
      status: 'scheduled', // 暫定値
      createdAt: new Date(),
    };
    setLocalSchedules([...localSchedules, newTodo]);
    setShowInput({ open: false, date: null });
    setInputTitle('');
  };

  // localSchedulesをフィルタリング
  const filteredSchedules = localSchedules.filter(schedule => {
    const typeMatch = filterType === 'all' || schedule.type === filterType;
    const statusMatch = filterStatus === 'all' || schedule.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>KPTカレンダー</h1>
          <Link href='/dashboard' className='text-indigo-600 hover:text-indigo-900'>
            ダッシュボードに戻る
          </Link>
        </div>
        <div className='bg-white shadow rounded-lg p-6'>
          {/* フィルタリングコントロール */}
          <div className='mb-6 flex flex-wrap gap-4 items-center justify-between'>
            <div className='flex flex-wrap gap-2'>
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium text-gray-700'>タイプ:</span>
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value as typeof filterType)}
                  className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  aria-label='KPTタイプでフィルタリング'
                >
                  <option value='all'>すべて</option>
                  <option value='keep'>Keep</option>
                  <option value='problem'>Problem</option>
                  <option value='try'>Try</option>
                </select>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium text-gray-700'>状態:</span>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
                  className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  aria-label='スケジュール状態でフィルタリング'
                >
                  <option value='all'>すべて</option>
                  <option value='completed'>完了</option>
                  <option value='scheduled'>予定</option>
                  <option value='cancelled'>キャンセル</option>
                </select>
              </div>
            </div>

            {/* 表示件数 */}
            <div className='text-sm text-gray-500'>
              表示中: {filteredSchedules.length}件 / 全{schedules.length}件
            </div>
          </div>

          {/* 凡例 */}
          <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
            <h4 className='text-sm font-medium text-gray-700 mb-2'>凡例</h4>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-xs'>
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
                <span>✓</span>
                <span>完了</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>📅</span>
                <span>予定</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span>✗</span>
                <span>キャンセル</span>
              </div>
            </div>
          </div>

          {/* カレンダー本体 */}
          <Calendar
            localizer={localizer}
            events={filteredSchedules}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 600 }}
            views={['month']}
            date={currentDate}
            onNavigate={handleNavigate}
            onView={setView}
            view={view}
            selectable
            onSelectSlot={handleSelectSlot}
            components={{ event: EventComponent }}
            popup
          />

          {/* 新規Todo入力フォーム（モーダル風） */}
          {showInput.open && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50'>
              <div className='bg-white rounded-lg shadow-lg p-6 w-80'>
                <h2 className='text-lg font-semibold mb-4'>新規Todo作成</h2>
                <input
                  type='text'
                  className='w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  placeholder='タイトルを入力...'
                  value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  autoFocus
                />
                <div className='flex justify-end gap-2'>
                  <button
                    className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-800'
                    onClick={() => setShowInput({ open: false, date: null })}
                  >
                    キャンセル
                  </button>
                  <button
                    className='px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-700'
                    onClick={handleAddTodo}
                  >
                    作成
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 期間情報表示 */}
          <div className='mt-4 text-center text-sm text-gray-500'>
            {format(currentDate, 'yyyy年MM月', { locale: ja })}の振り返りスケジュール
            {filteredSchedules.length > 0 && (
              <span className='ml-2'>
                （{filteredSchedules.filter(s => s.status === 'completed').length}件完了 /
                {filteredSchedules.filter(s => s.status === 'scheduled').length}件予定）
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPTCalendar;
