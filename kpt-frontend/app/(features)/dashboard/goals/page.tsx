'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface AiGoalInsight {
  id: number;
  title: string;
  description: string;
  milestone?: string;
  action_plan: string[];
  progress_check?: string;
  status: string;
  progress: number;
  created_at?: string;
  updated_at?: string;
}

const statusOptions = [
  { value: 'not_started', label: '着手前' },
  { value: 'in_progress', label: '着手中' },
  { value: 'completed', label: '完了' },
  { value: 'paused', label: '保留' },
];

const GoalsPage: React.FC = () => {
  const [insights, setInsights] = useState<AiGoalInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/ai_goal_insights');
      if (!res.ok) throw new Error('AI目標インサイトの取得に失敗しました');
      let data = await res.json();

      // action_planが文字列の場合、JSONとしてパースする
      if (Array.isArray(data)) {
        data = data.map(insight => {
          if (typeof insight.action_plan === 'string') {
            try {
              insight.action_plan = JSON.parse(insight.action_plan);
            } catch (e) {
              console.error(`action_planのJSONパースに失敗 (ID: ${insight.id}):`, e);
              insight.action_plan = [];
            }
          }
          return insight;
        });
      }
      
      setInsights(data);
    } catch (e: any) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    // Optimistic update
    const originalInsights = [...insights];
    const updatedInsights = insights.map(insight =>
      insight.id === id ? { ...insight, status: newStatus } : insight
    );
    setInsights(updatedInsights);

    try {
      const res = await fetch(`/api/v1/ai_goal_insights/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ai_goal_insight: { status: newStatus } }),
      });

      if (!res.ok) {
        throw new Error('ステータスの更新に失敗しました');
      }
      
      const updatedInsight = await res.json();
      
      // Final update with server response
      setInsights(prev => prev.map(i => i.id === id ? updatedInsight : i));
      toast.success('ステータスを更新しました');

    } catch (e: any) {
      // Revert on failure
      setInsights(originalInsights);
      toast.error('ステータスの更新に失敗しました', { description: e.message });
    }
  };

  const handleProgressChange = async (id: number, newProgress: number) => {
    // Optimistic update
    const originalInsights = [...insights];
    const updatedInsights = insights.map(insight =>
      insight.id === id ? { ...insight, progress: newProgress } : insight
    );
    setInsights(updatedInsights);

    try {
      const res = await fetch(`/api/v1/ai_goal_insights/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai_goal_insight: { progress: newProgress } }),
      });
      if (!res.ok) throw new Error('進捗の更新に失敗しました');
      
      const updatedInsight = await res.json();
      setInsights(prev => prev.map(i => i.id === id ? { ...i, ...updatedInsight } : i));
      
    } catch (e: any) {
      setInsights(originalInsights);
      toast.error('進捗の更新に失敗しました', { description: e.message });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('このAI目標インサイトを削除しますか？')) return;
    
    try {
      const res = await fetch(`/api/v1/ai_goal_insights/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('削除に失敗しました');
      
      toast.success('AI目標インサイトを削除しました');
      fetchInsights(); // 一覧を再取得
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

  const filteredInsights = insights.filter(insight => {
    if (filter === 'active') return ['not_started', 'in_progress', 'paused'].includes(insight.status);
    if (filter === 'completed') return insight.status === 'completed';
    return true;
  });

  const activeCount = insights.filter(i => ['not_started', 'in_progress', 'paused'].includes(i.status)).length;
  const completedCount = insights.filter(i => i.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI目標インサイト一覧</h1>
          <Link href="/dashboard/goals/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            新規作成
          </Link>
        </div>

        {/* フィルター */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            全て ({insights.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'active' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            未完了 ({activeCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'completed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            完了 ({completedCount})
          </button>
        </div>

        {loading && <div className="text-center py-8">読み込み中...</div>}
        {error && <div className="text-red-600 bg-red-50 p-4 rounded-lg mb-6">{error}</div>}
        
        {!loading && !error && filteredInsights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' ? 'AI目標インサイトがありません' : 
             filter === 'active' ? '未完了のAI目標インサイトがありません' : 
             '完了したAI目標インサイトがありません'}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                <div className="flex items-center gap-2">
                  <select
                    value={insight.status}
                    onChange={(e) => handleStatusChange(insight.id, e.target.value)}
                    className={`cursor-pointer border-transparent rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 py-1 pl-3 pr-7 ${getStatusColor(insight.status)}`}
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(insight.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="削除"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-gray-700 text-sm mb-2">{insight.description}</div>
              {insight.milestone && (
                <div className="text-xs text-purple-700 mb-1">マイルストーン: {insight.milestone}</div>
              )}

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-gray-600">進捗率</label>
                  <span className="text-sm font-bold text-indigo-600">{insight.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${insight.progress}%` }}></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={insight.progress}
                  onChange={(e) => handleProgressChange(insight.id, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-transparent cursor-pointer mt-2"
                />
              </div>

              {Array.isArray(insight.action_plan) && insight.action_plan.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center text-xs text-blue-700 mb-2">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    アクションプラン ({insight.action_plan.length}ステップ)
                  </div>
                  <div className="space-y-1">
                    {insight.action_plan.slice(0, 2).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed flex-1">{item}</p>
                      </div>
                    ))}
                    {insight.action_plan.length > 2 && (
                      <div className="text-xs text-blue-600 font-medium">
                        他{insight.action_plan.length - 2}ステップ...
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-2 flex gap-2">
                <Link href={`/dashboard/goals/insight/${insight.id}`} legacyBehavior>
                  <a className="inline-block px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">詳細を見る</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
