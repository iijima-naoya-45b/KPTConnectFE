'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { formatJapaneseDate } from '@/utils';

interface Todo {
  title: string;
  description: string;
  deadline: string;
  status: string;
}

const TodoDetail: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTodo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todos/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setTodo(data);
        } else {
          setError('Todoの取得に失敗しました。');
        }
      } catch (err) {
        setError('Todoの取得中にエラーが発生しました。');
      }
    };

    fetchTodo();
  }, [id]);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow sm:rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900">{todo.title}</h1>
      <p className="mt-2 text-sm text-gray-600">{todo.description}</p>
      <p className="mt-2 text-sm text-gray-600">締切: {formatJapaneseDate(todo.deadline)}</p>
      <p className="mt-2 text-sm text-gray-600">{todo.status}</p>
    </div>
  );
};

export default TodoDetail; 