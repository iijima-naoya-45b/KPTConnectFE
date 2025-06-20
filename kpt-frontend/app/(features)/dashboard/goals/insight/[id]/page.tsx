"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface PageProps {
  params: { id: string };
}

const AiGoalInsightDetail: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [insight, setInsight] = useState<AiGoalInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/ai_goal_insights/${id}`);
        if (!res.ok) throw new Error('AI目標インサイトの取得に失敗しました');
        const data = await res.json();

        // action_planが文字列の場合、JSONとしてパースする
        if (data && typeof data.action_plan === 'string') {
          try {
            data.action_plan = JSON.parse(data.action_plan);
          } catch (e) {
            console.error("action_planのJSONパースに失敗:", e);
            data.action_plan = []; // パース失敗時は空配列にする
          }
        }

        setInsight(data);
      } catch (e: any) {
        setError(e.message || 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInsight();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!insight) return;

    const originalStatus = insight.status;
    setInsight({ ...insight, status: newStatus });

    try {
      const res = await fetch(`/api/v1/ai_goal_insights/${insight.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai_goal_insight: { status: newStatus } }),
      });

      if (!res.ok) throw new Error('ステータス更新に失敗');

      const updatedInsight = await res.json();

      // action_planのパース処理を再適用
      if (updatedInsight && typeof updatedInsight.action_plan === 'string') {
        try {
          updatedInsight.action_plan = JSON.parse(updatedInsight.action_plan);
        } catch (e) {
          updatedInsight.action_plan = [];
        }
      }

      setInsight(updatedInsight);
      toast.success('ステータスを更新しました');
    } catch (e) {
      if (insight) {
        setInsight({ ...insight, status: originalStatus });
      }
      toast.error('ステータス更新に失敗しました');
    }
  };

  const handleProgressChange = async (newProgress: number) => {
    if (!insight) return;

    const originalProgress = insight.progress;
    setInsight({ ...insight, progress: newProgress });

    try {
      const res = await fetch(`/api/v1/ai_goal_insights/${insight.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai_goal_insight: { progress: newProgress } }),
      });

      if (!res.ok) throw new Error('進捗更新に失敗');

      // サーバーからのレスポンスで最終的な状態を更新
      const updatedInsight = await res.json();
       if (updatedInsight && typeof updatedInsight.action_plan === 'string') {
        try {
          updatedInsight.action_plan = JSON.parse(updatedInsight.action_plan);
        } catch (e) {
          updatedInsight.action_plan = [];
        }
      }
      setInsight(updatedInsight);

    } catch (e) {
      if (insight) {
        setInsight({ ...insight, progress: originalProgress });
      }
      toast.error('進捗更新に失敗しました');
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

  if (loading) return <div className="p-8">読み込み中...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!insight) return <div className="p-8">データがありません</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{insight.title}</h1>
          <select
            value={insight.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`cursor-pointer border-transparent rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 py-1 pl-4 pr-8 ${getStatusColor(insight.status)}`}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-gray-700 text-base mb-4 whitespace-pre-line">{insight.description}</div>
        
        {/* Progress Bar and Slider */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">進捗率</label>
            <span className="text-lg font-bold text-indigo-600">{insight.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${insight.progress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={insight.progress}
            onChange={(e) => handleProgressChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {insight.milestone && (
          <div className="mb-4 p-3 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
            <div className="font-bold text-purple-700 mb-1">マイルストーン</div>
            <div className="text-purple-800">{insight.milestone}</div>
          </div>
        )}
        
        {Array.isArray(insight.action_plan) && insight.action_plan.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6">
            <div className="font-bold text-blue-700 mb-4 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              アクションプラン
            </div>
            <div className="space-y-3">
              {insight.action_plan.map((item: string, idx: number) => (
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
              <strong>合計 {insight.action_plan.length} ステップ</strong>のアクションプランが設定されています
            </div>
          </div>
        )}
        
        {insight.progress_check && (
          <div className="mt-6 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <div className="font-bold text-green-700 mb-1">進捗管理方法</div>
            <div className="text-green-800 text-sm">{insight.progress_check}</div>
          </div>
        )}
        
        <div className="mt-8 flex gap-4">
          <button 
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition" 
            onClick={() => router.back()}
          >
            一覧に戻る
          </button>
          <button 
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => router.push('/dashboard/goals')}
          >
            目標一覧へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiGoalInsightDetail; 