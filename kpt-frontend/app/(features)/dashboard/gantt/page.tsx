'use client';

import React, { useEffect, useState } from 'react';
import GanttChartView from '../components/GanttChartView';
import { Task } from 'gantt-task-react';

// Todo項目の型定義（calendar/page.tsxと同じものを利用）
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

const GanttPage = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodoItems = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kpt_items?type=todo`);
        const result = await response.json();
        if (result.success) {
          setItems(result.data.items);
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

  function safeDate(...vals: (string | undefined)[]): Date {
    for (const val of vals) {
      if (val) {
        const d = new Date(val);
        if (d instanceof Date && !isNaN(d.getTime())) return d;
      }
    }
    return new Date();
  }

  // TodoItem配列をgantt-task-reactのTask型配列に変換
  function convertTodoItemsToTasks(todoItems: TodoItem[]): Task[] {
    return todoItems
      .map((item, idx) => {
        // start: start_date > created_at > now
        const start = safeDate(item.start_date, item.created_at);
        // end: end_date > created_at > now
        const end = safeDate(item.end_date, item.created_at);

        // ここでstart/endが有効なDateでなければ絶対にnew Date()になる
        return {
          id: item.id,
          name: item.content,
          start,
          end,
          type: 'task' as Task['type'],
          progress: 0,
          isDisabled: false,
          styles: { progressColor: '#60a5fa', progressSelectedColor: '#2563eb' },
          dependencies: [],
          hideChildren: false,
          displayOrder: idx,
        };
      });
  }

  const dummyTasks: Task[] = [
    {
      id: 'dummy',
      name: 'ダミータスク',
      start: new Date(),
      end: new Date(Date.now() + 86400000),
      type: 'task',
      progress: 0,
      isDisabled: false,
      styles: { progressColor: '#60a5fa', progressSelectedColor: '#2563eb' },
      dependencies: [],
      hideChildren: false,
      displayOrder: 0,
    }
  ];

  const tasks = convertTodoItemsToTasks(items);
  const ganttTasks = tasks.length === 0 ? dummyTasks : tasks;

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>ガントチャート</h1>
              <p className='mt-2 text-gray-600'>Todo項目をガントチャート形式で可視化</p>
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
        ) : ganttTasks.length === 0 ? (
          <div className="text-center text-gray-500">表示できるタスクがありません</div>
        ) : (
          <GanttChartView items={ganttTasks} />
        )}
      </main>
    </div>
  );
};

export default GanttPage; 