/**
 * @file OnboardingStep.tsx
 * @description オンボーディングステップコンポーネント
 *
 * 各オンボーディングステップの内容を表示するコンポーネントです。
 * ステップの進行状況とコンテンツを管理します。
 * 高さの固定化により、ステップ切り替え時のちらつきを防止します。
 */

import React from 'react';

interface OnboardingStepData {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

interface OnboardingStepProps {
  step: OnboardingStepData;
  currentStep: number;
  totalSteps: number;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({ step, currentStep, totalSteps }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto transition-all duration-300 ease-in-out'>
      {/* プログレスバー */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium text-indigo-600'>
            ステップ {currentStep + 1} / {totalSteps}
          </span>
          <span className='text-sm text-gray-500'>
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% 完了
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-indigo-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* ステップヘッダー */}
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>{step.title}</h2>
        <p className='text-lg text-gray-600'>{step.description}</p>
      </div>

      {/* ステップコンテンツ - 固定高さでちらつき防止 */}
      <div className='mb-8 min-h-[400px] flex items-center justify-center'>
        <div className='w-full transition-all duration-300 ease-in-out'>
          {step.content}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep;
