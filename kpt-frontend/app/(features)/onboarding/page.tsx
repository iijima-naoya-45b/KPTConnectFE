/**
 * @file page.tsx
 * @description オンボーディングページ
 *
 * 初回ユーザー向けのチュートリアルとセットアップガイドを提供するページです。
 * KPTの基本概念、使い方、初期設定を段階的に案内します。
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
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
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
  );
};

export default OnboardingPage;
