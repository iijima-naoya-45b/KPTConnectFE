import React from 'react';
import { Button, Separator } from '@/components/ui';
import Link from 'next/link';

interface CancelButtonConfig {
  /** リンク先URL */
  href: string;
  /** ボタンのラベル */
  label: string;
}

interface FeedbackSubmitActionsProps {
  /** 送信処理中フラグ */
  loading: boolean;
  /** 送信ボタンクリック時のハンドラ */
  onSubmit: (e: React.FormEvent) => void;
  /** キャンセルボタンの設定 */
  cancelButton?: CancelButtonConfig;
  /** 送信ボタンのラベル */
  submitLabel?: string;
  /** 送信中のラベル */
  loadingLabel?: string;
}

/**
 * フィードバック送信アクションボタンコンポーネント
 */
const FeedbackSubmitActions: React.FC<FeedbackSubmitActionsProps> = ({
  loading,
  onSubmit,
  cancelButton,
  submitLabel = 'フィードバックを送信',
  loadingLabel = '送信中...',
}) => {
  return (
    <>
      <Separator />
      <div className='px-6 py-6'>
        <div className='flex justify-end space-x-3'>
          {cancelButton && (
            <Link href={cancelButton.href}>
              <Button variant='outline' type='button' disabled={loading}>
                {cancelButton.label}
              </Button>
            </Link>
          )}
          <Button
            type='submit'
            disabled={loading}
            className='bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={onSubmit}
          >
            {loading ? loadingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FeedbackSubmitActions; 