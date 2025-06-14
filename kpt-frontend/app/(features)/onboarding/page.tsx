/**
 * @file page.tsx
 * @description オンボーディングページ
 *
 * 初回ユーザー向けのチュートリアルとセットアップガイドを提供するページです。
 * KPTの基本概念、使い方、初期設定を段階的に案内します。
 * 高さの固定化により、ステップ切り替え時のちらつきを防止します。
 *
 * @example
 * ```tsx
 * // /onboarding でアクセス可能
 * ```
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingStep, OnboardingNavigation, onboardingSteps } from './components';

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    router.push('/dashboard');
  };

  const completeOnboarding = () => {
    // オンボーディング完了の処理
    localStorage.setItem('onboarding_completed', 'true');
    router.push('/dashboard');
  };

  return (
    <div className='  bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col'>
      <div className='container mx-auto px-4 py-8 flex-1 flex flex-col justify-center'>
        <div className='flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full'>
          <OnboardingStep
            step={onboardingSteps[currentStep]}
            currentStep={currentStep}
            totalSteps={onboardingSteps.length}
          />

          <OnboardingNavigation
            currentStep={currentStep}
            totalSteps={onboardingSteps.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={skipOnboarding}
            onComplete={completeOnboarding}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
