'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import KPTReviewForm from './components/KPTReviewForm';
import HeaderBar from './components/HeaderBar';
import { useFlashMessageStore } from '../../../../store/useFlashMessageStore';

const KPTReviewPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setFlashMessage = useFlashMessageStore((state: any) => state.setFlashMessage);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    keep: string;
    problem: string;
    try: string;
  }) => {
    setError('');
    setLoading(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/v1/kpt_sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(resData.message || '保存に失敗しました');
      }
      setFlashMessage(resData.message || 'KPT振り返りを保存しました');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
      <HeaderBar title='本日のKPT振り返り' cancelHref='/' />
      <main className='max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12'>
        <KPTReviewForm onSubmit={handleSubmit} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default KPTReviewPage; 