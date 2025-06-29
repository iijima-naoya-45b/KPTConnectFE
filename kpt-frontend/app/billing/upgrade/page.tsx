'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { PRICING_PLANS } from '@/lib/constants';
import CheckoutForm from '@/components/billing/CheckoutForm';
import { Button } from '@/components/ui';
import Link from 'next/link';
import type { Plan } from '@/types';

const UpgradePageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle] = useState<'monthly'>('monthly');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!searchParams) return;
    const planId = searchParams.get('plan');

    if (!planId) {
      setError('プランが選択されていません。');
      setIsLoading(false);
      return;
    }

    const plan = Object.values(PRICING_PLANS).find(p => p.id === planId);
    if (!plan) {
      setError('無効なプランが選択されました。');
      setIsLoading(false);
      return;
    }

    setSelectedPlan(plan as Plan);

    createPaymentIntent(plan);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedPlan) {
      setSelectedPlan(PRICING_PLANS['PRO']);
    }
  }, [selectedPlan]);

  const createPaymentIntent = async (plan: Plan): Promise<void> => {
    try {
      const amount = plan.monthlyPrice;

      console.log('Creating PaymentIntent with plan:', plan, 'and cycle:', billingCycle);
      
      console.log('Sending request to:', `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/create-payment-intent`);
      
      console.log('Request body:', {
        planId: plan.id,
        billingCycle: billingCycle,
        amount: amount * 100,
        currency: 'jpy',
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          billingCycle: billingCycle,
          amount: amount * 100,
          currency: 'jpy',
        }),
      });

      if (!response.ok) {
        console.error('Failed to create PaymentIntent:', response.status, response.statusText);
        throw new Error('決済の準備に失敗しました。');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);

      console.log('PaymentIntent created successfully:', data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : '予期しないエラーが発生しました。';
      console.error('PaymentIntent作成エラー:', errorMsg);
      setError('決済の準備に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 決済成功時の処理
   */
  const handlePaymentSuccess = (): void => {
    console.log('Payment succeeded, redirecting to success page!!!.');
    router.push('/billing/success');
  };

  /**
   * 決済エラー時の処理
   * @param {string} errorMessage - エラーメッセージ
   */
  const handlePaymentError = (errorMessage: string): void => {
    setError(errorMessage);
  };

  if (isLoading) {
    return (
      <div className='  bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>決済の準備中...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedPlan) {
    return (
      <div className='  bg-gray-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto text-center'>
          <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>エラーが発生しました</h1>
          <p className='text-gray-600 mb-6'>{error}</p>
          <Link href='/pricing'>
            <Button className='bg-indigo-600 hover:bg-indigo-700 text-white'>
              料金プランに戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stripePromise = getStripe();

  return (
    <div className='  bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* ヘッダー */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>プランアップグレード</h1>
          <p className='text-gray-600'>安全な決済でKPT Connectをさらに活用しましょう</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* プラン詳細 */}
          <div className='bg-white rounded-lg shadow-lg p-6 flex-1'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>選択されたプラン</h2>

            <div className='border-2 border-indigo-200 rounded-lg p-4 mb-6'>
              <div className='flex justify-between items-start mb-3'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>{selectedPlan.name}</h3>
                  <p className='text-sm text-gray-600'>{selectedPlan.description}</p>
                </div>
                {(selectedPlan as any).isPopular && (
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'>
                    人気
                  </span>
                )}
              </div>

              <div className='flex items-baseline mb-4'>
                <span className='text-3xl font-bold text-indigo-600'>
                  ¥{selectedPlan.monthlyPrice.toLocaleString()}
                </span>
                <span className='text-gray-500 ml-1'>/月</span>
              </div>

              {/* 機能一覧 */}
              <div>
                <h4 className='text-sm font-semibold text-gray-900 mb-3'>含まれる機能:</h4>
                <ul className='space-y-2'>
                  {selectedPlan.features
                    .filter(f => f.included)
                    .map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <svg
                          className='h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <div>
                          <span className='text-sm text-gray-700'>{feature.name}</span>
                          {(feature as any).limit && (
                            <span className='text-xs text-gray-500 ml-1'>
                              (最大{(feature as any).limit}件)
                            </span>
                          )}
                          <p className='text-xs text-gray-500'>{feature.description}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {/* 請求サイクル変更 */}
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <h4 className='text-sm font-semibold text-gray-900 mb-3'>請求サイクル:</h4>
                <div className='flex space-x-4'>
                  <button
                    className='px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white'
                  >
                    月額
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 決済フォーム */}
          <div className='bg-white rounded-lg shadow-lg p-6 flex-1'>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#4f46e5',
                  },
                },
              }}
            >
              <CheckoutForm
                plan={selectedPlan}
                billingCycle={billingCycle}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * プランアップグレード決済ページ
 * @returns {JSX.Element} 決済ページ
 */
const UpgradePage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className='  bg-gray-50 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
        </div>
      }
    >
      <UpgradePageContent />
    </Suspense>
  );
};

export default UpgradePage;