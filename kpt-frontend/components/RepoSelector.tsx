/**
 * @file RepoSelector.tsx
 * @description GitHubリポジトリ選択用セレクトボックスコンポーネント
 *
 * ユーザーがアクセス可能なGitHubリポジトリ一覧を取得し、
 * セレクトボックスで選択できるUIを提供します。
 * Zustandストアと連携し、リポジトリ一覧・選択状態をグローバル管理します。
 *
 * @仕様
 *   - 初回マウント時にAPIからリポジトリ一覧を取得
 *   - セレクトボックスでリポジトリを選択
 *   - プライベートリポジトリはアイコンで明示
 *   - エラー・ローディング処理あり
 * @制限事項
 *   - API認証が必要
 */

import React, { useEffect, useState } from 'react';
import { useRepoStore, GithubRepository } from './stores/repoStore';

/**
 * @typedef {object} githubRepository
 * @property {number} id - リポジトリID
 * @property {string} fullName - owner/name 形式のリポジトリ名
 * @property {string} name - リポジトリ名
 * @property {boolean} private - プライベートリポジトリかどうか
 * @property {string} owner - オーナー名
 * @property {string} htmlUrl - GitHub上のリポジトリURL
 * @property {string} description - リポジトリの説明
 */

/**
 * GitHubリポジトリ選択用セレクトボックスコンポーネント
 *
 * @returns {JSX.Element} セレクトボックスUI
 */
const RepoSelector: React.FC = () => {
  /** @type {[boolean, Function]} ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** @type {[string, Function]} エラーメッセージ */
  const [errorMessage, setErrorMessage] = useState<string>('');

  /** @type {githubRepository[]} リポジトリ一覧 */
  const repositoryList = useRepoStore((state) => state.repositoryList);
  /** @type {Function} リポジトリ一覧セット関数 */
  const setRepositoryList = useRepoStore((state) => state.setRepositoryList);
  /** @type {githubRepository | null} 選択中リポジトリ */
  const selectedRepository = useRepoStore((state) => state.selectedRepository);
  /** @type {Function} 選択リポジトリセット関数 */
  const setSelectedRepository = useRepoStore((state) => state.setSelectedRepository);

  /**
   * リポジトリ一覧をAPIから取得
   * @returns {Promise<void>}
   */
  const fetchRepositoryList = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/github/repos');
      if (!res.ok) {
        throw new Error(`APIレスポンスエラー: ${res.status}`);
      }
      const data = await res.json();
      setRepositoryList(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`リポジトリ一覧取得失敗: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * セレクトボックス選択時の処理
   * @param {React.ChangeEvent<HTMLSelectElement>} event - セレクトイベント
   */
  const handleSelectRepository = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const repoId = Number(event.target.value);
    const repo = repositoryList.find((r: GithubRepository) => r.id === repoId) || null;
    setSelectedRepository(repo);
  };

  return (
    <div className="mb-4">
      <label htmlFor="repo-select" className="block mb-1 text-sm font-medium text-gray-700">
        リポジトリを選択してください
      </label>
      {isLoading ? (
        <div className="text-gray-500">リポジトリ一覧を取得中です…</div>
      ) : errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : repositoryList.length === 0 ? (
        <div className="text-gray-500">リポジトリが見つかりません</div>
      ) : (
        <select
          id="repo-select"
          className="w-full border rounded px-3 py-2"
          value={selectedRepository ? selectedRepository.id : ''}
          onChange={handleSelectRepository}
        >
          <option value="">リポジトリを選択してください</option>
          {repositoryList.map((repo: GithubRepository) => (
            <option key={repo.id} value={repo.id}>
              {repo.fullName} {repo.private ? '🔒' : ''}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RepoSelector; 