/**
 * @file page.tsx
 * @description KPTテンプレート管理画面
 *
 * @example
 * ```tsx
 * <TemplatesPage />
 * ```
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  description: string;
  keep: string[];
  problem: string[];
  try_: string[];
  isShared: boolean;
  createdAt: string;
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      title: "週次振り返り",
      description: "毎週の振り返り用テンプレート",
      keep: ["継続したいこと", "良かった点"],
      problem: ["改善が必要な点", "課題"],
      try_: ["次週のアクション", "改善案"],
      isShared: true,
      createdAt: "2024-03-20",
    },
    // 他のテンプレート...
  ]);

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  const handleToggleShare = (id: string) => {
    setTemplates(
      templates.map((template) =>
        template.id === id
          ? { ...template, isShared: !template.isShared }
          : template
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              テンプレート管理
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/templates/new"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                新規テンプレート作成
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                戻る
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {template.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleShare(template.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        template.isShared
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {template.isShared ? "共有中" : "非共有"}
                    </button>
                    <Link
                      href={`/dashboard/templates/${template.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      削除
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Keep</h3>
                    <ul className="mt-2 space-y-1">
                      {template.keep.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 bg-indigo-50 p-2 rounded"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Problem
                    </h3>
                    <ul className="mt-2 space-y-1">
                      {template.problem.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 bg-red-50 p-2 rounded"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Try</h3>
                    <ul className="mt-2 space-y-1">
                      {template.try_.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 bg-green-50 p-2 rounded"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  作成日: {template.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage;
