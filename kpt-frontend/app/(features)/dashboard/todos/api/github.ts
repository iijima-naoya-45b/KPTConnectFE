import { Issue } from '../types';

export const fetchIssuesFromRepo = async (repoPath: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/github/issues?repo=${encodeURIComponent(repoPath)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Issueの取得に失敗しました');
    }

    return response.json();
};

export const fetchSavedIssues = async () => {
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

    return response.json();
};

export const saveIssuesToRepo = async (issues: Issue[]) => {
    const filteredIssues = issues.map(issue => ({
        title: issue.title,
        body: issue.body,
        state: issue.state
    }));

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
}; 