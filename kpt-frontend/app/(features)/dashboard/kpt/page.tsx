"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Progress } from "@/components/ui/progress/progress";
import { KptSession } from "@/types";

const KptListPage: React.FC = () => {
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
        const { kptSessionsApi } = await import('@/lib/api/kpt-sessions');
        const params: any = {};
        if (date) {
          params.session_date = date;
        }
        
        const result = await kptSessionsApi.getKptSessions(params);
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

  const statusMap: { [key: string]: { label: string; color: string } } = {
    not_started: { label: "未開始", color: "bg-gray-200 text-gray-800" },
    in_progress: { label: "進行中", color: "bg-blue-200 text-blue-800" },
    completed: { label: "完了", color: "bg-green-200 text-green-800" },
    pending: { label: "保留", color: "bg-yellow-200 text-yellow-800" },
  };

  const getStatusDisplay = (status: string) => {
    return statusMap[status] || { label: status, color: "bg-gray-200" };
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          セッション一覧
          <span className="ml-3 text-lg font-normal text-gray-600">
            ({sessions.length}件)
          </span>
        </h1>
        {/* TODO: Add date picker here */}
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
              <th scope="col" className="w-[120px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th scope="col" className="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                項目数
              </th>
              <th scope="col" className="w-[150px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                進捗
              </th>
              <th scope="col" className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">読み込み中...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center text-red-600 py-10">
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
                    {format(new Date(session.session_date), "yyyy-MM-dd")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="outline" className={`${getStatusDisplay(session.status).color}`}>
                      {getStatusDisplay(session.status).label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    K: {session.items_count.keep} P: {session.items_count.problem} T: {session.items_count.try}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Progress value={session.progress_rate} className="w-[80%]" />
                      <span className="text-xs text-gray-600 ml-2">{session.progress_rate}%</span>
                    </div>
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
                <td colSpan={6} className="text-center text-gray-500 py-10">
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

const KptListPageWrapper = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <KptListPage />
  </React.Suspense>
);

export default KptListPageWrapper; 