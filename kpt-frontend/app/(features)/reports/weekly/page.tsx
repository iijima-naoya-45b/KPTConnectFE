'use client';

import React, { useState, useEffect } from 'react';
import AuthenticatedHeader from '../../../../components/ui/layout/header/AuthenticatedHeader';

interface WeeklyData {
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  goals: {
    active: number;
    completed: number;
    progress: number;
    newGoals: number;
  };
  actionPlans: {
    total: number;
    completed: number;
    inProgress: number;
    completionRate: number;
  };
  kpt: {
    sessions: number;
    keepItems: number;
    problemItems: number;
    tryItems: number;
    problemSolvedFromPrevious: number;
  };
  insights: {
    productivityScore: number;
    consistencyScore: number;
    challengeLevel: number;
  };
}

interface ActionPlan {
  id: string;
  title: string;
  progress: number;
}

interface Goal {
  id: string | number;
  title: string;
  action_plan: ActionPlan[] | string[]; // 両方の形式に対応
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at?: string;
  updated_at?: string;
}

interface KptSession {
  id: string | number;
  title: string;
  description: string;
  session_date: string;
  kpt_items: KptItem[];
  created_at: string;
  updated_at: string;
}

interface KptItem {
  id: string | number;
  type: 'keep' | 'problem' | 'try';
  content: string;
  created_at: string;
  updated_at: string;
}

