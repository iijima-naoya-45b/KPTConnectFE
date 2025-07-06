'use client';

import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui';
import type { Plan } from '@/types';

interface CheckoutFormProps {
  plan: Plan;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ plan, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getPrice = (): number => {
    return plan.monthlyPrice;
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('決済システムの初期化に失敗しました。ページを再読み込みしてください。');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/billing/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message || '決済処理中にエラーが発生しました。');
        onError?.(error.message || '決済エラー');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess?.();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '予期しないエラーが発生しました。';
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg p-6'>
      {/* プラン情報 */}
      <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{plan.name}</h3>
        <p className='text-sm text-gray-600 mb-3'>{plan.description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold text-indigo-600'>¥{getPrice().toLocaleString()}</span>
          <span className='text-sm text-gray-500'>/月</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* 支払い方法 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>支払い方法</label>
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card'],
            }}
          />
        </div>

        {/* 請求先住所 */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>請求先住所</label>
          <AddressElement
            options={{
              mode: 'billing',
              allowedCountries: ['JP'],
            }}
          />
        </div>

        {/* エラーメッセージ */}
        {errorMessage && (
          <div className='p-3 bg-red-50 border border-red-200 rounded-md'>
            <p className='text-sm text-red-600'>{errorMessage}</p>
          </div>
        )}

        {/* 利用規約同意 */}
        <div className='text-xs text-gray-500'>
          <p>
            決済を完了することで、
            <a href='/legal' className='text-indigo-600 hover:underline'>
              利用規約
            </a>
            および
            <a href='/legal' className='text-indigo-600 hover:underline'>
              プライバシーポリシー
            </a>
            に同意したものとみなされます。
          </p>
        </div>

        {/* 決済ボタン */}
        <Button
          type='submit'
          disabled={!stripe || isProcessing}
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isProcessing ? (
            <div className='flex items-center justify-center'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
              処理中...
            </div>
          ) : (
            `¥${getPrice().toLocaleString()} で決済する`
          )}
        </Button>

        {/* セキュリティ情報 */}
        <div className='flex items-center justify-center text-xs text-gray-500'>
          <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
              clipRule='evenodd'
            />
          </svg>
          SSL暗号化により安全に保護されています
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
