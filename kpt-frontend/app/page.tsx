import StartNowBanner from '@/components/home/StartNowBanner';
import FooterLinks from '@/components/home/FooterLinks';
import TutorialIntroSection from '@/components/home/TutorialIntroSection';
import TrendAnalysisCard from '@/components/home/TrendAnalysisCard';
import HeroSection from '@/components/home/HeroSection';

const Home = () => {
  return (
    <div className='bg-gradient-to-b from-indigo-50 to-white'>
        <HeroSection />
        <TrendAnalysisCard />
        <TutorialIntroSection />
        <FooterLinks />
        <StartNowBanner />
    </div>
  );
};

export default Home;
