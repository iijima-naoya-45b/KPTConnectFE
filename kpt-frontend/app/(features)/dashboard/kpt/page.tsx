"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
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

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">エラー: {error}</p>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
              onClick={() => router.push(`/dashboard/kpt/${session.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {session.title}
                  </h3>
                  {session.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {session.description}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-sm text-gray-500">
                    {format(new Date(session.session_date), "yyyy-MM-dd")}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
            <p className="text-gray-500">この日付に登録されたセッションはありません。</p>
          </div>
        )}
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