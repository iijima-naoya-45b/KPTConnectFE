/**
 * @file FeedbackNotes.tsx
 * @description フィードバック送信時の注意事項コンポーネント
 * 
 * フィードバック送信時の注意事項やガイドラインを
 * 表示するための情報コンポーネントです。
 * 
 * @example
 * ```tsx
 * <FeedbackNotes />
 * ```
 */

import React from 'react';

/**
 * フィードバック送信時の注意事項コンポーネント
 */
const FeedbackNotes: React.FC = () => {
  return (
    <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
      <h3 className='text-lg font-medium text-blue-900 mb-3'>
        📝 フィードバック送信時の注意事項
      </h3>
      <ul className='text-sm text-blue-800 space-y-2'>
        <li>• バグ報告の場合は、可能な限り再現手順を詳しく記載してください</li>
        <li>• 機能要望の場合は、具体的な使用場面や期待される効果を記載してください</li>
        <li>• 緊急性の高い問題の場合は、優先度を「高」に設定してください</li>
        <li>• いただいたフィードバックは今後のサービス改善に活用させていただきます</li>
        <li>• 回答が必要な場合は、正確なメールアドレスをご入力ください</li>
      </ul>
    </div>
  );
};

export default FeedbackNotes; 