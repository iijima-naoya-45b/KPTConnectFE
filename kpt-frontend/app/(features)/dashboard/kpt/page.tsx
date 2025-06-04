/**
 * @file page.tsx
 * @description KPTページリダイレクト
 * 
 * @overview
 * - /dashboard/kptへのアクセスを/dashboard/calendarにリダイレクト
 * - 統合されたカレンダーページに誘導
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const KptRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // カレンダーページにリダイレクト
    router.replace('/dashboard/calendar');
  }, [router]);

  // リダイレクト中の表示
  return (
    <div className='min-h-screen bg-gray-50 pt-16 flex justify-center items-center'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4'></div>
        <p className='text-gray-600'>KPT管理ページにリダイレクトしています...</p>
        <p className='text-sm text-gray-500 mt-2'>統合されたカレンダーページに移動します</p>
      </div>
    </div>
  );
};

export default KptRedirectPage; 