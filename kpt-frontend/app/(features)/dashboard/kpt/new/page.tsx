/**
 * @file page.tsx
 * @description 新規KPT作成ページ（複数セッション対応）
 * 
 * @overview
 * - 新規KPTセッション作成フォーム
 * - 同じ日付に複数セッション作成機能
 * - Keep/Problem/Try アイテムの追加・削除
 * - バリデーション機能
 * - カレンダーからの日付指定対応
 * - 作成済みセッション一覧表示
 * - フリー入力タイトル設定
 * 
 * @example
 * ```tsx
 * <NewKptPage />
 * ```
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';

// フォームデータの型定義
interface KptFormData {
  title: string;
  session_date: string;
  description: string;
  keep: { content: string }[];
  problem: { content: string }[];
  try: { content: string }[];
}

// 作成済みセッションの型定義
interface CreatedSession {
  id: string;
  title: string;
  description: string;
  session_date: string;
  status: string;
  items_count: number;
  created_at: string;
}

const NewKptPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newKeepItem, setNewKeepItem] = useState('');
  const [newProblemItem, setNewProblemItem] = useState('');
  const [newTryItem, setNewTryItem] = useState('');
  const [createdSessions, setCreatedSessions] = useState<CreatedSession[]>([]);
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastCreatedSession, setLastCreatedSession] = useState<CreatedSession | null>(null);

  // URLパラメータから日付を取得
  const dateParam = searchParams.get('date');
  
  // デフォルト日付の設定（URLパラメータがあればそれを使用、なければ今日）
  const getDefaultDate = (): string => {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      return dateParam;
    }
    // タイムゾーンの問題を避けるため、ローカルタイムゾーンで今日の日付を構築
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // デフォルトタイトルの生成
  const generateDefaultTitle = (sessionDate: string, sessionCount: number = 0): string => {
    const date = new Date(sessionDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    if (sessionCount === 0) {
      return `${formattedDate}の振り返り`;
    } else if (sessionCount === 1) {
      return `${formattedDate}の振り返り (2回目)`;
    } else {
      return `${formattedDate}の振り返り (${sessionCount + 1}回目)`;
    }
  };

  // react-hook-form の設定
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<KptFormData>({
    defaultValues: {
      title: '',
      session_date: getDefaultDate(),
      description: '',
      keep: [],
      problem: [],
      try: []
    }
  });

  // 選択された日付を監視
  const selectedDate = watch('session_date');

  // 同じ日付の既存セッションを取得
  const fetchExistingSessions = async (date: string) => {
    try {
      const response = await fetch(`/api/v1/kpt_sessions?session_date=${date}`);
      const result = await response.json();
      
      if (result.success) {
        setCreatedSessions(result.data.sessions || []);
        
        // デフォルトタイトルを設定
        const sessionCount = result.data.sessions?.length || 0;
        const defaultTitle = generateDefaultTitle(date, sessionCount);
        setValue('title', defaultTitle);
      }
    } catch (error) {
      console.error('既存セッション取得エラー:', error);
    }
  };

  // URLパラメータが変更された時の処理
  useEffect(() => {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      setValue('session_date', dateParam);
      fetchExistingSessions(dateParam);
    }
  }, [dateParam, setValue]);

  // 日付が変更された時の処理
  useEffect(() => {
    if (selectedDate) {
      fetchExistingSessions(selectedDate);
    }
  }, [selectedDate]);

  // 配列フィールドの管理
  const {
    fields: keepFields,
    append: appendKeep,
    remove: removeKeep
  } = useFieldArray({
    control,
    name: 'keep'
  });

  const {
    fields: problemFields,
    append: appendProblem,
    remove: removeProblem
  } = useFieldArray({
    control,
    name: 'problem'
  });

  const {
    fields: tryFields,
    append: appendTry,
    remove: removeTry
  } = useFieldArray({
    control,
    name: 'try'
  });

  // アイテム追加処理
  const handleAddKeep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeepItem.trim()) return;
    appendKeep({ content: newKeepItem.trim() });
    setNewKeepItem('');
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemItem.trim()) return;
    appendProblem({ content: newProblemItem.trim() });
    setNewProblemItem('');
  };

  const handleAddTry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTryItem.trim()) return;
    appendTry({ content: newTryItem.trim() });
    setNewTryItem('');
  };

  // 新しいセッション作成を開始
  const handleCreateAnother = () => {
    // フォームをリセット
    reset({
      title: generateDefaultTitle(selectedDate, createdSessions.length),
      session_date: selectedDate,
      description: '',
      keep: [],
      problem: [],
      try: []
    });
    
    // 入力フィールドもリセット
    setNewKeepItem('');
    setNewProblemItem('');
    setNewTryItem('');
    setShowSuccessMessage(false);
    setLastCreatedSession(null);
    setIsMultipleMode(true);
  };

  // 日付フォーマット関数
  const formatDisplayDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const weekday = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
      return `${year}年${month}月${day}日 (${weekday})`;
    } catch {
      return dateString;
    }
  };

  // フォーム送信処理
  const onSubmit = async (data: KptFormData) => {
    try {
      console.log('KPTデータ:', data);
      
      // セッション作成
      const sessionResponse = await fetch('/api/v1/kpt_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            title: data.title,
            description: data.description,
            session_date: data.session_date,
            status: 'draft'
          }
        })
      });

      const sessionResult = await sessionResponse.json();

      if (!sessionResult.success) {
        throw new Error(sessionResult.error || 'セッションの作成に失敗しました');
      }

      const sessionId = sessionResult.data.id;
      let totalItems = 0;

      // Keep項目を作成
      for (const keepItem of data.keep) {
        const itemResponse = await fetch('/api/v1/kpt_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: {
              kpt_session_id: sessionId,
              type: 'keep',
              content: keepItem.content,
              priority: 'medium',
              status: 'open'
            }
          })
        });

        const itemResult = await itemResponse.json();
        if (itemResult.success) {
          totalItems++;
        } else {
          console.error('Keep項目作成エラー:', itemResult);
        }
      }

      // Problem項目を作成
      for (const problemItem of data.problem) {
        const itemResponse = await fetch('/api/v1/kpt_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: {
              kpt_session_id: sessionId,
              type: 'problem',
              content: problemItem.content,
              priority: 'medium',
              status: 'open'
            }
          })
        });

        const itemResult = await itemResponse.json();
        if (itemResult.success) {
          totalItems++;
        } else {
          console.error('Problem項目作成エラー:', itemResult);
        }
      }

      // Try項目を作成
      for (const tryItem of data.try) {
        const itemResponse = await fetch('/api/v1/kpt_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: {
              kpt_session_id: sessionId,
              type: 'try',
              content: tryItem.content,
              priority: 'medium',
              status: 'open'
            }
          })
        });

        const itemResult = await itemResponse.json();
        if (itemResult.success) {
          totalItems++;
        } else {
          console.error('Try項目作成エラー:', itemResult);
        }
      }

      // 作成されたセッション情報を保存
      const newSession: CreatedSession = {
        id: sessionId,
        title: data.title,
        description: data.description,
        session_date: data.session_date,
        status: 'draft',
        items_count: totalItems,
        created_at: new Date().toISOString()
      };

      setLastCreatedSession(newSession);
      setShowSuccessMessage(true);
      
      // 既存セッション一覧を更新
      await fetchExistingSessions(data.session_date);
      
      // 複数作成モードでない場合は詳細ページに遷移
      if (!isMultipleMode) {
        setTimeout(() => {
          router.push(`/dashboard/kpt/${sessionId}`);
        }, 2000);
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('KPTセッションの作成に失敗しました。もう一度お試しください。');
    }
  };

  // キャンセル処理
  const handleCancel = () => {
    if (confirm('作成をキャンセルしますか？入力内容は失われます。')) {
      router.push('/dashboard/calendar');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-16'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                {isMultipleMode ? '追加KPT作成' : '新規KPT作成'}
              </h1>
              <p className='text-sm text-gray-500 mt-1'>
                {dateParam ? (
                  <>
                    📅 {formatDisplayDate(selectedDate)} の振り返りを作成
                    <span className='ml-2 text-indigo-600'>（カレンダーから選択）</span>
                    {createdSessions.length > 0 && (
                      <span className='ml-2 text-green-600'>
                        （既に{createdSessions.length}件作成済み）
                      </span>
                    )}
                  </>
                ) : (
                  '新しいKPTセッションを作成します'
                )}
              </p>
            </div>
            <div className='flex space-x-2'>
              <button
                type='button'
                onClick={handleCancel}
                className='text-gray-600 hover:text-gray-900'
              >
                キャンセル
              </button>
              <Link
                href='/dashboard/calendar'
                className='text-gray-600 hover:text-gray-900'
              >
                カレンダーに戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* メインフォーム */}
          <div className='lg:col-span-2'>
            {/* 成功メッセージ */}
            {showSuccessMessage && lastCreatedSession && (
              <div className='bg-green-50 border border-green-200 rounded-md p-4 mb-6'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <div className='text-green-400'>✅</div>
                  </div>
                  <div className='ml-3'>
                    <h3 className='text-sm font-medium text-green-800'>
                      KPTセッションを作成しました！
                    </h3>
                    <div className='mt-2 text-sm text-green-700'>
                      <p>「{lastCreatedSession.title}」({lastCreatedSession.items_count}項目)</p>
                    </div>
                    <div className='mt-4 flex space-x-3'>
                      <button
                        onClick={handleCreateAnother}
                        className='bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-md text-sm font-medium'
                      >
                        同じ日付に追加でKPTを作成
                      </button>
                      <Link
                        href={`/dashboard/kpt/${lastCreatedSession.id}`}
                        className='bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-2 rounded-md text-sm font-medium'
                      >
                        作成したKPTを確認
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
              {/* 基本情報 */}
              <div className='bg-white shadow rounded-lg p-6'>
                <h2 className='text-lg font-medium text-gray-900 mb-4'>基本情報</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* タイトル（フリー入力） */}
                  <div className='md:col-span-2'>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>
                      タイトル <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='title'
                      {...register('title', { required: 'タイトルは必須です' })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='例: 朝の振り返り、夜の振り返り、プロジェクト振り返り'
                    />
                    <p className='mt-1 text-sm text-gray-500'>
                      💡 自由にタイトルを設定できます。同じ日付に複数のKPTを作成する場合は、識別しやすい名前をつけてください。
                    </p>
                    {errors.title && (
                      <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
                    )}
                  </div>

                  {/* セッション日付 */}
                  <div>
                    <label htmlFor='session_date' className='block text-sm font-medium text-gray-700 mb-2'>
                      実施日 <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='date'
                      id='session_date'
                      {...register('session_date', { required: '実施日は必須です' })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                    />
                    {errors.session_date && (
                      <p className='mt-1 text-sm text-red-600'>{errors.session_date.message}</p>
                    )}
                    {dateParam && (
                      <p className='mt-1 text-sm text-indigo-600'>
                        📅 カレンダーから選択された日付が設定されています
                      </p>
                    )}
                  </div>

                  {/* 説明 */}
                  <div className='md:col-span-2'>
                    <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
                      説明・メモ
                    </label>
                    <textarea
                      id='description'
                      {...register('description')}
                      rows={3}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                      placeholder='このKPTセッションの背景や目的を記載してください（任意）'
                    />
                  </div>
                </div>
              </div>

              {/* Keep項目 */}
              <div className='bg-white shadow rounded-lg p-6'>
                <h2 className='text-lg font-medium text-green-600 mb-4'>💚 Keep（良かったこと・続けたいこと）</h2>
                
                {/* 新規アイテム追加フォーム */}
                <form onSubmit={handleAddKeep} className='mb-4'>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newKeepItem}
                      onChange={(e) => setNewKeepItem(e.target.value)}
                      placeholder='良かったことを入力してください'
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
                    />
                    <button
                      type='submit'
                      className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                    >
                      追加
                    </button>
                  </div>
                </form>

                {/* Keep項目一覧 */}
                <div className='space-y-2'>
                  {keepFields.map((field, index) => (
                    <div key={field.id} className='flex items-center gap-2 p-3 bg-green-50 rounded-md'>
                      <span className='flex-1 text-sm'>{field.content}</span>
                      <button
                        type='button'
                        onClick={() => removeKeep(index)}
                        className='text-red-500 hover:text-red-700'
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  {keepFields.length === 0 && (
                    <p className='text-gray-500 text-sm text-center py-4'>
                      Keep項目がありません。良かったことを追加してください。
                    </p>
                  )}
                </div>
              </div>

              {/* Problem項目 */}
              <div className='bg-white shadow rounded-lg p-6'>
                <h2 className='text-lg font-medium text-red-600 mb-4'>💔 Problem（問題・改善すべきこと）</h2>
                
                {/* 新規アイテム追加フォーム */}
                <form onSubmit={handleAddProblem} className='mb-4'>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newProblemItem}
                      onChange={(e) => setNewProblemItem(e.target.value)}
                      placeholder='問題点や改善すべき点を入力してください'
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500'
                    />
                    <button
                      type='submit'
                      className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    >
                      追加
                    </button>
                  </div>
                </form>

                {/* Problem項目一覧 */}
                <div className='space-y-2'>
                  {problemFields.map((field, index) => (
                    <div key={field.id} className='flex items-center gap-2 p-3 bg-red-50 rounded-md'>
                      <span className='flex-1 text-sm'>{field.content}</span>
                      <button
                        type='button'
                        onClick={() => removeProblem(index)}
                        className='text-red-500 hover:text-red-700'
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  {problemFields.length === 0 && (
                    <p className='text-gray-500 text-sm text-center py-4'>
                      Problem項目がありません。改善すべき点を追加してください。
                    </p>
                  )}
                </div>
              </div>

              {/* Try項目 */}
              <div className='bg-white shadow rounded-lg p-6'>
                <h2 className='text-lg font-medium text-blue-600 mb-4'>💙 Try（次に挑戦すること）</h2>
                
                {/* 新規アイテム追加フォーム */}
                <form onSubmit={handleAddTry} className='mb-4'>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newTryItem}
                      onChange={(e) => setNewTryItem(e.target.value)}
                      placeholder='次に試してみたいことを入力してください'
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                      追加
                    </button>
                  </div>
                </form>

                {/* Try項目一覧 */}
                <div className='space-y-2'>
                  {tryFields.map((field, index) => (
                    <div key={field.id} className='flex items-center gap-2 p-3 bg-blue-50 rounded-md'>
                      <span className='flex-1 text-sm'>{field.content}</span>
                      <button
                        type='button'
                        onClick={() => removeTry(index)}
                        className='text-red-500 hover:text-red-700'
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  {tryFields.length === 0 && (
                    <p className='text-gray-500 text-sm text-center py-4'>
                      Try項目がありません。挑戦したいことを追加してください。
                    </p>
                  )}
                </div>
              </div>

              {/* 送信ボタン */}
              <div className='flex justify-end space-x-4'>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  キャンセル
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? '作成中...' : 'KPTセッションを作成'}
                </button>
              </div>
            </form>
          </div>

          {/* サイドバー：作成済みセッション一覧 */}
          <div className='lg:col-span-1'>
            <div className='bg-white shadow rounded-lg p-6 sticky top-24'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>
                {formatDisplayDate(selectedDate)} の作成済みKPT
              </h3>
              
              {createdSessions.length > 0 ? (
                <div className='space-y-3'>
                  {createdSessions.map((session, index) => (
                    <div key={session.id} className='border border-gray-200 rounded-md p-3 hover:bg-gray-50'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h4 className='text-sm font-medium text-gray-900 mb-1'>
                            {session.title}
                          </h4>
                          <p className='text-xs text-gray-500 mb-2'>
                            {session.items_count}項目 • {session.status === 'draft' ? '下書き' : session.status}
                          </p>
                          {session.description && (
                            <p className='text-xs text-gray-600 truncate'>
                              {session.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='mt-2 flex space-x-2'>
                        <Link
                          href={`/dashboard/kpt/${session.id}`}
                          className='text-xs text-indigo-600 hover:text-indigo-900'
                        >
                          詳細
                        </Link>
                        <Link
                          href={`/dashboard/kpt/${session.id}/edit`}
                          className='text-xs text-gray-600 hover:text-gray-900'
                        >
                          編集
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <p className='text-gray-500 text-sm mb-2'>
                    この日付にはまだKPTセッションがありません
                  </p>
                  <p className='text-xs text-gray-400'>
                    左のフォームから最初のKPTを作成してください
                  </p>
                </div>
              )}

              {/* 作成統計 */}
              {createdSessions.length > 0 && (
                <div className='mt-6 pt-4 border-t border-gray-200'>
                  <div className='text-center'>
                    <div className='text-lg font-semibold text-indigo-600'>
                      {createdSessions.length}
                    </div>
                    <div className='text-sm text-gray-500'>作成済みセッション</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewKptPage;
