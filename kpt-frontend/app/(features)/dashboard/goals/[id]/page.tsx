"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 統一されたGoalインターフェース
interface ActionPlan {
  id: string;
  title: string;
  progress: number;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  action_plan: ActionPlan[] | string[]; // 両方の形式に対応
  progress: number;
  status: string;
  progress_check?: string;
  created_at?: string;
  updated_at?: string;
  created_by_ai: boolean;
}

const statusOptions = [
  { value: 'not_started', label: '着手前' },
  { value: 'in_progress', label: '着手中' },
  { value: 'completed', label: '完了' },
  { value: 'paused', label: '保留' },
];

interface PageProps {
  params: { id: string };
}

const GoalDetailPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [tempProgress, setTempProgress] = useState<number>(0);

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

  const fetchGoal = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/goals/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('目標の読み込みに失敗しました。');
      }
      const data = await response.json();
      // action_planが文字列で返ってくる場合があるのでパースする
      if (data && typeof data.action_plan === 'string') {
        try {
          data.action_plan = JSON.parse(data.action_plan);
        } catch (e) {
          data.action_plan = [];
        }
      }
      setGoal(data);
    } catch (e: any) {
      setError('目標の読み込みに失敗しました。');
      setGoal(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);

  const handleStatusChange = useCallback(async (newStatus: string) => {
    if (!goal) return;

    const originalGoal = { ...goal };
    const newProgress = newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : 0;
    setGoal(prev => (prev ? { ...prev, status: newStatus, progress: newProgress } : null));

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/goals/${goal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ goal: { status: newStatus, progress: newProgress } }),
      });
      if (!response.ok) {
        throw new Error('ステータス更新に失敗しました');
      }
      const updatedData = await response.json();
      setGoal(updatedData);
      toast.success('ステータスを更新しました');
    } catch (e) {
      setGoal(originalGoal);
      toast.error('ステータス更新に失敗しました');
    }
  }, [goal]);

  const handleProgressChange = useCallback(async (newProgress: number) => {
    if (!goal) return;

    const originalGoal = { ...goal };
    const newStatus = newProgress >= 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'not_started';
    setGoal(prev => (prev ? { ...prev, progress: newProgress, status: newStatus } : null));

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/goals/${goal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ goal: { progress: newProgress, status: newStatus } }),
      });
      if (!response.ok) {
        throw new Error('進捗更新に失敗しました');
      }
      const updatedData = await response.json();
      setGoal(updatedData);
    } catch (e) {
      setGoal(originalGoal);
      toast.error('進捗更新に失敗しました');
    }
  }, [goal]);

  // アクションプランの進捗を更新する関数
  const updateActionPlanProgress = async (actionId: string, progress: number) => {
    if (!goal) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/goals/${goal.id}/action_plans/${actionId}`, {
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
      setGoal(prevGoal => {
        if (!prevGoal) return prevGoal;
        
        const normalizedActionPlan = normalizeActionPlan(prevGoal.action_plan);
        const updatedActionPlan = normalizedActionPlan.map(action => 
          action.id === actionId ? { ...action, progress } : action
        );
        
        return {
          ...prevGoal,
          action_plan: updatedActionPlan,
          progress: data.action_plan_progress || prevGoal.progress
        };
      });

      toast.success('アクションプランの進捗を更新しました');
      setEditingActionId(null);
    } catch (error: any) {
      toast.error('進捗の更新に失敗しました', { description: error.message });
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
  const saveProgress = () => {
    if (editingActionId) {
      updateActionPlanProgress(editingActionId, tempProgress);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-slate-200 text-slate-700 hover:bg-slate-300 focus:bg-slate-300';
      case 'in_progress':
        return 'bg-sky-500 text-white hover:bg-sky-600 focus:bg-sky-600';
      case 'completed':
        return 'bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-600';
      case 'paused':
        return 'bg-amber-400 text-white hover:bg-amber-500 focus:bg-amber-500';
      default:
        return 'bg-slate-200 text-slate-700 hover:bg-slate-300 focus:bg-slate-300';
    }
  };

  if (loading) return <div className="p-8 text-center">読み込み中...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!goal) return <div className="p-8 text-center">目標が見つかりませんでした。</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            {goal?.title}
            {goal?.created_by_ai && (
              <span className="ml-2 text-xs bg-cyan-100 text-cyan-700 font-semibold px-2 py-0.5 rounded-full">AI</span>
            )}
          </h1>
          <select
            value={goal.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`cursor-pointer border-transparent rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 py-1 pl-4 pr-8 ${getStatusColor(goal.status)}`}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-gray-700 text-base mb-4 whitespace-pre-line">{goal?.description}</div>
        
        <div className="my-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">進捗率</label>
            <span className="text-lg font-bold text-indigo-600">{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out w-[${goal.progress}%]"></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={goal.progress}
            onChange={(e) => handleProgressChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {goal?.deadline && (
          <div className="mb-4 p-3 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
            <div className="font-bold text-purple-700 mb-1">マイルストーン</div>
            <div className="text-purple-800">{new Date(goal.deadline).toLocaleDateString()}</div>
          </div>
        )}
        
        {Array.isArray(goal.action_plan) && goal.action_plan.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6">
            <div className="font-bold text-blue-700 mb-4 text-lg flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                アクションプラン
              </div>
              <div className="text-sm font-normal text-blue-600">
                {normalizeActionPlan(goal.action_plan).filter(item => item.progress === 100).length} / {normalizeActionPlan(goal.action_plan).length} 完了
              </div>
            </div>
            <div className="space-y-4">
              {normalizeActionPlan(goal.action_plan).map((item, idx) => (
                <div key={item.id} className="bg-white rounded-lg border border-blue-100 shadow-sm p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}>
                        {item.progress === 100 ? '✓' : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-gray-800 text-sm leading-relaxed ${item.progress === 100 ? 'line-through text-gray-500' : ''}`}>
                          {item.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.progress === 100 ? 'bg-green-100 text-green-700' :
                        item.progress > 0 ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getProgressLabel(item.progress)}
                      </span>
                      <button
                        onClick={() => startEditProgress(item.id, item.progress)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline transition-colors"
                      >
                        編集
                      </button>
                    </div>
                  </div>
                  
                  {/* 進捗バー */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600">進捗率</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-800">{item.progress}%</span>
                        {item.progress > 0 && (
                          <span className="text-xs text-gray-500">
                            ({item.progress === 100 ? '完了' : `残り${100 - item.progress}%`})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(item.progress)} relative w-[${item.progress}%]`}
                      >
                        {/* 進捗バー内のテキスト */}
                        {item.progress >= 20 && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {item.progress}%
                          </span>
                        )}
                      </div>
                      {/* グリッドライン */}
                      <div className="absolute inset-0 flex">
                        {[25, 50, 75].map(mark => (
                          <div
                            key={mark}
                            className="border-r border-gray-300 opacity-30 ml-[${mark}%]"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* 進捗の詳細情報 */}
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                      <span>
                        {item.progress === 0 && '未着手'}
                        {item.progress > 0 && item.progress < 25 && '開始段階'}
                        {item.progress >= 25 && item.progress < 50 && '初期段階'}
                        {item.progress >= 50 && item.progress < 75 && '中間段階'}
                        {item.progress >= 75 && item.progress < 100 && '最終段階'}
                        {item.progress === 100 && '完了'}
                      </span>
                      {item.progress > 0 && item.progress < 100 && (
                        <span>進行中</span>
                      )}
                    </div>
                  </div>

                  {/* 進捗編集フォーム */}
                  {editingActionId === item.id && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-blue-800">進捗率を更新</label>
                        <div className="text-sm text-blue-600 font-medium">{tempProgress}%</div>
                      </div>
                      
                      {/* クイック設定ボタン */}
                      <div className="mb-3">
                        <div className="text-xs text-blue-700 mb-2">クイック設定:</div>
                        <div className="flex flex-wrap gap-2">
                          {[5, 25, 50, 75, 100].map(percentage => (
                            <button
                              key={percentage}
                              onClick={() => setTempProgress(percentage)}
                              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                                tempProgress === percentage
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                              }`}
                            >
                              {percentage === 5 ? '着手中 5%' : 
                               percentage === 25 ? '初期 25%' :
                               percentage === 50 ? '半分 50%' :
                               percentage === 75 ? '終盤 75%' :
                               '完了 100%'}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={tempProgress}
                        onChange={(e) => setTempProgress(parseInt(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      
                      <div className="flex items-center justify-end mt-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={cancelEditProgress}
                            className="text-sm text-gray-600 hover:text-gray-800 hover:underline transition-colors"
                          >
                            キャンセル
                          </button>
                          <button
                            onClick={saveProgress}
                            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            保存
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* 全体統計 */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-gray-600 mb-1">完了済み</div>
                <div className="text-lg font-bold text-green-600">
                  {normalizeActionPlan(goal.action_plan).filter(item => item.progress === 100).length}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-gray-600 mb-1">進行中</div>
                <div className="text-lg font-bold text-blue-600">
                  {normalizeActionPlan(goal.action_plan).filter(item => item.progress > 0 && item.progress < 100).length}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xs text-gray-600 mb-1">未着手</div>
                <div className="text-lg font-bold text-gray-600">
                  {normalizeActionPlan(goal.action_plan).filter(item => item.progress === 0).length}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {goal.progress_check && (
          <div className="mt-6 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <div className="font-bold text-green-700 mb-1">進捗管理方法</div>
            <div className="text-green-800 text-sm">{goal.progress_check}</div>
          </div>
        )}
        
        <div className="mt-8 flex gap-4">
          <button 
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition" 
            onClick={() => router.back()}
          >
            一覧に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailPage; 