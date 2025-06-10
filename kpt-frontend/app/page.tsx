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
import ReportChartsGrid from './(features)/dashboard/components/ReportChartsGrid';

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
      <main className='pt-16'>
        <section className='mx-8 py-10 flex justify-center'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[70%]'>
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
              <p className='text-base text-indigo-700 bg-indigo-50 rounded px-4 py-3 mb-8'>
                GitHubと連携することで、KPTの振り返りを実際のIssueやPull Requestと紐付けて管理できます。<br />
                開発の進捗や課題、改善アクションをGitHub上のタスクと一元化し、より実践的な振り返りが可能です。
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

        <section className='bg-white py-20 flex justify-center'>
          <div className='mx-8 max-w-[70%]'>
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

        {/* GitHub紐づけセクション */}
        <section className='mx-8 py-10 flex justify-center bg-gradient-to-b from-indigo-50 to-white'>
          <div className='rounded-lg p-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-[70%]'>
            {/* 左：テキスト */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>GitHub連携でタスクとKPTを一元管理</h3>
              <p className='text-gray-700 mb-4'>
                GitHubと連携することで、KPTのKeep/Problem/TryやTodoを実際のIssueやPull Requestと紐付けて管理できます。
                開発の進捗や課題、改善アクションをGitHub上のタスクと一元化し、より実践的な振り返りが可能です。
              </p>
              <ul className='list-disc pl-5 text-gray-700 mb-4'>
                <li>Issue・Pull Request・Branch・CommitとKPTを紐付け</li>
                <li>進捗・課題・改善アクションの可視化</li>
                <li>GitHubタスクとKPTの一元管理</li>
              </ul>
              <div className='bg-indigo-100 rounded p-4'>
                <div className='font-semibold text-indigo-700 mb-2'>使い方の流れ</div>
                <ol className='list-decimal pl-5 text-gray-700 text-sm'>
                  <li>GitHub認証で連携開始</li>
                  <li>リポジトリを選択</li>
                  <li>IssueやPull RequestとKPTを紐付けて管理</li>
                </ol>
              </div>
            </div>
            {/* 右：ダミー画像 */}
            <div className='flex-1 flex justify-center items-center min-w-[220px]'>
              <Image
                src='/images/github-connect.png'
                alt='GitHub連携イメージ'
                width={320}
                height={220}
                className='rounded shadow object-contain bg-gray-50'
              />
            </div>
          </div>
        </section>

        {/* 詳細レポートプレビューセクション */}
        <section className='bg-gradient-to-r from-slate-900 to-slate-800 py-20 flex justify-center'>
          <div className='mx-8 max-w-[70%]'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-extrabold text-white mb-4'>
                📊 詳細レポート機能のご紹介
              </h3>
              <p className='text-xl text-slate-300 mb-8'>
                プロプラン限定の高度な分析機能で、あなたの成長を数値で確認できます
              </p>
            </div>

            {/* トレンド分析セクション */}
            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 mb-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h4 className='text-xl font-semibold text-gray-900 mb-2 flex items-center'>
                    📈 トレンド分析
                  </h4>
                  <p className='text-gray-600'>時系列でのKPTの変化パターンと傾向を分析します</p>
                </div>
                <div className='flex space-x-2'>
                  <button className='px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium'>
                    週次
                  </button>
                  <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium'>
                    月次
                  </button>
                </div>
              </div>

              {/* 統計カード */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                <div className='bg-blue-100 rounded-lg p-4 text-center'>
                  <div className='text-3xl font-bold text-blue-600 mb-1'>45</div>
                  <div className='text-sm text-blue-700 font-medium'>総KPT数</div>
                </div>
                <div className='bg-green-100 rounded-lg p-4 text-center'>
                  <div className='text-3xl font-bold text-green-600 mb-1'>90%</div>
                  <div className='text-sm text-green-700 font-medium'>平均完了率</div>
                </div>
                <div className='bg-purple-100 rounded-lg p-4 text-center'>
                  <div className='text-3xl font-bold text-purple-600 mb-1'>第3週</div>
                  <div className='text-sm text-purple-700 font-medium'>最高週</div>
                </div>
                <div className='bg-orange-100 rounded-lg p-4 text-center'>
                  <div className='text-3xl font-bold text-orange-600 mb-1'>95%</div>
                  <div className='text-sm text-orange-700 font-medium'>最高完了率</div>
                </div>
              </div>

              {/* グラフセクション（4カラムグリッド） */}
              <div className='my-4'>
                <ReportChartsGrid />
              </div>
            </div>

            {/* ドーナツチャート風とKPT分布 */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
              {/* ドーナツチャート風 - 完了状況 */}
              

                

              {/* 強み・改善点分析 */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                <div className='bg-green-50 rounded-lg p-6 border border-green-200'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                    💪 主な強み
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex items-center text-green-700'>
                      <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                      継続的な振り返りの習慣が定着
                    </li>
                    <li className='flex items-center text-green-700'>
                      <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                      Keepの実行率が高く、良い取り組みを維持
                    </li>
                    <li className='flex items-center text-green-700'>
                      <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                      問題解決への取り組み姿勢が積極的
                    </li>
                  </ul>
                </div>

                <div className='bg-amber-50 rounded-lg p-6 border border-amber-200'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                    🎯 改善機会
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    <li className='flex items-center text-amber-700'>
                      <span className='w-2 h-2 bg-amber-500 rounded-full mr-2'></span>
                      Problemの解決完了率を向上させる
                    </li>
                    <li className='flex items-center text-amber-700'>
                      <span className='w-2 h-2 bg-amber-500 rounded-full mr-2'></span>
                      Tryの実行期間が長期化する傾向
                    </li>
                    <li className='flex items-center text-amber-700'>
                      <span className='w-2 h-2 bg-amber-500 rounded-full mr-2'></span>
                      定量的な成果指標の設定が不十分
                    </li>
                  </ul>
                </div>
              </div>

              {/* アクション推奨 */}
              <div className='bg-indigo-50 rounded-lg p-6 border border-indigo-200'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4'>🚀 推奨アクション</h4>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='bg-white rounded-lg p-4 border border-indigo-100'>
                    <div className='flex items-center mb-2'>
                      <div className='w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mr-2'>
                        <span className='text-white text-xs font-bold'>高</span>
                      </div>
                      <span className='text-sm font-semibold text-gray-900'>成功事例の横展開</span>
                    </div>
                    <p className='text-xs text-gray-600'>
                      効果的だったKeepの取り組みを他のプロジェクトにも適用する
                    </p>
                    <div className='text-xs text-indigo-600 font-medium mt-2'>期待効果: 85%</div>
                  </div>

                  <div className='bg-white rounded-lg p-4 border border-indigo-100'>
                    <div className='flex items-center mb-2'>
                      <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2'>
                        <span className='text-white text-xs font-bold'>中</span>
                      </div>
                      <span className='text-sm font-semibold text-gray-900'>小さな実験の推奨</span>
                    </div>
                    <p className='text-xs text-gray-600'>
                      Tryを小さな実験として実施し、リスクを最小化
                    </p>
                    <div className='text-xs text-orange-600 font-medium mt-2'>期待効果: 75%</div>
                  </div>

                  <div className='bg-white rounded-lg p-4 border border-indigo-100'>
                    <div className='flex items-center mb-2'>
                      <div className='w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2'>
                        <span className='text-white text-xs font-bold'>低</span>
                      </div>
                      <span className='text-sm font-semibold text-gray-900'>根本原因分析</span>
                    </div>
                    <p className='text-xs text-gray-600'>
                      5Why分析で問題の根本原因を特定する
                    </p>
                    <div className='text-xs text-gray-600 font-medium mt-2'>期待効果: 65%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-center'>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-4'>
                <Link href='/reports/sample'>
                  <Button className='bg-white text-slate-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                    📊 詳細レポートを見る
                  </Button>
                </Link>
                <Link href='/pricing'>
                  <Button className='bg-white text-slate-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                    プロプランを確認
                  </Button>
                </Link>
              </div>
              <p className='text-slate-300 text-sm'>
                プロプラン限定機能 | 詳細な分析とインサイトで成長を加速
              </p>
            </div>
          </div>
        </section>

        {/* チュートリアルセクション */}
        <section className='bg-gradient-to-r from-indigo-500 to-purple-600 py-20 flex justify-center'>
          <div className='mx-8 max-w-[70%]'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-extrabold text-white mb-4'>
                📖 3分で始められるチュートリアル
              </h3>
              <p className='text-xl text-indigo-100 mb-8'>
                初めての方でも安心！ステップバイステップでKPT Connectの使い方をご案内します
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
              {/* アカウント作成 */}
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center'>
                <div className='w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 p-6'>
                  <Image
                    src='/images/tutorial1.svg'
                    alt='アカウント作成のイラスト'
                    width={128}
                    height={128}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>アカウント作成</h4>
                <p className='text-indigo-100 text-sm'>
                  簡単な情報入力で、すぐにKPT Connectを始められます
                </p>
              </div>

              {/* 初回KPT作成 */}
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center'>
                <div className='w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 p-6'>
                  <Image
                    src='/images/tutorial2.svg'
                    alt='KPT作成のイラスト'
                    width={128}
                    height={128}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>初回KPT作成</h4>
                <p className='text-indigo-100 text-sm'>
                  ガイドに従って、最初のKPT振り返りを作成してみましょう
                </p>
              </div>

              {/* 継続的改善 */}
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center'>
                <div className='w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 p-6'>
                  <Image
                    src='/images/tutorial3.svg'
                    alt='継続的改善のイラスト'
                    width={128}
                    height={128}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>継続的改善</h4>
                <p className='text-indigo-100 text-sm'>
                  定期的な振り返りで、開発スキルを継続的に向上させます
                </p>
              </div>
            </div>

            <div className='text-center'>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-4'>
                <Link href='/onboarding'>
                  <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                    🚀 チュートリアルを始める
                  </Button>
                </Link>
                <Link href='/dashboard'>
                  <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'>
                    ダッシュボードを見る
                  </Button>
                </Link>
              </div>
              <p className='text-indigo-100 text-sm'>
                所要時間: 約3分 | 無料でご利用いただけます
              </p>
            </div>
          </div>
        </section>

        <section className='bg-gray-50 py-20 flex justify-center'>
          <div className='mx-8 max-w-[70%]'>
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

              <Link href='/reports/sample' className='group'>
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

        <section className='bg-indigo-600 py-16 flex justify-center'>
          <div className='mx-auto text-center px-8 sm:px-12 lg:px-16 max-w-[70%]'>
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
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
