/**
 * @file OnboardingNavigation.tsx
 * @description オンボーディングナビゲーションコンポーネント
 *
 * オンボーディングの進行を制御するナビゲーションボタンを提供します。
 * 前へ、次へ、スキップ、完了の操作を管理します。
 */

import React from 'react';
import { Button } from '@/components/ui';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  onComplete,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className='flex justify-between items-center mt-8'>
      {/* 左側：戻るボタン */}
      <div>
        {!isFirstStep && (
          <Button variant='outline' onClick={onPrev} className='px-6 py-2'>
            ← 前へ
          </Button>
        )}
      </div>

      {/* 中央：スキップボタン */}
      <div>
        {!isLastStep && (
          <Button variant='ghost' onClick={onSkip} className='text-gray-500 hover:text-gray-700'>
            スキップ
          </Button>
        )}
      </div>

      {/* 右側：次へ/完了ボタン */}
      <div>
        {isLastStep ? (
          <Button onClick={onComplete} className='bg-indigo-600 hover:bg-indigo-700 px-8 py-2'>
            開始する！
          </Button>
        ) : (
          <Button onClick={onNext} className='bg-indigo-600 hover:bg-indigo-700 px-6 py-2'>
            次へ →
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingNavigation;
