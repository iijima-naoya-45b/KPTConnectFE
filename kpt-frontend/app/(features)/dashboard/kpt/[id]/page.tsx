/**
 * @file page.tsx
 * @description KPT詳細ページ
 *
 * @example
 * ```tsx
 * <KptDetailPage />
 * ```
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

// KPTアイテムデータの型定義
interface KptItem {
  id: string;
  type: 'keep' | 'problem' | 'try';
  content: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  due_date: string | null;
  assigned_to: string | null;
  emotion_score: number | null;
  impact_score: number | null;
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

// KPTセッション詳細データの型定義
interface KptSessionDetail {
  id: string;
  title: string;
  description: string;
  session_date: string;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  is_template: boolean;
  template_name: string | null;
  tags: string[];
  items_count: number | { keep: number; problem: number; try: number; total: number };
  progress_rate: number;
  average_emotion_score: number | null;
  average_impact_score: number | null;
  kpt_items: KptItem[];
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

// APIレスポンスの型定義
interface KptSessionDetailResponse {
  success: boolean;
  data: KptSessionDetail;
  message: string;
}

const KptDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<KptSessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editItemContent, setEditItemContent] = useState<string>('');
  
  // セッション編集用の状態
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // KPTセッション詳細を取得
  const fetchSessionDetail = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`/api/v1/kpt_sessions/${sessionId}`);
      const result: KptSessionDetailResponse = await response.json();
      
      if (result.success) {
        setSession(result.data);
      } else {
        setError(result.message || 'KPTセッションの取得に失敗しました');
      }
    } catch (err) {
      console.error('KPTセッション詳細取得エラー:', err);
      setError('KPTセッションの取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // ステータス色を取得
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 優先度色を取得
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // タイプ別のアイテムを取得
  const getItemsByType = (type: 'keep' | 'problem' | 'try'): KptItem[] => {
    if (!session) return [];
    return session.kpt_items.filter(item => item.type === type);
  };

  // タイプ別の色を取得
  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'keep':
        return 'border-green-400 bg-green-50';
      case 'problem':
        return 'border-red-400 bg-red-50';
      case 'try':
        return 'border-blue-400 bg-blue-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  // アイテム数を取得（オブジェクト形式とnumber形式の両方に対応）
  const getItemsCount = (items_count: number | { keep: number; problem: number; try: number; total: number }): number => {
    if (typeof items_count === 'number') {
      return items_count;
    }
    return items_count.total || 0;
  };

  // セッションを更新
  const updateSession = async () => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/v1/kpt_sessions/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            title: editTitle,
            description: editDescription,
            tags: editTags
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setSession(result.data);
        setEditMode(false);
        alert('セッションを更新しました');
      } else {
        alert(result.error || 'セッションの更新に失敗しました');
      }
    } catch (error) {
      console.error('セッション更新エラー:', error);
      alert('セッションの更新中にエラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  // セッションを削除
  const deleteSession = async () => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/v1/kpt_sessions/${sessionId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('セッションを削除しました');
        router.push('/dashboard/kpt');
      } else {
        alert(result.error || 'セッションの削除に失敗しました');
      }
    } catch (error) {
      console.error('セッション削除エラー:', error);
      alert('セッションの削除中にエラーが発生しました');
    } finally {
      setSaving(false);
      setShowDeleteDialog(false);
    }
  };

  // アイテムを更新
  const updateItem = async (itemId: string, content: string) => {
    try {
      const response = await fetch(`/api/v1/kpt_items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {
            content: content
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        // セッション詳細を再取得
        fetchSessionDetail();
        setEditingItem(null);
        setEditItemContent('');
        alert('アイテムを更新しました');
      } else {
        alert(result.error || 'アイテムの更新に失敗しました');
      }
    } catch (error) {
      console.error('アイテム更新エラー:', error);
      alert('アイテムの更新中にエラーが発生しました');
    }
  };

  // アイテムを削除
  const deleteItem = async (itemId: string) => {
    if (!confirm('このアイテムを削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/kpt_items/${itemId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // セッション詳細を再取得
        fetchSessionDetail();
        alert('アイテムを削除しました');
      } else {
        alert(result.error || 'アイテムの削除に失敗しました');
      }
    } catch (error) {
      console.error('アイテム削除エラー:', error);
      alert('アイテムの削除中にエラーが発生しました');
    }
  };

  // 編集モードを開始
  const startEdit = () => {
    if (session) {
      setEditTitle(session.title);
      setEditDescription(session.description || '');
      setEditTags(session.tags);
      setEditMode(true);
    }
  };

  // 編集をキャンセル
  const cancelEdit = () => {
    setEditMode(false);
    setEditingItem(null);
    setEditItemContent('');
  };

  // アイテム編集を開始
  const startItemEdit = (itemId: string, content: string) => {
    setEditingItem(itemId);
    setEditItemContent(content);
  };

  // 初期化
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetail();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 pt-16 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          <p className='mt-4 text-gray-600'>KPTセッション詳細を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='bg-red-50 border border-red-200 rounded-md p-4'>
            <p className='text-red-800'>{error}</p>
            <Link
              href='/dashboard/kpt'
              className='mt-4 inline-block text-red-600 hover:text-red-900'
            >
              KPT一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-16'>
      {/* ヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              {editMode ? (
                <div className='space-y-2'>
                  <input
                    type='text'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className='text-2xl font-bold text-gray-900 bg-white border border-gray-300 rounded-md px-2 py-1 w-full'
                    placeholder='セッションタイトル'
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className='text-sm text-gray-500 bg-white border border-gray-300 rounded-md px-2 py-1 w-full'
                    placeholder='説明（オプション）'
                    rows={2}
                  />
                </div>
              ) : (
                <>
                  <h1 className='text-2xl font-bold text-gray-900'>{session.title}</h1>
                  <p className='text-sm text-gray-500 mt-1'>
                    作成日: {session.session_date} | 
                    進捗: {session.progress_rate}% | 
                    アイテム数: {getItemsCount(session.items_count)}
                  </p>
                </>
              )}
            </div>
            <div className='flex space-x-4'>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
              {editMode ? (
                <>
                  <button
                    onClick={updateSession}
                    disabled={saving}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      saving
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {saving ? '保存中...' : '保存'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={saving}
                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400'
                  >
                    キャンセル
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEdit}
                    className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                  >
                    編集
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className='bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700'
                  >
                    削除
                  </button>
                </>
              )}
              <Link
                href='/dashboard/kpt'
                className='text-gray-600 hover:text-gray-900'
              >
                一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* セッション情報 */}
        <div className='bg-white rounded-lg shadow mb-8 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>セッション情報</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div>
              <dt className='text-sm font-medium text-gray-500'>ステータス</dt>
              <dd className='mt-1'>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500'>進捗率</dt>
              <dd className='mt-1 text-sm text-gray-900'>
                <div className='flex items-center'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2 mr-2'>
                    <div
                      className='bg-indigo-600 h-2 rounded-full'
                      style={{ width: `${session.progress_rate}%` }}
                    ></div>
                  </div>
                  {session.progress_rate}%
                </div>
              </dd>
            </div>
            {session.average_emotion_score !== null && session.average_emotion_score !== undefined && (
              <div>
                <dt className='text-sm font-medium text-gray-500'>感情スコア平均</dt>
                <dd className='mt-1 text-sm text-gray-900'>
                  {session.average_emotion_score.toFixed(1)}
                </dd>
              </div>
            )}
            {session.average_impact_score !== null && session.average_impact_score !== undefined && (
              <div>
                <dt className='text-sm font-medium text-gray-500'>影響度スコア平均</dt>
                <dd className='mt-1 text-sm text-gray-900'>
                  {session.average_impact_score.toFixed(1)}
                </dd>
              </div>
            )}
          </div>
          
          {session.description && (
            <div className='mt-4'>
              <dt className='text-sm font-medium text-gray-500'>説明</dt>
              <dd className='mt-1 text-sm text-gray-900'>{session.description}</dd>
            </div>
          )}
          
          {session.tags.length > 0 && (
            <div className='mt-4'>
              <dt className='text-sm font-medium text-gray-500'>タグ</dt>
              <dd className='mt-1'>
                <div className='flex flex-wrap gap-2'>
                  {session.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          )}
        </div>

        {/* KPTアイテム */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Keep */}
          <div className={`bg-white rounded-lg shadow border-l-4 ${getTypeColor('keep')}`}>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Keep ({getItemsByType('keep').length})
              </h3>
              <div className='space-y-3'>
                {getItemsByType('keep').map(item => (
                  <div key={item.id} className='bg-white border border-gray-200 rounded-md p-3'>
                    {editingItem === item.id ? (
                      <div className='space-y-2'>
                        <textarea
                          value={editItemContent}
                          onChange={(e) => setEditItemContent(e.target.value)}
                          className='w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none'
                          rows={2}
                        />
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => updateItem(item.id, editItemContent)}
                            className='bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700'
                          >
                            保存
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(null);
                              setEditItemContent('');
                            }}
                            className='bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-400'
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='flex justify-between items-start mb-2'>
                          <p className='text-sm text-gray-900 flex-1'>{item.content}</p>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => startItemEdit(item.id, item.content)}
                              className='text-blue-600 hover:text-blue-800 text-xs'
                            >
                              編集
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className='text-red-600 hover:text-red-800 text-xs'
                            >
                              削除
                            </button>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        {(item.emotion_score || item.impact_score) && (
                          <div className='flex space-x-4 text-xs text-gray-500'>
                            {item.emotion_score && (
                              <span>感情: {item.emotion_score}/5</span>
                            )}
                            {item.impact_score && (
                              <span>影響: {item.impact_score}/5</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {getItemsByType('keep').length === 0 && (
                  <p className='text-gray-500 text-sm text-center py-4'>
                    Keepアイテムがありません
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Problem */}
          <div className={`bg-white rounded-lg shadow border-l-4 ${getTypeColor('problem')}`}>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Problem ({getItemsByType('problem').length})
              </h3>
              <div className='space-y-3'>
                {getItemsByType('problem').map(item => (
                  <div key={item.id} className='bg-white border border-gray-200 rounded-md p-3'>
                    {editingItem === item.id ? (
                      <div className='space-y-2'>
                        <textarea
                          value={editItemContent}
                          onChange={(e) => setEditItemContent(e.target.value)}
                          className='w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none'
                          rows={2}
                        />
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => updateItem(item.id, editItemContent)}
                            className='bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700'
                          >
                            保存
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(null);
                              setEditItemContent('');
                            }}
                            className='bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-400'
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='flex justify-between items-start mb-2'>
                          <p className='text-sm text-gray-900 flex-1'>{item.content}</p>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => startItemEdit(item.id, item.content)}
                              className='text-blue-600 hover:text-blue-800 text-xs'
                            >
                              編集
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className='text-red-600 hover:text-red-800 text-xs'
                            >
                              削除
                            </button>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        {(item.emotion_score || item.impact_score) && (
                          <div className='flex space-x-4 text-xs text-gray-500'>
                            {item.emotion_score && (
                              <span>感情: {item.emotion_score}/5</span>
                            )}
                            {item.impact_score && (
                              <span>影響: {item.impact_score}/5</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {getItemsByType('problem').length === 0 && (
                  <p className='text-gray-500 text-sm text-center py-4'>
                    Problemアイテムがありません
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Try */}
          <div className={`bg-white rounded-lg shadow border-l-4 ${getTypeColor('try')}`}>
            <div className='p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Try ({getItemsByType('try').length})
              </h3>
              <div className='space-y-3'>
                {getItemsByType('try').map(item => (
                  <div key={item.id} className='bg-white border border-gray-200 rounded-md p-3'>
                    {editingItem === item.id ? (
                      <div className='space-y-2'>
                        <textarea
                          value={editItemContent}
                          onChange={(e) => setEditItemContent(e.target.value)}
                          className='w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none'
                          rows={2}
                        />
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => updateItem(item.id, editItemContent)}
                            className='bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700'
                          >
                            保存
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(null);
                              setEditItemContent('');
                            }}
                            className='bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-400'
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className='flex justify-between items-start mb-2'>
                          <p className='text-sm text-gray-900 flex-1'>{item.content}</p>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => startItemEdit(item.id, item.content)}
                              className='text-blue-600 hover:text-blue-800 text-xs'
                            >
                              編集
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className='text-red-600 hover:text-red-800 text-xs'
                            >
                              削除
                            </button>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        {(item.emotion_score || item.impact_score) && (
                          <div className='flex space-x-4 text-xs text-gray-500'>
                            {item.emotion_score && (
                              <span>感情: {item.emotion_score}/5</span>
                            )}
                            {item.impact_score && (
                              <span>影響: {item.impact_score}/5</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {getItemsByType('try').length === 0 && (
                  <p className='text-gray-500 text-sm text-center py-4'>
                    Tryアイテムがありません
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 削除確認ダイアログ */}
      {showDeleteDialog && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3 text-center'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                <svg className='h-6 w-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-gray-900 mt-2'>セッションを削除</h3>
              <div className='mt-2 px-7 py-3'>
                <p className='text-sm text-gray-500'>
                  「{session?.title}」を削除してもよろしいですか？<br/>
                  この操作は取り消すことができません。
                </p>
              </div>
              <div className='items-center px-4 py-3'>
                <div className='flex space-x-4'>
                  <button
                    onClick={deleteSession}
                    disabled={saving}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                      saving
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {saving ? '削除中...' : '削除する'}
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    disabled={saving}
                    className='flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400'
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KptDetailPage;
