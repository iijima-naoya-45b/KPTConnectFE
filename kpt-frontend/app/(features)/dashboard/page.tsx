'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FeatureGrid, featuresData } from './components';
import { toast } from "sonner";

const DashboardPage: React.FC = () => {
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const clearFlashMessage = useCallback(() => setFlashMessage(null), []);

  useEffect(() => {
    if (flashMessage) {
      toast.success(flashMessage, {
        description: "KPT振り返りが保存されました",
        duration: 4000,
      });
      clearFlashMessage();
    }
  }, [flashMessage, clearFlashMessage]);

  return (
    <div className='min-h-[calc(100vh-116px-64px)] bg-gray-100 py-12'>
      {/* 機能グリッドセクション */}
      <div className='mt-12 lg:mt-16'>
        <FeatureGrid features={featuresData} columns={{ sm: 1, md: 2, lg: 3 }} />
      </div>
    </div>
  );
};

export default DashboardPage;
