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
    <div className='flex justify-between items-center mt-8 h-12'>
      <div className='w-24'>
        {!isFirstStep && (
          <Button variant='outline' onClick={onPrev} className='px-6 py-2'>
            ← 前へ
          </Button>
        )}
      </div>

      <div className='w-24 flex justify-center'>
        {!isLastStep && (
          <Button variant='ghost' onClick={onSkip} className='text-gray-500 hover:text-gray-700'>
            スキップ
          </Button>
        )}
      </div>

      <div className='w-32 flex justify-end'>
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
