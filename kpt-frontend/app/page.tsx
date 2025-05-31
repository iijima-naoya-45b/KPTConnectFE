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

        {/* 詳細レポートプレビューセクション */}
        <section className='bg-gradient-to-r from-slate-900 to-slate-800 py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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

              {/* グラフエリア */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* 週次KPT推移（線グラフ） */}
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                  <div className='flex items-center justify-between mb-4'>
                    <h5 className='font-semibold text-gray-900'>週次KPT推移</h5>
                    <div className='flex space-x-4 text-xs'>
                      <div className='flex items-center'>
                        <div className='w-3 h-0.5 bg-blue-500 mr-1'></div>
                        <span>Keep</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-0.5 bg-red-500 mr-1'></div>
                        <span>Problem</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-0.5 bg-green-500 mr-1'></div>
                        <span>Try</span>
                      </div>
                    </div>
                  </div>
                  <div className='relative h-48'>
                    {/* Y軸 */}
                    <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2'>
                      <span>6</span>
                      <span>5</span>
                      <span>4</span>
                      <span>3</span>
                      <span>2</span>
                      <span>1</span>
                      <span>0</span>
                    </div>
                    
                    {/* グラフエリア */}
                    <div className='ml-8 h-full relative'>
                      {/* グリッドライン */}
                      <div className='absolute inset-0'>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className='absolute w-full border-t border-gray-100' style={{bottom: `${i * 20}%`}}></div>
                        ))}
                        <div className='h-full border-l border-gray-200'></div>
                      </div>
                      
                      {/* 線グラフ */}
                      <svg className='absolute inset-0 w-full h-full'>
                        {/* Keep線 (青) */}
                        <polyline
                          points='20,160 80,160 140,80 200,120'
                          fill='none'
                          stroke='#3B82F6'
                          strokeWidth='2'
                          className='drop-shadow-sm'
                        />
                        {/* Problem線 (赤) */}
                        <polyline
                          points='20,120 80,128 140,96 200,120'
                          fill='none'
                          stroke='#EF4444'
                          strokeWidth='2'
                          className='drop-shadow-sm'
                        />
                        {/* Try線 (緑) */}
                        <polyline
                          points='20,144 80,120 140,160 200,136'
                          fill='none'
                          stroke='#10B981'
                          strokeWidth='2'
                          className='drop-shadow-sm'
                        />
                        
                        {/* データポイント */}
                        {/* Keep */}
                        <circle cx='20' cy='160' r='3' fill='#3B82F6' />
                        <circle cx='80' cy='160' r='3' fill='#3B82F6' />
                        <circle cx='140' cy='80' r='3' fill='#3B82F6' />
                        <circle cx='200' cy='120' r='3' fill='#3B82F6' />
                        
                        {/* Problem */}
                        <circle cx='20' cy='120' r='3' fill='#EF4444' />
                        <circle cx='80' cy='128' r='3' fill='#EF4444' />
                        <circle cx='140' cy='96' r='3' fill='#EF4444' />
                        <circle cx='200' cy='120' r='3' fill='#EF4444' />
                        
                        {/* Try */}
                        <circle cx='20' cy='144' r='3' fill='#10B981' />
                        <circle cx='80' cy='120' r='3' fill='#10B981' />
                        <circle cx='140' cy='160' r='3' fill='#10B981' />
                        <circle cx='200' cy='136' r='3' fill='#10B981' />
                      </svg>
                    </div>
                    
                    {/* X軸ラベル */}
                    <div className='absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2'>
                      <span>第1週</span>
                      <span>第2週</span>
                      <span>第3週</span>
                      <span>第4週</span>
                    </div>
                  </div>
                </div>

                {/* 週次完了率（棒グラフ） */}
                <div className='bg-white rounded-lg p-6 shadow-sm'>
                  <div className='flex items-center justify-between mb-4'>
                    <h5 className='font-semibold text-gray-900'>週次完了率</h5>
                    <div className='flex items-center text-xs'>
                      <div className='w-3 h-3 bg-green-500 rounded mr-1'></div>
                      <span>完了率 (%)</span>
                    </div>
                  </div>
                  <div className='relative h-48'>
                    {/* Y軸 */}
                    <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2'>
                      <span>100%</span>
                      <span>90%</span>
                      <span>80%</span>
                      <span>70%</span>
                      <span>60%</span>
                      <span>50%</span>
                      <span>40%</span>
                    </div>
                    
                    {/* グラフエリア */}
                    <div className='ml-8 h-full relative flex items-end justify-between space-x-4 pb-6'>
                      {/* 棒グラフ */}
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm relative' style={{height: '92%'}}>
                          <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700'>92%</div>
                        </div>
                        <span className='text-xs text-gray-500 mt-2'>第1週</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm relative' style={{height: '88%'}}>
                          <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700'>88%</div>
                        </div>
                        <span className='text-xs text-gray-500 mt-2'>第2週</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm relative' style={{height: '95%'}}>
                          <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700'>95%</div>
                        </div>
                        <span className='text-xs text-gray-500 mt-2'>第3週</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm relative' style={{height: '85%'}}>
                          <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700'>85%</div>
                        </div>
                        <span className='text-xs text-gray-500 mt-2'>第4週</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* グラフセクション */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 my-4'>
                {/* 線グラフ風 - 週次完了率推移 */}
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>📈 週次完了率推移</h4>
                  <div className='relative h-40'>
                    {/* Y軸ラベル */}
                    <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500'>
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    
                    {/* グラフエリア */}
                    <div className='ml-8 h-full relative'>
                      {/* グリッドライン */}
                      <div className='absolute inset-0'>
                        <div className='h-full border-l border-gray-200'></div>
                        <div className='absolute top-0 w-full border-t border-gray-100'></div>
                        <div className='absolute top-1/4 w-full border-t border-gray-100'></div>
                        <div className='absolute top-1/2 w-full border-t border-gray-100'></div>
                        <div className='absolute top-3/4 w-full border-t border-gray-100'></div>
                        <div className='absolute bottom-0 w-full border-t border-gray-200'></div>
                      </div>
                      
                      {/* 線グラフ */}
                      <svg className='absolute inset-0 w-full h-full'>
                        <polyline
                          points='10,120 50,110 90,80 130,70'
                          fill='none'
                          stroke='#3B82F6'
                          strokeWidth='3'
                          className='drop-shadow-sm'
                        />
                        {/* データポイント */}
                        <circle cx='10' cy='120' r='4' fill='#3B82F6' className='drop-shadow-sm' />
                        <circle cx='50' cy='110' r='4' fill='#3B82F6' className='drop-shadow-sm' />
                        <circle cx='90' cy='80' r='4' fill='#3B82F6' className='drop-shadow-sm' />
                        <circle cx='130' cy='70' r='4' fill='#3B82F6' className='drop-shadow-sm' />
                      </svg>
                    </div>
                    
                    {/* X軸ラベル */}
                    <div className='absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500 mt-2'>
                      <span>第1週</span>
                      <span>第2週</span>
                      <span>第3週</span>
                      <span>第4週</span>
                    </div>
                  </div>
                  <div className='mt-4 text-sm text-gray-600'>
                    最新週の完了率: <span className='font-semibold text-green-600'>95%</span>
                  </div>
                </div>

                {/* 棒グラフ風 - 月次KPT数推移 */}
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>📊 月次KPT数推移</h4>
                  <div className='relative h-40'>
                    {/* Y軸ラベル */}
                    <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500'>
                      <span>50</span>
                      <span>40</span>
                      <span>30</span>
                      <span>20</span>
                      <span>10</span>
                      <span>0</span>
                    </div>
                    
                    {/* グラフエリア */}
                    <div className='ml-8 h-full relative flex items-end justify-between space-x-2 pb-6'>
                      {/* 棒グラフ */}
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm' style={{height: '64%'}}></div>
                        <span className='text-xs text-gray-500 mt-2'>3ヶ月前</span>
                        <span className='text-xs font-semibold text-gray-700'>32</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm' style={{height: '76%'}}></div>
                        <span className='text-xs text-gray-500 mt-2'>2ヶ月前</span>
                        <span className='text-xs font-semibold text-gray-700'>38</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm' style={{height: '82%'}}></div>
                        <span className='text-xs text-gray-500 mt-2'>先月</span>
                        <span className='text-xs font-semibold text-gray-700'>41</span>
                      </div>
                      <div className='flex-1 flex flex-col items-center'>
                        <div className='w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm' style={{height: '90%'}}></div>
                        <span className='text-xs text-gray-500 mt-2'>今月</span>
                        <span className='text-xs font-semibold text-gray-700'>45</span>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 text-sm text-gray-600'>
                    月間成長率: <span className='font-semibold text-green-600'>+9.8%</span>
                  </div>
                </div>
              </div>

              {/* ドーナツチャート風とKPT分布 */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                {/* ドーナツチャート風 - 完了状況 */}
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>🍩 完了状況分布</h4>
                  <div className='flex items-center justify-center mb-4'>
                    <div className='relative w-32 h-32'>
                      <svg className='w-full h-full transform -rotate-90'>
                        {/* 背景円 */}
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          fill='none'
                          stroke='#F3F4F6'
                          strokeWidth='16'
                        />
                        {/* 完了済み (84%) */}
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          fill='none'
                          stroke='#10B981'
                          strokeWidth='16'
                          strokeDasharray={`${2 * Math.PI * 56 * 0.84} ${2 * Math.PI * 56}`}
                          className='transition-all duration-1000 ease-out'
                        />
                        {/* 進行中 (11%) */}
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          fill='none'
                          stroke='#F59E0B'
                          strokeWidth='16'
                          strokeDasharray={`${2 * Math.PI * 56 * 0.11} ${2 * Math.PI * 56}`}
                          strokeDashoffset={`-${2 * Math.PI * 56 * 0.84}`}
                          className='transition-all duration-1000 ease-out'
                        />
                        {/* キャンセル (5%) */}
                        <circle
                          cx='64'
                          cy='64'
                          r='56'
                          fill='none'
                          stroke='#EF4444'
                          strokeWidth='16'
                          strokeDasharray={`${2 * Math.PI * 56 * 0.05} ${2 * Math.PI * 56}`}
                          strokeDashoffset={`-${2 * Math.PI * 56 * 0.95}`}
                          className='transition-all duration-1000 ease-out'
                        />
                      </svg>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='text-2xl font-bold text-gray-900'>45</div>
                          <div className='text-xs text-gray-500'>総KPT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
                        <span className='text-gray-600'>完了済み</span>
                      </div>
                      <span className='font-semibold text-gray-900'>38 (84%)</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 bg-yellow-500 rounded-full mr-2'></div>
                        <span className='text-gray-600'>進行中</span>
                      </div>
                      <span className='font-semibold text-gray-900'>5 (11%)</span>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 bg-red-500 rounded-full mr-2'></div>
                        <span className='text-gray-600'>キャンセル</span>
                      </div>
                      <span className='font-semibold text-gray-900'>2 (5%)</span>
                    </div>
                  </div>
                </div>

                {/* レーダーチャート風 - スキル成長 */}
                <div className='bg-white border border-gray-200 rounded-lg p-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>🎯 スキル成長レーダー</h4>
                  <div className='flex items-center justify-center mb-4'>
                    <div className='relative w-32 h-32'>
                      <svg className='w-full h-full'>
                        {/* 背景ペンタゴン */}
                        <polygon
                          points='64,8 100,45 85,85 43,85 28,45'
                          fill='none'
                          stroke='#E5E7EB'
                          strokeWidth='1'
                        />
                        <polygon
                          points='64,24 88,50 78,78 50,78 40,50'
                          fill='none'
                          stroke='#E5E7EB'
                          strokeWidth='1'
                        />
                        <polygon
                          points='64,40 76,56 71,71 57,71 52,56'
                          fill='none'
                          stroke='#E5E7EB'
                          strokeWidth='1'
                        />
                        
                        {/* データペンタゴン */}
                        <polygon
                          points='64,20 92,48 80,75 48,75 36,48'
                          fill='rgba(59, 130, 246, 0.2)'
                          stroke='#3B82F6'
                          strokeWidth='2'
                        />
                        
                        {/* データポイント */}
                        <circle cx='64' cy='20' r='3' fill='#3B82F6' />
                        <circle cx='92' cy='48' r='3' fill='#3B82F6' />
                        <circle cx='80' cy='75' r='3' fill='#3B82F6' />
                        <circle cx='48' cy='75' r='3' fill='#3B82F6' />
                        <circle cx='36' cy='48' r='3' fill='#3B82F6' />
                        
                        {/* 中心から各頂点への線 */}
                        <line x1='64' y1='64' x2='64' y2='8' stroke='#E5E7EB' strokeWidth='1' />
                        <line x1='64' y1='64' x2='100' y2='45' stroke='#E5E7EB' strokeWidth='1' />
                        <line x1='64' y1='64' x2='85' y2='85' stroke='#E5E7EB' strokeWidth='1' />
                        <line x1='64' y1='64' x2='43' y2='85' stroke='#E5E7EB' strokeWidth='1' />
                        <line x1='64' y1='64' x2='28' y2='45' stroke='#E5E7EB' strokeWidth='1' />
                      </svg>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-xs'>
                    <div className='text-center'>
                      <div className='font-semibold text-blue-600'>85</div>
                      <div className='text-gray-500'>継続性</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-semibold text-green-600'>78</div>
                      <div className='text-gray-500'>問題解決</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-semibold text-purple-600'>72</div>
                      <div className='text-gray-500'>実行力</div>
                    </div>
                    <div className='text-center'>
                      <div className='font-semibold text-orange-600'>69</div>
                      <div className='text-gray-500'>改善提案</div>
                    </div>
                  </div>
                </div>
              </div>

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
                  <Button variant='outline' className='text-white border-white hover:bg-white/10 px-10 py-4 text-lg'>
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
                <div className='w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 p-3'>
                  <Image
                    src='/images/step1-account.svg'
                    alt='アカウント作成のイラスト'
                    width={64}
                    height={64}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>アカウント作成</h4>
                <p className='text-indigo-100 text-sm'>
                  簡単な情報入力で、すぐにKPT Connectを始められます
                </p>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center'>
                <div className='w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 p-3'>
                  <Image
                    src='/images/step2-create.svg'
                    alt='KPT作成のイラスト'
                    width={64}
                    height={64}
                    className='w-full h-full object-contain'
                  />
                </div>
                <h4 className='text-lg font-semibold text-white mb-2'>初回KPT作成</h4>
                <p className='text-indigo-100 text-sm'>
                  ガイドに従って、最初のKPT振り返りを作成してみましょう
                </p>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center'>
                <div className='w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 p-3'>
                  <Image
                    src='/images/step3-improve.svg'
                    alt='継続的改善のイラスト'
                    width={64}
                    height={64}
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
                <Button className='bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg'>
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
