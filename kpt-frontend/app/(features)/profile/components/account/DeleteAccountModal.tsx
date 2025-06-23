'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../../components/ui/button/button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  userEmail
}) => {
  const router = useRouter();
  
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'warning' | 'confirmation'>('warning');

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      setError('');

      if (confirmationEmail !== userEmail) {
        setError('メールアドレスが一致しません');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();

      if (result.success) {
        alert('アカウントが削除されました。ご利用ありがとうございました。');
        
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sessions/logout`, {
          method: 'DELETE',
          credentials: 'include',
        });

        router.push('/login?message=account_deleted');
      } else {
        setError(result.error || 'アカウントの削除に失敗しました');
      }
    } catch (err) {
      console.error('アカウント削除エラー:', err);
      setError('アカウント削除中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmationEmail('');
    setError('');
    setStep('warning');
    onClose();
  };

  const proceedToConfirmation = () => {
    setStep('confirmation');
    setError('');
  };

  const backToWarning = () => {
    setStep('warning');
    setConfirmationEmail('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {step === 'warning' ? (
            <>
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                アカウントを削除しますか？
              </h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-2">⚠️ 重要な注意事項</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>すべてのKPTセッション・項目が削除されます</li>
                    <li>作業ログ・統計データが削除されます</li>
                    <li>サブスクリプションが自動的にキャンセルされます</li>
                    <li>この操作は元に戻すことができません</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">📧 アカウント情報</p>
                  <p>メールアドレス: <span className="font-mono">{userEmail}</span></p>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <Button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={proceedToConfirmation}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  削除手続きに進む
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                最終確認
              </h3>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  アカウント削除を実行するには、あなたのメールアドレスを入力してください：
                </p>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス確認
                  </label>
                  <input
                    type="email"
                    value={confirmationEmail}
                    onChange={(e) => setConfirmationEmail(e.target.value)}
                    placeholder={userEmail}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm mt-2">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-3">
                <Button
                  onClick={backToWarning}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                >
                  戻る
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  disabled={loading || confirmationEmail !== userEmail}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '削除中...' : '完全に削除する'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal; 