'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActionPlanChange = (index: number, value: string) => {
    const newActionPlan = [...form.action_plan];
    newActionPlan[index] = value;
    setForm({ ...form, action_plan: newActionPlan });
  };

  const addActionPlan = () => {
    setForm({ ...form, action_plan: [...form.action_plan, ''] });
  };

  const removeActionPlan = (index: number) => {
    if (form.action_plan.length > 1) {
      const newActionPlan = form.action_plan.filter((_, i) => i !== index);
      setForm({ ...form, action_plan: newActionPlan });
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
      
      toast.success('AIが目標を提案しました！', { description: '内容を確認・編集して保存してください。' });
      setShowModal(false);
    } catch (e: any) {
      toast.error('AI目標生成に失敗しました', { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // バリデーション
    if (!form.title.trim() || !form.description.trim() || !form.deadline) {
      toast.error('タイトル、内容、期日は必須です。');
      return;
    }

    setLoading(true);
    try {
      const filteredActionPlan = form.action_plan.filter(action => action.trim() !== '');
      
      const response = await fetch(`${BACKEND_URL}/api/v1/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: { ...form, action_plan: filteredActionPlan }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '保存サーバーとの通信に失敗しました。' }));
        throw new Error(errorData.message || `エラーが発生しました: ${response.statusText}`);
      }

      toast.success('目標が保存されました！');
      setForm(initialForm);
      window.location.href = '/dashboard/goals';
    } catch (e: any) {
      toast.error('目標の保存に失敗しました', { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* メインカード */}
        <div className="bg-white rounded-xl shadow p-8 mb-6">
          <div className="mb-6">
            <Link href="/dashboard/goals" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              goals一覧に戻る
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">目標を新規設定</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="例: Reactの基礎をマスターする" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} placeholder="目標の詳細や達成基準など" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">期日</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            
            {/* アクションプラン */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">アクションプラン</label>
                <button
                  type="button"
                  onClick={addActionPlan}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  + 追加
                </button>
              </div>
              <div className="space-y-2">
                {form.action_plan.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
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
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                type="button" 
                className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? '保存中...' : '目標を保存'}
              </button>
            </div>
          </form>
        </div>

        {/* AI提案ボタン - カードの外側 */}
        <div className="text-center">
          <button 
            type="button" 
            className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg"
            onClick={handleAIClick}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>AIに提案してもらう</span>
            </div>
          </button>
          <p className="text-sm text-gray-600 mt-2">AIがあなたの目標に最適なアクションプランを提案します</p>
        </div>

        {/* AIモーダル */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowModal(false)}>&times;</button>
              <h2 className="text-lg font-bold text-gray-900 mb-4">AI目標提案のための質問 {step + 1}/{aiQuestions.length}</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{aiQuestions[step].label}</label>
                {aiQuestions[step].type === 'select' ? (
                  <select name={aiQuestions[step].name} value={aiAnswers[aiQuestions[step].name] || ''} onChange={handleAiAnswer} className="w-full border rounded px-3 py-2">
                    <option value="">選択してください</option>
                    {aiQuestions[step].options?.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={aiQuestions[step].type}
                    name={aiQuestions[step].name}
                    value={aiAnswers[aiQuestions[step].name] || ''}
                    onChange={handleAiAnswer}
                    className="w-full border rounded px-3 py-2"
                    placeholder={aiQuestions[step].placeholder || ''}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold" onClick={handlePrev} disabled={step === 0}>戻る</button>
                {step < aiQuestions.length - 1 ? (
                  <button type="button" className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold" onClick={handleNext}>次へ</button>
                ) : (
                  <button type="button" className="px-4 py-2 rounded bg-green-600 text-white font-semibold" onClick={handleAiSuggest} disabled={loading}>
                    {loading ? '生成中...' : 'AI提案を生成'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalNewPage;
