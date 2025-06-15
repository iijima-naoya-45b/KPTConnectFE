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
    localStorage.setItem('onboarding_completed', 'true');
    router.push('/dashboard');
  };

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col'>
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
