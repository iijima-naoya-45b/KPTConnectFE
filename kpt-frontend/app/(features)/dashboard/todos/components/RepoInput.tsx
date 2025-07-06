import React from 'react';

interface RepoInputProps {
  repoUrl: string;
  onRepoUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFetchIssues: () => void;
  onSaveIssues: () => void;
}

export const RepoInput: React.FC<RepoInputProps> = ({ repoUrl, onRepoUrlChange, onFetchIssues, onSaveIssues }) => (
  <div className="mb-6">
    <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
      GitHubリポジトリのURL
    </label>
    <input
      type="text"
      name="repoUrl"
      id="repoUrl"
      value={repoUrl}
      onChange={onRepoUrlChange}
      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      placeholder="https://api.github.com/repos/your-username/your-repo"
    />
    <button
      onClick={onFetchIssues}
      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Issueを取得
    </button>
    <button
      onClick={onSaveIssues}
      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Issueを保存
    </button>
  </div>
); 