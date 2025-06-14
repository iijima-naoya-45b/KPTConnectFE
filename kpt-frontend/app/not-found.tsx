/**
 * @file not-found.tsx
 * @description 404 Not Found ページ（ページが見つかりません）
 * @returns カスタム404画面
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='  flex flex-col items-center justify-center bg-gray-50'>
      <h1 className='text-4xl font-bold text-indigo-600 mb-4'>404 - ページが見つかりません</h1>
      <p className='text-gray-700 mb-8'>お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href='/' className='bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition'>
        トップページへ戻る
      </Link>
    </div>
  );
} 