/**
 * @file page.tsx
 * @description 通知設定ページ
 *
 * ユーザーの通知設定を管理するページです。
 * KPTリマインダー、進捗通知、システム通知などの設定を行います。
 *
 * @example
 * ```tsx
 * // /notifications でアクセス可能
 * ```
 */

"use client";

import React from "react";
import NotificationSettings from "./NotificationSettings";
import { Button } from "@/components/ui";
import Link from "next/link";

const NotificationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">通知設定</h1>
              <p className="mt-2 text-gray-600">
                KPTリマインダーやシステム通知の設定を管理します
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">ダッシュボードに戻る</Button>
            </Link>
          </div>

          {/* 通知設定コンポーネント */}
          <div className="bg-white shadow rounded-lg">
            <NotificationSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
