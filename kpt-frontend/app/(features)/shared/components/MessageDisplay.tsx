/**
 * @file MessageDisplay.tsx
 * @description メッセージ表示コンポーネント
 * 
 * 成功メッセージやエラーメッセージを表示するための
 * 再利用可能なコンポーネントです。
 * 
 * @example
 * ```tsx
 * <MessageDisplay
 *   message="送信に成功しました"
 *   type="success"
 * />
 * ```
 */

import React from 'react';

interface MessageDisplayProps {
  /** 表示するメッセージ */
  message: string;
  /** メッセージのタイプ */
  type?: 'success' | 'error' | 'info' | 'warning';
  /** 表示する場合のクラス名の追加 */
  className?: string;
}

/**
 * メッセージタイプに応じたスタイルクラス
 */
const getMessageStyle = (type: MessageDisplayProps['type']): string => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-700 border border-green-200';
    case 'error':
      return 'bg-red-100 text-red-700 border border-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'info':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

/**
 * メッセージ表示コンポーネント
 */
const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  type = 'info',
  className = '',
}) => {
  if (!message) return null;

  const baseStyle = 'mb-6 p-4 rounded-md';
  const typeStyle = getMessageStyle(type);

  return (
    <div className={`${baseStyle} ${typeStyle} ${className}`} role='alert'>
      {message}
    </div>
  );
};

export default MessageDisplay; 