"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { PencilSquareIcon, TrashIcon, CheckCircleIcon, ExclamationCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

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

const PAGE_SIZE = 10;

const KptListPage: React.FC = () => {
  const searchParams = useSearchParams();
  const date = searchParams ? searchParams.get("date") : null;
  const [kptReviews, setKptReviews] = useState<KptReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editTarget, setEditTarget] = useState<KptReview | null>(null);
  const [editForm, setEditForm] = useState<Partial<KptReview>>({});
  const [deleteTarget, setDeleteTarget] = useState<KptReview | null>(null);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!date) return;
    const fetchReviews = async () => {
      setLoading(true);
      setError("");
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const res = await fetch(`${apiBaseUrl}/api/v1/kpt_reviews?start=${date}&end=${date}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("KPTレビュー一覧の取得に失敗しました");
        const data = await res.json();
        setKptReviews(data);
        setPage(1); // 日付切り替え時は1ページ目に戻す
      } catch (e: any) {
        setError(e.message || "予期せぬエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [date]);

  // モーダルを開くたびにeditFormをリセット
  useEffect(() => {
    if (editTarget) setEditForm({});
  }, [editTarget]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    if (!editTarget) return;
    setProcessing(true);
    setError("");
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${apiBaseUrl}/api/v1/kpt_reviews/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ kpt_review: editForm }),
      });
      if (!res.ok) throw new Error("KPTレビューの更新に失敗しました");
      await refreshList();
      setEditForm({}); // 編集フォームをリセット
      setEditTarget(null); // モーダルも閉じる
    } catch (e: any) {
      setError(e.message || "予期せぬエラーが発生しました");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setProcessing(true);
    setError("");
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${apiBaseUrl}/api/v1/kpt_reviews/${deleteTarget.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("KPTレビューの削除に失敗しました");
      await refreshList();
      setDeleteTarget(null);
    } catch (e: any) {
      setError(e.message || "予期せぬエラーが発生しました");
    } finally {
      setProcessing(false);
    }
  };

  const refreshList = async () => {
    if (!date) return;
    setLoading(true);
    setError("");
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const res = await fetch(`${apiBaseUrl}/api/v1/kpt_reviews?start=${date}&end=${date}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("KPTレビュー一覧の取得に失敗しました");
      const data = await res.json();
      setKptReviews(data);
    } catch (e: any) {
      setError(e.message || "予期せぬエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // ページネーション
  const totalPages = Math.ceil(kptReviews.length / PAGE_SIZE);
  const pagedReviews = kptReviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    if (!editTarget) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEditTarget(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editTarget]);

  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{date} のKPTレビュー一覧</h1>
        {error && <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6"><p className="text-red-800">{error}</p></div>}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            {pagedReviews.length === 0 ? (
              <div className="text-gray-500">この日に登録されたKPTレビューはありません。</div>
            ) : (
              pagedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl shadow-2xl p-8 min-h-[160px] w-full max-w-none mx-auto transition-transform hover:scale-[1.01] hover:shadow-2xl relative border border-gray-100 cursor-pointer"
                  onClick={() => setEditTarget(review)}
                >
                  <div className="font-semibold text-2xl mb-2 truncate" title={review.title}>{review.title}</div>
                  <div className="text-gray-600 text-lg mb-4 truncate" title={review.description}>{review.description}</div>
                  <div className="flex flex-col gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-2 rounded-lg bg-green-50 text-green-700 text-base font-medium truncate" title={review.keep}>
                      <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />Keep: <span className="ml-1 truncate">{review.keep}</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-700 text-base font-medium truncate" title={review.problem}>
                      <ExclamationCircleIcon className="w-5 h-5 mr-2 text-red-400" />Problem: <span className="ml-1 truncate">{review.problem}</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-base font-medium truncate" title={review.try}>
                      <LightBulbIcon className="w-5 h-5 mr-2 text-blue-400" />Try: <span className="ml-1 truncate">{review.try}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">作成日: {format(new Date(review.created_at), 'yyyy/MM/dd')}</div>
                </div>
              ))
            )}
          </div>
        )}
        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              前へ
            </button>
            <span className="text-gray-600 text-sm">{page} / {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              次へ
            </button>
          </div>
        )}
      </div>
      {/* 詳細・編集モーダル */}
      {editTarget && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => { setEditTarget(null); setEditForm({}); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-4xl h-[90vh] overflow-y-auto flex flex-col justify-start"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold truncate" title={editTarget.title}>{editTarget.title}</h2>
              <div className="flex space-x-2">
                <button className="p-3 rounded-full hover:bg-blue-100" onClick={() => setEditForm(editTarget)} title="編集">
                  <PencilSquareIcon className="w-7 h-7 text-blue-600" />
                </button>
                <button className="p-3 rounded-full hover:bg-red-100" onClick={() => setDeleteTarget(editTarget)} title="削除">
                  <TrashIcon className="w-7 h-7 text-red-600" />
                </button>
                <button className="p-3 rounded-full hover:bg-gray-200" onClick={() => { setEditTarget(null); setEditForm({}); }} title="閉じる">
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
            {/* 編集フォーム or 詳細表示 */}
            {editForm && editForm.id === editTarget.id ? (
              <div className="space-y-6">
                <input type="text" name="title" value={editForm.title || ""} onChange={handleEditChange} className="w-full border rounded px-4 py-3 text-2xl" placeholder="タイトル" />
                <textarea name="description" value={editForm.description || ""} onChange={handleEditChange} className="w-full border rounded px-4 py-3 text-lg min-h-[60px]" placeholder="説明" />
                <textarea name="keep" value={editForm.keep || ""} onChange={handleEditChange} className="w-full border rounded px-4 py-3 text-lg min-h-[100px] max-h-[160px]" placeholder="Keep" rows={5} />
                <textarea name="problem" value={editForm.problem || ""} onChange={handleEditChange} className="w-full border rounded px-4 py-3 text-lg min-h-[100px] max-h-[160px]" placeholder="Problem" rows={5} />
                <textarea name="try" value={editForm.try || ""} onChange={handleEditChange} className="w-full border rounded px-4 py-3 text-lg min-h-[100px] max-h-[160px]" placeholder="Try" rows={5} />
                <div className="flex justify-end space-x-2 mt-6">
                  <button className="px-6 py-3 bg-gray-200 rounded text-lg" onClick={() => setEditForm({})} disabled={processing}>キャンセル</button>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded text-lg" onClick={handleEditSubmit} disabled={processing}>保存</button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gray-50 p-4 rounded-lg text-base text-gray-700 mb-4 w-full md:w-[600px] break-words whitespace-pre-line">{editTarget.description}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <div className="px-4 py-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium min-h-[120px] max-h-[160px] w-full md:w-[600px] overflow-y-auto whitespace-pre-line break-words">
                      <span className="flex items-center mb-2">
                        <CheckCircleIcon className="w-6 h-6 mr-3 text-green-400 mt-1" />
                        <span className="ml-2 font-bold">Keep:</span>
                      </span>
                      <span className="block w-full break-words">{editTarget.keep}</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col justify-end px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium min-h-[120px] max-h-[160px] w-full md:w-[600px] overflow-y-auto whitespace-pre-line">
                      <span className="flex items-center w-full">
                        <ExclamationCircleIcon className="w-6 h-6 mr-3 text-red-400 mt-1" />
                        <span className="ml-2 font-bold">Problem:</span>
                        <span className="ml-2 break-words w-full min-w-0">{editTarget.problem}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col justify-end px-4 py-3 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium min-h-[120px] max-h-[160px] w-full md:w-[600px] overflow-y-auto whitespace-pre-line">
                      <span className="flex items-center w-full">
                        <LightBulbIcon className="w-6 h-6 mr-3 text-blue-400 mt-1" />
                        <span className="ml-2 font-bold">Try:</span>
                        <span className="ml-2 break-words w-full min-w-0">{editTarget.try}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-4">作成日: {format(new Date(editTarget.created_at), 'yyyy/MM/dd')}</div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 削除ダイアログ */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-700">KPTレビュー削除</h2>
            <p className="mb-4">本当に削除しますか？この操作は取り消せません。</p>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setDeleteTarget(null)} disabled={processing}>キャンセル</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete} disabled={processing}>削除</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const KptListPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <KptListPage />
  </Suspense>
);

export default KptListPageWrapper; 