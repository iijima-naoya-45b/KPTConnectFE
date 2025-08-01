'use client';

import React, { useState, useEffect } from 'react';
// Remove the unused Gantt import
// import { Gantt, Task } from 'gantt-task-react';

interface ActionPlan {
  id: string;
  title: string;
  progress: number;
}

interface Goal {
  id: string | number;
  title: string;
  action_plan: ActionPlan[] | string[]; // 両方の形式に対応
  deadline?: string;
  created_at?: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  created_by_ai: boolean;
}

interface GanttAction {
  id: string;
  name: string;
  goalId: string;
  goalTitle: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  isGoal: boolean;
  originalIndex?: number;
}

interface CustomDuration {
  goalId: string;
  actionIndex: number;
  duration: number;
}

const GanttPage: React.FC = () => {
  const [apiGoals, setApiGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewPeriod, setViewPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  
  // API呼び出しを直接実行
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching goals from API...');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/goals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response data:', data);
        
        setApiGoals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('API fetch error:', err);
        setError(err instanceof Error ? err.message : '目標の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);
  
  // AI目標で作成されたデータのみをフィルタリング＆データ正規化
  const goals: Array<Goal & { id: string; deadline: string; created_at: string }> = apiGoals ? apiGoals
    .filter(goal => {
      console.log('Goal:', goal.title, 'created_by_ai:', goal.created_by_ai);
      return goal.created_by_ai === true;
    })
    .map(goal => {
      // action_planが文字列で返ってくる場合があるのでパースする
      let actionPlan = goal.action_plan;
      if (typeof actionPlan === 'string') {
        try {
          actionPlan = JSON.parse(actionPlan);
        } catch (e) {
          actionPlan = [];
        }
      }
      return {
        ...goal,
        id: String(goal.id), // IDを文字列に統一
        action_plan: Array.isArray(actionPlan) ? actionPlan : [],
        deadline: goal.deadline ? String(goal.deadline) : '',
        created_at: goal.created_at ? String(goal.created_at) : ''
      };
    }) : [];

  console.log('Filtered AI goals:', goals);

  // アクションプランを正規化する関数
  const normalizeActionPlan = (actionPlan: ActionPlan[] | string[]): ActionPlan[] => {
    if (!Array.isArray(actionPlan)) return [];
    
    // 新形式（オブジェクト配列）の場合
    if (actionPlan.length > 0 && typeof actionPlan[0] === 'object') {
      return actionPlan as ActionPlan[];
    }
    
    // 旧形式（文字列配列）の場合は変換
    return (actionPlan as string[]).map((title, index) => ({
      id: `action_${index + 1}`,
      title,
      progress: 0
    }));
  };
  
  const [customDurations, setCustomDurations] = useState<CustomDuration[]>([]);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    actionId: string | null;
    startX: number;
    originalEndDate: Date | null;
  }>({ isDragging: false, actionId: null, startX: 0, originalEndDate: null });

  // ローカルストレージから期間カスタマイズを読み込み
  useEffect(() => {
    const saved = localStorage.getItem('gantt-custom-durations');
    if (saved) {
      try {
        setCustomDurations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved durations:', e);
      }
    }
  }, []);

  // ローカルストレージに期間カスタマイズを保存
  const saveCustomDuration = (goalId: string, actionIndex: number, duration: number) => {
    const newCustomDurations = customDurations.filter(
      cd => !(cd.goalId === goalId && cd.actionIndex === actionIndex)
    );
    newCustomDurations.push({ goalId, actionIndex, duration });
    
    setCustomDurations(newCustomDurations);
    localStorage.setItem('gantt-custom-durations', JSON.stringify(newCustomDurations));
  };

  // 安全な日付変換
  const safeDate = (dateStr: string | null | undefined, fallback: Date): Date => {
    if (!dateStr) return fallback;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? fallback : date;
  };

  // ガントチャート用のアクションデータを生成（目標とアクションプランを統合）
  const generateGanttActions = (): GanttAction[] => {
    if (!goals || goals.length === 0) return [];

    const actions: GanttAction[] = [];

    goals.forEach(goal => {
      // 目標とアクションプランを統合した1つのバーとして表示
      const goalStartDate = safeDate(goal.created_at, new Date());
      const goalEndDate = safeDate(goal.deadline, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      
      actions.push({
        id: `goal-${goal.id.toString()}`,
        name: goal.title,
        goalId: goal.id.toString(),
        goalTitle: goal.title,
        startDate: goalStartDate,
        endDate: goalEndDate,
        duration: Math.ceil((goalEndDate.getTime() - goalStartDate.getTime()) / (1000 * 60 * 60 * 24)),
        isGoal: true,
      });
    });

    return actions;
  };

  // 期間に応じた設定を取得
  const getPeriodConfig = () => {
    const now = new Date();
    switch (viewPeriod) {
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return {
          startDate: weekStart,
          endDate: weekEnd,
          dayWidth: 80,
          unit: '日',
          format: (date: Date) => date.toLocaleDateString('ja-JP', { weekday: 'short', day: 'numeric' })
        };
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return {
          startDate: monthStart,
          endDate: monthEnd,
          dayWidth: 30,
          unit: '日',
          format: (date: Date) => date.getDate().toString()
        };
      case 'quarter':
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        const quarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
        return {
          startDate: quarterStart,
          endDate: quarterEnd,
          dayWidth: 10,
          unit: '週',
          format: (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`
        };
      default:
        return getPeriodConfig();
    }
  };

  const periodConfig = getPeriodConfig();

  // 日付範囲を計算（期間設定を考慮）
  const calculateDateRange = (actions: GanttAction[]) => {
    if (actions.length === 0) {
      return { 
        startDate: periodConfig.startDate, 
        endDate: periodConfig.endDate, 
        days: Math.ceil((periodConfig.endDate.getTime() - periodConfig.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 
      };
    }

    const dataStartDate = new Date(Math.min(...actions.map(a => a.startDate.getTime())));
    const dataEndDate = new Date(Math.max(...actions.map(a => a.endDate.getTime())));
    
    // 期間設定とデータ範囲の交点を使用
    const startDate = new Date(Math.max(dataStartDate.getTime(), periodConfig.startDate.getTime()));
    const endDate = new Date(Math.min(dataEndDate.getTime(), periodConfig.endDate.getTime()));
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return { startDate, endDate, days };
  };

  const actions = generateGanttActions();
  const { startDate, endDate, days } = calculateDateRange(actions);

  // Add validation for date parsing
  const isValidDate = (date: Date) => !isNaN(date.getTime());

  // Extract dates from each action and set the Gantt chart display period
  const extractDatesAndSetPeriod = (actions: GanttAction[]) => {
    const startDates = actions.map(action => action.startDate).filter(isValidDate);
    const endDates = actions.map(action => action.endDate).filter(isValidDate);
    if (startDates.length === 0 || endDates.length === 0) {
      console.error('No valid dates found in actions');
      return { startDate: new Date(), endDate: new Date() };
    }
    const minStartDate = new Date(Math.min(...startDates.map(date => date.getTime())));
    const maxEndDate = new Date(Math.max(...endDates.map(date => date.getTime())));
    return { startDate: minStartDate, endDate: maxEndDate };
  };

  // Add console logs to identify re-render triggers
  console.log('Rendering GanttPage component');

  // Ensure useEffect dependencies are correctly set
  useEffect(() => {
    console.log('Setting view period to month');
    setViewPeriod('month');
  }, []); // Empty dependency array to run only once

  // Ensure destructured variables are used
  const { startDate: ganttStartDate, endDate: ganttEndDate } = extractDatesAndSetPeriod(actions);

  // Use ganttStartDate and ganttEndDate in rendering logic
  // Example usage:
  console.log('Gantt Start Date:', ganttStartDate);
  console.log('Gantt End Date:', ganttEndDate);

  // 期間を日数に変換（ドラッグリサイズ用）
  const convertDragToDays = (deltaX: number, dayWidth: number): number => {
    return Math.round(deltaX / dayWidth);
  };

  // ドラッグ中
  const handleDragMove = () => {
    if (!dragState.isDragging || !dragState.actionId || !dragState.originalEndDate) return;
    
    // const dayWidth = periodConfig.dayWidth;
    // TODO: リアルタイムでバーの幅を更新（実装可能）
  };

  // ドラッグ終了
  const handleDragEnd = () => {
    if (!dragState.isDragging || !dragState.actionId || !dragState.originalEndDate) return;
    
    // const dayWidth = periodConfig.dayWidth;
    
    // アクションを特定して期間を更新
    const actionParts = dragState.actionId.split('-');
    if (actionParts.length >= 3 && actionParts[1] === 'action') {
      const goalId = actionParts[0];
      const actionIndex = parseInt(actionParts[2]);
      const currentAction = actions.find(a => a.id === dragState.actionId);
      
      if (currentAction && !isNaN(actionIndex)) {
        const newDuration = Math.max(1, currentAction.duration + convertDragToDays(dragState.startX, periodConfig.dayWidth));
        saveCustomDuration(goalId, actionIndex, newDuration);
      }
    }
    
    setDragState({ isDragging: false, actionId: null, startX: 0, originalEndDate: null });
  };

  // 週ヘッダーの生成（1週間表示用）
  const generateWeekHeaders = () => {
    if (viewPeriod !== 'week') return [];
    
    const weekStart = new Date(startDate);
    const month = weekStart.getMonth() + 1;
    const year = weekStart.getFullYear();
    const weekOfMonth = Math.ceil(weekStart.getDate() / 7);
    
    return [{
      label: `${year}年${month}月第${weekOfMonth}週`,
      year: year,
      month: month,
      week: weekOfMonth,
      width: days * periodConfig.dayWidth
    }];
  };

  const weekHeadersForWeekView = generateWeekHeaders();

  // 週単位のヘッダー計算（四半期表示用）
  const getQuarterWeekHeaders = () => {
    if (viewPeriod !== 'quarter') return [];
    
    const headers = [];
    const currentDate = new Date(startDate);
    let weekNumber = 1;
    
    while (currentDate <= endDate) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      headers.push({
        label: `第${weekNumber}週`,
        startDate: new Date(weekStart),
        endDate: new Date(Math.min(weekEnd.getTime(), endDate.getTime())),
        width: Math.ceil((Math.min(weekEnd.getTime(), endDate.getTime()) - weekStart.getTime()) / (1000 * 60 * 60 * 24)) * periodConfig.dayWidth
      });
      
      currentDate.setDate(currentDate.getDate() + 7);
      weekNumber++;
    }
    
    return headers;
  };

  const quarterWeekHeaders = getQuarterWeekHeaders();

  // 日付ヘッダーの生成
  const generateDateHeaders = () => {
    const headers = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < days; i++) {
      headers.push({
        date: new Date(currentDate),
        label: periodConfig.format(currentDate)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return headers;
  };

  const dateHeaders = generateDateHeaders();

  // 月ヘッダーの生成（期間の上部タイトル用）
  const generateMonthHeaders = () => {
    const headers = [];
    const currentDate = new Date(startDate);
    let currentMonth = -1;
    let dayCount = 0;
    
    for (let i = 0; i < days; i++) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      if (month !== currentMonth) {
        if (dayCount > 0) {
          headers[headers.length - 1].days = dayCount;
        }
        
        headers.push({
          label: viewPeriod === 'quarter' 
            ? `${year}年${month + 1}月`
            : `${month + 1}月`,
          month: month + 1,
          year: year,
          days: 1,
          width: periodConfig.dayWidth
        });
        
        currentMonth = month;
        dayCount = 1;
      } else {
        dayCount++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (dayCount > 0 && headers.length > 0) {
      headers[headers.length - 1].days = dayCount;
    }
    
    // 幅を計算
    headers.forEach(header => {
      header.width = header.days * periodConfig.dayWidth;
    });
    
    return headers;
  };

  const monthHeaders = generateMonthHeaders();

  // Calculate bar width based on the period duration
  const calculateBarWidth = (startDate: Date, endDate: Date, dayWidth: number): number => {
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const maxWidth = 800; // Set a maximum width for the bars
    const calculatedWidth = durationDays * dayWidth;
    return Math.min(calculatedWidth, maxWidth);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-116px-64px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600">データを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-116px-64px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">データの読み込みエラー</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-[calc(100vh-116px-64px)] bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-lg font-bold text-slate-800">ダッシュボード</h1>
        </div>

        {/* ヘッダー */}
        <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-bold text-slate-800 mb-2">AI目標ガントチャート</h1>
              <p className="text-slate-600">AI生成された学習目標の進捗とスケジュールを視覚的に管理</p>
            </div>
          </div>
        </div>

        {/* 期間選択タブ */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">表示期間</h2>
            <div className="flex bg-slate-100 rounded-lg p-1">
              {[
                { key: 'week', label: '1週間', icon: '📅' },
                { key: 'month', label: '1ヶ月', icon: '📆' },
                { key: 'quarter', label: '四半期', icon: '🗓️' }
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setViewPeriod(period.key as 'week' | 'month' | 'quarter')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewPeriod === period.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="mr-2">{period.icon}</span>
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-600">
            現在の表示期間: {periodConfig.startDate.toLocaleDateString('ja-JP')} 〜 {periodConfig.endDate.toLocaleDateString('ja-JP')}
          </div>
        </div>

        {/* ガントチャート */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {goals.length > 0 ? (
            <div className="max-h-[80vh]">
              {/* ヘッダー */}
              <div className="border-b-2 border-slate-300 bg-gradient-to-r from-slate-100 to-slate-50 sticky top-0 z-10">
                {/* 月ヘッダー（最上部） */}
                <div className={`flex min-w-[${Math.max(1200, days * periodConfig.dayWidth + 400)}px]`}>
                  <div className="w-96 p-2 font-bold text-slate-800 border-r-2 border-slate-300 bg-gradient-to-r from-slate-200 to-slate-100 sticky left-0 z-20">
                    <div className="text-xs text-slate-600">期間</div>
                  </div>
                  <div className="flex bg-gradient-to-r from-indigo-100 to-purple-100">
                    {viewPeriod === 'week' ? (
                      weekHeadersForWeekView.map((header, index) => (
                        <div
                          key={index}
                          className="border-r border-slate-400 p-2 text-center font-bold text-slate-800 bg-gradient-to-b from-indigo-200 to-purple-200"
                          style={{ width: `${header.width}px` }}
                        >
                          <div className="text-sm font-bold text-indigo-900">{header.label}</div>
                          <div className="text-xs text-indigo-700">週間表示</div>
                        </div>
                      ))
                    ) : (
                      monthHeaders.map((header, index) => (
                        <div
                          key={index}
                          className="border-r border-slate-400 p-2 text-center font-bold text-slate-800 bg-gradient-to-b from-indigo-200 to-purple-200"
                          style={{ width: `${header.width}px` }}
                        >
                          <div className="text-sm font-bold text-indigo-900">{header.label}</div>
                          <div className="text-xs text-indigo-700">{header.year}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                {/* 詳細ヘッダー（週/日） */}
                <div className="flex" style={{ minWidth: `${Math.max(1200, days * periodConfig.dayWidth + 400)}px` }}>
                  <div className="w-[26.2%] p-3 font-bold text-slate-800 border-r-2 border-slate-300 bg-gradient-to-r from-slate-200 to-slate-100 sticky left-0 z-20">
                    <div className="flex items-center space-x-2">
                      <svg className="w- h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <span className="text-sm">AI目標・タスク</span>
                    </div>
                  </div>
                  <div className="flex bg-gradient-to-r from-blue-50 to-indigo-50">
                    {viewPeriod === 'quarter' ? (
                      quarterWeekHeaders.map((header, index) => (
                        <div
                          key={index}
                          className="border-r border-slate-300 p-2 text-center font-semibold text-slate-700 bg-gradient-to-b from-blue-100 to-blue-50"
                          style={{ width: `${header.width}px` }}
                        >
                          <div className="text-xs font-bold text-blue-800">{header.label}</div>
                        </div>
                      ))
                    ) : (
                      <div className="flex w-full">
                        {dateHeaders.map((header, index) => (
                          <div
                            key={index}
                            className="flex-1 border-r border-slate-300 p-2 text-center font-medium text-slate-700 bg-gradient-to-b from-blue-100 to-blue-50"
                            style={{ width: `${periodConfig.dayWidth}px` }}
                          >
                            <div className="text-[10px] font-bold text-blue-800">{header.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ガントバー */}
              <div className="divide-y divide-slate-200 py-10">
                {actions.map((action) => {
                  const leftOffset = Math.ceil((action.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * periodConfig.dayWidth;
                  const width = calculateBarWidth(action.startDate, action.endDate, periodConfig.dayWidth);
                  const isCustomized = action.originalIndex !== undefined && 
                    customDurations.some(cd => cd.goalId === action.goalId && cd.actionIndex === action.originalIndex);
                  
                  return (
                    <div key={action.id} className={`flex items-center hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all duration-200 group min-w-[${Math.max(1200, days * periodConfig.dayWidth + 400)}px]`}>
                      {/* タスク名（固定列） */}
                      <div className="w-96 p-3 border-r-2 border-slate-200 bg-white group-hover:bg-slate-50 transition-colors duration-200 sticky left-0 z-10">
                        <div className={`flex items-center ${action.isGoal ? '' : 'ml-8'}`}> 
                          {action.isGoal ? (
                            <div className="flex flex-col w-full space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm">
                                    🤖 AI目標
                                  </span>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-slate-500 flex items-center space-x-2 mb-3">
                                  <span>期間: {action.duration}日</span>
                                  <span>•</span>
                                  <span>{action.startDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })} - {action.endDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-3 w-full">
                              <div className="w-2 h-2 bg-blue-400 rounded-full shadow-sm"></div>
                              <div className="flex-1">
                                <span 
                                  className={`text-sm font-medium text-slate-700 block mb-1`}
                                >
                                  {action.name}
                                </span>
                                <div className="flex items-center space-x-2 text-xs text-slate-500">
                                  <span>{action.duration}日</span>
                                  {isCustomized && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                      カスタム
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ガントバー */}
                      <div className="relative flex-1 h-20 flex items-center bg-gradient-to-r from-slate-50 to-white group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-200">
                        {action.isGoal ? (() => {
                          const goal = goals.find(g => g.id.toString() === action.goalId);
                          const normalizedActionPlans = goal ? normalizeActionPlan(goal.action_plan) : [];
                          const totalWidth = width;
                          const segmentWidth = normalizedActionPlans.length > 0 ? totalWidth / normalizedActionPlans.length : totalWidth;
                          
                          return (
                            <div className={`relative flex ml-[${leftOffset}px] w-[${totalWidth}px]`}>
                              {normalizedActionPlans.length > 0 ? (
                                normalizedActionPlans.map((plan, planIndex) => (
                                  <div
                                    key={planIndex}
                                    className={`relative rounded-sm shadow-lg border-r border-white/30 transition-all duration-200 hover:shadow-xl transform hover:scale-105 overflow-hidden
                                      ${planIndex === 0 ? 'rounded-l-lg' : ''} 
                                      ${planIndex === normalizedActionPlans.length - 1 ? 'rounded-r-lg border-r-0' : ''}
                                      bg-gradient-to-r from-purple-${500 + planIndex * 50} via-purple-${600 + planIndex * 50} to-purple-${700 + planIndex * 50}`}
                                    style={{
                                      width: `${segmentWidth}px`,
                                      height: '65px',
                                      backgroundColor: `hsl(${280 + planIndex * 20}, 65%, ${50 + planIndex * 5}%)`
                                    }}
                                    title={`${planIndex + 1}. ${plan.title}`}
                                  >
                                    {/* アクションプラン内容 */}
                                    <div className="p-2 h-full flex flex-col justify-center text-white">
                                      <div className="text-xs font-bold mb-1 text-center">
                                        {planIndex + 1}
                                      </div>
                                      <div className="text-xs opacity-90 leading-tight text-center overflow-hidden">
                                        {plan.title.length > 20 ? plan.title.substring(0, 20) + '...' : plan.title}
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                // アクションプランがない場合の表示
                                <div
                                  className="relative rounded-lg shadow-lg border-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 border-purple-300 shadow-purple-200 transition-all duration-200 hover:shadow-xl transform hover:scale-105 overflow-hidden"
                                  style={{
                                    width: `${totalWidth}px`,
                                    height: '65px',
                                    minWidth: '200px'
                                  }}
                                >
                                  <div className="p-3 h-full flex flex-col justify-center text-white">
                                    <div className="font-bold text-sm mb-1 truncate">
                                      {action.name}
                                    </div>
                                    <div className="text-xs opacity-80">
                                      {action.duration}日間 | {action.startDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })} - {action.endDate.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* 目標タイトル（上部に表示） */}
                              <div className="absolute -top-6 left-0 right-0 text-xs font-bold text-slate-700 truncate bg-white/80 px-2 py-1 rounded shadow-sm">
                                {action.name}
                              </div>
                            </div>
                          );
                        })() : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-600">
              現在、目標がありません。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GanttPage;