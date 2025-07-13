'use client';

import React, { useState, useEffect } from 'react';
import { formatJapaneseDate } from '@/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface Todo {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  status: 'open' | 'pending' | 'close'; // Update to match enum values
}

export default function TodoSuggestionPage() {
  const [suggestions, setSuggestions] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<Todo>({ title: '', description: '', deadline: '', status: "open" });
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
      });
      const data = await response.json();
      console.log('Fetched suggestions:', data); // Log the response data
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setError('提案の取得に失敗しました。データ形式が不正です。');
      }
    } catch (err) {
      setError('提案の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleApprove = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const confirmSave = () => {
    if (selectedTodo) {
      toast.success(`Todo '${selectedTodo.title}' を承認しました。`);
      setShowModal(false);
    }
  };

  const cancelSave = () => {
    setShowModal(false);
  };

  const handleEdit = (todo: Todo) => {
    toast.info(`Todo '${todo.title}' を編集します。`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  const handleCreateTodo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
        credentials: 'include', // Ensure cookies are sent
      });
      if (response.ok) {
        const createdTodo = await response.json();
        setSuggestions([...suggestions, createdTodo]);
        setNewTodo({ title: '', description: '', deadline: '', status: "open" });
        toast.success('新しいTodoが作成されました。');
      } else {
        toast.error('Todoの作成に失敗しました。');
      }
    } catch (err) {
      toast.error('Todoの作成中にエラーが発生しました。');
    }
  };

  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900">AI Todo提案</h1>
            <p className="mt-1 text-sm text-gray-600">
              AIからの提案を確認し、承認または編集してください。
            </p>
            <button
              onClick={fetchSuggestions}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              提案を取得
            </button>
          </div>
        </div>

        {/* Todo作成フォーム */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900">新しいTodoを作成</h2>
            <div className="mt-4">
              <input
                type="text"
                name="title"
                value={newTodo.title}
                onChange={handleInputChange}
                placeholder="タイトル"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="description"
                value={newTodo.description}
                onChange={handleInputChange}
                placeholder="説明"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="date"
                name="deadline"
                value={newTodo.deadline}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <select
                name="status"
                value={newTodo.status}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="close">Close</option>
              </select>
              <button
                onClick={handleCreateTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                作成
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 px-4 py-2">{error}</div>
        )}

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
            <ul className="divide-y divide-gray-200">
              {suggestions.map((todo, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        <Link href={`/dashboard/todos/${todo.id}`}>
                          {todo.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {todo.description}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(todo)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                      >
                        承認
                      </button>
                      <button
                        onClick={() => handleEdit(todo)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        編集
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        締切: {formatJapaneseDate(todo.deadline)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">提案を保存しますか？</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  この提案を保存するか確認してください。
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={confirmSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  はい
                </button>
                <button
                  onClick={cancelSave}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  いいえ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}