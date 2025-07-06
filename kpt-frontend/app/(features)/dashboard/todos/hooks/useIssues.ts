import { useState, useEffect } from 'react';
import { fetchSavedIssues, fetchIssuesFromRepo, saveIssuesToRepo } from '../api/github';
import { toast } from 'react-toastify';
import { Issue } from '../types';

const extractRepoPath = (url: string) => {
    const match = url.match(/github\.com\/(.+)\/(.+)/);
    return match ? `${match[1]}/${match[2]}` : '';
};

export const useIssues = (repoUrl: string) => {
    const [savedIssues, setSavedIssues] = useState<Issue[]>([]);
    const [fetchedIssues, setFetchedIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadSavedIssues = async () => {
            setLoading(true);
            try {
                const data = await fetchSavedIssues();
                setSavedIssues(data.issues);
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
            setFetchedIssues(data.issues);
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    const saveIssues = async () => {
        try {
            const savedIssuesData = await saveIssuesToRepo(fetchedIssues);
            toast.success('Issueが保存されました');
            setSavedIssues(savedIssuesData.issues);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        }
    };

    return { savedIssues, fetchedIssues, loading, error, fetchIssues, saveIssues };
}; 