import React from 'react';
import { HelpHeader } from './components/HelpHeader';
import { HelpContent } from './components/HelpContent';

export default function HelpPage() {
  return (
    <div className="min-h-[calc(100vh-116px-64px)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HelpHeader />
        <HelpContent />
      </div>
    </div>
  );
}
