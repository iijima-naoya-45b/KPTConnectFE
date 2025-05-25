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
import { Button, Input, Label, Separator } from '@/components/ui';
import Link from 'next/link';

type FeedbackType = 'bug' | 'feature' | 'improvement' | 'other';

interface FeedbackForm {
  type: FeedbackType;
  title: string;
  description: string;
  email: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: File[];
}

const FeedbackPage: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackForm>({
    type: 'improvement',
    title: '',
    description: '',
    email: '',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const feedbackTypes = [
    {
      value: 'bug' as const,
      label: 'バグ報告',
      description: 'アプリケーションの不具合や問題を報告',
      icon: '🐛',
      color: 'bg-red-50 border-red-200 text-red-800',
    },
    {
      value: 'feature' as const,
      label: '新機能要望',
      description: '新しい機能やサービスの追加要望',
      icon: '✨',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
    },
    {
      value: 'improvement' as const,
      label: '改善提案',
      description: '既存機能の改善やUX向上の提案',
      icon: '🚀',
      color: 'bg-green-50 border-green-200 text-green-800',
    },
    {
      value: 'other' as const,
      label: 'その他',
      description: '上記以外のご意見やご質問',
      icon: '💬',
      color: 'bg-gray-50 border-gray-200 text-gray-800',
    },
  ];

  const handleInputChange = (field: keyof FeedbackForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const selectedType = feedbackTypes.find(type => type.value === formData.type);

  if (submitted) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg
              className='w-8 h-8 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>送信完了</h2>
          <p className='text-gray-600 mb-6'>
            フィードバックをお送りいただき、ありがとうございます。
            いただいたご意見は今後のサービス改善に活用させていただきます。
          </p>
          <div className='space-y-3'>
            <Button
              onClick={() => setSubmitted(false)}
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
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>フィードバック</h1>
              <p className='mt-2 text-gray-600'>ご意見、ご要望、バグ報告をお聞かせください</p>
            </div>
            <Link href='/dashboard'>
              <Button variant='outline'>ダッシュボードに戻る</Button>
            </Link>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.includes('失敗') || message.includes('エラー')
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <div className='bg-white shadow rounded-lg'>
            <form onSubmit={handleSubmit}>
              {/* フィードバックタイプ選択 */}
              <div className='px-6 py-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>フィードバックの種類</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {feedbackTypes.map(type => (
                    <label
                      key={type.value}
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                        formData.type === type.value
                          ? type.color
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type='radio'
                        name='feedback-type'
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={e => handleInputChange('type', e.target.value as FeedbackType)}
                        className='sr-only'
                      />
                      <div className='flex items-center'>
                        <span className='text-2xl mr-3'>{type.icon}</span>
                        <div>
                          <div className='text-sm font-medium'>{type.label}</div>
                          <div className='text-xs text-gray-500'>{type.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* フォーム詳細 */}
              <div className='px-6 py-6 space-y-6'>
                <h2 className='text-xl font-semibold text-gray-900'>詳細情報</h2>

                {/* タイトル */}
                <div>
                  <Label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>
                    タイトル <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='title'
                    type='text'
                    value={formData.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder={`${selectedType?.label}の概要を入力してください`}
                    required
                    className='w-full'
                  />
                </div>

                {/* 詳細説明 */}
                <div>
                  <Label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    詳細説明 <span className='text-red-500'>*</span>
                  </Label>
                  <textarea
                    id='description'
                    rows={6}
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    placeholder={
                      formData.type === 'bug'
                        ? '発生した問題の詳細、再現手順、期待される動作などを記載してください'
                        : formData.type === 'feature'
                          ? '希望する機能の詳細、使用場面、期待される効果などを記載してください'
                          : '改善提案の詳細、現在の問題点、期待される改善効果などを記載してください'
                    }
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <Label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    メールアドレス <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder='回答が必要な場合の連絡先'
                    required
                    className='w-full'
                  />
                </div>

                {/* 優先度 */}
                <div>
                  <Label
                    htmlFor='priority'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    優先度
                  </Label>
                  <select
                    id='priority'
                    value={formData.priority}
                    onChange={e => handleInputChange('priority', e.target.value)}
                    aria-label='優先度選択'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  >
                    <option value='low'>低 - 時間があるときに対応</option>
                    <option value='medium'>中 - 通常の対応</option>
                    <option value='high'>高 - 早急な対応が必要</option>
                  </select>
                </div>
              </div>

              <Separator />

              {/* 送信ボタン */}
              <div className='px-6 py-6'>
                <div className='flex justify-end space-x-3'>
                  <Link href='/help'>
                    <Button variant='outline' type='button'>
                      ヘルプページに戻る
                    </Button>
                  </Link>
                  <Button
                    type='submit'
                    disabled={loading}
                    className='bg-indigo-600 hover:bg-indigo-700'
                  >
                    {loading ? '送信中...' : 'フィードバックを送信'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* 注意事項 */}
          <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
            <h3 className='text-lg font-medium text-blue-900 mb-3'>
              📝 フィードバック送信時の注意事項
            </h3>
            <ul className='text-sm text-blue-800 space-y-2'>
              <li>• バグ報告の場合は、可能な限り再現手順を詳しく記載してください</li>
              <li>• 機能要望の場合は、具体的な使用場面や期待される効果を記載してください</li>
              <li>• 緊急性の高い問題の場合は、優先度を「高」に設定してください</li>
              <li>• いただいたフィードバックは今後のサービス改善に活用させていただきます</li>
              <li>• 回答が必要な場合は、正確なメールアドレスをご入力ください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
