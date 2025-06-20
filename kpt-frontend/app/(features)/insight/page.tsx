'use client'

import  { useState } from 'react';

const sampleSummary = {
  period: '2024年6月10日〜2024年6月16日',
  issuesClosed: 8,
  prsMerged: 5,
  kpt: {
    keep: ['毎日レビューを継続できた', 'コードのリファクタを実施', 'チームでの情報共有が活発だった'],
    problem: ['レビュー対応が遅れた', 'Issueの優先度付けが曖昧だった'],
    try: ['レビュー依頼のルールを明確化', '朝会でIssueの優先度を確認する'],
  },
};

const InsightPage: React.FC = () => {
  const [periodType, setPeriodType] = useState<'weekly' | 'monthly'>('weekly');
  const [isLimit, setIsLimit] = useState(false); // サンプル: 生成回数制限

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">活動サマリー＆KPTレポート</h1>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${periodType === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setPeriodType('weekly')}
            >
              週次
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${periodType === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setPeriodType('monthly')}
            >
              月次
            </button>
          </div>
        </div>
        <div className="mb-4 text-gray-600">対象期間: {sampleSummary.period}</div>
        {/* グラフエリア（サンプル） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 rounded-lg p-4 shadow flex flex-col items-center">
            <div className="font-semibold mb-2">Issue/PR件数推移</div>
            <div className="w-full h-40 flex items-center justify-center text-gray-400">[折れ線グラフ]</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow flex flex-col items-center">
            <div className="font-semibold mb-2">ラベル別Issue割合</div>
            <div className="w-full h-40 flex items-center justify-center text-gray-400">[円グラフ]</div>
          </div>
        </div>
        {/* KPTサマリー */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">KPTサマリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 shadow">
              <div className="font-bold text-green-700 mb-2">Keep</div>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {sampleSummary.kpt.keep.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 shadow">
              <div className="font-bold text-red-700 mb-2">Problem</div>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {sampleSummary.kpt.problem.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Try</div>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {sampleSummary.kpt.try.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
        {/* PDFエクスポート＆LIMIT制御 */}
        <div className="flex items-center justify-between mt-8">
          <button
            className={`px-6 py-2 rounded-md font-semibold text-white ${isLimit ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={isLimit}
            onClick={() => setIsLimit(true)}
          >
            PDFエクスポート
          </button>
          {isLimit && (
            <div className="text-red-500 text-sm ml-4">本日はすでにレポートを生成済みです</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightPage;
