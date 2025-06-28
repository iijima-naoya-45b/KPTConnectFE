import React, { useState } from 'react';
import KPTField from './KPTField';
import { Input } from '@/components/ui/input/input';

interface KPTReviewFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialKeep?: string;
  initialProblem?: string;
  initialTry?: string;
  onSubmit: (data: {
    title: string;
    description: string;
    keep: string;
    problem: string;
    try: string;
  }) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export interface KPTReviewFormValues {
  title: string;
  description: string;
  keep: string;
  problem: string;
  try: string;
}

const KPTReviewForm: React.FC<KPTReviewFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialKeep = '',
  initialProblem = '',
  initialTry = '',
  onSubmit,
  loading = false,
  error = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [keep, setKeep] = useState(initialKeep);
  const [problem, setProblem] = useState(initialProblem);
  const [tryText, setTryText] = useState(initialTry);
  const [localError, setLocalError] = useState('');

  const validate = () => {
    if (!title.trim()) return 'タイトルは必須です';
    if (!description.trim()) return '振り返りの概要は必須です';
    if (!keep.trim()) return 'Keepは必須です';
    if (!problem.trim()) return 'Problemは必須です';
    if (!tryText.trim()) return 'Tryは必須です';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    const errMsg = validate();
    if (errMsg) {
      setLocalError(errMsg);
      return;
    }
    await onSubmit({ title, description, keep, problem, try: tryText });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-10 bg-white shadow rounded-xl p-10'>
      {(localError || error) && (
        <div className='mb-4 text-red-600 font-semibold text-center'>{localError || error}</div>
      )}
      <div className='space-y-4'>
        <div>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>タイトル</label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='mt-1'
            placeholder='例：6月12日の振り返り'
            required
          />
        </div>
        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>振り返りの概要</label>
          <Input
            type='text'
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='mt-1'
            placeholder='今日の全体的な感想やまとめを記入してください'
            required
          />
        </div>
      </div>
      <div className='space-y-8'>
        <KPTField
          id='keep'
          label='Keep'
          value={keep}
          onChange={e => setKeep(e.target.value)}
          placeholder='今日できたこと・良かったことを自由に記入してください'
          colorClass='text-indigo-700'
        />
        <KPTField
          id='problem'
          label='Problem'
          value={problem}
          onChange={e => setProblem(e.target.value)}
          placeholder='課題・困ったこと・反省点を自由に記入してください'
          colorClass='text-red-700'
        />
        <KPTField
          id='try'
          label='Try'
          value={tryText}
          onChange={e => setTryText(e.target.value)}
          placeholder='次に挑戦したいこと・改善したいことを自由に記入してください'
          colorClass='text-green-700'
        />
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={loading}
          className='bg-indigo-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-indigo-700 disabled:opacity-50'
        >
          {loading ? '保存中...' : '振り返りを保存'}
        </button>
      </div>
    </form>
  );
};

export default KPTReviewForm; 