/**
 * @file page.tsx
 * @description Todo管理ボードページ（カンバン形式）
 * 
 * @overview
 * - カンバン形式でTodo項目を管理
 * - ステータス別（未着手・進行中・完了）でカラム分け
 * - ドラッグ&ドロップ機能
 * - Todo項目の作成・編集・削除
 * - 進捗状況の可視化
 * - From-To期間設定機能
 * - 分析タブでの一覧管理
 * 
 * @example
 * ```tsx
 * <TodoBoardPage />
 * ```
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

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

// カラムの型定義
interface BoardColumn {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'completed';
  color: string;
  items: TodoItem[];
}

// API レスポンスの型定義
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

type ActiveTab = 'board' | 'analytics';

const TodoBoardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 状態管理
  const [activeTab, setActiveTab] = useState<ActiveTab>('board');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [defaultSessionId, setDefaultSessionId] = useState<string>('');
  const [columns, setColumns] = useState<BoardColumn[]>([
    { id: 'open', title: '未着手', status: 'open', color: 'bg-gray-100 border-gray-300', items: [] },
    { id: 'in_progress', title: '進行中', status: 'in_progress', color: 'bg-blue-100 border-blue-300', items: [] },
    { id: 'completed', title: '完了', status: 'completed', color: 'bg-green-100 border-green-300', items: [] }
  ]);
  
  // 全アイテムのリスト（分析タブ用）
  const [allItems, setAllItems] = useState<TodoItem[]>([]);
  
  // モーダル状態
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<'open' | 'in_progress' | 'completed'>('open');
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null);
  
  // フォーム状態
  const [newItemForm, setNewItemForm] = useState({
    content: '',
    type: 'todo' as const,
    priority: 'medium' as 'high' | 'medium' | 'low',
    start_date: '',
    end_date: '',
    notes: ''
  });

  const [editItemForm, setEditItemForm] = useState({
    content: '',
    type: 'todo' as const,
    priority: 'medium' as 'high' | 'medium' | 'low',
    start_date: '',
    end_date: '',
    notes: '',
    status: 'open' as 'open' | 'in_progress' | 'completed' | 'cancelled'
  });

  // タブ変更ハンドラー（URLも更新）
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.replace(`/dashboard/calendar?${params.toString()}`);
  };

  // URLパラメータからタブを設定
  useEffect(() => {
    const tabParam = searchParams.get('tab') as ActiveTab;
    if (tabParam && ['board', 'analytics'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Todo項目を取得
  const fetchTodoItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      // KPT項目APIを使用してTodo項目を取得（typeでフィルタリング）
      const response = await fetch('/api/v1/kpt_items?type=todo');
      const result: ApiResponse<{ items: TodoItem[] }> = await response.json();
      
      if (result.success) {
        const items = result.data.items;
        setAllItems(items); // 全アイテムを保存
        
        // ステータス別にアイテムを分類
        const openItems = items.filter(item => item.status === 'open');
        const inProgressItems = items.filter(item => item.status === 'in_progress');
        const completedItems = items.filter(item => item.status === 'completed');
        
        setColumns(prev => [
          { ...prev[0], items: openItems },
          { ...prev[1], items: inProgressItems },
          { ...prev[2], items: completedItems }
        ]);
      } else {
        setError(result.error || 'Todo項目の取得に失敗しました');
      }
    } catch (err) {
      console.error('Todo項目取得エラー:', err);
      setError('Todo項目の取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // デフォルトのセッションを取得または作成
  const getOrCreateDefaultSession = async (): Promise<string> => {
    try {
      // まず既存のセッションを探す
      const response = await fetch('/api/v1/kpt_sessions?per_page=1');
      const result = await response.json();
      
      if (result.success && result.data.sessions.length > 0) {
        return result.data.sessions[0].id;
      }
      
      // セッションがない場合は新規作成
      const createResponse = await fetch('/api/v1/kpt_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: {
            title: 'Todo管理ボード用セッション',
            description: 'Todo管理ダッシュボード用のデフォルトセッション',
            session_date: new Date().toISOString().split('T')[0],
            status: 'active'
          }
        })
      });
      
      const createResult = await createResponse.json();
      if (createResult.success) {
        return createResult.data.id;
      }
      
      throw new Error('セッションの作成に失敗しました');
    } catch (err) {
      console.error('セッション取得/作成エラー:', err);
      throw err;
    }
  };

  // 新しいTodo項目を作成
  const createTodoItem = async () => {
    try {
      if (!newItemForm.content.trim()) {
        setError('内容を入力してください');
        return;
      }

      if (newItemForm.start_date && newItemForm.end_date) {
        if (!validateDateRange(newItemForm.start_date, newItemForm.end_date)) {
          setError('終了日は開始日以降の日付を設定してください');
          return;
        }
      }

      if (!defaultSessionId) {
        const sessionId = await getOrCreateDefaultSession();
        setDefaultSessionId(sessionId);
      }

      const response = await fetch('/api/v1/kpt_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {
            kpt_session_id: defaultSessionId,
            type: 'todo',
            content: newItemForm.content,
            priority: newItemForm.priority,
            status: selectedColumn,
            start_date: newItemForm.start_date || null,
            end_date: newItemForm.end_date || null,
            notes: newItemForm.notes || null
          }
        })
      });

      const result = await response.json();
      if (result.success) {
        await fetchTodoItems(); // リストを再取得
        setShowNewItemModal(false);
        setNewItemForm({ content: '', type: 'todo', priority: 'medium', start_date: '', end_date: '', notes: '' });
        setError('');
      } else {
        setError(result.error || 'Todo項目の作成に失敗しました');
      }
    } catch (err) {
      console.error('Todo項目作成エラー:', err);
      setError('Todo項目の作成中にエラーが発生しました');
    }
  };

  // Todo項目を更新
  const updateTodoItem = async () => {
    try {
      if (!editingItem || !editItemForm.content.trim()) {
        setError('内容を入力してください');
        return;
      }

      if (editItemForm.start_date && editItemForm.end_date) {
        if (!validateDateRange(editItemForm.start_date, editItemForm.end_date)) {
          setError('終了日は開始日以降の日付を設定してください');
          return;
        }
      }

      const response = await fetch(`/api/v1/kpt_items/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {
            content: editItemForm.content,
            priority: editItemForm.priority,
            status: editItemForm.status,
            start_date: editItemForm.start_date || null,
            end_date: editItemForm.end_date || null,
            notes: editItemForm.notes || null
          }
        })
      });

      const result = await response.json();
      if (result.success) {
        await fetchTodoItems(); // リストを再取得
        setShowEditItemModal(false);
        setEditingItem(null);
        setError('');
      } else {
        setError(result.error || 'Todo項目の更新に失敗しました');
      }
    } catch (err) {
      console.error('Todo項目更新エラー:', err);
      setError('Todo項目の更新中にエラーが発生しました');
    }
  };

  // アイテムのステータスを更新（ドラッグ&ドロップ用）
  const updateItemStatus = async (itemId: string, newStatus: 'open' | 'in_progress' | 'completed') => {
    try {
      const response = await fetch(`/api/v1/kpt_items/${itemId}/update_status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      const result = await response.json();
      if (result.success) {
        await fetchTodoItems(); // リストを再取得
      } else {
        setError(result.error || 'ステータスの更新に失敗しました');
      }
    } catch (err) {
      console.error('ステータス更新エラー:', err);
      setError('ステータス更新中にエラーが発生しました');
    }
  };

  // アイテムのステータスを直接更新
  const updateItemStatusDirect = async (itemId: string, newStatus: 'open' | 'in_progress' | 'completed' | 'cancelled') => {
    try {
      const response = await fetch(`/api/v1/kpt_items/${itemId}/update_status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      const result = await response.json();
      if (result.success) {
        await fetchTodoItems(); // リストを再取得
        setError('');
      } else {
        setError(result.error || 'ステータスの更新に失敗しました');
      }
    } catch (err) {
      console.error('ステータス更新エラー:', err);
      setError('ステータス更新中にエラーが発生しました');
    }
  };

  // Todo項目を削除
  const deleteTodoItem = async (itemId: string) => {
    if (!confirm('この項目を削除しますか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/kpt_items/${itemId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        await fetchTodoItems(); // リストを再取得
        setError('');
      } else {
        setError(result.error || 'Todo項目の削除に失敗しました');
      }
    } catch (err) {
      console.error('Todo項目削除エラー:', err);
      setError('Todo項目の削除中にエラーが発生しました');
    }
  };

  // 優先度の表示名を取得
  const getPriorityDisplayName = (priority: 'high' | 'medium' | 'low'): string => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '中';
    }
  };

  // 優先度の色を取得
  const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // ステータスの色を取得
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'open': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 期間の進捗状況を計算（現在はdue_dateのみ使用）
  const getDateProgress = (due_date?: string): { progress: number; status: 'not-started' | 'in-progress' | 'completed' | 'overdue' } => {
    // 現時点では期間設定機能は表示のみ（バックエンド未対応）
    if (!due_date) {
      return { progress: 0, status: 'not-started' };
    }

    const now = new Date();
    const end = new Date(due_date);

    if (now > end) {
      return { progress: 100, status: 'overdue' };
    }

    // 期限までの日数で簡易進捗計算
    const daysUntilDue = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 0) {
      return { progress: 100, status: 'overdue' };
    } else if (daysUntilDue <= 3) {
      return { progress: 75, status: 'in-progress' };
    } else if (daysUntilDue <= 7) {
      return { progress: 50, status: 'in-progress' };
    } else {
      return { progress: 25, status: 'in-progress' };
    }
  };

  // 期間表示用のフォーマット（現在は期限のみ）
  const formatDateRange = (due_date?: string): string => {
    if (!due_date) return '';
    
    const end = new Date(due_date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
    return `期限: ${end}`;
  };

  // ドラッグ開始
  const handleDragStart = (e: React.DragEvent, item: TodoItem) => {
    e.dataTransfer.setData('text/plain', item.id);
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ドロップ
  const handleDrop = (e: React.DragEvent, targetStatus: 'open' | 'in_progress' | 'completed') => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      updateItemStatus(itemId, targetStatus);
    }
  };

  // 日付範囲のバリデーション
  const validateDateRange = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  };

  // 今日の日付を取得
  const getTodayString = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  // 新規アイテムモーダルを開く
  const openNewItemModal = (status: 'open' | 'in_progress' | 'completed') => {
    setSelectedColumn(status);
    setNewItemForm({ 
      content: '', 
      type: 'todo', 
      priority: 'medium', 
      start_date: getTodayString(), 
      end_date: '', 
      notes: '' 
    });
    setShowNewItemModal(true);
    setError('');
  };

  // 分析タブ用の新規アイテムモーダルを開く
  const openNewItemModalForAnalytics = () => {
    setSelectedColumn('open');
    setNewItemForm({ 
      content: '', 
      type: 'todo', 
      priority: 'medium', 
      start_date: getTodayString(), 
      end_date: '', 
      notes: '' 
    });
    setShowNewItemModal(true);
    setError('');
  };

  // 編集モーダルを開く
  const openEditItemModal = (item: TodoItem) => {
    setEditingItem(item);
    setEditItemForm({
      content: item.content,
      type: 'todo',
      priority: item.priority,
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      notes: item.notes || '',
      status: item.status
    });
    setShowEditItemModal(true);
    setError('');
  };

  // 初期化
  useEffect(() => {
    const initializeData = async () => {
      try {
        const sessionId = await getOrCreateDefaultSession();
        setDefaultSessionId(sessionId);
        await fetchTodoItems();
      } catch (err) {
        console.error('初期化エラー:', err);
        setError('データの初期化中にエラーが発生しました');
      }
    };

    initializeData();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* ページヘッダー */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Todo管理ダッシュボード</h1>
              <p className='mt-2 text-gray-600'>優先度別でTodo項目を管理・追跡できます（期間設定・ドラッグ&ドロップ対応）</p>
            </div>
            <div className='flex space-x-2'>
              <button
                onClick={() => activeTab === 'board' ? openNewItemModal('open') : openNewItemModalForAnalytics()}
                className='bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
              >
                + 新規作成
              </button>
              <Link
                href='/calendar'
                className='bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700'
              >
                📅 カレンダー表示
              </Link>
              <Link
                href='/dashboard'
                className='text-gray-600 hover:text-gray-900 px-3 py-2 text-sm'
              >
                ダッシュボードに戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto'>
            <button
              onClick={() => handleTabChange('board')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'board'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 ボード管理
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 分析・一覧
            </button>
          </nav>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4 mb-6'>
            <p className='text-red-800'>{error}</p>
          </div>
        )}

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        ) : (
          <>
            {/* ボードタブ */}
            {activeTab === 'board' && (
              /* カンバンボード */
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {columns.map((column) => (
                  <div
                    key={column.id}
                    onDrop={(e) => handleDrop(e, column.status)}
                    onDragOver={handleDragOver}
                    className={`min-h-[400px] p-4 border-2 border-dashed rounded-lg transition-colors duration-200 ${column.color}`}
                  >
                    {/* カラムヘッダー */}
                    <div className='flex justify-between items-center mb-4'>
                      <div>
                        <h2 className='text-lg font-semibold text-gray-900'>{column.title}</h2>
                        <p className='text-sm text-gray-600'>{column.items.length}件</p>
                      </div>
                      <button
                        onClick={() => openNewItemModal(column.status)}
                        className='bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-md border border-gray-300 transition-colors duration-200'
                        title='カードを追加'
                      >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                        </svg>
                      </button>
                    </div>

                    {/* Todo項目カード */}
                    <div className='space-y-3'>
                      {column.items.map((item) => {
                        const dateProgress = getDateProgress(item.due_date);
                        const dateRange = formatDateRange(item.due_date);

                        return (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-shadow duration-200'
                          >
                            {/* カードヘッダー */}
                            <div className='flex justify-between items-start mb-2'>
                              <div className='flex items-center space-x-2'>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                  {getPriorityDisplayName(item.priority)}
                                </span>
                                <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} title={item.status}></div>
                              </div>
                              <div className='flex space-x-1'>
                                <button
                                  onClick={() => openEditItemModal(item)}
                                  className='text-gray-400 hover:text-gray-600'
                                  title='編集'
                                >
                                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => deleteTodoItem(item.id)}
                                  className='text-red-400 hover:text-red-600'
                                  title='削除'
                                >
                                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* カード本文 */}
                            <p className='text-sm text-gray-900 mb-3'>{item.content}</p>

                            {/* 期間表示 */}
                            {dateRange && (
                              <div className='mb-3'>
                                <div className='flex items-center justify-between mb-1'>
                                  <span className='text-xs text-gray-500'>📅 {dateRange}</span>
                                  {dateProgress.progress > 0 && (
                                    <span className='text-xs text-gray-500'>
                                      {Math.round(dateProgress.progress)}%
                                    </span>
                                  )}
                                </div>
                                {dateProgress.progress > 0 && (
                                  <div className='w-full bg-gray-200 rounded-full h-1.5'>
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        dateProgress.status === 'overdue' ? 'bg-red-500' : 
                                        dateProgress.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                                      }`}
                                      style={{ width: `${dateProgress.progress}%` }}
                                    ></div>
                                  </div>
                                )}
                                {dateProgress.status === 'overdue' && (
                                  <span className='text-xs text-red-600 font-medium'>⚠️ 期限超過</span>
                                )}
                              </div>
                            )}

                            {/* メタ情報 */}
                            <div className='space-y-2'>
                              {item.session_title && (
                                <p className='text-xs text-gray-500'>
                                  セッション: {item.session_title}
                                </p>
                              )}

                              {item.notes && (
                                <p className='text-xs text-gray-600 bg-gray-50 p-2 rounded'>
                                  📝 {item.notes}
                                </p>
                              )}

                              {/* ステータス更新ボタン */}
                              <div className='flex space-x-2 pt-2'>
                                {item.status !== 'completed' && (
                                  <button
                                    onClick={() => updateItemStatus(item.id, 'completed')}
                                    className='text-xs bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded'
                                  >
                                    完了
                                  </button>
                                )}
                                {item.status === 'open' && (
                                  <button
                                    onClick={() => updateItemStatus(item.id, 'in_progress')}
                                    className='text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded'
                                  >
                                    進行中
                                  </button>
                                )}
                                {item.status === 'in_progress' && (
                                  <button
                                    onClick={() => updateItemStatus(item.id, 'open')}
                                    className='text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded'
                                  >
                                    未着手に戻す
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* 空の状態 */}
                      {column.items.length === 0 && (
                        <div className='text-center py-8'>
                          <p className='text-gray-500 text-sm mb-4'>
                            {column.title}の項目がありません
                          </p>
                          <button
                            onClick={() => openNewItemModal(column.status)}
                            className='text-indigo-600 hover:text-indigo-900 text-sm font-medium'
                          >
                            + カードを追加
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 分析タブ */}
            {activeTab === 'analytics' && (
              <div className='space-y-6'>
                {/* 統計情報 */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                  <div className='bg-white rounded-lg shadow p-4'>
                    <div className='text-2xl font-bold text-indigo-600'>{allItems.length}</div>
                    <div className='text-sm text-gray-500'>総項目数</div>
                  </div>
                  <div className='bg-white rounded-lg shadow p-4'>
                    <div className='text-2xl font-bold text-green-600'>
                      {allItems.filter(item => item.status === 'completed').length}
                    </div>
                    <div className='text-sm text-gray-500'>完了項目</div>
                  </div>
                  <div className='bg-white rounded-lg shadow p-4'>
                    <div className='text-2xl font-bold text-yellow-600'>
                      {allItems.filter(item => item.status === 'in_progress').length}
                    </div>
                    <div className='text-sm text-gray-500'>進行中</div>
                  </div>
                  <div className='bg-white rounded-lg shadow p-4'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {allItems.filter(item => item.status === 'open').length}
                    </div>
                    <div className='text-sm text-gray-500'>未着手</div>
                  </div>
                </div>

                {/* Todo項目一覧テーブル */}
                <div className='bg-white rounded-lg shadow'>
                  <div className='px-4 py-5 sm:p-6'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                      Todo項目一覧 ({allItems.length}件)
                    </h3>
                    
                    {allItems.length === 0 ? (
                      <div className='text-center py-8'>
                        <p className='text-gray-500 mb-4'>Todo項目がありません。</p>
                        <button
                          onClick={openNewItemModalForAnalytics}
                          className='bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700'
                        >
                          最初の項目を作成
                        </button>
                      </div>
                    ) : (
                      <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                タイプ
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                内容
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                優先度
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                ステータス
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                期間
                              </th>
                              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                操作
                              </th>
                            </tr>
                          </thead>
                          <tbody className='bg-white divide-y divide-gray-200'>
                            {allItems.map((item) => {
                              const dateRange = formatDateRange(item.due_date);
                              return (
                                <tr key={item.id} className='hover:bg-gray-50'>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                                      {getPriorityDisplayName(item.priority)}
                                    </span>
                                  </td>
                                  <td className='px-6 py-4'>
                                    <div className='text-sm text-gray-900'>{item.content}</div>
                                    {item.notes && (
                                      <div className='text-sm text-gray-500'>📝 {item.notes}</div>
                                    )}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                      {getStatusColor(item.status)}
                                    </span>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center'>
                                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)} mr-2`}></div>
                                      <span className='text-sm text-gray-900'>
                                        {item.status === 'open' ? '未着手' :
                                         item.status === 'in_progress' ? '進行中' :
                                         item.status === 'completed' ? '完了' : 'キャンセル'}
                                      </span>
                                    </div>
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {dateRange || '-'}
                                  </td>
                                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2'>
                                    <button
                                      onClick={() => openEditItemModal(item)}
                                      className='text-indigo-600 hover:text-indigo-900'
                                    >
                                      編集
                                    </button>
                                    <button
                                      onClick={() => deleteTodoItem(item.id)}
                                      className='text-red-600 hover:text-red-900'
                                    >
                                      削除
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* 新規作成モーダル */}
      {showNewItemModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>新しいTodo項目を追加</h3>
              
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>内容 *</label>
                  <textarea
                    value={newItemForm.content}
                    onChange={(e) => setNewItemForm({ ...newItemForm, content: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    rows={3}
                    placeholder='Todo内容を入力...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>優先度</label>
                  <select
                    value={newItemForm.priority}
                    onChange={(e) => setNewItemForm({ ...newItemForm, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  >
                    <option value='high'>高</option>
                    <option value='medium'>中</option>
                    <option value='low'>低</option>
                  </select>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>開始日</label>
                    <input
                      type='date'
                      value={newItemForm.start_date}
                      onChange={(e) => setNewItemForm({ ...newItemForm, start_date: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>終了日</label>
                    <input
                      type='date'
                      value={newItemForm.end_date}
                      onChange={(e) => setNewItemForm({ ...newItemForm, end_date: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>備考</label>
                  <textarea
                    value={newItemForm.notes}
                    onChange={(e) => setNewItemForm({ ...newItemForm, notes: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    rows={2}
                    placeholder='備考やメモを入力...'
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  onClick={() => setShowNewItemModal(false)}
                  className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                >
                  キャンセル
                </button>
                <button
                  onClick={createTodoItem}
                  disabled={!newItemForm.content.trim()}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 編集モーダル */}
      {showEditItemModal && editingItem && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className='text-lg font-medium text-gray-900 mb-4'>Todo項目を編集</h3>
              
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>内容 *</label>
                  <textarea
                    value={editItemForm.content}
                    onChange={(e) => setEditItemForm({ ...editItemForm, content: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    rows={3}
                    placeholder='Todo内容を入力...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>優先度</label>
                  <select
                    value={editItemForm.priority}
                    onChange={(e) => setEditItemForm({ ...editItemForm, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  >
                    <option value='high'>高</option>
                    <option value='medium'>中</option>
                    <option value='low'>低</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>ステータス</label>
                  <select
                    value={editItemForm.status}
                    onChange={(e) => setEditItemForm({ ...editItemForm, status: e.target.value as 'open' | 'in_progress' | 'completed' | 'cancelled' })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  >
                    <option value='open'>未着手</option>
                    <option value='in_progress'>進行中</option>
                    <option value='completed'>完了</option>
                    <option value='cancelled'>キャンセル</option>
                  </select>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>開始日</label>
                    <input
                      type='date'
                      value={editItemForm.start_date}
                      onChange={(e) => setEditItemForm({ ...editItemForm, start_date: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>終了日</label>
                    <input
                      type='date'
                      value={editItemForm.end_date}
                      onChange={(e) => setEditItemForm({ ...editItemForm, end_date: e.target.value })}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>備考</label>
                  <textarea
                    value={editItemForm.notes}
                    onChange={(e) => setEditItemForm({ ...editItemForm, notes: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    rows={2}
                    placeholder='備考やメモを入力...'
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-3 mt-6'>
                <button
                  onClick={() => setShowEditItemModal(false)}
                  className='px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
                >
                  キャンセル
                </button>
                <button
                  onClick={updateTodoItem}
                  disabled={!editItemForm.content.trim()}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  更新
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoBoardPage; 