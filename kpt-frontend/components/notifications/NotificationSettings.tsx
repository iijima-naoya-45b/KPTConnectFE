import React from 'react';
import { useNotificationSettings } from '@/hooks/use-notifications';

/**
 * 通知設定コンポーネント
 * TODO: UIコンポーネントの実装後に完全版に戻す
 */
export const NotificationSettings: React.FC = () => {
    const { settings, loading, error } = useNotificationSettings();

    React.useEffect(() => {
        // fetchSettings();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">読み込み中...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">エラー: {error}</div>;
    }

    if (!settings) {
        return <div className="p-6 text-center">設定が見つかりません</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">通知設定</h2>
            <p className="text-gray-600">通知設定は開発中です。</p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(settings, null, 2)}
            </pre>
        </div>
    );
};

export default NotificationSettings; 