import React from 'react';
import { HelpHeader } from './components/HelpHeader';
import { HelpContent } from './components/HelpContent';
import HelpCenter from './components/HelpCenter';

/**
 * ヘルプページ
 * @returns
 */
const HelpPage = () => {
  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HelpHeader />
        {/* <HelpCenter /> */}
        <HelpContent />
      </div>
    </div>
  );
};

export default HelpPage;
