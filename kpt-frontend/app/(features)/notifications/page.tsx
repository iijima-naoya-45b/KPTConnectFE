'use client';

import React, { useState } from 'react';
import { NotificationSettings } from '@/components/notifications';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/';
import Image from 'next/image';

/**
 * 通知ページコンポーネント
 */
const NotificationsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('settings');
    const [showIntegrationModal, setShowIntegrationModal] = useState(false);
    const [modalStep, setModalStep] = useState(0);

    const nextStep = () => setModalStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setModalStep((prev) => Math.max(prev - 1, 0));

    const modalContent = [
        {
            title: 'Slackページにアクセス',
            description: 'Slackの公式サイトにアクセスし、ワークスペースを作成する準備をします。',
            image: 'https://placehold.jp/150x150.png',
        },
        {
            title: 'Slackにサインイン',
            description: '既存のSlackアカウントでサインインし、アプリを作成するワークスペースを選択します。',
            image: 'https://placehold.jp/150x150.png',
        },
        {
            title: '新しいアプリの作成',
            description: '「Create New App」ボタンをクリックし、「From scratch」を選択します。アプリの名前とワークスペースを指定して新しいアプリを作成します。',
            image: 'https://placehold.jp/150x150.png',
        },
        {
            title: 'アプリの設定',
            description: 'アプリの設定ページで、必要な機能や権限を設定します。「OAuth & Permissions」セクションで、必要なスコープを追加し、Slack APIと連携する準備を整えます。',
            image: 'https://placehold.jp/150x150.png',
        },
        {
            title: 'URLの発行',
            description: '「Install App to Workspace」ボタンをクリックし、アプリをワークスペースにインストールします。インストール後、OAuthトークンが発行されます。このトークンを使用して、Slack APIと連携することができます。',
            image: 'https://placehold.jp/150x150.png',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">通知</h1>
                <p className="text-gray-600">通知の管理と設定を行います</p>
            </div>

            <button
                onClick={() => setShowIntegrationModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-8"
            >
                連携方法について解説
            </button>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="settings">設定</TabsTrigger>
                </TabsList>

                <TabsContent value="settings" className="mt-6">
                    <NotificationSettings />
                </TabsContent>
            </Tabs>

            {showIntegrationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-3xl w-full p-8">
                        <Image src={modalContent[modalStep].image} alt="Placeholder" className="mb-6 w-full rounded" width={150} height={150} />
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{modalContent[modalStep].title}</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            {modalContent[modalStep].description}
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                                disabled={modalStep === 0}
                            >
                                戻る
                            </button>
                            <button
                                onClick={nextStep}
                                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                                disabled={modalStep === modalContent.length - 1}
                            >
                                次へ
                            </button>
                        </div>
                        <button
                            onClick={() => setShowIntegrationModal(false)}
                            className="mt-4 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
