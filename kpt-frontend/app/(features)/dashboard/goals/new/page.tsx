'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const initialForm = {
  title: '',
  description: '',
  deadline: '',
  action_plan: [''],
  progress: 0,
  status: 'not_started',
  progress_check: '',
  created_by_ai: false,
};

const aiQuestions = [
  { name: 'role', label: '職種', type: 'select', options: ['フロントエンド', 'バックエンド', 'PM', 'インフラ', 'データサイエンティスト', 'その他'] },
  { name: 'experience', label: '経験年数', type: 'number', placeholder: '例: 2' },
  { name: 'wantToLearn', label: '学びたいこと・技術', type: 'text', placeholder: '例: React, API設計, インフラ基礎' },
  { name: 'wantToAchieve', label: '達成したいこと', type: 'text', placeholder: '例: サービス公開、資格取得' },
  { name: 'deadline', label: '希望期日', type: 'date' },
  { name: 'strength', label: '得意分野', type: 'text', placeholder: '例: UI設計、ロジック実装' },
  { name: 'weakness', label: '苦手分野', type: 'text', placeholder: '例: テスト、インフラ' },
  { name: 'learningStyle', label: '学習スタイル', type: 'select', options: ['独学', '講座受講', 'ペアプログラミング', 'アウトプット重視', 'その他'] },
  { name: 'weeklyTime', label: '週あたりの学習時間（h）', type: 'number', placeholder: '例: 5' },
  { name: 'careerVision', label: '理想のキャリア像', type: 'text', placeholder: '例: フルスタックエンジニアになりたい' },
];

