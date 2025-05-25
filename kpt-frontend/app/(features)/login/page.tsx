'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// このページは動的レンダリングが必要
export const dynamic = 'force-dynamic';

const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Googleログイン処理
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/v1/oauth/google?provider=google';
  };

  // Googleログインコールバック処理
  const handleGoogleCallback = useCallback(
    async (sessionId: string) => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/sessions/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ session_id: sessionId }),
        });

        if (response.ok) {
          router.push('/dashboard');
        } else {
          const data = await response.json();
          setError(data.error || 'Googleログインに失敗しました');
        }
      } catch (err) {
        console.error('Googleログインエラー:', err);
        setError('Googleログイン処理中にエラーが発生しました');
      }
    },
    [router]
  );

  // Googleログインコールバック処理
  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      handleGoogleCallback(sessionId);
    }
  }, [searchParams, handleGoogleCallback]);

  // メールアドレス/パスワードログイン処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'ログインに失敗しました');
      }
    } catch (err) {
      console.error('ログインエラー:', err);
      setError('ログイン処理中にエラーが発生しました');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>ログイン</h2>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
            {error}
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                メールアドレス
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='メールアドレス'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                パスワード
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='パスワード'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              ログイン
            </button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>または</span>
            </div>
          </div>

          <div className='mt-6'>
            <button
              onClick={handleGoogleLogin}
              className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <Image
                className='h-5 w-5 mr-2'
                src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
                alt='Google logo'
                width={20}
                height={20}
              />
              Googleでログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;
