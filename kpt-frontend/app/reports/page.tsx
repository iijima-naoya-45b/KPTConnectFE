/**
 * @fileoverview 詳細レポートページ
 * @description KPTの詳細分析レポートを表示（有料プラン限定機能）
 * @version 1.0.0
 * @author KPT Connect Team
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { BILLING_MESSAGES } from '@/lib/constants';
import Link from 'next/link';

/**
 * ユーザープラン（仮のデータ）
 */
interface UserPlan {
  type: 'free' | 'pro' | 'enterprise';
  hasDetailedReports: boolean;
}

/**
 * 詳細レポートページコンポーネント
 * @returns {JSX.Element} 詳細レポートページ
 */
const ReportsPage = (): JSX.Element => {
  /** ユーザープラン情報 */
  const [userPlan, setUserPlan] = useState<UserPlan>({ type: 'free', hasDetailedReports: false });
  /** ローディング状態 */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /** 選択されたレポート期間 */
  const [selectedPeriod, setSelectedPeriod] = useState<
    'weekly' | 'monthly' | 'quarterly' | 'yearly'
  >('monthly');

  /**
   * ユーザープラン情報を取得
   */
  useEffect(() => {
    // 実際の実装では、APIからユーザープラン情報を取得
    const fetchUserPlan = async (): Promise<void> => {
      try {
        // 仮のデータ（実際はAPIから取得）
        const plan: UserPlan = {
          type: 'free', // 'pro' または 'enterprise' に変更すると詳細レポートが表示される
          hasDetailedReports: false,
        };
        setUserPlan(plan);
      } catch (error) {
        console.error('プラン情報の取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  /**
   * アップグレード促進コンポーネント
   * @returns {JSX.Element} アップグレード促進UI
   */
  const UpgradePrompt = (): JSX.Element => (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
      <main className='pt-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='w-24 h-24 mx-auto mb-8 bg-indigo-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-indigo-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>

            <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>📊 詳細レポート機能</h1>

            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              {BILLING_MESSAGES.UPGRADE_REQUIRED}
            </p>

            <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>詳細レポートで得られる分析</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
                <div className='space-y-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>成長スコア分析</h3>
                      <p className='text-sm text-gray-600'>0-100のスコアで成長度を可視化</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>トレンド分析</h3>
                      <p className='text-sm text-gray-600'>時系列での変化パターンを把握</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>強み・改善点の特定</h3>
                      <p className='text-sm text-gray-600'>AIによる自動分析とアドバイス</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>期間比較レポート</h3>
                      <p className='text-sm text-gray-600'>前期との詳細な比較分析</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>カスタム推奨アクション</h3>
                      <p className='text-sm text-gray-600'>個人に最適化された改善提案</p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5'>
                      <svg
                        className='w-4 h-4 text-green-600'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>高度なデータエクスポート</h3>
                      <p className='text-sm text-gray-600'>PDF・Excel形式での詳細レポート出力</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/pricing'>
                <Button className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold'>
                  💎 プロプランにアップグレード
                </Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline' className='px-8 py-3 text-lg'>
                  ダッシュボードに戻る
                </Button>
              </Link>
            </div>

            <p className='text-sm text-gray-500 mt-6'>
              プロプランは月額980円から。30日間の返金保証付き
            </p>
          </div>
        </div>
      </main>
    </div>
  );

  /**
   * 詳細レポート表示コンポーネント
   * @returns {JSX.Element} 詳細レポートUI
   */
  const DetailedReports = (): JSX.Element => (
    <div className='min-h-screen bg-gray-50'>
      <main className='pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* ヘッダー */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>📊 詳細レポート</h1>
            <p className='text-gray-600'>KPTデータの高度な分析とインサイトを提供します</p>
          </div>

          {/* 期間選択 */}
          <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>レポート期間</h2>
            <div className='flex flex-wrap gap-2'>
              {[
                { value: 'weekly', label: '週次' },
                { value: 'monthly', label: '月次' },
                { value: 'quarterly', label: '四半期' },
                { value: 'yearly', label: '年次' },
              ].map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* レポートグリッド */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* 成長スコア */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>🎯 成長スコア</h3>
              <div className='text-center'>
                <div className='text-4xl font-bold text-indigo-600 mb-2'>78</div>
                <p className='text-sm text-gray-600 mb-4'>前期比 +12ポイント</p>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div className='bg-indigo-600 h-3 rounded-full' style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* KPT統計 */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>📈 KPT統計</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>総KPT数</span>
                  <span className='font-semibold'>24件</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Try完了率</span>
                  <span className='font-semibold text-green-600'>85%</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>平均作成間隔</span>
                  <span className='font-semibold'>3.2日</span>
                </div>
              </div>
            </div>

            {/* トレンド分析 */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>📊 トレンド分析</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>KPT作成頻度</span>
                  <div className='flex items-center'>
                    <svg
                      className='w-4 h-4 text-green-500 mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-green-600 font-semibold'>+15%</span>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>Try実行率</span>
                  <div className='flex items-center'>
                    <svg
                      className='w-4 h-4 text-green-500 mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-green-600 font-semibold'>+8%</span>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600'>振り返りの質</span>
                  <div className='flex items-center'>
                    <svg
                      className='w-4 h-4 text-yellow-500 mr-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-yellow-600 font-semibold'>±0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 推奨アクション */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>💡 推奨アクション</h3>
              <div className='space-y-3'>
                <div className='p-3 bg-blue-50 rounded-lg'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3'></div>
                    <div>
                      <h4 className='font-medium text-blue-900'>振り返り頻度の向上</h4>
                      <p className='text-sm text-blue-700'>
                        週2回の振り返りを目標に設定することをお勧めします
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-3 bg-green-50 rounded-lg'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3'></div>
                    <div>
                      <h4 className='font-medium text-green-900'>Try項目の具体化</h4>
                      <p className='text-sm text-green-700'>
                        より具体的で測定可能なTry項目を設定しましょう
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-3 bg-purple-50 rounded-lg'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3'></div>
                    <div>
                      <h4 className='font-medium text-purple-900'>長期目標の設定</h4>
                      <p className='text-sm text-purple-700'>
                        3ヶ月後の目標を設定して継続的な改善を図りましょう
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* エクスポートボタン */}
          <div className='mt-8 text-center'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2'>
                📄 PDFでエクスポート
              </Button>
              <Button variant='outline' className='px-6 py-2'>
                📊 Excelでエクスポート
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>レポートを読み込み中...</p>
        </div>
      </div>
    );
  }

  // 有料プランでない場合はアップグレード促進画面を表示
  if (!userPlan.hasDetailedReports) {
    return <UpgradePrompt />;
  }

  // 有料プランの場合は詳細レポートを表示
  return <DetailedReports />;
};

export default ReportsPage;
