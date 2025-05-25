/**
 * @file LoginForm.tsx
 * @description ログインフォームコンポーネント
 *
 * メールアドレスとパスワードによるログインフォームを管理します。
 * バリデーション、送信処理、エラーハンドリングを含みます。
 */

import React, { useState } from 'react';
import type { LoginFormData } from './types';

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false, error }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}

      <div className='rounded-md shadow-sm -space-y-px'>
        <div>
          <label htmlFor='email' className='sr-only'>
            メールアドレス
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='メールアドレス'
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            パスワード
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            placeholder='パスワード'
            value={formData.password}
            onChange={e => handleInputChange('password', e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <button
          type='submit'
          disabled={loading}
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
