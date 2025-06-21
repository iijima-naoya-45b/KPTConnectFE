'use client';

import React, { useState } from 'react';
import { ContactForm, ContactSubmitButton, type ContactFormData, type SubmitResult } from './components';
import { MessageDisplay, PageHeader } from '../shared/components';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // バックエンドAPIに送信
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
      const response = await fetch(`${baseUrl}/api/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: result.message || 'お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。',
        });

        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || 'お問い合わせの送信に失敗しました。もう一度お試しください。',
        });
      }
    } catch (error) {
      console.error('お問い合わせ送信エラー:', error);
      setSubmitResult({
        success: false,
        message: 'お問い合わせの送信に失敗しました。ネットワーク接続をご確認の上、もう一度お試しください。',
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
