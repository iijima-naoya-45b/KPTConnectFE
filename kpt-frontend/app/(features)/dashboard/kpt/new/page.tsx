"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button/button";
import { KptSession } from "@/types";

const KptNewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams?.get("date") || format(new Date(), "yyyy-MM-dd");

  const [sessions, setSessions] = useState<KptSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (date) {
          // バックエンドのコントローラーは `date` パラメータを期待している
          params.append("date", date);
        }
        
        const response = await fetch(`/api/v1/kpt_sessions?${params.toString()}`);
        if (!response.ok) {
          throw new Error("セッション一覧の取得に失敗しました");
        }
        const result = await response.json();
        if (result.success) {
          setSessions(result.data.sessions);
        } else {
          throw new Error(result.message || "セッション一覧の取得に失敗しました");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [date]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {date} のセッション一覧
          <span className="ml-3 text-lg font-normal text-gray-600">
            ({sessions.length}件)
          </span>
        </h1>
        {/* TODO: Add date picker and "Create New" button here */}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-[300px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                タイトル
              </th>
              <th scope="col" className="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日付
              </th>
              <th scope="col" className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">読み込み中...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center text-red-600 py-10">
                  エラー: {error}
                </td>
              </tr>
            ) : sessions.length > 0 ? (
              sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{session.title}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{session.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {format(new Date(session.created_at), "yyyy-MM-dd")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="link"
                      onClick={() => router.push(`/dashboard/kpt/${session.id}`)}
                    >
                      詳細
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-10">
                  この日付に登録されたセッションはありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KptNewPageWrapper = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <KptNewPage />
  </React.Suspense>
);

export default KptNewPageWrapper; 