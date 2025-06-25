/**
 * @file page.tsx
 * @description KPT詳細ページ
 *
 * @仕様
 * - URLパラメータからKPTセッションIDを取得し、詳細情報を表示する。
 * - paramsがnullの場合はエラーメッセージを表示する。
 * - API通信や編集・削除などの操作に失敗した場合は詳細なエラーメッセージを表示する。
 * - コード全体でローワーキャメルケース命名、可読性重視。
 *
 * @制限事項
 * - paramsがnullの場合、セッション詳細は取得できない。
 * - fetchSessionDetailはuseCallbackでラップし、useEffect依存配列に追加。
 *
 * @example
 * ```tsx
 * <KptDetailPage />
 * ```
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
const ReactMarkdown = require("react-markdown").default;
import remarkGfm from "remark-gfm";
import { useToast } from "@/components/toast";

// KPTアイテムデータの型定義
interface KptItem {
  id: string;
  type: "keep" | "problem" | "try";
  content: string;
  emotion_score?: number;
  impact_score?: number;
}

// KPTセッション詳細データの型定義
interface KptSessionDetail {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  kpt_items: KptItem[];
  tags: string[];
}



type KptItemType = "keep" | "problem" | "try";

const KptDetailPage = () => {
  /**
   * @property {object|null} params - URLパラメータ。nullの場合はエラー扱い。
   * @property {string|null} sessionId - セッションID。paramsがnullの場合はnull。
   */
  const router = useRouter();
  const params = useParams() as { id?: string } | null;
  const sessionId = params?.id ?? null;
  
  const [session, setSession] = useState<KptSessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editItemContent, setEditItemContent] = useState<string>('');
  const { addToast } = useToast();
  
  const [saving, setSaving] = useState(false);

  /**
   * @function fetchSessionDetail
   * @description KPTセッション詳細をAPIから取得する。paramsまたはsessionIdがnullの場合はエラー。
   */
  const fetchSessionDetail = useCallback(async () => {
    if (!sessionId) {
      setError('URLパラメータが不正です（セッションIDが取得できません）');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
      const result = await kptSessionsApi.getKptSession(sessionId);
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
  }, [sessionId]);

  // タイプ別のアイテムを取得
  const getItemsByType = (type: 'keep' | 'problem' | 'try'): KptItem[] => {
    if (!session) return [];
    return session.kpt_items.filter(item => item.type === type);
  };

  // タイプ別の色を取得
  const getTypeColor = (type: KptItemType): { border: string; bg: string; text: string; } => {
    switch (type) {
      case "keep":
        return { border: "border-green-500", bg: "bg-green-50", text: "text-green-800" };
      case "problem":
        return { border: "border-red-500", bg: "bg-red-50", text: "text-red-800" };
      case "try":
        return { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-800" };
      default:
        return { border: "border-gray-500", bg: "bg-gray-50", text: "text-gray-800" };
    }
  };

  // セッションを削除
  const deleteSession = async () => {
    try {
      setSaving(true);
      
      const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
      const result = await kptSessionsApi.deleteKptSession(sessionId!);

      if (result.success) {
        addToast({
          message: "セッションを削除しました。",
          type: "success",
        });
        router.push('/dashboard/kpt');
      } else {
        addToast({
          message: result.message || "セッションの削除に失敗しました。",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error('セッション削除エラー:', error);
      addToast({
        message: error.message || "セッションの削除中にエラーが発生しました。",
        type: "error",
      });
    } finally {
      setSaving(false);
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
          kpt_item: {
            content: content,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEditingItem(null);
        fetchSessionDetail(); // データを再取得してUIを更新
        addToast({
          message: "アイテムを更新しました。",
          type: "success",
        });
      } else {
        addToast({
          message: result.error || "アイテムの更新に失敗しました。",
          type: "error",
        });
      }
    } catch (error) {
      addToast({
        message: "アイテムの更新中にエラーが発生しました。",
        type: "error",
      });
      console.error('アイテム更新エラー:', error);
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
        fetchSessionDetail();
        addToast({
          message: "アイテムを削除しました。",
          type: "success",
        });
      } else {
        addToast({
          message: result.error || "アイテムの削除に失敗しました。",
          type: "error",
        });
      }
    } catch (error) {
      console.error("アイテム削除エラー:", error);
      addToast({
        message: "アイテムの削除中にエラーが発生しました。",
        type: "error",
      });
    }
  };

  // アイテム編集を開始
  const startItemEdit = (itemId: string, content: string) => {
    setEditingItem(itemId);
    setEditItemContent(content);
  };

  // 初期化
  useEffect(() => {
    fetchSessionDetail();
  }, [fetchSessionDetail]);

  const renderKptSection = (title: string, type: KptItemType) => {
    const items = getItemsByType(type);
    const colors = getTypeColor(type);
  
    return (
      <div className={`rounded-lg border-2 ${colors.border} p-4`}>
        <h3 className={`text-lg font-semibold ${colors.text} mb-3 flex items-center`}>
          {title}
          <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {items.length}
          </span>
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className={`${colors.bg} p-3 rounded-md shadow-sm`}>
              {editingItem === item.id ? (
                <div>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={editItemContent}
                    onChange={(e) => setEditItemContent(e.target.value)}
                    rows={4}
                  />
                  <div className="mt-2 text-right space-x-2">
                    <Button size="sm" onClick={() => updateItem(item.id, editItemContent)}>保存</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>キャンセル</Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="prose prose-sm max-w-none [&_pre]:whitespace-pre-wrap [&_pre]:break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.content}
                    </ReactMarkdown>
                  </div>
                  <div className="flex-shrink-0 space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => startItemEdit(item.id, item.content)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!sessionId) {
    return (
      <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
        <div className='  bg-gray-50 pt-16 flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-red-600 text-lg font-bold'>URLパラメータが不正です（セッションIDが取得できません）</div>
            <Link href='/dashboard/kpt' className='mt-4 inline-block text-blue-600 hover:text-blue-900'>KPT一覧に戻る</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
        <div className='  bg-gray-50 pt-16 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
            <p className='mt-4 text-gray-600'>KPTセッション詳細を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100'>
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
    <div className='min-h-screen bg-gray-50'>
      {/* ヘッダー */}
      <header className='bg-white shadow-sm sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                {session.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                作成日: {new Date(session.created_at).toLocaleDateString()} | アイテム数: {session.kpt_items.length}
              </p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button variant="outline" onClick={() => deleteSession()} className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" disabled={saving}>
                {saving ? '削除中...' : '削除'}
              </Button>
              <Button variant="ghost" onClick={() => router.back()} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>戻る</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* セッション情報 */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">セッション概要</h2>
          <p className="text-base text-gray-700 whitespace-pre-wrap">{session.description || "説明はありません。"}</p>
        </div>

        {/* KPTリスト */}
        <div className="space-y-8">
          {renderKptSection("Keep", "keep")}
          {renderKptSection("Problem", "problem")}
          {renderKptSection("Try", "try")}
        </div>
      </main>
    </div>
  );
};

export default KptDetailPage;
