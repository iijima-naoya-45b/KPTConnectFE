'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const initialForm = {
  title: '',
  description: '',
  deadline: '',
  progress: 0,
  role: '',
  experience: '',
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
  const [savedGoal, setSavedGoal] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      // 最終ステップなので、AI提案を実行する
      handleAiSuggest();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAiSuggest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/goals/ai_suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiAnswers),
      });
      const data = await res.json();
      console.log('[AIサジェスト直後] /api/v1/goals/ai_suggest data:', data);
      // AI生成内容をai_goal_insightsテーブルに保存
      const aiGoalInsightPayload = { ...aiAnswers };
      delete aiGoalInsightPayload.deadline;
      const saveRes = await fetch('/api/v1/ai_goal_insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ai_goal_insight: {
            ...aiGoalInsightPayload,
            title: data.title,
            description: data.description,
            milestone: data.milestone || '',
            action_plan: Array.isArray(data.action_plan) ? data.action_plan : (data.action_plan ? [data.action_plan] : []),
            progress_check: data.progress_check || ''
          }
        }),
      });
      const saved = await saveRes.json();
      console.log('[インサイト保存直後] /api/v1/ai_goal_insights saved:', saved);

      // action_planが文字列の場合、JSONとしてパースする
      if (saved && typeof saved.action_plan === 'string') {
        try {
          saved.action_plan = JSON.parse(saved.action_plan);
        } catch (e) {
          console.error("保存後のaction_planのパースに失敗", e);
          // パースに失敗しても、エラーにしない
        }
      }

      setSavedGoal(saved);
      toast('AI目標インサイトが生成されました！', { description: '新しいAIインサイトが追加されました。' });
      setShowModal(false);
    } catch (e) {
      toast.error('AI目標生成に失敗しました', { description: String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
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
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">期日</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">進捗（%）</label>
              <input type="number" name="progress" value={form.progress} onChange={handleChange} min={0} max={100} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">職種</label>
              <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">選択してください</option>
                <option value="frontend">フロントエンド</option>
                <option value="backend">バックエンド</option>
                <option value="pm">PM</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">経験年数</label>
              <input type="number" name="experience" value={form.experience} onChange={handleChange} min={0} max={50} className="w-full border rounded px-3 py-2" placeholder="例: 2" />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" className="flex-1 bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">目標を保存（ダミー）</button>
            <button type="button" className="flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600" onClick={handleAIClick}>AIに提案してもらう</button>
          </div>
        </form>
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
        {savedGoal && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900">{savedGoal.title}</h3>
              </div>
              <div className="text-gray-700 text-sm mb-2">{savedGoal.description}</div>
              {savedGoal.milestone && (
                <div className="text-xs text-purple-700 mb-1">マイルストーン: {savedGoal.milestone}</div>
              )}
              {savedGoal.deadline && (
                <div className="text-xs text-gray-500 mb-1">期日: {savedGoal.deadline}</div>
              )}
              {savedGoal.progress_check && (
                <div className="text-xs text-blue-700 mb-1">進捗管理方法: {savedGoal.progress_check}</div>
              )}
              {Array.isArray(savedGoal.action_plan) && savedGoal.action_plan.length > 0 && (
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-6">
                  <div className="font-bold text-blue-700 mb-4 text-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    アクションプラン
                  </div>
                  <div className="space-y-3">
                    {savedGoal.action_plan.map((item: string, idx: number) => (
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
                    <strong>合計 {savedGoal.action_plan.length} ステップ</strong>のアクションプランが設定されました
                  </div>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link href="/dashboard/goals" className="inline-block px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  goals一覧に戻る
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalNewPage;
