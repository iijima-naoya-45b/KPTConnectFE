'use client';

import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import CalendarView from './CalendarView';

// Todo項目の型定義
interface TodoItem {
  id: string;
  kpt_session_id: string;
  type: 'todo';
  content: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  due_date?: string;
  start_date?: string;
  end_date?: string;
  assigned_to?: string;
  emotion_score?: number;
  impact_score?: number;
  tags: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  session_title?: string;
  session_date?: string;
}

interface KptReview {
  id: number;
  title: string;
  description: string;
  keep: string;
  problem: string;
  try: string;
  created_at: string;
  user_id: number;
}

const CalendarPage = () => {
  const [allItems, setAllItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [kptReviews, setKptReviews] = useState<KptReview[]>([]);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const fetchTodoItems = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/v1/kpt_items?type=todo');
        const result = await response.json();
        if (result.success) {
          setAllItems(result.data.items);
        } else {
          setError(result.error || 'Todo項目の取得に失敗しました');
        }
      } catch (err) {
        setError('Todo項目の取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchTodoItems();
  }, []);

  useEffect(() => {
    const fetchKptReviews = async () => {
      setLoading(true);
      setError('');
      try {
        const start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
        const end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
        const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
        const res = await fetch(`${apiBaseUrl}/api/v1/kpt_reviews?start=${start}&end=${end}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('KPT一覧の取得に失敗しました');
        const data = await res.json();
        setKptReviews(data);
      } catch (e: any) {
        setError(e.message || '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchKptReviews();
  }, [currentDate]);

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>カレンダー</h1>
              <p className='mt-2 text-gray-600'>Todo項目をカレンダー形式で可視化</p>
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {error && <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'><p className='text-red-800'>{error}</p></div>}
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <CalendarView items={allItems} kptReviews={kptReviews} />
        )}
      </main>
    </div>
  );
};

export default CalendarPage; 