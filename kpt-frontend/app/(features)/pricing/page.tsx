/**
 * @fileoverview 料金プランページ
 * @description KPT Connectの料金プランを表示し、プラン選択・アップグレードを提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { PRICING_PLANS } from '@/lib/constants';
import Link from 'next/link';

/**
 * 料金プランページコンポーネント
 * @returns {JSX.Element} 料金プランページ
 */
const PricingPage = (): JSX.Element => {
  /** 年額/月額切り替えフラグ */
  const [isYearly] = useState<boolean>(false);

  /**
   * 価格フォーマット関数
   * @param {number} price - 価格
   * @returns {string} フォーマット済み価格
   */
  const formatPrice = (price: number): string => {
    if (price === 0) return '無料';
    return `¥${price.toLocaleString()}`;
  };

  /**
   * 年間割引率計算
   * @param {number} monthlyPrice - 月額料金
   * @param {number} yearlyPrice - 年額料金
   * @returns {number} 割引率
   */
  const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number): number => {
    if (monthlyPrice === 0) return 0;
    const yearlyEquivalent = monthlyPrice * 12;
    return Math.round(((yearlyEquivalent - yearlyPrice) / yearlyEquivalent) * 100);
  };

  return (
    <div className='  bg-gradient-to-b from-indigo-50 to-white'>
      <main className='pt-16'>
        {/* ヘッダーセクション */}
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6'>
              シンプルで透明性のある料金プラン
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-10'>
              あなたのニーズに合わせて選べる3つのプラン。
              いつでもアップグレード・ダウングレードが可能です。
            </p>
          </div>

          {/* プランカード */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
            {Object.values(PRICING_PLANS).map(plan => {
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const discount = isYearly
                ? calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)
                : 0;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 p-8 ${
                    plan.isPopular
                      ? 'border-indigo-500 bg-white shadow-xl scale-105'
                      : 'border-gray-200 bg-white shadow-lg'
                  }`}
                >
                  {/* 人気プランバッジ */}
                  {plan.isPopular && (
                    <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                      <span className='inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white'>
                        🔥 人気プラン
                      </span>
                    </div>
                  )}

                  {/* 推奨プランバッジ */}
                  {plan.isRecommended && (
                    <div className='absolute -top-4 right-4'>
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                        推奨
                      </span>
                    </div>
                  )}

                  <div className='text-center'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>{plan.name}</h3>
                    <p className='text-gray-600 mb-6'>{plan.description}</p>

                    {/* 価格表示 */}
                    <div className='mb-6'>
                      <div className='flex items-baseline justify-center'>
                        <span className='text-4xl font-extrabold text-gray-900'>
                          {formatPrice(price)}
                        </span>
                        {price > 0 && (
                          <span className='text-lg text-gray-500 ml-1'>
                            /{isYearly ? '年' : '月'}
                          </span>
                        )}
                      </div>
                      {isYearly && discount > 0 && (
                        <p className='text-sm text-green-600 mt-1'>月額プランより{discount}%お得</p>
                      )}
                    </div>

                    {/* CTA ボタン */}
                    <div className='mb-8'>
                      {plan.type === 'free' ? (
                        <Link href='/dashboard'>
                          <Button className='w-full bg-gray-600 hover:bg-gray-700 text-white py-3'>
                            無料で始める
                          </Button>
                        </Link>
                      ) : (
                        <Link
                          href={`/billing/upgrade?plan=${plan.id}&cycle=${isYearly ? 'yearly' : 'monthly'}`}
                        >
                          <Button
                            className={`w-full py-3 ${
                              plan.isPopular
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                            }`}
                          >
                            {plan.isPopular
                              ? 'プロプランを始める'
                              : 'エンタープライズを選ぶ'}
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* 機能一覧 */}
                    <div className='text-left'>
                      <h4 className='text-sm font-semibold text-gray-900 mb-4'>含まれる機能:</h4>
                      <ul className='space-y-3'>
                        {plan.features.map((feature, index) => (
                          <li key={index} className='flex items-start'>
                            <div className='flex-shrink-0 mt-0.5'>
                              {feature.included ? (
                                <svg
                                  className='h-4 w-4 text-green-500'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className='h-4 w-4 text-gray-300'
                                  fill='currentColor'
                                  viewBox='0 0 20 20'
                                >
                                  <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'
                                  />
                                </svg>
                              )}
                            </div>
                            <div className='ml-3'>
                              <span
                                className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                              >
                                {feature.name}
                                {'limit' in feature && feature.limit && feature.included && (
                                  <span className='text-xs text-gray-500 ml-1'>
                                    (最大{feature.limit}件)
                                  </span>
                                )}
                              </span>
                              <p
                                className={`text-xs mt-1 ${feature.included ? 'text-gray-500' : 'text-gray-400'}`}
                              >
                                {feature.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ セクション */}
        <section className='bg-gray-50 py-20'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-extrabold text-gray-900 mb-4'>よくある質問</h2>
              <p className='text-lg text-gray-600'>料金プランに関するご質問にお答えします</p>
            </div>

            <div className='space-y-8'>
              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  プランはいつでも変更できますか？
                </h3>
                <p className='text-gray-600'>
                  はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次回請求日から適用されます。
                </p>
              </div>

              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  無料プランの制限はありますか？
                </h3>
                <p className='text-gray-600'>
                  無料プランでは月10件までのKPT作成が可能です。詳細レポートや外部連携機能は有料プランでご利用いただけます。
                </p>
              </div>

              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  年額プランの割引はどのくらいですか？
                </h3>
                <p className='text-gray-600'>
                  年額プランをお選びいただくと、月額プランと比較して最大17%お得になります。長期利用をお考えの方におすすめです。
                </p>
              </div>

              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  支払い方法は何が利用できますか？
                </h3>
                <p className='text-gray-600'>
                  クレジットカード（Visa、MasterCard、JCB、American
                  Express）、銀行振込、PayPalでのお支払いが可能です。
                </p>
              </div>

              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>返金保証はありますか？</h3>
                <p className='text-gray-600'>
                  有料プランには30日間の返金保証があります。ご満足いただけない場合は、全額返金いたします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className='bg-indigo-600 py-16'>
          <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-extrabold text-white mb-4'>
              今すぐKPT Connectを始めましょう
            </h2>
            <p className='text-xl text-indigo-100 mb-8'>
              無料プランから始めて、必要に応じてアップグレードできます
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/dashboard'>
                <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold'>
                  無料で始める
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  variant='outline'
                  className='bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold'>
                  お問い合わせ
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
