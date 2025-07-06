'use client';

import React, { useState } from 'react';
import { formatJapaneseDate } from '@/utils';
import { RepoInput } from './components/RepoInput';
import { useIssues } from './hooks/useIssues';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Issue } from './types';

const statusLabels = {
  open: 'オープン',
  closed: 'クローズ',
};

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  closed: 'bg-gray-100 text-gray-800',
};

export default function IssueListPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const { savedIssues, fetchedIssues, loading, error, fetchIssues, saveIssues } = useIssues(repoUrl);

  const handleRepoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleSaveIssues = async () => {
    await saveIssues();
    console.log('Fetched Issues:', fetchedIssues);
    console.log('Saved Issues:', savedIssues);
  };

  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900">GitHub Issue一覧</h1>
            <p className="mt-1 text-sm text-gray-600">
              GitHubリポジトリのIssueを一覧形式で管理できます
            </p>
          </div>
        </div>

        {/* リポジトリURL入力フィールドとボタン */}
        <RepoInput
          repoUrl={repoUrl}
          onRepoUrlChange={handleRepoUrlChange}
          onFetchIssues={fetchIssues}
          onSaveIssues={handleSaveIssues} // Use the new save handler
        />

        {/* Error Message */}
        {error && (
          <div className="text-red-600 px-4 py-2">{error}</div> // Display error below URL input
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600'></div>
          </div>
        )}

        {/* Saved Issues */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
          <h2 className="text-xl font-bold text-gray-900 px-4 py-2">取得Issue</h2>
          <ul className="divide-y divide-gray-200">
            {fetchedIssues && fetchedIssues.map((issue: Issue) => (
              <li key={issue.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {issue.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {issue.body}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[issue.state]}`}
                      >
                        {statusLabels[issue.state]}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        作成日: {formatJapaneseDate(issue.created_at)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        更新日: {formatJapaneseDate(issue.updated_at)}
                      </p>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-blue-500 hover:underline"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Fetched Issues */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6">
          <h2 className="text-xl font-bold text-gray-900 px-4 py-2">保存Issue</h2>
          <ul className="divide-y divide-gray-200">
            {savedIssues && savedIssues.map((issue: Issue) => (
              <li key={issue.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {issue.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {issue.body}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[issue.state]}`}
                      >
                        {statusLabels[issue.state]}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        作成日: {formatJapaneseDate(issue.created_at)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        更新日: {formatJapaneseDate(issue.updated_at)}
                      </p>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-blue-500 hover:underline"
                      >
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}