import Link from "next/link"
import { Button } from "../ui/button/button"

const StartNowBanner = () => {
  return (
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
  )
}

export default StartNowBanner
