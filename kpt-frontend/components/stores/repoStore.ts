/**
 * @file repoStore.ts
 * @description GitHubリポジトリ選択・管理用Zustandストア
 *
 * @仕様
 *   - リポジトリ一覧と選択中リポジトリをグローバル管理
 *   - セット関数で状態を更新
 * @制限事項
 *   - 型定義は本ファイル内に記載
 */

import { create } from 'zustand';

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
export type GithubRepository = {
    /** リポジトリID */
    id: number;
    /** owner/name 形式のリポジトリ名 */
    fullName: string;
    /** リポジトリ名 */
    name: string;
    /** プライベートリポジトリかどうか */
    private: boolean;
    /** オーナー名 */
    owner: string;
    /** GitHub上のリポジトリURL */
    htmlUrl: string;
    /** リポジトリの説明 */
    description: string;
};

/**
 * @typedef {object} repoStoreState
 * @property {GithubRepository[]} repositoryList - リポジトリ一覧
 * @property {GithubRepository | null} selectedRepository - 選択中リポジトリ
 * @property {(repos: GithubRepository[]) => void} setRepositoryList - リポジトリ一覧セット関数
 * @property {(repo: GithubRepository | null) => void} setSelectedRepository - 選択リポジトリセット関数
 */
export type RepoStoreState = {
    /** リポジトリ一覧 */
    repositoryList: GithubRepository[];
    /** 選択中リポジトリ */
    selectedRepository: GithubRepository | null;
    /** リポジトリ一覧セット関数 */
    setRepositoryList: (repos: GithubRepository[]) => void;
    /** 選択リポジトリセット関数 */
    setSelectedRepository: (repo: GithubRepository | null) => void;
};

/**
 * GitHubリポジトリ選択・管理用Zustandストア
 */
export const useRepoStore = create<RepoStoreState>((set) => ({
    repositoryList: [],
    selectedRepository: null,
    setRepositoryList: (repos) => set({ repositoryList: repos }),
    setSelectedRepository: (repo) => set({ selectedRepository: repo }),
})); 