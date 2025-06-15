import TermsContent from "./components/TermsContent";
import TermsHeader from "./components/TermsHeader";

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-50 pt-16">
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TermsHeader />
          <div className="bg-white shadow rounded-lg p-8">
            <TermsContent />
          </div>
        </div>
      </div>
    </div>
  );
}
