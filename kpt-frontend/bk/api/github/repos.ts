import type { NextApiRequest, NextApiResponse } from 'next';

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