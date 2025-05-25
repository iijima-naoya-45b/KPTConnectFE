/**
 * @file page.tsx
 * @description プロフィール管理ページ
 *
 * ユーザーのプロフィール情報、アカウント設定、セキュリティ設定を管理するページです。
 *
 * @example
 * ```tsx
 * // /profile でアクセス可能
 * ```
 */

'use client';

import React, { useState } from 'react';
import { Button, Input, Label, Separator } from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  language: string;
  emailNotifications: boolean;
  kptReminders: boolean;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: '開発太郎',
    email: 'dev.taro@example.com',
    avatarUrl: 'https://www.gravatar.com/avatar/default?d=identicon&s=200',
    bio: '個人開発者として日々学習中です。KPTを活用して継続的な改善を心がけています。',
    timezone: 'Asia/Tokyo',
    language: 'ja',
    emailNotifications: true,
    kptReminders: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API呼び出しをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('プロフィールが更新されました');
      setIsEditing(false);
    } catch {
      setMessage('更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // 元の値に戻す処理（実際にはAPIから再取得）
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>プロフィール設定</h1>
              <p className='mt-2 text-gray-600'>アカウント情報と設定を管理します</p>
            </div>
            <Link href='/dashboard'>
              <Button variant='outline'>ダッシュボードに戻る</Button>
            </Link>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.includes('失敗')
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <div className='bg-white shadow rounded-lg'>
            {/* プロフィール情報 */}
            <div className='px-6 py-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>基本情報</h2>
                {!isEditing && <Button onClick={() => setIsEditing(true)}>編集</Button>}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* アバター */}
                <div className='md:col-span-2'>
                  <Label className='block text-sm font-medium text-gray-700 mb-2'>
                    プロフィール画像
                  </Label>
                  <div className='flex items-center space-x-4'>
                    <Image
                      src={profile.avatarUrl || '/default-avatar.png'}
                      alt='プロフィール画像'
                      width={80}
                      height={80}
                      className='rounded-full'
                    />
                    {isEditing && (
                      <Button variant='outline' size='sm'>
                        画像を変更
                      </Button>
                    )}
                  </div>
                </div>

                {/* ユーザー名 */}
                <div>
                  <Label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    ユーザー名
                  </Label>
                  <Input
                    id='username'
                    value={profile.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <Label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    メールアドレス
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={profile.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* 自己紹介 */}
                <div className='md:col-span-2'>
                  <Label htmlFor='bio' className='block text-sm font-medium text-gray-700 mb-2'>
                    自己紹介
                  </Label>
                  <textarea
                    id='bio'
                    rows={3}
                    value={profile.bio || ''}
                    onChange={e => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
                    placeholder='自己紹介を入力してください'
                  />
                </div>
              </div>

              {isEditing && (
                <div className='mt-6 flex space-x-3'>
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className='bg-indigo-600 hover:bg-indigo-700'
                  >
                    {loading ? '保存中...' : '保存'}
                  </Button>
                  <Button variant='outline' onClick={handleCancel} disabled={loading}>
                    キャンセル
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* 設定 */}
            <div className='px-6 py-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>設定</h2>

              <div className='space-y-6'>
                {/* タイムゾーン */}
                <div>
                  <Label
                    htmlFor='timezone'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    タイムゾーン
                  </Label>
                  <select
                    id='timezone'
                    value={profile.timezone}
                    onChange={e => handleInputChange('timezone', e.target.value)}
                    disabled={!isEditing}
                    aria-label='タイムゾーン選択'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
                  >
                    <option value='Asia/Tokyo'>Asia/Tokyo (JST)</option>
                    <option value='America/New_York'>America/New_York (EST)</option>
                    <option value='Europe/London'>Europe/London (GMT)</option>
                    <option value='UTC'>UTC</option>
                  </select>
                </div>

                {/* 言語 */}
                <div>
                  <Label
                    htmlFor='language'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    言語
                  </Label>
                  <select
                    id='language'
                    value={profile.language}
                    onChange={e => handleInputChange('language', e.target.value)}
                    disabled={!isEditing}
                    aria-label='言語選択'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
                  >
                    <option value='ja'>日本語</option>
                    <option value='en'>English</option>
                  </select>
                </div>

                {/* 通知設定 */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-medium text-gray-900'>通知設定</h3>

                  <div className='flex items-center justify-between'>
                    <div>
                      <Label className='text-sm font-medium text-gray-700'>メール通知</Label>
                      <p className='text-sm text-gray-500'>重要な更新をメールで受け取る</p>
                    </div>
                    <input
                      type='checkbox'
                      checked={profile.emailNotifications}
                      onChange={e => handleInputChange('emailNotifications', e.target.checked)}
                      disabled={!isEditing}
                      aria-label='メール通知設定'
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50'
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <Label className='text-sm font-medium text-gray-700'>KPTリマインダー</Label>
                      <p className='text-sm text-gray-500'>
                        定期的な振り返りのリマインダーを受け取る
                      </p>
                    </div>
                    <input
                      type='checkbox'
                      checked={profile.kptReminders}
                      onChange={e => handleInputChange('kptReminders', e.target.checked)}
                      disabled={!isEditing}
                      aria-label='KPTリマインダー設定'
                      className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50'
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* セキュリティ */}
            <div className='px-6 py-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>セキュリティ</h2>

              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>パスワード変更</Label>
                    <p className='text-sm text-gray-500'>定期的なパスワード変更を推奨します</p>
                  </div>
                  <Button variant='outline'>パスワードを変更</Button>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label className='text-sm font-medium text-gray-700'>アカウント削除</Label>
                    <p className='text-sm text-gray-500'>
                      アカウントとすべてのデータを完全に削除します
                    </p>
                  </div>
                  <Button variant='destructive'>アカウントを削除</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
