import LegalCard from './components/LegalCard';
import LegalFooter from './components/LegalFooter';
import LegalHeader from './components/LegalHeader';
import { privacyCard, termsCard } from './components/Data';

export default function LegalIndexPage() {
  return (
    <div className="bg-gray-50 pt-16">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LegalHeader />
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <LegalCard {...privacyCard} />
            <LegalCard {...termsCard} />
          </div>
          <LegalFooter />
        </div>
      </div>
    </div>
  );
}
