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
  /** ページタイトル（オプション） */
  pageTitle?: string;
  /** アクションボタン（オプション） */
  actionButton?: {
    label: string;
    href: string;
    variant?: 'default' | 'outline';
  };
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({
  variant = 'default',
  className = '',
  pageTitle,
  actionButton,
}) => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  // ユーザーのイニシャルを取得
  const getUserInitials = (email: string): string => {
    if (!email) return '';
    const namePart = email.split('@')[0];
    return namePart
      .charAt(0)
      .toUpperCase();
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
            <span className='text-4xl font-bold' style={{ color: '#4B0082' }}>KPT Connect</span>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='h-8 w-20 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full animate-pulse'></div>
          </div>
        </nav>
      </header>
    );
  }

  // ユーザードロップダウンメニュー
  const UserDropdown = () => (
    <div className='absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50'>
      <div className='px-4 py-3 border-b border-gray-200'>
        <p className='font-medium text-gray-900'>{user?.email}</p>
        <p className='text-sm text-gray-500'>{user?.email}</p>
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
          <span>設定（プロフィール）</span>
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
  );

  const MobileDrawer = () => (
    <div
      className={`fixed inset-0 bg-white shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ transitionProperty: 'transform' }}
    >
      <div className='flex items-center justify-between h-16 px-4 border-b bg-gray-100 transition-transform duration-1000 transform -translate-x-full'>
        <style jsx>{`
          .-translate-x-full {
            transform: translateX(0);
          }
        `}</style>
        <div className='flex items-center'>
          <span className='text-4xl font-bold text-indigo-600'>KPT Connect</span>
        </div>
        <button onClick={() => setDrawerOpen(false)} aria-label='Close menu' className='absolute top-4 right-4'>
          <svg className='h-6 w-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>
      <nav className='flex flex-col p-4 space-y-2 bg-gray-50'>
        {isAuthenticated && user ? (
          <>
            <Link href='/dashboard' className='py-2 px-3 rounded hover:bg-indigo-50' onClick={() => setDrawerOpen(false)}>ダッシュボード</Link>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className='py-2 px-3 rounded hover:bg-indigo-50 flex items-center justify-between w-full'
            >
              <span>プロフィール（{user.email}）</span>
              <svg className={`h-4 w-4 ml-2 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
            {showUserMenu && <div className='ml-4'><UserDropdown /></div>}
          </>
        ) : (
          <>
            <Link href='/pricing' className='py-2 px-3 rounded hover:bg-indigo-50' onClick={() => setDrawerOpen(false)}>料金プラン</Link>
            <Link href='/help' className='py-2 px-3 rounded hover:bg-indigo-50' onClick={() => setDrawerOpen(false)}>ヘルプ</Link>
            <Link href='/login' className='py-2 px-3 rounded hover:bg-indigo-50' onClick={() => setDrawerOpen(false)}>ログイン</Link>
            <Link href='/signup' className='py-2 px-3 rounded hover:bg-indigo-50' onClick={() => setDrawerOpen(false)}>新規登録</Link>
          </>
        )}
      </nav>
    </div>
  );

  return (
    <>
      <header className={headerClasses}>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
          {/* ロゴ */}
          <div className='flex items-center'>
            <Link href='/'>
              <span className='text-4xl font-bold text-indigo-600'>KPT Connect</span>
            </Link>
          </div>

          {/* PCナビゲーション（md以上で表示） */}
          <div className='hidden md:flex items-center space-x-4'>
            {isAuthenticated && user ? (
              <>
                <Link href='/dashboard' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'>ダッシュボード</Link>
                <div className='relative'>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className='flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors'
                  >
                    <div className='h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                      {user?.email && getUserInitials(user.email)}
                    </div>
                    <span className='text-sm font-medium text-gray-700'>{user?.email}</span>
                    <svg
                      className={`h-4 w-4 text-gray-500 transform transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>
                  {showUserMenu && <UserDropdown />}
                </div>
              </>
            ) : (
              <>
                <Link href='/pricing' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'>料金プラン</Link>
                <Link href='/help' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors'>ヘルプ</Link>
                <Link href='/login'>
                  <Button variant='outline' className='text-gray-600 hover:text-gray-900'>ログイン</Button>
                </Link>
                <Link href='/signup'>
                  <Button className='bg-indigo-600 text-white hover:bg-indigo-700'>新規登録</Button>
                </Link>
              </>
            )}
          </div>

          {/* ハンバーガーメニュー（md未満で表示） */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setDrawerOpen(!drawerOpen)} aria-label='Toggle menu'>
              <svg className='h-6 w-6 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </nav>
        {/* モバイルドロワー */}
        {drawerOpen && <>
          <div className='fixed inset-0 bg-black bg-opacity-30 z-40' onClick={() => setDrawerOpen(false)}></div>
          <MobileDrawer />
        </>}
      </header>

      {/* ページタイトルセクション（オプション） */}
      {pageTitle && (
        <div className='bg-white shadow-md border-b border-gray-200 mt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <div className='flex justify-between items-center'>
              <div className='bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200'>
                <h1 className='text-2xl font-bold text-indigo-900'>{pageTitle}</h1>
              </div>
              {actionButton && (
                <Link 
                  href={actionButton.href}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 font-medium border ${
                    actionButton.variant === 'outline' 
                      ? 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border-gray-300'
                  }`}
                >
                  {actionButton.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticatedHeader; 