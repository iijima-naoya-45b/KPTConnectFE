/**
 * @file repos.ts
 * @description GitHubリポジトリ一覧取得API
 *
 * @仕様
 *   - 認証済みユーザーのアクセストークンでGitHub APIからリポジトリ一覧を取得
 *   - 必要な情報のみ抽出し返却
 *   - エラー時は詳細なメッセージを返却
 * @制限事項
 *   - アクセストークン取得方法は仮実装（適宜修正必要）
 */

import type { NextApiRequest, NextApiResponse } from 'next';

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
 * GitHubリポジトリ一覧取得APIハンドラ
 *
 * @param {NextApiRequest} req - リクエスト
 * @param {NextApiResponse} res - レスポンス
 * @returns {Promise<void>}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'GETメソッドのみ許可されています' });
        return;
    }

    // TODO: アクセストークン取得方法を適宜修正
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!accessToken) {
        res.status(401).json({ message: 'アクセストークンがありません' });
        return;
    }

    try {
        const githubRes = await fetch('https://api.github.com/user/repos?per_page=100', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github+json',
            },
        });
        if (!githubRes.ok) {
            throw new Error(`GitHub APIエラー: ${githubRes.status} ${githubRes.statusText}`);
        }
        const data = await githubRes.json();
        // 必要な情報のみ抽出
        const repos = data.map((repo: any) => ({
            id: repo.id,
            fullName: repo.full_name,
            name: repo.name,
            private: repo.private,
            owner: repo.owner?.login || '',
            htmlUrl: repo.html_url,
            description: repo.description || '',
        }));
        res.status(200).json(repos);
    } catch (error: any) {
        res.status(500).json({ message: `リポジトリ一覧取得失敗: ${error.message}` });
    }
} 