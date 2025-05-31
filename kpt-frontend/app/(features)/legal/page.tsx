/**
 * @file page.tsx
 * @description 法的事項インデックスページ
 *
 * プライバシーポリシーと利用規約へのリンクを提供するインデックスページです。
 * ユーザーが必要な法的情報に簡単にアクセスできるよう設計されています。
 *
 * @example
 * ```tsx
 * // /legal でアクセス可能
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const LegalIndexPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50 pt-16'>
      <div className='py-12'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>法的事項</h1>
            <p className='text-xl text-gray-600'>
              KPT Connectサービスの利用に関する重要な情報をご確認ください
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-12'>
            {/* プライバシーポリシーカード */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4'>
                  <svg
                    className='w-6 h-6 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                <h2 className='text-2xl font-semibold text-gray-900'>プライバシーポリシー</h2>
              </div>
              
              <p className='text-gray-600 mb-6 leading-relaxed'>
                個人情報の収集、利用、管理について詳細に説明しています。
                お客様の大切な情報をどのように保護しているかをご確認いただけます。
              </p>
              
              <ul className='text-sm text-gray-500 mb-8 space-y-2'>
                <li>• 収集する情報の種類</li>
                <li>• 情報の利用目的</li>
                <li>• セキュリティ対策</li>
                <li>• お客様の権利</li>
                <li>• Cookie・トラッキング</li>
              </ul>
              
              <Link href='/legal/privacy'>
                <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                  プライバシーポリシーを読む
                </Button>
              </Link>
            </div>

            {/* 利用規約カード */}
            <div className='bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300'>
              <div className='flex items-center mb-6'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4'>
                  <svg
                    className='w-6 h-6 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
                <h2 className='text-2xl font-semibold text-gray-900'>利用規約</h2>
              </div>
              
              <p className='text-gray-600 mb-6 leading-relaxed'>
                サービスの利用に関する規約・条件を定めています。
                ご利用前に必ずお読みいただき、内容にご同意の上でサービスをご利用ください。
              </p>
              
              <ul className='text-sm text-gray-500 mb-8 space-y-2'>
                <li>• サービス内容・機能</li>
                <li>• 利用ルール・禁止事項</li>
                <li>• 知的財産権</li>
                <li>• 料金・支払い</li>
                <li>• 免責事項・損害賠償</li>
              </ul>
              
              <Link href='/legal/terms'>
                <Button className='w-full bg-green-600 hover:bg-green-700'>
                  利用規約を読む
                </Button>
              </Link>
            </div>
          </div>

          {/* 追加情報 */}
          <div className='bg-white rounded-lg shadow p-6 mb-8'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>重要なお知らせ</h3>
            <div className='grid md:grid-cols-2 gap-6 text-sm text-gray-600'>
              <div>
                <h4 className='font-medium text-gray-800 mb-2'>最終更新日</h4>
                <p>プライバシーポリシー: 2024年3月15日</p>
                <p>利用規約: 2024年3月15日</p>
              </div>
              <div>
                <h4 className='font-medium text-gray-800 mb-2'>変更について</h4>
                <p>
                  重要な変更がある場合は、事前にメール通知またはサービス内でのお知らせを行います。
                  継続してサービスをご利用いただく場合、変更内容にご同意いただいたものとみなします。
                </p>
              </div>
            </div>
          </div>

          {/* お問い合わせ・ナビゲーション */}
          <div className='text-center'>
            <p className='text-gray-600 mb-6'>
              ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <div className='flex justify-center space-x-4'>
              <Link href='/contact'>
                <Button variant='outline'>お問い合わせ</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalIndexPage;
