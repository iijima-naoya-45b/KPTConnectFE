/**
 * @fileoverview 決済成功ページ
 * @description Stripe決済完了後の成功画面
 * @version 1.0.0
 * @author KPT Connect Team
 */

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';

/**
 * 決済成功ページの内部コンポーネント
 * @returns {JSX.Element} 成功ページ
 */
const BillingSuccessContent: React.FC = () => {
  /** URLパラメータ */
  const searchParams = useSearchParams();
  /** PaymentIntent ID */
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  /** プラン名 */
  const [planName, setPlanName] = useState<string>('');

  /**
   * 初期化処理
   */
  useEffect(() => {
    /**
     * @description searchParamsがnullの場合は何もしない。
     */
    if (!searchParams) return;
    const paymentIntent = searchParams.get('payment_intent');
    const plan = searchParams.get('plan');

    if (paymentIntent) {
      setPaymentIntentId(paymentIntent);
    }

    if (plan) {
      setPlanName(plan);
    }
  }, [searchParams]);

  return (
    <div className='  bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          {/* 成功アイコン */}
          <div className='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6'>
            <svg
              className='h-12 w-12 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>

          {/* メインメッセージ */}
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>決済が完了しました！</h1>
          <p className='text-lg text-gray-600 mb-6'>
            KPT Connect {planName || 'Pro'}プランへのアップグレードが完了しました。
          </p>

          {/* 詳細情報 */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-left'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>次のステップ</h2>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <svg
                  className='h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0'
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
                  <span className='text-sm font-medium text-gray-900'>
                    アカウントが自動的にアップグレードされました
                  </span>
                  <p className='text-xs text-gray-500'>新機能をすぐにご利用いただけます</p>
                </div>
              </li>
              <li className='flex items-start'>
                <svg
                  className='h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0'
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
                  <span className='text-sm font-medium text-gray-900'>
                    詳細レポート機能が利用可能になりました
                  </span>
                  <p className='text-xs text-gray-500'>チームの成長を詳細に分析できます</p>
                </div>
              </li>
              <li className='flex items-start'>
                <svg
                  className='h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0'
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
                  <span className='text-sm font-medium text-gray-900'>
                    領収書をメールで送信しました
                  </span>
                  <p className='text-xs text-gray-500'>経費精算にご利用ください</p>
                </div>
              </li>
            </ul>
          </div>

          {/* 決済情報 */}
          {paymentIntentId && (
            <div className='bg-gray-50 rounded-lg p-4 mb-6'>
              <p className='text-xs text-gray-500'>
                決済ID: <span className='font-mono'>{paymentIntentId}</span>
              </p>
            </div>
          )}

          {/* アクションボタン */}
          <div className='space-y-4'>
            <Link href='/reports' className='block'>
              <Button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold'>
                📊 詳細レポートを見る
              </Button>
            </Link>

            <Link href='/dashboard' className='block'>
              <Button
                variant='outline'
                className='w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3'
              >
                ダッシュボードに戻る
              </Button>
            </Link>
          </div>

          {/* サポート情報 */}
          <div className='mt-8 pt-6 border-t border-gray-200'>
            <p className='text-sm text-gray-500 mb-2'>
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <div className='flex justify-center space-x-4 text-sm'>
              <a href='mailto:support@kptconnect.com' className='text-indigo-600 hover:underline'>
                📧 サポートに連絡
              </a>
              <a href='/help' className='text-indigo-600 hover:underline'>
                📚 ヘルプセンター
              </a>
            </div>
          </div>

          {/* 感謝メッセージ */}
          <div className='mt-8 p-4 bg-indigo-50 rounded-lg'>
            <p className='text-sm text-indigo-800'>
              🎉 KPT Connectをお選びいただき、ありがとうございます！
              <br />
              チームの継続的な改善をサポートできることを嬉しく思います。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 決済成功ページ
 * @returns {JSX.Element} 成功ページ
 */
const BillingSuccessPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className='  bg-gray-50 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
        </div>
      }
    >
      <BillingSuccessContent />
    </Suspense>
  );
};

export default BillingSuccessPage;
