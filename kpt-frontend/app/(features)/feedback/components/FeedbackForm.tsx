/**
 * @file FeedbackForm.tsx
 * @description フィードバック詳細フォームコンポーネント
 * 
 * フィードバックの詳細情報（タイトル、説明、メールアドレス、優先度）を
 * 入力するためのフォームコンポーネントです。
 * 
 * @example
 * ```tsx
 * <FeedbackForm
 *   formData={formData}
 *   onInputChange={handleInputChange}
 *   selectedType={formData.type}
 *   disabled={loading}
 * />
 * ```
 */

import React from 'react';
import { Input, Label, Separator } from '@/components/ui';
import { FeedbackForm as FeedbackFormData, FeedbackType } from './types';

interface FeedbackFormProps {
  /** フォームデータ */
  formData: FeedbackFormData;
  /** 入力値変更時のコールバック */
  onInputChange: (field: keyof FeedbackFormData, value: string) => void;
  /** 選択されているフィードバックタイプ */
  selectedType: FeedbackType;
  /** 送信処理中フラグ */
  disabled?: boolean;
}

/**
 * フィードバックタイプ別のプレースホルダーテキストを取得
 */
const getPlaceholderText = (type: FeedbackType): string => {
  switch (type) {
    case 'bug':
      return '発生した問題の詳細、再現手順、期待される動作などを記載してください';
    case 'feature':
      return '希望する機能の詳細、使用場面、期待される効果などを記載してください';
    case 'improvement':
      return '改善提案の詳細、現在の問題点、期待される改善効果などを記載してください';
    case 'other':
      return 'ご意見やご質問の詳細を記載してください';
    default:
      return '詳細を記載してください';
  }
};

/**
 * フィードバックタイプ別のタイトルプレースホルダーを取得
 */
const getTitlePlaceholder = (type: FeedbackType): string => {
  switch (type) {
    case 'bug':
      return 'バグ報告の概要を入力してください';
    case 'feature':
      return '新機能要望の概要を入力してください';
    case 'improvement':
      return '改善提案の概要を入力してください';
    case 'other':
      return 'その他のご意見・ご質問の概要を入力してください';
    default:
      return 'フィードバックの概要を入力してください';
  }
};

/**
 * フィードバック詳細フォームコンポーネント
 */
const FeedbackForm: React.FC<FeedbackFormProps> = ({
  formData,
  onInputChange,
  selectedType,
  disabled = false,
}) => {
  return (
    <>
      <Separator />
      <div className='px-6 py-6 space-y-6'>
        <h2 className='text-xl font-semibold text-gray-900'>詳細情報</h2>

        {/* タイトル */}
        <div>
          <Label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-2'>
            タイトル <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='title'
            type='text'
            value={formData.title}
            onChange={e => onInputChange('title', e.target.value)}
            placeholder={getTitlePlaceholder(selectedType)}
            required
            disabled={disabled}
            className='w-full'
          />
        </div>

        {/* 詳細説明 */}
        <div>
          <Label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-2'>
            詳細説明 <span className='text-red-500'>*</span>
          </Label>
          <textarea
            id='description'
            rows={6}
            value={formData.description}
            onChange={e => onInputChange('description', e.target.value)}
            placeholder={getPlaceholderText(selectedType)}
            required
            disabled={disabled}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
          />
        </div>

        {/* メールアドレス */}
        <div>
          <Label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
            メールアドレス <span className='text-red-500'>*</span>
          </Label>
          <Input
            id='email'
            type='email'
            value={formData.email}
            onChange={e => onInputChange('email', e.target.value)}
            placeholder='回答が必要な場合の連絡先'
            required
            disabled={disabled}
            className='w-full'
          />
        </div>

        {/* 優先度 */}
        <div>
          <Label htmlFor='priority' className='block text-sm font-medium text-gray-700 mb-2'>
            優先度
          </Label>
          <select
            id='priority'
            value={formData.priority}
            onChange={e => onInputChange('priority', e.target.value)}
            disabled={disabled}
            aria-label='優先度選択'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
          >
            <option value='low'>低 - 時間があるときに対応</option>
            <option value='medium'>中 - 通常の対応</option>
            <option value='high'>高 - 早急な対応が必要</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm; 