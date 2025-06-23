/**
 * @file page.tsx
 * @description カレンダーページ（KPT管理・分析）
 * 
 * @overview
 * - 3タブ構成：カレンダー、タイムライン、分析
 * - カレンダー表示機能
 * - 成長タイムライン
 * - 成長分析グラフ
 * - 日付クリックでKPT作成機能
 * - レスポンシブ対応
 * 
 * @example
 * ```tsx
 * <CalendarPage />
 * ```
 */

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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

interface TimelineItem {
  date: string;
  type: 'kpt_session' | 'work_log';
  title: string;
  description?: string;
  status?: string;
  items_count?: number;
  progress_rate?: number;
  emotion_score?: number;
  impact_score?: number;
  url: string;
}

interface PersonalStats {
  total_sessions: number;
  total_items: number;
  completion_rate: number;
  current_streak: number;
  longest_streak: number;
  monthly_average: number;
  most_productive_day: string;
  popular_tags: Array<{ tag: string; count: number }>;
  recent_achievements: Array<{
    type: string;
    title: string;
    date: string;
    description: string;
  }>;
}

interface KptSessionsResponse {
  success: boolean;
  data: {
    sessions: KptSession[];
    pagination: {
      current_page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
  };
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

type ActiveTab = 'calendar' | 'timeline' | 'analytics';

const CalendarPageInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 状態管理
  const [activeTab, setActiveTab] = useState<ActiveTab>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // データ状態
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
  const [sessions, setSessions] = useState<KptSession[]>([]);

  // APIベースURL
  const API_BASE_URL = '/api/v1/calendar';

  // タブ変更ハンドラー（URLも更新）
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    /**
     * @description searchParamsがnullの場合は空のURLSearchParamsを使う。
     */
    const params = new URLSearchParams((searchParams as any)?.toString?.() || '');
    params.set('tab', tab);
    router.replace(`/calendar?${params.toString()}`);
  };

