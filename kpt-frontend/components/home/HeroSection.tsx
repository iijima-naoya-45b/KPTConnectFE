import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button/button"

const HeroSection = () => {
  return (
    <section className='mx-8 py-10 flex justify-center pt-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[70%]'>
            {/* テキストコンテンツ */}
            <div className='text-center lg:text-left'>
              <h2 className='text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 px-4'>
                個人開発の振り返りを
                <br />
                もっと効果的に
              </h2>
              <p className='text-xl text-gray-600 mb-8 px-4'>
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
  )
}

export default HeroSection
