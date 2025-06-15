'use client';

import  { useState } from 'react';
import { NotificationsList, NotificationSettings } from '@/components/notifications';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/';

/**
 * 通知ページコンポーネント
 */
const NotificationsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('list');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">通知</h1>
                <p className="text-gray-600">通知の管理と設定を行います</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">通知一覧</TabsTrigger>
                    <TabsTrigger value="settings">設定</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="mt-6">
                    <NotificationsList />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                    <NotificationSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default NotificationsPage;
