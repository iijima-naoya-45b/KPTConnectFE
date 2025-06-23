'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import DeleteAccountModal from '@/app/(features)/profile/components/account/DeleteAccountModal';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  last_login_at?: string;
}

const ProfilePage = () => {
  // 状態管理
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
      } else {
        setError('プロフィール情報の取得に失敗しました');
      }
    } catch (err) {
      console.error('プロフィール取得エラー:', err);
      setError('プロフィール情報の取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // 初期化
  useEffect(() => {
    if (user && !authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);
  
  if (authLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">ログインが必要です</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ページヘッダー */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900">プロフィール</h1>
            <p className="mt-1 text-sm text-gray-600">
              アカウント管理
            </p>
          </div>
        </div>

        {/* メッセージ表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* 現在のメールアドレス表示 */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">メールアドレス</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="text-sm text-gray-700">
                  <p className="font-mono text-lg">{profile?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 危険な操作セクション */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">危険な操作</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      アカウント削除
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        アカウントを削除すると、すべてのデータが完全に削除され、復元することはできません。
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                      >
                        アカウントを削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* アカウント削除モーダル */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        userEmail={profile?.email || ''}
      />
    </div>
  );
};

export default ProfilePage;
