'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactForm, ContactSubmitButton, type ContactFormData } from '../(features)/contact/components';
import { PageHeader } from '../(features)/shared/components';
import { useToast } from '@/components/toast';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        // 成功時のトースト通知
        addToast({
          message: 'お問い合わせを受け付けました！',
          type: 'success',
          duration: 3000,
        });

        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });

        // 3秒後にホーム画面に遷移
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        // エラー時のトースト通知
        addToast({
          message: result.error || 'お問い合わせの送信に失敗しました。もう一度お試しください。',
          type: 'error',
          duration: 8000,
        });
      }
    } catch (error) {
      // ネットワークエラー時のトースト通知
      addToast({
        message: 'お問い合わせの送信に失敗しました。ネットワーク接続をご確認の上、もう一度お試しください。',
        type: 'error',
        duration: 8000,
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