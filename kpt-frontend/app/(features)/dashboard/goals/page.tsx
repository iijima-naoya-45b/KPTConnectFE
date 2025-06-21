'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { fetcher } from '@/lib/api';

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

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher('/api/v1/goals');
      // action_planが文字列で返ってくる場合があるのでパースする
      const formattedGoals = (data || []).map((goal: Goal) => {
        let actionPlan = goal.action_plan;
        if (typeof actionPlan === 'string') {
          try {
            actionPlan = JSON.parse(actionPlan);
          } catch (e) {
            actionPlan = [];
          }
        }
        return { ...goal, action_plan: actionPlan };
      });
      setGoals(formattedGoals);
    } catch (e: any) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    const originalGoals = [...goals];
    setGoals(prev => prev.map(g => (g.id === id ? { ...g, status: newStatus } : g)));

    try {
      await fetcher(`/api/v1/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: { status: newStatus } }),
      });
      toast.success('ステータスを更新しました');
      // 必要に応じて再フェッチ or レスポンスでstate更新
      fetchGoals();
    } catch (e: any) {
      setGoals(originalGoals);
      toast.error('ステータスの更新に失敗しました', { description: e.message });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('この目標を削除しますか？')) return;
    
    try {
      await fetcher(`/api/v1/goals/${id}`, {
        method: 'DELETE',
      });
      toast.success('目標を削除しました');
      fetchGoals(); // 一覧を再取得
    } catch (e: any) {
      toast.error('削除に失敗しました', { description: e.message });
    }
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

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') {
      return goal.status !== 'completed';
    }
    if (filter === 'completed') {
      return goal.status === 'completed';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">目標一覧</h1>
          <Link href="/dashboard/goals/new" className="w-full sm:w-auto">
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              + 新規目標を設定
            </button>
          </Link>
        </div>

        {/* フィルタ */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-2 flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            全て ({goals.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'active' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            未完了 ({goals.filter(g => g.status !== 'completed').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            完了 ({goals.filter(g => g.status === 'completed').length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">エラー</p>
            <p>{error}</p>
          </div>
        ) : filteredGoals.length > 0 ? (
          <div className="space-y-6">
            {filteredGoals.map((goal) => (
              <Link key={goal.id} href={`/dashboard/goals/${goal.id}`} passHref>
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 border border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      {goal.title}
                      {goal.created_by_ai && (
                        <span className="ml-2 text-xs bg-cyan-100 text-cyan-700 font-semibold px-2 py-0.5 rounded-full">AI</span>
                      )}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <select
                          value={goal.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleStatusChange(goal.id, e.target.value);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          className={`appearance-none rounded px-3 py-1 text-xs font-semibold transition-colors ${getStatusColor(goal.status)}`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <svg className="w-4 h-4 absolute right-1 top-1/2 -translate-y-1/2 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDelete(goal.id);
                        }} 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{goal.description}</p>
                  
                  {goal.deadline && (
                    <div className="text-xs text-gray-500 font-medium">
                      マイルストーン: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  )}

                  <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-600">進捗率</span>
                      <span className="text-xs font-bold text-blue-600">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {Array.isArray(goal.action_plan) && goal.action_plan.length > 0 && (
                    <div className="mt-2 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg p-3">
                      <p className="font-bold text-gray-700 text-sm mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 8h.01M12 16h.01" /></svg>
                        アクションプラン ({goal.action_plan.length} ステップ)
                      </p>
                      <div className="space-y-1 text-sm text-gray-600">
                        {goal.action_plan.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="flex-shrink-0 w-4 h-4 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs mr-2">{idx + 1}</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                        {goal.action_plan.length > 2 && (
                          <p className="text-xs text-gray-500 pt-1">他{goal.action_plan.length - 2}ステップ...</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                    <div
                      className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
                    >
                      編集
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">目標はまだありません</h3>
            <p className="text-gray-500 mt-2">最初の目標を設定しましょう！</p>
            <Link href="/dashboard/goals/new" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              + 新規目標を設定
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
