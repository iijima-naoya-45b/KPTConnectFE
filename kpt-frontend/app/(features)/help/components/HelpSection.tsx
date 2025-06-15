import React from 'react';

interface HelpSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const HelpSection = ({ title, description, children }: HelpSectionProps) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}; 