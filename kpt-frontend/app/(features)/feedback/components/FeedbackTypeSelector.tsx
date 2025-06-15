import React from 'react';
import { FeedbackType, FeedbackTypeConfig } from './types';

interface FeedbackTypeSelectorProps {
  /** 選択されているフィードバックタイプ */
  selectedType: FeedbackType;
  /** フィードバックタイプ変更時のコールバック */
  onTypeChange: (type: FeedbackType) => void;
  /** 無効化フラグ */
  disabled?: boolean;
}

/**
 * フィードバックタイプの設定データ
 */
const feedbackTypes: FeedbackTypeConfig[] = [
  {
    value: 'bug',
    label: 'バグ報告',
    description: 'アプリケーションの不具合や問題を報告',
    icon: '🐛',
    color: 'bg-red-50 border-red-200 text-red-800',
  },
  {
    value: 'feature',
    label: '新機能要望',
    description: '新しい機能やサービスの追加要望',
    icon: '✨',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    value: 'improvement',
    label: '改善提案',
    description: '既存機能の改善やUX向上の提案',
    icon: '🚀',
    color: 'bg-green-50 border-green-200 text-green-800',
  },
  {
    value: 'other',
    label: 'その他',
    description: '上記以外のご意見やご質問',
    icon: '💬',
    color: 'bg-gray-50 border-gray-200 text-gray-800',
  },
];

/**
 * フィードバックタイプ選択コンポーネント
 */
const FeedbackTypeSelector: React.FC<FeedbackTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  disabled = false,
}) => {
  return (
    <div className='px-6 py-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-4'>フィードバックの種類</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {feedbackTypes.map(type => (
          <label
            key={type.value}
            className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
              selectedType === type.value
                ? type.color
                : 'border-gray-300 bg-white hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input
              type='radio'
              name='feedback-type'
              value={type.value}
              checked={selectedType === type.value}
              onChange={e => onTypeChange(e.target.value as FeedbackType)}
              disabled={disabled}
              className='sr-only'
            />
            <div className='flex items-center'>
              <span className='text-2xl mr-3'>{type.icon}</span>
              <div>
                <div className='text-sm font-medium'>{type.label}</div>
                <div className='text-xs text-gray-500'>{type.description}</div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTypeSelector; 