'use client';

import PrivacyPolicyContent from './components/PrivacyPolicyContent';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className='bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <PrivacyPolicyPage />
          <PrivacyPolicyContent />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
