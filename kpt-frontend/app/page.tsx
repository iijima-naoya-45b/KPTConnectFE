import React from 'react';
import {
  FeatureCard,
  EasyReflectionIcon,
  RealTimeSyncIcon,
  ProgressManagementIcon,
  Button,
} from '@/components/ui';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
      <main className='pt-16'>
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* テキストコンテンツ */}
            <div className='text-center lg:text-left'>
              <h2 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6'>
                個人開発の振り返りを
                <br />
                もっと効果的に
              </h2>
              <p className='text-xl text-gray-600 mb-8'>
                KPT Connectは、個人開発者のための振り返りプラットフォームです。
                一人でも継続的な改善と成長をサポートし、開発スキルの向上を促進します。
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center'>
                <Link href='/onboarding'>
                  <Button className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                    🚀 チュートリアルを見る
                  </Button>
                </Link>
                <Link href='/dashboard'>
                  <Button variant='outline' className='px-8 py-3 text-lg'>
                    ダッシュボードを見る
                  </Button>
                </Link>
              </div>
            </div>

            {/* ヒーローイラスト */}
            <div className='flex justify-center lg:justify-end'>
              <div className='relative w-full max-w-lg'>
                <Image
                  src='/images/hero-illustration.svg'
                  alt='データ分析と振り返りのイラスト - KPT Connectで効果的な振り返りを実現'
                  width={500}
                  height={400}
                  className='w-full h-auto'
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className='bg-white py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <header className='text-3xl font-extrabold text-gray-900'>主な特徴</header>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <FeatureCard
                icon={<EasyReflectionIcon />}
                title='簡単な振り返り'
                description='直感的なインターフェースで、個人開発プロジェクトの振り返りを簡単に記録できます。'
              />
              <FeatureCard
                icon={<RealTimeSyncIcon />}
                title='プロジェクト同期'
                description='複数のプロジェクトを管理し、開発の進捗と学びを一元化して追跡できます。'
              />
              <FeatureCard
                icon={<ProgressManagementIcon />}
                title='成長の可視化'
                description='個人の開発スキルと成果を可視化し、継続的なスキルアップをサポートします。'
              />
            </div>
          </div>
        </section>

        {/* チュートリアルセクション */}
        <section className='bg-gradient-to-r from-indigo-500 to-purple-600 py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-extrabold text-white mb-4'>
                📖 3分で始められるチュートリアル
              </h3>
              <p className='text-xl text-indigo-100 mb-8'>
                初めての方でも安心！ステップバイステップでKPT Connectの使い方をご案内します
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>1️⃣</span>
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>アカウント作成</h4>
                <p className='text-indigo-100 text-sm'>
                  簡単な情報入力で、すぐにKPT Connectを始められます
                </p>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>2️⃣</span>
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>初回KPT作成</h4>
                <p className='text-indigo-100 text-sm'>
                  ガイドに従って、最初のKPT振り返りを作成してみましょう
                </p>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl'>3️⃣</span>
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>継続的改善</h4>
                <p className='text-indigo-100 text-sm'>
                  定期的な振り返りで、開発スキルを継続的に向上させます
                </p>
              </div>
            </div>

            <div className='text-center'>
              <Link href='/onboarding'>
                <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                  🚀 チュートリアルを始める
                </Button>
              </Link>
              <p className='text-indigo-100 text-sm mt-4'>
                所要時間: 約3分 | 無料でご利用いただけます
              </p>
            </div>
          </div>
        </section>

        <section className='bg-gray-50 py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h3 className='text-3xl font-extrabold text-gray-900 mb-4'>すべての機能を探索</h3>
              <p className='text-xl text-gray-600'>KPT Connectの豊富な機能をご体験ください</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Link href='/dashboard' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-indigo-600'
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
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-indigo-600'>
                      ダッシュボード
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>
                    KPT管理の中心となるページ。統計情報とクイックアクセス
                  </p>
                </div>
              </Link>

              <Link href='/calendar' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
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
                          d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-blue-600'>
                      カレンダー
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>
                    KPTスケジュールをカレンダー形式で管理・可視化
                  </p>
                </div>
              </Link>

              <Link href='/profile' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
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
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-green-600'>
                      プロフィール
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>アカウント情報とセキュリティ設定の管理</p>
                </div>
              </Link>

              <Link href='/notifications' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-yellow-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 17h5l-5 5v-5zM4.257 9.962c0-1.69.853-3.183 2.147-4.066C7.696 4.91 9.284 4.5 11 4.5s3.304.41 4.596 1.396c1.294.883 2.147 2.376 2.147 4.066 0 1.69-.853 3.183-2.147 4.066C14.304 15.09 12.716 15.5 11 15.5s-3.304-.41-4.596-1.396C5.11 13.145 4.257 11.652 4.257 9.962z'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-yellow-600'>
                      通知設定
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>KPTリマインダーとメール通知の設定</p>
                </div>
              </Link>

              <Link href='/integrations' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-purple-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-purple-600'>
                      外部連携
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>GitHub、Slack、Trelloなどとの連携設定</p>
                </div>
              </Link>

              <Link href='/help' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-red-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-red-600'>
                      ヘルプ
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>よくある質問とフィードバック送信</p>
                </div>
              </Link>

              <Link href='/pricing' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-indigo-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                        />
                      </svg>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-indigo-600'>
                      料金プラン
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>プラン比較と詳細レポート機能のご案内</p>
                </div>
              </Link>

              <Link href='/reports' className='group'>
                <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6'>
                  <div className='flex items-center mb-4'>
                    <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4'>
                      <svg
                        className='w-6 h-6 text-purple-600'
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
                    <h4 className='text-lg font-semibold text-gray-900 group-hover:text-purple-600'>
                      詳細レポート
                    </h4>
                  </div>
                  <p className='text-gray-600 text-sm'>高度な分析とインサイト（プロプラン限定）</p>
                </div>
              </Link>
            </div>

            <div className='mt-12 text-center'>
              <h4 className='text-lg font-semibold text-gray-900 mb-6'>その他のページ</h4>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link href='/onboarding'>
                  <Button className='bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm font-semibold border border-indigo-300'>
                    🚀 チュートリアル
                  </Button>
                </Link>
                <Link href='/login'>
                  <Button variant='outline' className='text-sm'>
                    ログイン
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button variant='outline' className='text-sm'>
                    お問い合わせ
                  </Button>
                </Link>
                <Link href='/legal'>
                  <Button variant='outline' className='text-sm'>
                    利用規約
                  </Button>
                </Link>
                <Link href='/feedback'>
                  <Button variant='outline' className='text-sm'>
                    フィードバック
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-indigo-600 py-16'>
          <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
            <h3 className='text-3xl font-extrabold text-white mb-4'>
              今すぐKPT Connectを始めましょう
            </h3>
            <p className='text-xl text-indigo-100 mb-8'>
              継続的な改善で、あなたの開発スキルを次のレベルへ
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/onboarding'>
                <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg'>
                  🚀 チュートリアルを始める
                </Button>
              </Link>
              <Link href='/dashboard'>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 text-lg'
                >
                  ダッシュボードを見る
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
