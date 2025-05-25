/**
 * @file page.tsx
 * @description 設定ページ
 *
 * @example
 * ```tsx
 * <SettingsPage />
 * ```
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SettingsPage = () => {
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('ユーザー名');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIとの連携
    setIsEditing(false);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>設定</h1>
            <Link href='/dashboard' className='text-gray-600 hover:text-gray-900'>
              戻る
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white shadow rounded-lg overflow-hidden'>
          <form onSubmit={handleSubmit} className='space-y-6 p-6'>
            {/* プロフィール情報 */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>プロフィール情報</h2>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    メールアドレス
                  </label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100'
                  />
                </div>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                    名前
                  </label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={!isEditing}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100'
                  />
                </div>
              </div>
            </div>

            {/* 通知設定 */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>通知設定</h2>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='email-notifications'
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label htmlFor='email-notifications' className='ml-2 block text-sm text-gray-900'>
                    メール通知を受け取る
                  </label>
                </div>
              </div>
            </div>

            {/* アカウント設定 */}
            <div>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>アカウント設定</h2>
              <div className='space-y-4'>
                <button
                  type='button'
                  onClick={() => {
                    // TODO: パスワード変更処理
                  }}
                  className='text-indigo-600 hover:text-indigo-900'
                >
                  パスワードを変更
                </button>
                <button
                  type='button'
                  onClick={() => {
                    // TODO: アカウント削除処理
                  }}
                  className='text-red-600 hover:text-red-900'
                >
                  アカウントを削除
                </button>
              </div>
            </div>

            {/* 送信ボタン */}
            <div className='flex justify-end'>
              {isEditing ? (
                <div className='space-x-4'>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50'
                  >
                    キャンセル
                  </button>
                  <button
                    type='submit'
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                  >
                    保存
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                >
                  編集
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
