'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import KPTReviewForm from './components/KPTReviewForm';
import { KPTReviewFormValues } from './components/KPTReviewForm';

// KPTセッションAPIの型定義（必要に応じて修正）
type KptSessionRequest = {
  session: {
    title: string;
    description: string;
  };
  keep: string;
  problem: string;
  try: string;
};

type KptSessionResult = {
  success: boolean;
  message?: string;
};

const KPTReviewPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // フォーム送信時の処理
  const handleSubmit = async (data: KPTReviewFormValues) => {
    setError('');
    setLoading(true);

    try {
      // APIモジュールの動的インポート
      const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
      const requestData: KptSessionRequest = {
        session: {
          title: data.title,
          description: data.description,
        },
        keep: data.keep,
        problem: data.problem,
        try: data.try,
      };

      // API呼び出し
      const result: KptSessionResult = await kptSessionsApi.createKptSession(requestData);

      if (result.success) {
        try {
          // AI提案を取得するAPIを呼び出し
          const aiRequestData = {
            todo: {
              keep: data.keep,
              problem: data.problem,
              try: data.try,
              // 他の必要な情報を追加
            }
          };

          const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todos/suggest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(aiRequestData), // 必要なデータを含める
          });
          const aiData = await aiResponse.json();
          // 提案をUIに反映する処理
          console.log('AI提案:', aiData);
        } catch (error) {
          console.error('AI提案の取得に失敗しました:', error);
        }
        router.push('/dashboard');
      } else {
        setError(result.message || '保存に失敗しました');
      }
    } catch (err: any) {
      setError(err?.message || '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-100">
      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* エラー表示 */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {/* KPTレビュー入力フォーム */}
        <KPTReviewForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  );
};

export default KPTReviewPage;
