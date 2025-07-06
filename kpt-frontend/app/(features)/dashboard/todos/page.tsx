'use client';

import React, { useState, useEffect } from 'react';
import { formatJapaneseDate } from '@/utils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Issue {
  id: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  html_url: string;
}

const statusLabels = {
  open: 'オープン',
  closed: 'クローズ',
};

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  closed: 'bg-gray-100 text-gray-800',
};

export default function IssueListPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const handleRepoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const extractRepoPath = (url: string) => {
    const match = url.match(/github\.com\/(.+)\/(.+)/);
    return match ? `${match[1]}/${match[2]}` : '';
  };

  const fetchIssues = async () => {
    const repoPath = extractRepoPath(repoUrl);
    if (!repoPath) {
      setError('リポジトリのパスを正しく入力してください');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/github/issues?repo=${encodeURIComponent(repoPath)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // Include credentials in the request
      });

      if (!response.ok) {
        throw new Error('Issueの取得に失敗しました');
      }

      const data = await response.json();
      setIssues(data.issues);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const saveIssues = async (issues: Issue[]) => {
    const filteredIssues = issues.map(issue => ({
      title: issue.title,
      body: issue.body,
      state: issue.state
    }));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/github/save_issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ issues: filteredIssues }),
      });

      if (!response.ok) {
        throw new Error('Issueの保存に失敗しました');
      }

      toast.success('Issueが保存されました');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('予期せぬエラーが発生しました');
      }
    }
  };

  useEffect(() => {
    const fetchSavedIssues = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/github/index`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Issueの取得に失敗しました');
        }

        const data = await response.json();
        setIssues(data.issues);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedIssues();
  }, []);

  if (error) {
    return (
      <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
        <div className="mb-6">
          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
            GitHubリポジトリのURL
          </label>
          <input
            type="text"
            name="repoUrl"
            id="repoUrl"
            value={repoUrl}
            onChange={handleRepoUrlChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="https://api.github.com/repos/your-username/your-repo"
          />
          <button
            onClick={fetchIssues}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Issueを取得
          </button>
          <button
            onClick={() => saveIssues(issues)}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Issueを保存
          </button>
        </div>

        {/* Issue一覧 */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {issues.map((issue) => (
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