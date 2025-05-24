/**
 * @file FeedbackForm.tsx
 * @description ユーザーからのフィードバックを収集するフォームコンポーネント
 *
 * @example
 * ```tsx
 * <FeedbackForm />
 * ```
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FeedbackFormData {
  type: "bug" | "feature" | "improvement" | "other";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  email: string;
  attachments: File[];
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: "feature",
    title: "",
    description: "",
    priority: "medium",
    email: "",
    attachments: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: Array.from(e.target.files || []),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ここでAPIを呼び出してフィードバックを送信
      await new Promise((resolve) => setTimeout(resolve, 1000)); // デモ用の遅延

      setSubmitResult({
        success: true,
        message: "フィードバックを送信しました。ご協力ありがとうございます。",
      });
      setFormData({
        type: "feature",
        title: "",
        description: "",
        priority: "medium",
        email: "",
        attachments: [],
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "フィードバックの送信に失敗しました。もう一度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            フィードバック
          </h1>
          <Link href="/help" className="text-indigo-600 hover:text-indigo-900">
            ヘルプセンターに戻る
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {submitResult && (
            <div
              className={`mb-6 p-4 rounded-md ${
                submitResult.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {submitResult.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                フィードバックの種類
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="bug">バグ報告</option>
                <option value="feature">機能リクエスト</option>
                <option value="improvement">改善提案</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="フィードバックのタイトルを入力"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                詳細な説明
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="フィードバックの詳細を入力"
              />
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                優先度
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="attachments"
                className="block text-sm font-medium text-gray-700"
              >
                添付ファイル
              </label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleFileChange}
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                スクリーンショットやログファイルなどを添付できます
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送信中..." : "フィードバックを送信"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
