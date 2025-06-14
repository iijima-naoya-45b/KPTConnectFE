/**
 * @file page.tsx
 * @description 新規登録ページ（Google認証でログインページと同じフロー）
 *
 * Google認証を使用しているため、新規登録とログインは同じフローです。
 * このページはログインページにリダイレクトします。
 *
 * @example
 * ```tsx
 * // /signup でアクセス可能（/login にリダイレクト）
 * ```
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Google認証では新規登録とログインが同じフローのため、ログインページにリダイレクト
    router.replace('/login');
  }, [router]);

  return (
    <div className='  flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto'></div>
        <p className='mt-4 text-gray-600'>ログインページに移動中...</p>
      </div>
    </div>
  );
};

export default SignupPage; 