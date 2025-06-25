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
      const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
      const requestData = {
        session: {
          title: data.title,
          description: data.description,
        },
        keep: data.keep,
        problem: data.problem,
        try: data.try,
      };
      
      const result = await kptSessionsApi.createKptSession(requestData);
      if (result.success) {
        setFlashMessage(result.message || 'KPT振り返りを保存しました');
        router.push('/dashboard');
      } else {
        throw new Error(result.message || '保存に失敗しました');
      }
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