const GoalNewPage: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [showModal, setShowModal] = useState(false);
  const [aiAnswers, setAiAnswers] = useState<any>({});
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionDurations, setActionDurations] = useState<{[key: number]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActionPlanChange = (index: number, value: string) => {
    const newActionPlan = [...form.action_plan];
    newActionPlan[index] = value;
    setForm({ ...form, action_plan: newActionPlan });
  };

  const handleActionDurationChange = (index: number, duration: string) => {
    setActionDurations(prev => ({
      ...prev,
      [index]: duration
    }));
  };

  const addActionPlan = () => {
    setForm({ ...form, action_plan: [...form.action_plan, ''] });
  };

  const removeActionPlan = (index: number) => {
    if (form.action_plan.length > 1) {
      const newActionPlan = form.action_plan.filter((_, i) => i !== index);
      setForm({ ...form, action_plan: newActionPlan });
      
      // Remove duration setting for deleted action
      const newDurations = { ...actionDurations };
      delete newDurations[index];
      // Reindex remaining durations
      const reindexedDurations: {[key: number]: string} = {};
      Object.keys(newDurations).forEach(key => {
        const numKey = parseInt(key);
        if (numKey > index) {
          reindexedDurations[numKey - 1] = newDurations[numKey];
        } else {
          reindexedDurations[numKey] = newDurations[numKey];
        }
      });
      setActionDurations(reindexedDurations);
    }
  };

  const handleAIClick = () => {
    setShowModal(true);
    setStep(0);
    setAiAnswers({});
  };

  const handleAiAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAiAnswers({ ...aiAnswers, [aiQuestions[step].name]: e.target.value });
  };

  const handleNext = () => {
    if (step < aiQuestions.length - 1) {
      setStep(step + 1);
    } else {
      handleAiSuggest();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAiSuggest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/goals/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(aiAnswers),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'AIからの応答を解析できませんでした。' }));
        throw new Error(errorData.message || `エラーが発生しました: ${response.statusText}`);
      }
      
      const suggestion = await response.json();

      setForm({
        ...initialForm, // フォームを初期化しつつ
        title: suggestion.title || '',
        description: suggestion.description || '',
        deadline: suggestion.deadline || aiAnswers.deadline || '',
        action_plan: suggestion.action_plan || [''],
        progress_check: suggestion.progress_check || '',
        created_by_ai: true, // AIフラグを立てる
      });
      
      // AIが生成したアクションプランの期間情報をクリア
      setActionDurations({});
      
      toast.success('AIが目標を提案しました！', { description: '内容を確認・編集して保存してください。' });
      setShowModal(false);
    } catch (e: any) {
      toast.error('AI目標生成に失敗しました', { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const formatActionPlanWithDuration = () => {
    return form.action_plan.map((action, index) => {
      const duration = actionDurations[index];
      if (duration && duration !== 'auto') {
        const durationText = duration === '7' ? '1週間' :
                           duration === '14' ? '2週間' :
                           duration === '21' ? '3週間' :
                           duration === '30' ? '1ヶ月' :
                           duration === '60' ? '2ヶ月' : `${duration}日間`;
        return `${action}（${durationText}）`;
      }
      return action;
    });
  };

  const handleSave = async () => {
    // バリデーション
    if (!form.title.trim() || !form.description.trim() || !form.deadline) {
      toast.error('タイトル、内容、期日は必須です。');
      return;
    }

    setLoading(true);
    try {
      const formattedActionPlan = formatActionPlanWithDuration().filter(action => action.trim() !== '');
      
      const response = await fetch(`${BACKEND_URL}/api/v1/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          goal: { ...form, action_plan: formattedActionPlan }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '保存サーバーとの通信に失敗しました。' }));
        throw new Error(errorData.message || `エラーが発生しました: ${response.statusText}`);
      }

      toast.success('目標が保存されました！');
      setForm(initialForm);
      setActionDurations({});
      window.location.href = '/dashboard/goals';
    } catch (e: any) {
      toast.error('目標の保存に失敗しました', { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const getDurationLabel = (duration: string) => {
    switch(duration) {
      case '7': return '1週間';
      case '14': return '2週間';
      case '21': return '3週間';
      case '30': return '1ヶ月';
      case '60': return '2ヶ月';
      default: return '自動計算';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/goals" className="text-blue-600 hover:text-blue-800 mr-3">
            ← goals一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">目標を新規設定</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="例: Reactの基礎をマスターする"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="目標の詳細や達成基準など"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">期日</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">アクションプラン</label>
              <button
                type="button"
                onClick={addActionPlan}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                + 追加
              </button>
            </div>
            <div className="space-y-3">
              {form.action_plan.map((action, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={action}
                      onChange={(e) => handleActionPlanChange(index, e.target.value)}
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      placeholder={`アクション ${index + 1}（例: Reactの基礎を学習する）`}
                    />
                    {form.action_plan.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActionPlan(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 min-w-0">推定期間:</span>
                    <select
                      value={actionDurations[index] || 'auto'}
                      onChange={(e) => handleActionDurationChange(index, e.target.value)}
                      className="flex-1 text-xs border rounded px-2 py-1 bg-white"
                    >
                      <option value="auto">自動計算</option>
                      <option value="7">1週間</option>
                      <option value="14">2週間</option>
                      <option value="21">3週間</option>
                      <option value="30">1ヶ月</option>
                      <option value="60">2ヶ月</option>
                    </select>
                    {actionDurations[index] && actionDurations[index] !== 'auto' && (
                      <span className="text-xs text-blue-600 font-medium">
                        {getDurationLabel(actionDurations[index])}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              💡 期間を設定するとガントチャートでより正確なスケジュールが表示されます
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">進捗管理方法</label>
            <textarea
              name="progress_check"
              value={form.progress_check}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="どのように進捗を確認・管理するか（例: 週次レビュー、成果物チェック）"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleAIClick}
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            🤖 AIに目標を提案してもらう
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? '保存中...' : '目標を保存'}
          </button>
        </div>
      </div>

      {/* AI提案モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🤖 AI目標提案 ({step + 1}/{aiQuestions.length})
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {aiQuestions[step].label}
              </label>
              {aiQuestions[step].type === 'select' ? (
                <select
                  value={aiAnswers[aiQuestions[step].name] || ''}
                  onChange={handleAiAnswer}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {aiQuestions[step].options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={aiQuestions[step].type}
                  value={aiAnswers[aiQuestions[step].name] || ''}
                  onChange={handleAiAnswer}
                  placeholder={aiQuestions[step].placeholder}
                  className="w-full border rounded px-3 py-2"
                />
              )}
            </div>

            <div className="flex space-x-3">
              {step > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                >
                  戻る
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {loading ? '生成中...' : (step === aiQuestions.length - 1 ? '提案生成' : '次へ')}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalNewPage;
