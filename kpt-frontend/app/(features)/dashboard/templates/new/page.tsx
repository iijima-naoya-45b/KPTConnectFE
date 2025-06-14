/**
 * @file page.tsx
 * @description 新規テンプレート作成画面
 *
 * @example
 * ```tsx
 * <NewTemplatePage />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NewTemplatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keep, setKeep] = useState<string[]>([]);
  const [problem, setProblem] = useState<string[]>([]);
  const [try_, setTry_] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [schedule, setSchedule] = useState({
    isScheduled: false,
    frequency: 'weekly',
    day: 'monday',
    time: '10:00',
  });

  const handleAddItem = (category: 'keep' | 'problem' | 'try', e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    switch (category) {
      case 'keep':
        setKeep([...keep, newItem]);
        break;
      case 'problem':
        setProblem([...problem, newItem]);
        break;
      case 'try':
        setTry_([...try_, newItem]);
        break;
    }
    setNewItem('');
  };

  const handleRemoveItem = (category: 'keep' | 'problem' | 'try', index: number) => {
    switch (category) {
      case 'keep':
        setKeep(keep.filter((_, i) => i !== index));
        break;
      case 'problem':
        setProblem(problem.filter((_, i) => i !== index));
        break;
      case 'try':
        setTry_(try_.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIとの連携
    router.push('/dashboard/templates');
  };

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>新規テンプレート作成</h1>
            <Link href='/dashboard/templates' className='text-gray-600 hover:text-gray-900'>
              キャンセル
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* 基本情報 */}
          <div className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>基本情報</h2>
            <div className='space-y-4'>
              <div>
                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                  タイトル
                </label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  required
                />
              </div>
              <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  説明
                </label>
                <textarea
                  id='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='isShared'
                  checked={isShared}
                  onChange={e => setIsShared(e.target.checked)}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='isShared' className='ml-2 block text-sm text-gray-900'>
                  テンプレートを共有する
                </label>
              </div>
            </div>
          </div>

          {/* KPT項目 */}
          <div className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>KPT項目</h2>
            <div className='space-y-6'>
              {/* Keep */}
              <div>
                <h3 className='text-sm font-medium text-gray-900 mb-2'>Keep</h3>
                <form onSubmit={e => handleAddItem('keep', e)} className='flex gap-2 mb-2'>
                  <input
                    type='text'
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='Keepすることを入力'
                  />
                  <button
                    type='submit'
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                  >
                    追加
                  </button>
                </form>
                <ul className='space-y-2'>
                  {keep.map((item, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center bg-indigo-50 p-3 rounded-md'
                    >
                      <span className='text-indigo-900'>{item}</span>
                      <button
                        type='button'
                        onClick={() => handleRemoveItem('keep', index)}
                        className='text-red-600 hover:text-red-800'
                      >
                        削除
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Problem */}
              <div>
                <h3 className='text-sm font-medium text-gray-900 mb-2'>Problem</h3>
                <form onSubmit={e => handleAddItem('problem', e)} className='flex gap-2 mb-2'>
                  <input
                    type='text'
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='Problemを入力'
                  />
                  <button
                    type='submit'
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                  >
                    追加
                  </button>
                </form>
                <ul className='space-y-2'>
                  {problem.map((item, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center bg-red-50 p-3 rounded-md'
                    >
                      <span className='text-red-900'>{item}</span>
                      <button
                        type='button'
                        onClick={() => handleRemoveItem('problem', index)}
                        className='text-red-600 hover:text-red-800'
                      >
                        削除
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Try */}
              <div>
                <h3 className='text-sm font-medium text-gray-900 mb-2'>Try</h3>
                <form onSubmit={e => handleAddItem('try', e)} className='flex gap-2 mb-2'>
                  <input
                    type='text'
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='Tryすることを入力'
                  />
                  <button
                    type='submit'
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                  >
                    追加
                  </button>
                </form>
                <ul className='space-y-2'>
                  {try_.map((item, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center bg-green-50 p-3 rounded-md'
                    >
                      <span className='text-green-900'>{item}</span>
                      <button
                        type='button'
                        onClick={() => handleRemoveItem('try', index)}
                        className='text-red-600 hover:text-red-800'
                      >
                        削除
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* スケジュール設定 */}
          <div className='bg-white shadow rounded-lg p-6'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>スケジュール設定</h2>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='isScheduled'
                  checked={schedule.isScheduled}
                  onChange={e => setSchedule({ ...schedule, isScheduled: e.target.checked })}
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label htmlFor='isScheduled' className='ml-2 block text-sm text-gray-900'>
                  定期的にKPTを自動生成する
                </label>
              </div>

              {schedule.isScheduled && (
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <label htmlFor='frequency' className='block text-sm font-medium text-gray-700'>
                      頻度
                    </label>
                    <select
                      id='frequency'
                      value={schedule.frequency}
                      onChange={e => setSchedule({ ...schedule, frequency: e.target.value })}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    >
                      <option value='daily'>毎日</option>
                      <option value='weekly'>毎週</option>
                      <option value='monthly'>毎月</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='day' className='block text-sm font-medium text-gray-700'>
                      曜日
                    </label>
                    <select
                      id='day'
                      value={schedule.day}
                      onChange={e => setSchedule({ ...schedule, day: e.target.value })}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    >
                      <option value='monday'>月曜日</option>
                      <option value='tuesday'>火曜日</option>
                      <option value='wednesday'>水曜日</option>
                      <option value='thursday'>木曜日</option>
                      <option value='friday'>金曜日</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='time' className='block text-sm font-medium text-gray-700'>
                      時間
                    </label>
                    <input
                      type='time'
                      id='time'
                      value={schedule.time}
                      onChange={e => setSchedule({ ...schedule, time: e.target.value })}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 送信ボタン */}
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-indigo-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-indigo-700'
            >
              テンプレートを作成
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewTemplatePage;
