import Link from "next/link"
import { Button } from "../ui/button/button"
import FunctionCards from "./FunctonCards"

const FooterLinks = () => {
  return (
    <section className='bg-gray-50 py-20 flex justify-center'>
          <div className='mx-8 max-w-[70%]'>
            <div className='text-center mb-16'>
              <h3 className='text-3xl font-extrabold text-gray-900 mb-4'>すべての機能を探索</h3>
              <p className='text-xl text-gray-600'>KPT Connectの豊富な機能をご体験ください</p>
            </div>
            <FunctionCards />

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
  )
}

export default FooterLinks
