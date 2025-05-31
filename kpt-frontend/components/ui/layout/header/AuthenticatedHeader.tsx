/**
 * @file AuthenticatedHeader.tsx
 * @description 認証状態対応ヘッダーコンポーネント
 *
 * httpOnlyCookieベースの認証状態を判定し、
 * ログイン/ログアウト状態に応じてヘッダーの表示を切り替えます。
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui';

interface AuthenticatedHeaderProps {
  /** ヘッダーのスタイル */
  variant?: 'default' | 'transparent';
  /** 追加のCSSクラス */
  className?: string;
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({
  variant = 'default',
  className = '',
}) => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  // ユーザーのイニシャルを取得
  const getUserInitials = (username: string): string => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50
    w-full backdrop-blur-sm shadow-sm border-b border-slate-200
    ${variant === 'transparent' ? 'bg-white/90' : 'bg-white'}
    ${className}
  `;

  if (loading) {
    // ローディング中はスケルトンを表示
    return (
      <header className={headerClasses}>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors'
            >
              KPT Connect
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='h-8 w-20 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse'></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={headerClasses}>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        {/* ロゴ */}
        <div className='flex items-center'>
          <Link
            href='/'
            className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors'
          >
            KPT Connect
          </Link>
        </div>

        {/* ナビゲーション */}
        <div className='flex items-center space-x-4'>
          {isAuthenticated && user ? (
            <>
              {/* 認証済みユーザー向けナビゲーション */}
              <Link
                href='/dashboard'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                ダッシュボード
              </Link>
              <Link
                href='/calendar'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                カレンダー
              </Link>
              <Link
                href='/reports'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                レポート
              </Link>

              {/* ユーザーメニュー */}
              <div className='relative'>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className='flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors'
                >
                  <div className='h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    {getUserInitials(user.username)}
                  </div>
                  <span className='text-sm font-medium text-gray-700'>{user.username}</span>
                  <svg
                    className={`h-4 w-4 text-gray-500 transform transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>

                {/* ドロップダウンメニュー */}
                {showUserMenu && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50'>
                    <div className='px-4 py-3 border-b border-gray-200'>
                      <p className='font-medium text-gray-900'>{user.username}</p>
                      <p className='text-sm text-gray-500'>{user.email}</p>
                    </div>
                    <div className='py-1'>
                      <Link
                        href='/profile'
                        className='flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                        <span>プロフィール</span>
                      </Link>
                      <Link
                        href='/notifications'
                        className='flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        <span>設定</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left'
                      >
                        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                        <span>ログアウト</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* 未認証ユーザー向けナビゲーション */}
              <Link
                href='/pricing'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                料金プラン
              </Link>
              <Link
                href='/help'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                ヘルプ
              </Link>
              <Link href='/login'>
                <Button variant='outline' className='text-gray-600 hover:text-gray-900'>
                  ログイン
                </Button>
              </Link>
              <Link href='/login'>
                <Button className='bg-indigo-600 text-white hover:bg-indigo-700'>
                  新規登録
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AuthenticatedHeader; 