import { EasyReflectionIcon, ProgressManagementIcon, RealTimeSyncIcon } from "../ui"
import FeatureCard from "../ui/feature-card"

const TrendAnalysisCard = () => {
  return (
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
  )
}

export default TrendAnalysisCard
