/**
 * @file ContactSubmitButton.tsx
 * @description お問い合わせ送信ボタンコンポーネント
 * 
 * お問い合わせフォームの送信ボタンを含むコンポーネントです。
 * 送信中の状態表示とローディング状態の管理を行います。
 * 
 * @example
 * ```tsx
 * <ContactSubmitButton
 *   isSubmitting={isSubmitting}
 *   submitLabel="送信する"
 *   loadingLabel="送信中..."
 * />
 * ```
 */

import React from 'react';

interface ContactSubmitButtonProps {
  /** 送信中フラグ */
  isSubmitting: boolean;
  /** 送信ボタンのラベル */
  submitLabel?: string;
  /** 送信中のラベル */
  loadingLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * お問い合わせ送信ボタンコンポーネント
 */
const ContactSubmitButton: React.FC<ContactSubmitButtonProps> = ({
  isSubmitting,
  submitLabel = '送信する',
  loadingLabel = '送信中...',
  className = '',
}) => {
  return (
    <div className={className}>
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? loadingLabel : submitLabel}
      </button>
    </div>
  );
};

export default ContactSubmitButton; 