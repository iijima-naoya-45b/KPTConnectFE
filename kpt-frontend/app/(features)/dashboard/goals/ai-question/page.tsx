'use client';

import React, { useState } from 'react';

const initialQA = {
  role: '',
  experience: '',
  wantToLearn: '',
  wantToAchieve: '',
  deadline: '',
};

const dummyAIGoal = {
  title: 'バックエンドAPI設計力を強化',
  description: '2ヶ月以内にNode.jsとTypeScriptでREST APIを設計・実装できるようになる',
  deadline: '2024-09-01',
};

const AIQuestionPage: React.FC = () => {
  const [qa, setQA] = useState(initialQA);
  const [aiProposal, setAiProposal] = useState<null | typeof dummyAIGoal>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQA({ ...qa, [e.target.name]: e.target.value });
  };

  const handleAIClick = () => {
    setAiProposal(dummyAIGoal);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AIによる目標自動提案</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">職種</label>
            <select name="role" value={qa.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">選択してください</option>
              <option value="frontend">フロントエンド</option>
              <option value="backend">バックエンド</option>
              <option value="pm">PM</option>
              <option value="other">その他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">経験年数</label>
            <input type="number" name="experience" value={qa.experience} onChange={handleChange} min={0} max={50} className="w-full border rounded px-3 py-2" placeholder="例: 2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">学びたいこと</label>
            <input type="text" name="wantToLearn" value={qa.wantToLearn} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="例: API設計、React、インフラ基礎" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">達成したいこと</label>
            <input type="text" name="wantToAchieve" value={qa.wantToAchieve} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="例: サービス公開、資格取得" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">希望期日</label>
            <input type="date" name="deadline" value={qa.deadline} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="button" className="flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600" onClick={handleAIClick}>AIに目標を提案してもらう</button>
          </div>
        </form>
        {aiProposal && (
          <div className="mt-8 bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
            <div className="font-bold text-green-700 mb-2">AI提案目標例</div>
            <div className="text-gray-900 font-semibold mb-1">{aiProposal.title}</div>
            <div className="text-gray-700 text-sm mb-1">{aiProposal.description}</div>
            <div className="text-xs text-gray-500">期日: {aiProposal.deadline}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIQuestionPage;
