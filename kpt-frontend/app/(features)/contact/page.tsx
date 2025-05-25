/**
 * @file page.tsx
 * @description お問い合わせページコンポーネント
 *
 * @example
 * ```tsx
 * <ContactPage />
 * ```
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
}

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
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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

    try {
      // ここでAPIを呼び出してお問い合わせを送信
      await new Promise(resolve => setTimeout(resolve, 1000)); // デモ用の遅延

      setSubmitResult({
        success: true,
        message: 'お問い合わせを受け付けました。担当者より折り返しご連絡いたします。',
      });
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
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>お問い合わせ</h1>
          <Link href='/dashboard' className='text-indigo-600 hover:text-indigo-900'>
            ダッシュボードに戻る
          </Link>
        </div>

        <div className='bg-white shadow rounded-lg p-6'>
          {submitResult && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {submitResult.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                お名前 <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='山田 太郎'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                メールアドレス <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='your@email.com'
              />
            </div>

            <div>
              <label htmlFor='company' className='block text-sm font-medium text-gray-700'>
                会社名
              </label>
              <input
                type='text'
                id='company'
                name='company'
                value={formData.company}
                onChange={handleInputChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='株式会社〇〇'
              />
            </div>

            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                電話番号
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='03-1234-5678'
              />
            </div>

            <div>
              <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
                件名 <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleInputChange}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='お問い合わせの件名'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
                お問い合わせ内容 <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                placeholder='お問い合わせの詳細を入力してください'
              />
            </div>

            <div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
