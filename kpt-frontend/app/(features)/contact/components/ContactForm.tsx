/**
 * @file ContactForm.tsx
 * @description お問い合わせフォームコンポーネント
 * 
 * お問い合わせに必要な入力フィールドを含むフォームコンポーネントです。
 * 名前、メール、件名、内容の必須項目と、会社名、電話番号の任意項目を提供します。
 * 
 * @example
 * ```tsx
 * <ContactForm
 *   formData={formData}
 *   onInputChange={handleInputChange}
 *   isSubmitting={isSubmitting}
 * />
 * ```
 */

import React from 'react';
import { ContactFormData } from './types';

interface ContactFormProps {
  /** フォームデータ */
  formData: ContactFormData;
  /** 入力値変更時のハンドラ */
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 送信中フラグ */
  isSubmitting: boolean;
}

/**
 * お問い合わせフォームコンポーネント
 */
const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onInputChange,
  isSubmitting,
}) => {
  return (
    <div className='space-y-6'>
      {/* お名前 */}
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
          お名前 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='山田 太郎'
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          メールアドレス <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='your@email.com'
        />
      </div>

      {/* 会社名 */}
      <div>
        <label htmlFor='company' className='block text-sm font-medium text-gray-700'>
          会社名
        </label>
        <input
          type='text'
          id='company'
          name='company'
          value={formData.company}
          onChange={onInputChange}
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='株式会社〇〇'
        />
      </div>

      {/* 電話番号 */}
      <div>
        <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
          電話番号
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={onInputChange}
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='03-1234-5678'
        />
      </div>

      {/* 件名 */}
      <div>
        <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
          件名 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='お問い合わせの件名'
        />
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label htmlFor='message' className='block text-sm font-medium text-gray-700'>
          お問い合わせ内容 <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={onInputChange}
          required
          disabled={isSubmitting}
          rows={6}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500'
          placeholder='お問い合わせの詳細を入力してください'
        />
      </div>
    </div>
  );
};

export default ContactForm; 