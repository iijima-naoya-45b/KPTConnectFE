/**
 * @file page.tsx
 * @description フィードバックページ
 *
 * ユーザーからの意見、要望、バグ報告を収集するための専用ページです。
 * カテゴリ別のフィードバック送信機能を提供します。
 *
 * @example
 * ```tsx
 * // /feedback でアクセス可能
 * ```
 */

'use client';

import React, { useState } from 'react';
import {
  FeedbackTypeSelector,
  FeedbackForm,
  FeedbackSuccessMessage,
  FeedbackNotes,
  MessageDisplay,
  PageHeader,
  FeedbackSubmitActions,
  type FeedbackFormData,
  type FeedbackType,
} from './components';

/**
 * フィードバックページコンポーネント
 */
const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'improvement',
    title: '',
    description: '',
    email: '',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  /**
   * フォーム入力値の変更ハンドラ
   * @param field - 変更するフィールド名
   * @param value - 新しい値
   */
  const handleInputChange = (field: keyof FeedbackFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * フィードバックタイプ変更ハンドラ
   * @param type - 新しいフィードバックタイプ
   */
  const handleTypeChange = (type: FeedbackType) => {
    handleInputChange('type', type);
  };

  /**
   * フォーム送信ハンドラ
   * @param e - フォームイベント
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // バリデーション
      if (!formData.title.trim()) {
        throw new Error('タイトルを入力してください');
      }
      if (!formData.description.trim()) {
        throw new Error('詳細を入力してください');
      }
      if (!formData.email.trim()) {
        throw new Error('メールアドレスを入力してください');
      }

      // API呼び出しをシミュレート
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitted(true);
      setMessage('フィードバックを送信しました。ご協力ありがとうございます！');

      // フォームをリセット
      setFormData({
        type: 'improvement',
        title: '',
        description: '',
        email: '',
        priority: 'medium',
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 新しいフィードバック送信を開始
   */
  const handleNewFeedback = () => {
    setSubmitted(false);
    setMessage('');
  };

  // 送信完了時の表示
  if (submitted) {
    return <FeedbackSuccessMessage onNewFeedback={handleNewFeedback} />;
  }

  // メッセージタイプの判定
  const messageType = message.includes('失敗') || message.includes('エラー') ? 'error' : 'success';

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <PageHeader
            title='フィードバック'
            description='ご意見、ご要望、バグ報告をお聞かせください'
            backButton={{
              href: '/dashboard',
              label: 'ダッシュボードに戻る',
            }}
          />

          {/* メッセージ表示 */}
          <MessageDisplay message={message} type={messageType} />

          {/* フィードバックフォーム */}
          <div className='bg-white shadow rounded-lg'>
            <form onSubmit={handleSubmit}>
              {/* フィードバックタイプ選択 */}
              <FeedbackTypeSelector
                selectedType={formData.type}
                onTypeChange={handleTypeChange}
                disabled={loading}
              />

              {/* フォーム詳細 */}
              <FeedbackForm
                formData={formData}
                onInputChange={handleInputChange}
                selectedType={formData.type}
                disabled={loading}
              />

              {/* 送信ボタン */}
              <FeedbackSubmitActions
                loading={loading}
                onSubmit={handleSubmit}
                cancelButton={{
                  href: '/help',
                  label: 'ヘルプページに戻る',
                }}
              />
            </form>
          </div>

          {/* 注意事項 */}
          <FeedbackNotes />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
