import Link from "next/link"
import { Button } from "../ui/button/button"
import Image from "next/image"

const TutorialIntroSection = () => {
  return (
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
              <div className='bg-white/10 backdrop-blur-sm rounded-lg py-8 text-center px-4'>
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
              <div className='bg-white/10 backdrop-blur-sm rounded-lg py-8 text-center px-4'>
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
              <div className='bg-white/10 backdrop-blur-sm rounded-lg py-8 text-center px-4'>
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
  )
}

export default TutorialIntroSection
