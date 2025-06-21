import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { fetcher } from '@/lib/api';

interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  url: string;
}

const GithubIssuesSample: React.FC = () => {
  const [repo, setRepo] = useState('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const fetchIssues = async () => {
    if (!repo) return;
    setLoading(true);
    setError(null);
    setIssues([]);
    setSelected(new Set());
    setSaveMessage(null);
    try {
      const data = await fetcher(`/api/v1/github/issues?repo=${encodeURIComponent(repo)}`);
      if (data.success) {
        setIssues(data.issues || []);
      } else {
        setError(data.error || '取得に失敗しました');
      }
    } catch (error) {
      console.error("Failed to fetch issues:", error);
      toast.error('GitHub Issuesの取得に失敗しました');
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repo.trim()) {
      fetchIssues();
    }
  };

  const handleSelect = (id: number) => {
    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    const selectedIssues = issues.filter(issue => selected.has(issue.id));
    setSaveMessage(null);
    try {
      const res = await fetcher('/api/v1/kpt_items/import_github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: selectedIssues.map(issue => ({
            type: 'problem',
            content: issue.title + '<br />' + (issue.body || ''),
            status: issue.state,
            priority: 'medium',
            notes: `GitHub Issue #${issue.number}`,
            external_repo: repo,
            external_number: issue.number,
            external_url: issue.url,
          })),
        }),
      });
      if (res.success) {
        setSaveMessage(`${selectedIssues.length}件のIssueを保存しました`);
        setSelected(new Set());
      } else {
        setSaveMessage('保存に失敗しました: ' + (res.error || ''));
      }
    } catch (error) {
      console.error("Failed to import issues:", error);
      toast.error('KPT Problemへのインポートに失敗しました');
      setSaveMessage('保存に失敗しました');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='mb-6 flex flex-col sm:flex-row items-center gap-4'>
        <input
          type='text'
          value={repo}
          onChange={e => setRepo(e.target.value)}
          placeholder='owner/repo を入力 (例: vercel/next.js)'
          className='border border-gray-300 rounded px-4 py-2 w-64'
        />
        <button
          type='submit'
          className='bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition'
        >
          Issue取得
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-600'>Error: {error}</div>}
      {!loading && !error && issues.length > 0 && (
        <>
          <div className='mb-4'>
            <button
              onClick={handleSave}
              disabled={selected.size === 0}
              className={`px-6 py-2 rounded text-white ${selected.size === 0 ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition`}
            >
              選択したIssueを保存
            </button>
            {saveMessage && <span className='ml-4 text-green-600'>{saveMessage}</span>}
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full border border-slate-200 bg-white'>
              <thead>
                <tr>
                  <th className='px-4 py-2 border-b'>選択</th>
                  <th className='px-4 py-2 border-b'>#</th>
                  <th className='px-4 py-2 border-b'>タイトル</th>
                  <th className='px-4 py-2 border-b'>状態</th>
                  <th className='px-4 py-2 border-b'>作成者</th>
                  <th className='px-4 py-2 border-b'>作成日</th>
                  <th className='px-4 py-2 border-b'>詳細</th>
                </tr>
              </thead>
              <tbody>
                {issues.map(issue => (
                  <tr key={issue.id} className='hover:bg-slate-50'>
                    <td className='px-4 py-2 border-b text-center'>
                      <input
                        type='checkbox'
                        checked={selected.has(issue.id)}
                        onChange={() => handleSelect(issue.id)}
                      />
                    </td>
                    <td className='px-4 py-2 border-b'>{issue.number}</td>
                    <td className='px-4 py-2 border-b'>{issue.title}</td>
                    <td className='px-4 py-2 border-b'>{issue.state}</td>
                    <td className='px-4 py-2 border-b'>
                      <a href={issue.user.html_url} target='_blank' rel='noopener noreferrer' className='flex items-center space-x-2'>
                        <Image src={issue.user.avatar_url} alt={issue.user.login} className='w-6 h-6 rounded-full' />
                        <span>{issue.user.login}</span>
                      </a>
                    </td>
                    <td className='px-4 py-2 border-b'>{new Date(issue.created_at).toLocaleString()}</td>
                    <td className='px-4 py-2 border-b'>
                      <a href={issue.url} target='_blank' rel='noopener noreferrer' className='text-indigo-600 hover:underline'>詳細</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubIssuesSample; 