  // URLパラメータからタブを設定
  useEffect(() => {
    /**
     * @description searchParamsがnullの場合は何もしない。
     */
    if (!searchParams) return;
    const tabParam = searchParams.get('tab') as ActiveTab;
    if (tabParam && ['calendar', 'timeline', 'analytics'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

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
  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kpt_sessions`);
      const result: KptSessionsResponse = await response.json();
      
      if (result.success) {
        setSessions(result.data.sessions);
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

  const fetchTimelineData = async () => {
    try {
      const startDate = `${new Date().getFullYear()}-01-01`;
      const endDate = `${new Date().getFullYear()}-12-31`;
      
      const response = await fetch(`${API_BASE_URL}/growth_timeline?start_date=${startDate}&end_date=${endDate}`);
      const result: ApiResponse<{ timeline: TimelineItem[] }> = await response.json();
      
      if (result.success) {
        setTimelineData(result.data.timeline);
      } else {
        console.error('タイムラインデータ取得エラー:', result.error);
      }
    } catch (err) {
      console.error('タイムラインデータ取得エラー:', err);
    }
  };

  const fetchPersonalStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/personal_stats`);
      const result: ApiResponse<PersonalStats> = await response.json();
      
      if (result.success) {
        setPersonalStats(result.data);
      } else {
        console.error('個人統計取得エラー:', result.error);
      }
    } catch (err) {
      console.error('個人統計取得エラー:', err);
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

  const formatDateDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
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

  // アイテム数のフォーマット
  const formatItemsCount = (items_count: number | { keep: number; problem: number; try: number; total: number }): string => {
    if (typeof items_count === 'number') {
      return `${items_count}個`;
    }
    return `K:${items_count.keep} P:${items_count.problem} T:${items_count.try}`;
  };

  // 月の変更
  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  // 初期化とデータ取得
  useEffect(() => {
    if (activeTab === 'calendar') {
      fetchSessions();
    } else if (activeTab === 'timeline') {
      fetchTimelineData();
    } else if (activeTab === 'analytics') {
      fetchPersonalStats();
    }
  }, [activeTab]);

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

      {/* タブナビゲーション */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto'>
            <button
              onClick={() => handleTabChange('calendar')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📅 カレンダー
            </button>
            <button
              onClick={() => handleTabChange('timeline')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 タイムライン
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📈 分析
            </button>
          </nav>
        </div>
      </div>

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
            {/* カレンダータブ */}
            {activeTab === 'calendar' && (
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
                      <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                タイトル
                              </th>
                              <th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                日付
                              </th>
                              <th className='hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                ステータス
                              </th>
                              <th className='hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                項目数
                              </th>
                              <th className='hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                進捗
                              </th>
                              <th className='px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                操作
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white divide-y divide-gray-200'>
                            {sessions.map(session => (
                              <tr key={session.id} className='hover:bg-gray-50'>
                                <td className='px-3 sm:px-6 py-4'>
                                  <div className='text-sm font-medium text-gray-900'>{session.title}</div>
                                  {session.description && (
                                    <div className='text-sm text-gray-500 truncate'>{session.description}</div>
                                  )}
                                  {/* モバイル表示用の追加情報 */}
                                  <div className='sm:hidden mt-1'>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)} mr-2`}>
                                      {session.status}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                      {formatItemsCount(session.items_count)}
                                    </span>
                                  </div>
                                </td>
                                <td className='px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {session.session_date}
                                </td>
                                <td className='hidden sm:table-cell px-6 py-4 whitespace-nowrap'>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                    {session.status}
                                  </span>
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                  {formatItemsCount(session.items_count)}
                                </td>
                                <td className='hidden lg:table-cell px-6 py-4 whitespace-nowrap'>
                                  <div className='flex items-center'>
                                    <div className='flex-1 bg-gray-200 rounded-full h-2 mr-2'>
                                      <div
                                        className='bg-indigo-600 h-2 rounded-full'
                                        style={{ width: `${session.progress_rate}%` }}
                                      ></div>
                                    </div>
                                    <span className='text-sm text-gray-500'>{session.progress_rate}%</span>
                                  </div>
                                </td>
                                <td className='px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                  <Link
                                    href={`/dashboard/kpt/${session.id}`}
                                    className='text-indigo-600 hover:text-indigo-900'
                                  >
                                    詳細
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* タイムラインタブ */}
            {activeTab === 'timeline' && (
              <div className='space-y-6'>
                <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>成長タイムライン</h3>
                  <div className='space-y-4'>
                    {timelineData.length > 0 ? (
                      timelineData.map((item, index) => (
                        <div key={index} className='flex items-start space-x-4 p-4 border border-gray-200 rounded-lg'>
                          <div className='flex-shrink-0'>
                            <div className={`w-3 h-3 rounded-full ${item.type === 'kpt_session' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                              <h4 className='text-sm font-medium text-gray-900'>{item.title}</h4>
                              <span className='text-xs text-gray-500'>{formatDateDisplay(item.date)}</span>
                            </div>
                            {item.description && (
                              <p className='text-sm text-gray-600 mt-1'>{item.description}</p>
                            )}
                            <div className='flex items-center space-x-4 mt-2 flex-wrap'>
                              {item.status && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              )}
                              {item.items_count !== undefined && (
                                <span className='text-xs text-gray-500'>アイテム: {item.items_count}</span>
                              )}
                              {item.progress_rate !== undefined && (
                                <span className='text-xs text-gray-500'>進捗: {item.progress_rate}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500 text-center py-8'>タイムラインデータがありません</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 分析タブ */}
            {activeTab === 'analytics' && (
              <div className='space-y-6'>
                {personalStats && (
                  <>
                    {/* 統計サマリー */}
                    <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                      <h3 className='text-lg font-medium text-gray-900 mb-4'>個人統計</h3>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='text-center'>
                          <div className='text-2xl font-bold text-indigo-600'>{personalStats.total_sessions}</div>
                          <div className='text-sm text-gray-500'>総セッション数</div>
                        </div>
                        <div className='text-center'>
                          <div className='text-2xl font-bold text-green-600'>{personalStats.total_items}</div>
                          <div className='text-sm text-gray-500'>総アイテム数</div>
                        </div>
                        <div className='text-center'>
                          <div className='text-2xl font-bold text-blue-600'>{personalStats.completion_rate}%</div>
                          <div className='text-sm text-gray-500'>完了率</div>
                        </div>
                        <div className='text-center'>
                          <div className='text-2xl font-bold text-purple-600'>{personalStats.current_streak}</div>
                          <div className='text-sm text-gray-500'>現在の連続日数</div>
                        </div>
                      </div>
                    </div>

                    {/* 人気タグ */}
                    {personalStats.popular_tags.length > 0 && (
                      <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>よく使うタグ</h3>
                        <div className='flex flex-wrap gap-2'>
                          {personalStats.popular_tags.map((tag, index) => (
                            <span
                              key={index}
                              className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800'
                            >
                              {tag.tag} ({tag.count})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 最近の成果 */}
                    {personalStats.recent_achievements.length > 0 && (
                      <div className='bg-white rounded-lg shadow p-4 sm:p-6'>
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>最近の成果</h3>
                        <div className='space-y-3'>
                          {personalStats.recent_achievements.map((achievement, index) => (
                            <div key={index} className='flex items-start space-x-3 p-3 bg-gray-50 rounded-lg'>
                              <div className='flex-shrink-0'>
                                <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                                  🏆
                                </div>
                              </div>
                              <div className='flex-1'>
                                <h4 className='text-sm font-medium text-gray-900'>{achievement.title}</h4>
                                <p className='text-sm text-gray-600'>{achievement.description}</p>
                                <span className='text-xs text-gray-500'>{formatDateDisplay(achievement.date)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

/**
 * @description useSearchParamsを利用するため、Suspenseでラップしたエクスポートコンポーネント
 */
const CalendarPage = () => (
  <Suspense>
    <CalendarPageInner />
  </Suspense>
);

export default CalendarPage; 