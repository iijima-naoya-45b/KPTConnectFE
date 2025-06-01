/**
 * @fileoverview API hooksの使用例
 * @description 各種API hooksの実用的な使用パターンを示す
 * @version 1.0.0
 * @author KPT Connect Team
 */

import React, { useState } from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { useWorkLogManager, type WorkLogInput } from '@/hooks/use-work-logs';
import { useApi, useMutation } from '@/hooks/use-api';

/**
 * 通知機能の使用例
 */
const NotificationsExample: React.FC = () => {
    const {
        notifications,
        loading,
        error,
        unreadCount,
        markAsRead,
        deleteNotification,
        refreshNotifications,
    } = useNotifications();

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>エラー: {error}</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    通知 ({unreadCount}件未読)
                </h2>
                <button
                    onClick={refreshNotifications}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    更新
                </button>
            </div>

            <div className="space-y-2">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 border rounded-md ${
                            notification.is_read ? 'bg-gray-50' : 'bg-blue-50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                            <div className="space-x-2">
                                {!notification.is_read && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        既読
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * 作業ログ機能の使用例
 */
const WorkLogsExample: React.FC = () => {
    const [newWorkLog, setNewWorkLog] = useState<Partial<WorkLogInput>>({
        title: '',
        category: 'development',
        mood_score: 3,
        productivity_score: 3,
        difficulty_score: 3,
        is_billable: false,
    });

    const {
        workLogs,
        stats,
        createWorkLog,
        deleteWorkLog,
        timerActions,
        refreshAll,
    } = useWorkLogManager();

    const handleCreateWorkLog = async () => {
        if (newWorkLog.title) {
            const result = await createWorkLog(newWorkLog as WorkLogInput);
            if (result) {
                setNewWorkLog({
                    title: '',
                    category: 'development',
                    mood_score: 3,
                    productivity_score: 3,
                    difficulty_score: 3,
                    is_billable: false,
                });
            }
        }
    };

    const handleStartTimer = async () => {
        if (newWorkLog.title) {
            await timerActions.startTimer.mutate(newWorkLog as Omit<WorkLogInput, 'end_time'>);
        }
    };

    return (
        <div className="space-y-6">
            {/* 統計表示 */}
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-xl font-bold mb-4">統計</h2>
                {stats.loading ? (
                    <div>統計を読み込み中...</div>
                ) : stats.data ? (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-2xl font-bold">{stats.data.summary.total_logs}</div>
                            <div className="text-sm text-gray-600">総ログ数</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats.data.summary.total_hours.toFixed(1)}h</div>
                            <div className="text-sm text-gray-600">総作業時間</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats.data.summary.average_productivity.toFixed(1)}</div>
                            <div className="text-sm text-gray-600">平均生産性</div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => stats.execute()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        統計を読み込み
                    </button>
                )}
            </div>

            {/* 新規作業ログ作成 */}
            <div className="border p-4 rounded-md">
                <h3 className="text-lg font-bold mb-4">新規作業ログ</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="タイトル"
                        value={newWorkLog.title}
                        onChange={(e) => setNewWorkLog({ ...newWorkLog, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    
                    <select
                        value={newWorkLog.category}
                        onChange={(e) => setNewWorkLog({ ...newWorkLog, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="development">開発</option>
                        <option value="meeting">会議</option>
                        <option value="planning">企画</option>
                        <option value="review">レビュー</option>
                    </select>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">気分 (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={newWorkLog.mood_score}
                                onChange={(e) => setNewWorkLog({ ...newWorkLog, mood_score: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">生産性 (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={newWorkLog.productivity_score}
                                onChange={(e) => setNewWorkLog({ ...newWorkLog, productivity_score: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">難易度 (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={newWorkLog.difficulty_score}
                                onChange={(e) => setNewWorkLog({ ...newWorkLog, difficulty_score: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={handleCreateWorkLog}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            作成
                        </button>
                        <button
                            onClick={handleStartTimer}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            タイマー開始
                        </button>
                    </div>
                </div>
            </div>

            {/* 作業ログ一覧 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">作業ログ一覧</h3>
                    <button
                        onClick={refreshAll}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        更新
                    </button>
                </div>

                {workLogs.loading ? (
                    <div>読み込み中...</div>
                ) : workLogs.error ? (
                    <div>エラー: {workLogs.error}</div>
                ) : (
                    <div className="space-y-2">
                        {workLogs.items.map((workLog) => (
                            <div
                                key={workLog.id}
                                className="p-4 border rounded-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">{workLog.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            {workLog.category} | {workLog.duration_formatted || '実行中'}
                                        </p>
                                        <div className="text-xs text-gray-500">
                                            気分: {workLog.mood_score}/5 | 
                                            生産性: {workLog.productivity_score}/5 | 
                                            難易度: {workLog.difficulty_score}/5
                                        </div>
                                    </div>
                                    <div className="space-x-2">
                                        {!workLog.end_time && (
                                            <button
                                                onClick={() => timerActions.stopTimer.mutate(workLog.id)}
                                                className="text-orange-600 hover:text-orange-800"
                                            >
                                                停止
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteWorkLog(workLog.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {workLogs.hasMore && (
                            <button
                                onClick={workLogs.loadMore}
                                className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                            >
                                さらに読み込む
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * 汎用APIフックの使用例
 */
const GenericApiExample: React.FC = () => {
    // ユーザー情報取得の例
    const userApi = useApi(async () => {
        const response = await fetch('/api/v1/me', { credentials: 'include' });
        return response.json();
    });

    // 設定更新の例
    const updateSettingsMutation = useMutation(async (settings: any) => {
        const response = await fetch('/api/v1/users/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(settings),
        });
        return response.json();
    });

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">汎用APIフックの例</h2>
            
            <div>
                <h3 className="text-lg font-medium mb-2">ユーザー情報</h3>
                {userApi.loading ? (
                    <div>読み込み中...</div>
                ) : userApi.error ? (
                    <div>エラー: {userApi.error}</div>
                ) : userApi.data ? (
                    <pre className="bg-gray-100 p-4 rounded-md">
                        {JSON.stringify(userApi.data, null, 2)}
                    </pre>
                ) : (
                    <button
                        onClick={() => userApi.execute()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        ユーザー情報を取得
                    </button>
                )}
            </div>

            <div>
                <h3 className="text-lg font-medium mb-2">設定更新</h3>
                <button
                    onClick={() => updateSettingsMutation.mutate({ theme: 'dark' })}
                    disabled={updateSettingsMutation.loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                    {updateSettingsMutation.loading ? '更新中...' : '設定を更新'}
                </button>
                
                {updateSettingsMutation.error && (
                    <div className="mt-2 text-red-600">
                        エラー: {updateSettingsMutation.error}
                    </div>
                )}
                
                {updateSettingsMutation.data && (
                    <div className="mt-2 text-green-600">
                        設定が更新されました
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * 全ての使用例を統合したメインコンポーネント
 */
const ApiHooksUsageExample: React.FC = () => {
    const [activeTab, setActiveTab] = useState('notifications');

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">API Hooks 使用例</h1>
            
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'notifications'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        通知機能
                    </button>
                    <button
                        onClick={() => setActiveTab('worklogs')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'worklogs'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        作業ログ
                    </button>
                    <button
                        onClick={() => setActiveTab('generic')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'generic'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        汎用API
                    </button>
                </nav>
            </div>

            {activeTab === 'notifications' && <NotificationsExample />}
            {activeTab === 'worklogs' && <WorkLogsExample />}
            {activeTab === 'generic' && <GenericApiExample />}
        </div>
    );
};

export default ApiHooksUsageExample; 