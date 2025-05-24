/**
 * @file page.tsx
 * @description 新規KPT作成ページ
 *
 * @example
 * ```tsx
 * <NewKptPage />
 * ```
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewKptPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [keep, setKeep] = useState<string[]>([]);
  const [problem, setProblem] = useState<string[]>([]);
  const [try_, setTry_] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (
    category: "keep" | "problem" | "try",
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    switch (category) {
      case "keep":
        setKeep([...keep, newItem]);
        break;
      case "problem":
        setProblem([...problem, newItem]);
        break;
      case "try":
        setTry_([...try_, newItem]);
        break;
    }
    setNewItem("");
  };

  const handleRemoveItem = (
    category: "keep" | "problem" | "try",
    index: number
  ) => {
    switch (category) {
      case "keep":
        setKeep(keep.filter((_, i) => i !== index));
        break;
      case "problem":
        setProblem(problem.filter((_, i) => i !== index));
        break;
      case "try":
        setTry_(try_.filter((_, i) => i !== index));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIとの連携
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">新規KPT作成</h1>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              キャンセル
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* タイトル */}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Keep */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Keep</h3>
            <form
              onSubmit={(e) => handleAddItem("keep", e)}
              className="flex gap-2 mb-4"
            >
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Keepすることを入力"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                追加
              </button>
            </form>
            <ul className="space-y-2">
              {keep.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-md shadow"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("keep", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Problem */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Problem</h3>
            <form
              onSubmit={(e) => handleAddItem("problem", e)}
              className="flex gap-2 mb-4"
            >
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Problemを入力"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                追加
              </button>
            </form>
            <ul className="space-y-2">
              {problem.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-md shadow"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("problem", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Try */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Try</h3>
            <form
              onSubmit={(e) => handleAddItem("try", e)}
              className="flex gap-2 mb-4"
            >
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Tryすることを入力"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                追加
              </button>
            </form>
            <ul className="space-y-2">
              {try_.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-md shadow"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("try", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              KPTを作成
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewKptPage;
