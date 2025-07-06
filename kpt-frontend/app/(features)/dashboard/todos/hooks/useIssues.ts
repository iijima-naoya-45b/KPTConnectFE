import { useState, useEffect } from 'react';
import { fetchSavedIssues, fetchIssuesFromRepo, saveIssuesToRepo } from '../api/github';
import { toast } from 'react-toastify';
import { Issue } from '../types';

const extractRepoPath = (url: string) => {
    const match = url.match(/github\.com\/(.+)\/(.+)/);
    return match ? `${match[1]}/${match[2]}` : '';
};

export const useIssues = (repoUrl: string) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSavedIssues = async () => {
            setLoading(true);
            try {
                const data = await fetchSavedIssues();
                setIssues(data.issues);
            } catch (err) {
                setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
            } finally {
                setLoading(false);
            }
        };

        loadSavedIssues();
    }, []);

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
            const data = await fetchIssuesFromRepo(repoPath);
            setIssues(data.issues);
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    const saveIssues = async () => {
        try {
            await saveIssuesToRepo(issues);
            toast.success('Issueが保存されました');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        }
    };

    return { issues, loading, error, fetchIssues, saveIssues };
}; 