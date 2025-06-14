/**
 * @file FeedbackSuccessMessage.tsx
 * @description フィードバック送信成功メッセージコンポーネント
 * 
 * フィードバック送信が完了した際に表示される成功メッセージと
 * 次のアクションボタンを含むコンポーネントです。
 * 
 * @example
 * ```tsx
 * <FeedbackSuccessMessage
 *   onNewFeedback={() => setSubmitted(false)}
 * />
 * ```
 */

import React from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface FeedbackSuccessMessageProps {
  /** 新しいフィードバック送信を開始するコールバック */
  onNewFeedback: () => void;
}

/**
 * フィードバック送信成功メッセージコンポーネント
 */
const FeedbackSuccessMessage: React.FC<FeedbackSuccessMessageProps> = ({ onNewFeedback }) => {
  return (
    <div className='  bg-gray-50 flex items-center justify-center'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
        {/* 成功アイコン */}
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <svg
            className='w-8 h-8 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>

        {/* メッセージ */}
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>送信完了</h2>
        <p className='text-gray-600 mb-6'>
          フィードバックをお送りいただき、ありがとうございます。
          いただいたご意見は今後のサービス改善に活用させていただきます。
        </p>

        {/* アクションボタン */}
        <div className='space-y-3'>
          <Button
            onClick={onNewFeedback}
            className='w-full bg-indigo-600 hover:bg-indigo-700'
          >
            別のフィードバックを送信
          </Button>
          <Link href='/dashboard'>
            <Button variant='outline' className='w-full'>
              ダッシュボードに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSuccessMessage; 