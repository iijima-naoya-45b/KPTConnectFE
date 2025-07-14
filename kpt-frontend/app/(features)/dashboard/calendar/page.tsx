'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 型定義をインポート
interface KptSession {
  id: string;
  title: string;
  description: string;
  session_date: string;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  is_template: boolean;
  template_name: string | null;
  tags: string[];
  items_count: number | { keep: number; problem: number; try: number; total: number };
  progress_rate: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}


const CalendarPageInner = () => {
  const router = useRouter();
  
  // 状態管理
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // データ状態
  const [sessions, setSessions] = useState<KptSession[]>([]);

  // 注意: このAPI_BASE_URLは現在使用されていません（直接APIクライアントを使用）

  // カレンダー日付クリック時のKPT作成ハンドラー
  const handleCalendarDateClick = (date: Date) => {
    const selectedDateStr = formatDate(date);
    router.push(`/dashboard/kpt/new?date=${selectedDateStr}`);
  };

  // 本日の日付でKPT作成
  const handleTodayCreate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    router.push(`/dashboard/kpt/new?date=${todayString}`);
  };

  // APIリクエスト関数
  const fetchSessions = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
      const result = await kptSessionsApi.getKptSessions({ page, per_page: 10 });
      
      if (result.success) {
        setSessions(result.data.sessions);
        setTotalPages(result.data.pagination.total_pages);
      } else {
        setError(result.message || 'セッションの取得に失敗しました');
      }
    } catch (err) {
      console.error('セッション取得エラー:', err);
      setError('セッションの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // ユーティリティ関数
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // セッションを日付別にマップ化
  const createSessionsMap = (sessionsList: KptSession[]) => {
    const map = new Map<string, KptSession[]>();
    sessionsList.forEach(session => {
      const date = session.session_date;
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date)!.push(session);
    });
    return map;
  };

  // カレンダーの日付生成
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const days = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };



  // 月の変更
  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  // 初期化とデータ取得
  useEffect(() => {
    fetchSessions();
  }, []);

  const sessionsMap = createSessionsMap(sessions);
  const calendarDays = generateCalendarDays();

  return (
    <div className='  bg-gray-50 pt-16'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
            <div className='mb-2 sm:mb-0'>
              <h1 className='text-2xl font-bold text-gray-900'>KPTカレンダー・分析</h1>
              <p className='text-sm text-gray-500 mt-1'>
                {new Date().getFullYear()}年{String(new Date().getMonth() + 1).padStart(2, '0')}月のKPT管理
                <span className='ml-2 text-indigo-600'>（日付クリックでKPT作成）</span>
              </p>
            </div>
            <div className='flex space-x-2'>
              {/* 新規作成ボタン */}
              <button
                onClick={handleTodayCreate}
                className='bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                📅 今日のKPT
              </button>
              <Link
                href='/dashboard'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm'
              >
                ダッシュボードに戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
            <p className='text-red-800'>{error}</p>
          </div>
        )}

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <>
            {/* Render only the calendar view */}
            <div className='space-y-6'>
              {/* 月次ナビゲーション */}
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => changeMonth(-1)}
                  className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                >
                  ← 前月
                </button>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                >
                  次月 →
                </button>
              </div>

              {/* カレンダーグリッド */}
              <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                <div className='mb-4 text-sm text-gray-600 text-center'>
                  💡 日付をクリックすると、その日のKPTセッションを作成できます
                </div>
                <div className='grid grid-cols-7 gap-1 sm:gap-2'>
                  {/* 曜日ヘッダー */}
                  {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                    <div key={index} className='p-2 text-center text-sm font-medium text-gray-500'>
                      {day}
                    </div>
                  ))}
                  {/* カレンダー日付 */}
                  {calendarDays.map((day, index) => {
                    const dateKey = formatDate(day);
                    const daySessions = sessionsMap.get(dateKey) || [];
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const isToday = formatDate(day) === formatDate(new Date());

                    return (
                      <div
                        key={index}
                        onClick={() => handleCalendarDateClick(day)}
                        className={`min-h-[80px] sm:min-h-[100px] p-1 border border-gray-200 cursor-pointer transition-colors duration-200 ${
                          isCurrentMonth ? 'bg-white hover:bg-indigo-50' : 'bg-gray-50 hover:bg-indigo-50'
                        } ${isToday ? 'bg-blue-50 border-blue-200' : ''} ${daySessions.length > 0 ? 'bg-blue-50' : ''} hover:border-indigo-300`}
                        title={`${day.getMonth() + 1}/${day.getDate()} のKPTを作成`}
                      >
                        <div
                          className={`text-sm ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          } ${isToday ? 'font-bold text-blue-600' : ''}`}
                        >
                          {day.getDate()}
                        </div>
                        {/* セッション表示 */}
                        <div className='mt-1 space-y-1'>
                          {daySessions.slice(0, 2).map(session => (
                            <div
                              key={session.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/dashboard/kpt/${session.id}`);
                              }}
                              className={`text-xs p-1 rounded cursor-pointer hover:opacity-75 transition-opacity duration-200 ${getStatusColor(session.status)}`}
                              title={`${session.title} - クリックして詳細表示`}
                            >
                              <div className='truncate'>{session.title}</div>
                            </div>
                          ))}
                          {daySessions.length > 2 && (
                            <div className='text-xs text-gray-500 p-1'>
                              +{daySessions.length - 2}個
                            </div>
                          )}
                          {/* 新規作成ヒント（セッションがない場合） */}
                          {daySessions.length === 0 && isCurrentMonth && (
                            <div className='text-xs text-indigo-600 opacity-0 hover:opacity-100 transition-opacity duration-200 p-1'>
                              + KPT作成
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* セッション一覧（テーブル形式） */}
              <div className='bg-white rounded-lg shadow'>
                <div className='p-4 sm:p-6'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    セッション一覧 ({sessions.length}件)
                  </h3>
                  {sessions.length === 0 ? (
                    <div className='text-center py-8'>
                      <p className='text-gray-500 mb-4'>まだKPTセッションが作成されていません。</p>
                      <div className='space-y-2'>
                        <button
                          onClick={handleTodayCreate}
                          className='block mx-auto bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                        >
                          📅 今日のKPTセッションを作成
                        </button>
                        <Link
                          href='/dashboard/kpt/new'
                          className='block mx-auto text-indigo-600 hover:text-indigo-900 text-sm'
                        >
                          または任意の日付で作成
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      {sessions.map(session => (
                        <div
                          key={session.id}
                          className='bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all duration-200'
                          onClick={() => router.push(`/dashboard/kpt/${session.id}`)}
                        >
                          <div className='flex justify-between items-start'>
                            <div className='flex-1 min-w-0'>
                              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                {session.title}
                              </h3>
                              {session.description && (
                                <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                                  {session.description}
                                </p>
                              )}
                            </div>
                            <div className='ml-4 flex-shrink-0'>
                              <span className='text-sm text-gray-500'>
                                {session.session_date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Add pagination controls in the UI */}
              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      fetchSessions(currentPage - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50'
                >
                  前のページ
                </button>
                <span className='text-sm text-gray-700'>ページ {currentPage} / {totalPages}</span>
                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      fetchSessions(currentPage + 1);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50'
                >
                  次のページ
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const CalendarPage = () => (
  <Suspense>
    <CalendarPageInner />
  </Suspense>
);

export default CalendarPage; 