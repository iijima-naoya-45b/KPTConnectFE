'use client';

import React from 'react';
import { HelpSection } from './HelpSection';

export const HelpContent = () => {
  return (
    <div className="space-y-6">
      <HelpSection
        title="KPTの基本"
        description="KPT（Keep, Problem, Try）の基本的な使い方について説明します。"
      >
        <div className="prose prose-sm max-w-none">
          <h3>Keep（継続すること）</h3>
          <p>うまくいっていること、続けたいことを記録します。</p>
          
          <h3>Problem（問題点）</h3>
          <p>改善が必要な点、課題を記録します。</p>
          
          <h3>Try（試してみること）</h3>
          <p>次回試してみたい改善策を記録します。</p>
        </div>
      </HelpSection>

      <HelpSection
        title="よくある質問"
        description="ユーザーからよく寄せられる質問と回答です。"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-gray-900">Q: KPTの記録は誰でも見られますか？</h3>
            <p className="mt-1 text-sm text-gray-600">
              A: デフォルトではプライベートに設定されています。必要に応じて共有設定を変更できます。
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">Q: 過去のKPT記録は編集できますか？</h3>
            <p className="mt-1 text-sm text-gray-600">
              A: はい、過去の記録も編集可能です。ただし、編集履歴は保持されます。
            </p>
          </div>
        </div>
      </HelpSection>

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
    </div>
  );
}; 