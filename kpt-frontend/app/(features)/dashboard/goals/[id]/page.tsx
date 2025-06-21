"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiCall } from '@/lib/api';

// 統一されたGoalインターフェース
interface Goal {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  action_plan: string[];
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

  const fetchGoal = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall(`/api/v1/goals/${id}`);
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
      const updatedData = await apiCall(`/api/v1/goals/${goal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: { status: newStatus, progress: newProgress } }),
      });
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
      const updatedData = await apiCall(`/api/v1/goals/${goal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: { progress: newProgress, status: newStatus } }),
      });
      setGoal(updatedData);
    } catch (e) {
      setGoal(originalGoal);
      toast.error('進捗更新に失敗しました');
    }
  }, [goal]);

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
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${goal.progress}%` }}
            ></div>
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
            <div className="font-bold text-blue-700 mb-4 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              アクションプラン
            </div>
            <div className="space-y-3">
              {goal.action_plan.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-blue-600 bg-blue-100 px-3 py-2 rounded-lg">
              <strong>合計 {goal.action_plan.length} ステップ</strong>のアクションプランが設定されています
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