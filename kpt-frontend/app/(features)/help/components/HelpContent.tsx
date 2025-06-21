'use client';

import React, { useState } from 'react';
import { HelpSection } from './HelpSection';

const tabContents = [
  {
    label: 'KPTの基本',
    content: (
      <HelpSection
        title="KPTの基本"
        description="KPT（Keep, Problem, Try）の基本的な使い方について説明します。"
      >
        <div className="space-y-6">
          {/* Keep */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h3 className="text-lg font-semibold text-green-800">Keep（継続すること）</h3>
            </div>
            <p className="text-green-700 leading-relaxed">
              うまくいっていること、続けたいことを記録します。成功した取り組みや効果的な方法を継続することで、安定した成果を維持できます。
            </p>
            <div className="mt-3 text-sm text-green-600">
              <strong>例：</strong>「毎日の振り返りを習慣化できている」「コードレビューで良いフィードバックをもらえた」
            </div>
          </div>
          
          {/* Problem */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h3 className="text-lg font-semibold text-red-800">Problem（問題点）</h3>
            </div>
            <p className="text-red-700 leading-relaxed">
              改善が必要な点、課題を記録します。問題を明確に認識することで、効果的な改善策を考えることができます。
            </p>
            <div className="mt-3 text-sm text-red-600">
              <strong>例：</strong>「テストコードの作成に時間がかかりすぎる」「ドキュメントの更新が後回しになっている」
            </div>
          </div>
          
          {/* Try */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800">Try（試してみること）</h3>
            </div>
            <p className="text-blue-700 leading-relaxed">
              次回試してみたい改善策を記録します。具体的なアクションプランを立てることで、継続的な改善を実現できます。
            </p>
            <div className="mt-3 text-sm text-blue-600">
              <strong>例：</strong>「テスト駆動開発を導入してみる」「週1回ドキュメント更新の時間を設ける」
            </div>
          </div>
          
          {/* 使い方のコツ */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">💡 KPTを使うコツ</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                定期的に（週1回や2週間に1回）振り返りの時間を設ける
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                具体的で実行可能な内容を記録する
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                前回のTryが実際に実行されたかを確認する
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                感情的な評価ではなく、事実に基づいて記録する
              </li>
            </ul>
          </div>
        </div>
      </HelpSection>
    ),
  },
  {
    label: 'よくある質問',
    content: (
      <HelpSection
        title="よくある質問"
        description="ユーザーからよく寄せられる質問と回答です。"
      >
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: KPTの記録は誰でも見られますか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: デフォルトではプライベートに設定されています。必要に応じて共有設定を変更できます。チーム開発の場合は、プロジェクトメンバーとの共有も可能です。
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: 過去のKPT記録は編集できますか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: はい、過去の記録も編集可能です。ただし、編集履歴は保持されます。振り返りの内容をより正確に記録するために、いつでも更新できます。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: KPTの振り返りはどのくらいの頻度で行うべきですか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: 個人の開発スタイルに応じて調整してください。一般的には週1回、またはプロジェクトのマイルストーンごとに行うことをお勧めします。継続的な改善のためには、定期的な振り返りが効果的です。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: GitHubとの連携は必須ですか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: いいえ、必須ではありません。KPT Connectは単体でも使用できます。GitHub連携は、IssueやPull RequestとKPTを紐付けて管理したい場合のオプション機能です。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: 複数のプロジェクトを管理できますか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: はい、複数のプロジェクトを同時に管理できます。各プロジェクトごとにKPTの振り返りを作成し、プロジェクト別に進捗や課題を追跡できます。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: データのエクスポートは可能ですか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: はい、KPTの記録をCSVやJSON形式でエクスポートできます。バックアップや他のツールとの連携にご利用いただけます。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: 無料プランと有料プランの違いは何ですか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: 無料プランでは基本的なKPT機能とGitHub連携が利用できます。有料プランでは、高度な分析機能、チーム管理、優先サポートなどの追加機能をご利用いただけます。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: アカウントを削除した場合、データはどうなりますか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: アカウント削除後、データは30日間保持されます。この期間内であれば、アカウントの復旧とデータの復元が可能です。30日経過後は、データが完全に削除され復旧できなくなります。削除前に必ずデータのエクスポートをお勧めします。
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Q: モバイルアプリはありますか？</h3>
            <p className="text-gray-700 leading-relaxed">
              A: 現在はWebアプリケーションのみの提供となっています。スマートフォンやタブレットからもブラウザでアクセスしてご利用いただけます。モバイルアプリの開発も検討中です。
            </p>
          </div>
        </div>
      </HelpSection>
    ),
  },
  {
    label: 'お問い合わせ',
    content: (
      <HelpSection
        title="お問い合わせ"
        description="問題が解決しない場合は、お気軽にお問い合わせください。"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                サポートが必要ですか？
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  お問い合わせフォームからご連絡ください。24時間以内に回答いたします。
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  お問い合わせフォームへ
                </a>
              </div>
            </div>
          </div>
        </div>
      </HelpSection>
    ),
  },
];

export const HelpContent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="space-y-6">
      {/* タブUI */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          {tabContents.map((tab, idx) => (
            <button
              key={tab.label}
              className={`px-4 py-2 rounded border-b-2 transition font-semibold ${selectedTab === idx ? 'border-indigo-600 text-indigo-700 bg-white shadow' : 'border-transparent text-gray-500 bg-gray-100 hover:bg-white'}`}
              onClick={() => setSelectedTab(idx)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* タブの内容 */}
      {tabContents[selectedTab].content}
    </div>
  );
}; 