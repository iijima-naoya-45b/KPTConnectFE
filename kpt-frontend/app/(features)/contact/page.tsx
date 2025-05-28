/**
 * @file page.tsx
 * @description お問い合わせページコンポーネント
 *
 * ユーザーからのお問い合わせを受け付けるための専用ページです。
 * 必須項目と任意項目を含むフォーム機能を提供します。
 *
 * @example
 * ```tsx
 * // /contact でアクセス可能
 * ```
 */

'use client';

import React, { useState } from 'react';
import { ContactForm, ContactSubmitButton, type ContactFormData, type SubmitResult } from './components';
import { MessageDisplay, PageHeader } from '../shared/components';

/**
 * お問い合わせページコンポーネント
 */
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  /**
   * フォーム入力値の変更ハンドラ
   * @param e - 入力イベント
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * フォーム送信ハンドラ
   * @param e - フォームイベント
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // ここでAPIを呼び出してお問い合わせを送信
      await new Promise(resolve => setTimeout(resolve, 1000)); // デモ用の遅延

      setSubmitResult({
        success: true,
        message: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
      });

      // フォームをリセット
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: '',
      });
    } catch (error) {
      console.error('お問い合わせ送信エラー:', error);
      setSubmitResult({
        success: false,
        message: 'お問い合わせの送信に失敗しました。もう一度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='py-6'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* ヘッダー */}
        <PageHeader
          title='お問い合わせ'
          backButton={{
            href: '/dashboard',
            label: 'ダッシュボードに戻る',
          }}
        />

        <div className='bg-white shadow rounded-lg p-6'>
          {/* メッセージ表示 */}
          {submitResult && (
            <MessageDisplay
              message={submitResult.message}
              type={submitResult.success ? 'success' : 'error'}
            />
          )}

          {/* お問い合わせフォーム */}
          <form onSubmit={handleSubmit}>
            <ContactForm
              formData={formData}
              onInputChange={handleInputChange}
              isSubmitting={isSubmitting}
            />

            {/* 送信ボタン */}
            <ContactSubmitButton isSubmitting={isSubmitting} className='mt-6' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