const WeeklyReportPage: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [kptSessions, setKptSessions] = useState<KptSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [tempProgress, setTempProgress] = useState<number>(0);
  const [showActionDetails, setShowActionDetails] = useState(false);

  // 現在の週を取得
  function getCurrentWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  // 週の開始日と終了日を計算
  function getWeekDates(year: number, week: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToAdd = (week - 1) * 7 - firstDayOfYear.getDay();
    const startDate = new Date(year, 0, 1 + daysToAdd);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  }

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Goals データ取得
        const goalsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/goals`, {
          credentials: 'include',
        });
        const goalsData = await goalsResponse.json();
        setGoals(Array.isArray(goalsData) ? goalsData : []);

        // KPT セッションデータ取得
        const kptResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kpt_sessions`, {
          credentials: 'include',
        });
        const kptData = await kptResponse.json();
        setKptSessions(Array.isArray(kptData.data) ? kptData.data : []);

      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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



  // アクションプランの進捗を更新する関数
  const updateActionPlanProgress = async (goalId: string | number, actionId: string, progress: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/goals/${goalId}/action_plans/${actionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ progress }),
      });

      if (!response.ok) {
        throw new Error('進捗の更新に失敗しました');
      }

      const data = await response.json();
      
      // ローカル状態を更新
      setGoals(prevGoals => 
        prevGoals.map(goal => {
          if (goal.id.toString() === goalId.toString()) {
            const normalizedActionPlan = normalizeActionPlan(goal.action_plan);
            const updatedActionPlan = normalizedActionPlan.map(action => 
              action.id === actionId ? { ...action, progress } : action
            );
            
            return {
              ...goal,
              action_plan: updatedActionPlan,
              progress: data.action_plan_progress || goal.progress
            };
          }
          return goal;
        })
      );

      setEditingActionId(null);
    } catch (error: any) {
      console.error('進捗更新エラー:', error);
    }
  };

  // 進捗編集を開始
  const startEditProgress = (actionId: string, currentProgress: number) => {
    setEditingActionId(actionId);
    setTempProgress(currentProgress);
  };

  // 進捗編集をキャンセル
  const cancelEditProgress = () => {
    setEditingActionId(null);
    setTempProgress(0);
  };

  // 進捗を保存
  const saveProgress = (goalId: string | number) => {
    if (editingActionId) {
      updateActionPlanProgress(goalId, editingActionId, tempProgress);
    }
  };

  // 進捗色を取得
  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-300';
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    if (progress < 100) return 'bg-blue-500';
    return 'bg-green-500';
  };

  // 進捗ラベルを取得
  const getProgressLabel = (progress: number) => {
    if (progress === 0) return '未着手';
    if (progress < 100) return '進行中';
    return '完了';
  };

  // 週次データの計算
  useEffect(() => {
    if (goals.length === 0 && kptSessions.length === 0) return;

    const weekDates = getWeekDates(2025, selectedWeek);
    const weekStart = new Date(weekDates.start);
    const weekEnd = new Date(weekDates.end);

    // Goals 分析（アクションプラン考慮）
    const weekGoals = goals.filter(goal => {
      const createdAt = goal.created_at ? new Date(goal.created_at) : null;
      const updatedAt = goal.updated_at ? new Date(goal.updated_at) : null;
      
      return (createdAt && createdAt >= weekStart && createdAt <= weekEnd) ||
             (updatedAt && updatedAt >= weekStart && updatedAt <= weekEnd);
    });

    const activeGoals = goals.filter(g => g.status === 'in_progress');
    const completedGoals = weekGoals.filter(g => g.status === 'completed').length;
    const newGoals = weekGoals.filter(g => {
      const createdAt = g.created_at ? new Date(g.created_at) : null;
      return createdAt && createdAt >= weekStart && createdAt <= weekEnd;
    }).length;

    // アクションプラン進捗の計算
    const totalActionPlans = activeGoals.reduce((sum, goal) => {
      const actionPlan = normalizeActionPlan(goal.action_plan);
      return sum + actionPlan.length;
    }, 0);

    const completedActions = activeGoals.reduce((sum, goal) => {
      const actionPlan = normalizeActionPlan(goal.action_plan);
      return sum + actionPlan.filter(action => action.progress === 100).length;
    }, 0);

    const inProgressActions = activeGoals.reduce((sum, goal) => {
      const actionPlan = normalizeActionPlan(goal.action_plan);
      return sum + actionPlan.filter(action => action.progress > 0 && action.progress < 100).length;
    }, 0);

    const avgProgress = goals.length > 0 ? 
      goals.reduce((sum, g) => sum + g.progress, 0) / goals.length : 0;

    // KPT 分析（アクションプラン関連）
    const weekKptSessions = kptSessions.filter((session: KptSession) => {
      const sessionDate = new Date(session.created_at);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    });

    // KPTアイテムを種類別に分類
    const weekKptItems = weekKptSessions.flatMap((session: KptSession) => session.kpt_items);
    const keepItems = weekKptItems.filter((item: KptItem) => item.type === 'keep');
    const problemItems = weekKptItems.filter((item: KptItem) => item.type === 'problem');
    const tryItems = weekKptItems.filter((item: KptItem) => item.type === 'try');

    // アクションプランの効率を計算
    const actionPlanEfficiency = totalActionPlans > 0 ? 
      (completedActions / totalActionPlans) * 10 : 0;
    
    // 1日1KPT想定（週7回が理想）の計算式
    // 生産性スコア: 目標達成 + アクションプラン効率 + 進捗の一貫性
    const goalAchievementScore = Math.min(4, completedGoals * 2); // 最大4点
    const actionEfficiencyScore = Math.min(3, actionPlanEfficiency / 10 * 3); // 最大3点
    const progressConsistencyScore = Math.min(3, avgProgress / 100 * 3); // 最大3点
    const productivityScore = goalAchievementScore + actionEfficiencyScore + progressConsistencyScore;

    // 継続性スコア: KPT習慣の定着度 + 内容の質
    const kptFrequencyScore = Math.min(7, (weekKptSessions.length / 7) * 7); // 週7回で満点7点
    const contentQualityScore = weekKptSessions.length > 0 ? 
      Math.min(3, ((keepItems.length + problemItems.length + tryItems.length) / weekKptSessions.length / 3) * 3) : 0; // 1セッション平均3項目で満点3点
    const consistencyScore = kptFrequencyScore + contentQualityScore;

    // 挑戦レベル: 問題発見力 + 改善行動力 + バランス
    const problemDiscoveryScore = Math.min(4, (problemItems.length / 7) * 4); // 週平均1個で満点4点
    const improvementActionScore = Math.min(4, (tryItems.length / 7) * 4); // 週平均1個で満点4点
    const balanceScore = (problemItems.length > 0 && tryItems.length > 0) ? 
      Math.min(2, Math.min(problemItems.length, tryItems.length) / Math.max(problemItems.length, tryItems.length) * 2) : 0; // バランスボーナス最大2点
    const challengeLevel = problemDiscoveryScore + improvementActionScore + balanceScore;

    const calculatedWeeklyData: WeeklyData = {
      weekNumber: selectedWeek,
      year: 2025,
      startDate: weekDates.start,
      endDate: weekDates.end,
      goals: {
        active: activeGoals.length,
        completed: completedGoals,
        progress: Math.round(avgProgress),
        newGoals: newGoals
      },
      actionPlans: {
        total: totalActionPlans,
        completed: completedActions,
        inProgress: inProgressActions,
        completionRate: totalActionPlans > 0 ? Math.round((completedActions / totalActionPlans) * 100) : 0
      },
      kpt: {
        sessions: weekKptSessions.length,
        keepItems: keepItems.length,
        problemItems: problemItems.length,
        tryItems: tryItems.length,
        problemSolvedFromPrevious: Math.floor(keepItems.length * 0.3) // 推定値
      },
      insights: {
        productivityScore: Math.round(productivityScore * 10) / 10,
        consistencyScore: Math.round(consistencyScore * 10) / 10,
        challengeLevel: Math.round(challengeLevel * 10) / 10
      }
    };

    setWeeklyData(calculatedWeeklyData);
  }, [goals, kptSessions, selectedWeek]);

  // アクティブな目標のアクションプランを取得
  const getActiveActionPlans = () => {
    const activeGoals = goals.filter(g => g.status === 'in_progress');
    return activeGoals.map(goal => ({
      goal,
      actionPlans: normalizeActionPlan(goal.action_plan)
    })).filter(item => item.actionPlans.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-32">
      <AuthenticatedHeader 
        pageTitle="週次レポート"
        actionButton={{
          label: "ダッシュボード",
          href: "/dashboard"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 週選択 */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">分析対象週</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
              >
                ← 前週
              </button>
              <span className="text-lg font-semibold text-slate-800">
                2025年 第{selectedWeek}週
              </span>
              <button
                onClick={() => setSelectedWeek(prev => Math.min(52, prev + 1))}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
              >
                次週 →
              </button>
            </div>
          </div>
          {weeklyData && (
            <div className="mt-2 text-sm text-slate-600">
              {weeklyData.startDate} 〜 {weeklyData.endDate}
            </div>
          )}
        </div>

        {weeklyData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 目標達成サマリー */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">目標達成サマリー</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">進行中の目標</span>
                  <span className="text-2xl font-bold text-blue-600">{weeklyData.goals.active}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-slate-600">完了した目標</span>
                  <span className="text-2xl font-bold text-green-600">{weeklyData.goals.completed}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-slate-600">新規設定目標</span>
                  <span className="text-2xl font-bold text-purple-600">{weeklyData.goals.newGoals}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="text-slate-600">平均進捗率</span>
                  <span className="text-2xl font-bold text-yellow-600">{weeklyData.goals.progress}%</span>
                </div>
                
                {/* アクションプラン進捗 */}
                <div className="border-t border-slate-200 pt-4 mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-slate-700">📋 アクションプラン進捗</h4>
                    <button
                      onClick={() => setShowActionDetails(!showActionDetails)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {showActionDetails ? '簡易表示' : '詳細管理'}
                    </button>
                  </div>
                  
                  {!showActionDetails ? (
                    // 簡易表示
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-xl font-bold text-emerald-600">{weeklyData.actionPlans.completed}</div>
                          <div className="text-sm text-slate-600">完了</div>
                        </div>
                        <div className="text-center p-3 bg-amber-50 rounded-lg">
                          <div className="text-xl font-bold text-amber-600">{weeklyData.actionPlans.inProgress}</div>
                          <div className="text-sm text-slate-600">進行中</div>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xl font-bold text-slate-600">{weeklyData.actionPlans.total}</div>
                          <div className="text-sm text-slate-600">総数</div>
                        </div>
                      </div>
                      {weeklyData.actionPlans.total > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-slate-600 mb-1">
                            <span>アクションプラン完了率</span>
                            <span>{weeklyData.actionPlans.completionRate}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${weeklyData.actionPlans.completionRate}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    // 詳細管理表示
                    <div className="space-y-4">
                      {getActiveActionPlans().map(({ goal, actionPlans }) => (
                        <div key={goal.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-slate-800">{goal.title}</h5>
                            <span className="text-sm text-slate-600">
                              {actionPlans.filter(a => a.progress === 100).length}/{actionPlans.length} 完了
                            </span>
                          </div>
                          
                          <div className="space-y-3">
                            {actionPlans.map((action, idx) => (
                              <div key={action.id} className="bg-white rounded-lg border border-slate-200 p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-start space-x-3 flex-1">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${action.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}>
                                      {action.progress === 100 ? '✓' : idx + 1}
                                    </div>
                                    <div className="flex-1">
                                      <p className={`text-sm leading-relaxed ${action.progress === 100 ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                                        {action.title}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                      action.progress === 100 ? 'bg-green-100 text-green-700' :
                                      action.progress > 0 ? 'bg-blue-100 text-blue-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {getProgressLabel(action.progress)}
                                    </span>
                                    <button
                                      onClick={() => startEditProgress(action.id, action.progress)}
                                      className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline transition-colors"
                                    >
                                      編集
                                    </button>
                                  </div>
                                </div>
                                
                                {/* 進捗バー */}
                                <div className="mb-2">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-slate-600">進捗率</span>
                                    <span className="text-xs font-bold text-slate-800">{action.progress}%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(action.progress)}`}
                                      style={{ width: `${action.progress}%` }}
                                    ></div>
                                  </div>
                                </div>

                                {/* 進捗編集フォーム */}
                                {editingActionId === action.id && (
                                  <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <label className="text-sm font-medium text-blue-800">進捗率を更新</label>
                                      <div className="text-sm text-blue-600 font-medium">{tempProgress}%</div>
                                    </div>
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      step="1"
                                      value={tempProgress}
                                      onChange={(e) => setTempProgress(parseInt(e.target.value))}
                                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider mb-3"
                                    />
                                    <div className="flex items-center justify-end space-x-2">
                                      <button
                                        onClick={cancelEditProgress}
                                        className="text-sm text-slate-600 hover:text-slate-800 hover:underline transition-colors"
                                      >
                                        キャンセル
                                      </button>
                                      <button
                                        onClick={() => saveProgress(goal.id)}
                                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                      >
                                        保存
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {getActiveActionPlans().length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                          進行中のアクションプランがありません
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KPT振り返りサマリー */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">KPT振り返りサマリー</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">振り返りセッション</span>
                  <span className="text-2xl font-bold text-slate-600">{weeklyData.kpt.sessions}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-slate-600">Keep項目</span>
                  <span className="text-2xl font-bold text-green-600">{weeklyData.kpt.keepItems}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-slate-600">Problem項目</span>
                  <span className="text-2xl font-bold text-red-600">{weeklyData.kpt.problemItems}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-slate-600">Try項目</span>
                  <span className="text-2xl font-bold text-blue-600">{weeklyData.kpt.tryItems}</span>
                </div>
              </div>
            </div>

            {/* 週次インサイト */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">週次インサイト</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {weeklyData.insights.productivityScore}/10
                  </div>
                  <div className="text-slate-600 font-medium">生産性スコア</div>
                  <div className="mt-2 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${weeklyData.insights.productivityScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {weeklyData.insights.consistencyScore}/10
                  </div>
                  <div className="text-slate-600 font-medium">継続性スコア</div>
                  <div className="mt-2 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${weeklyData.insights.consistencyScore * 10}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {weeklyData.insights.challengeLevel}/10
                  </div>
                  <div className="text-slate-600 font-medium">挑戦レベル</div>
                  <div className="mt-2 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${weeklyData.insights.challengeLevel * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 改善提案（1日1KPT想定） */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">📈 今週の改善提案</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {/* 継続性スコアに基づく提案 */}
                  {weeklyData.kpt.sessions < 3 && (
                    <li>• 1日1KPTの習慣化を目指しましょう。まずは週3回から始めて徐々に増やしていきましょう</li>
                  )}
                  {weeklyData.kpt.sessions >= 3 && weeklyData.kpt.sessions < 5 && (
                    <li>• 順調にKPTの習慣が身についています。週5回を目標に継続しましょう</li>
                  )}
                  {weeklyData.kpt.sessions >= 5 && weeklyData.kpt.sessions < 7 && (
                    <li>• 素晴らしい継続力です！毎日のKPTを目指してあと少し頑張りましょう</li>
                  )}
                  {weeklyData.kpt.sessions >= 7 && (
                    <li>• 完璧な1日1KPTの習慣化が達成されています！この調子を維持しましょう</li>
                  )}

                  {/* 項目バランスに基づく提案 */}
                  {weeklyData.kpt.sessions > 0 && (weeklyData.kpt.keepItems + weeklyData.kpt.problemItems + weeklyData.kpt.tryItems) / weeklyData.kpt.sessions < 2 && (
                    <li>• 1回のKPTで2-3項目を記録することを意識してみましょう</li>
                  )}
                  
                  {weeklyData.kpt.problemItems === 0 && weeklyData.kpt.sessions > 0 && (
                    <li>• 改善点も積極的に見つけてProblem項目を記録しましょう。小さな課題も成長のチャンスです</li>
                  )}
                  
                  {weeklyData.kpt.tryItems === 0 && weeklyData.kpt.sessions > 0 && (
                    <li>• 新しい取り組みや改善策をTry項目として記録し、実行してみましょう</li>
                  )}
                  
                  {weeklyData.kpt.problemItems > 0 && weeklyData.kpt.tryItems === 0 && (
                    <li>• 発見したProblemに対する具体的な改善策をTry項目として設定しましょう</li>
                  )}
                  
                  {weeklyData.kpt.problemItems > weeklyData.kpt.tryItems * 2 && weeklyData.kpt.tryItems > 0 && (
                    <li>• Problem項目が多めです。優先度の高い問題から対策を立ててTry項目を増やしましょう</li>
                  )}

                  {/* 生産性スコアに基づく提案 */}
                  {weeklyData.insights.productivityScore < 4 && (
                    <li>• 目標とKPTの連携を強化しましょう。Keep項目を目標達成に活用できないか検討してみましょう</li>
                  )}
                  
                  {weeklyData.actionPlans.total > 0 && weeklyData.actionPlans.completionRate < 30 && (
                    <li>• アクションプランの進捗が停滞しています。KPTでの振り返りを活用して障害を特定しましょう</li>
                  )}

                  {/* バランスの良い状態への称賛 */}
                  {weeklyData.kpt.sessions >= 5 && weeklyData.kpt.problemItems > 0 && weeklyData.kpt.tryItems > 0 && Math.abs(weeklyData.kpt.problemItems - weeklyData.kpt.tryItems) <= 2 && (
                    <li>• 素晴らしいバランスでKPTを実践されています！継続して質の高い振り返りを心がけましょう</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-500 text-lg">
              選択された週のデータがありません
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyReportPage; 