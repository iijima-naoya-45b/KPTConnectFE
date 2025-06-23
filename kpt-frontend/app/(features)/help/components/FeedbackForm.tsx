'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

// フィードバックフォームデータの型定義
interface FeedbackFormData {
  type: 'bug' | 'feature' | 'improvement' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  email: string;
}

const FeedbackForm: React.FC = () => {
  // react-hook-form の設定
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FeedbackFormData>({
    defaultValues: {
      type: 'feature',
      title: '',
      description: '',
      priority: 'medium',
      email: ''
    }
  });

  // フォーム送信処理
  const onSubmit = async (data: FeedbackFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          feedback: {
            type: data.type,
            title: data.title,
            description: data.description,
            priority: data.priority,
            email: data.email || null,
            metadata: {
              page_url: window.location.href,
              user_agent: navigator.userAgent,
              timestamp: new Date().toISOString(),
            }
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        // 成功時の処理
        alert(result.message);
        reset(); // フォームをリセット
      } else {
        // エラー時の処理
        console.error('フィードバック送信エラー:', result);
        alert(result.message || 'フィードバックの送信に失敗しました');
      }
    } catch (error) {
      console.error('フィードバック送信エラー:', error);
      alert('フィードバックの送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className='py-6'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>フィードバック</h1>
          <Link href='/help' className='text-indigo-600 hover:text-indigo-900'>
            ヘルプセンターに戻る
          </Link>
        </div>

        <div className='bg-white shadow rounded-lg p-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* フィードバックの種類 */}
            <div>
              <label htmlFor='type' className='block text-sm font-medium text-gray-700'>
                フィードバックの種類
              </label>
              <select
                id='type'
                {...register('type', {
                  required: 'フィードバックの種類を選択してください'
                })}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.type
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              >
                <option value='bug'>バグ報告</option>
                <option value='feature'>機能リクエスト</option>
                <option value='improvement'>改善提案</option>
                <option value='other'>その他</option>
              </select>
              {errors.type && (
                <p className='mt-1 text-sm text-red-600'>{errors.type.message}</p>
              )}
            </div>

            {/* タイトル */}
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                タイトル
              </label>
              <input
                type='text'
                id='title'
                {...register('title', {
                  required: 'タイトルは必須です',
                  minLength: {
                    value: 5,
                    message: 'タイトルは5文字以上で入力してください'
                  },
                  maxLength: {
                    value: 100,
                    message: 'タイトルは100文字以内で入力してください'
                  }
                })}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.title
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                placeholder='フィードバックのタイトルを入力'
              />
              {errors.title && (
                <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
              )}
            </div>

            {/* 詳細な説明 */}
            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                詳細な説明
              </label>
              <textarea
                id='description'
                {...register('description', {
                  required: '詳細な説明は必須です',
                  minLength: {
                    value: 10,
                    message: '詳細な説明は10文字以上で入力してください'
                  },
                  maxLength: {
                    value: 2000,
                    message: '詳細な説明は2000文字以内で入力してください'
                  }
                })}
                rows={4}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                placeholder='フィードバックの詳細を入力'
              />
              {errors.description && (
                <p className='mt-1 text-sm text-red-600'>{errors.description.message}</p>
              )}
            </div>

            {/* 優先度 */}
            <div>
              <label htmlFor='priority' className='block text-sm font-medium text-gray-700'>
                優先度
              </label>
              <select
                id='priority'
                {...register('priority', {
                  required: '優先度を選択してください'
                })}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.priority
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
              >
                <option value='low'>低</option>
                <option value='medium'>中</option>
                <option value='high'>高</option>
              </select>
              {errors.priority && (
                <p className='mt-1 text-sm text-red-600'>{errors.priority.message}</p>
              )}
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                メールアドレス
              </label>
              <input
                type='email'
                id='email'
                {...register('email', {
                  required: 'メールアドレスは必須です',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '有効なメールアドレスを入力してください'
                  }
                })}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                placeholder='your@email.com'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className='flex justify-end space-x-4'>
              <button
                type='button'
                onClick={() => reset()}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
              >
                リセット
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? '送信中...' : 'フィードバックを送信'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
