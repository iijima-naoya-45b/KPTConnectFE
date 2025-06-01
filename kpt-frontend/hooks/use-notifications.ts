/**
 * @fileoverview 通知管理カスタムフック
 * @description 通知の状態管理と操作を提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useEffect, useCallback } from 'react';
import {
    notificationsApi,
    handleApiError,
    type Notification,
    type NotificationSettings,
    type NotificationStats,
} from '@/lib/api/notifications';

// 型のre-export
export type { Notification, NotificationSettings, NotificationStats } from '@/lib/api/notifications';

/**
 * 通知フィルター設定の型
 */
export interface NotificationFilters {
    type?: string;
    is_read?: boolean;
    priority?: string;
    page?: number;
    per_page?: number;
}

/**
 * 通知フック戻り値の型
 */
export interface UseNotificationsReturn {
    // 通知一覧
    notifications: Notification[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    totalCount: number;
    unreadCount: number;
    todayCount: number;
    priorityCounts: Record<string, number>;

    // 操作メソッド
    fetchNotifications: (filters?: NotificationFilters) => Promise<void>;
    loadMore: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    refreshNotifications: () => Promise<void>;

    // ページネーション状態
    currentPage: number;
    totalPages: number;
    perPage: number;
}

/**
 * 通知設定フック戻り値の型
 */
export interface UseNotificationSettingsReturn {
    settings: NotificationSettings | null;
    loading: boolean;
    error: string | null;
    saving: boolean;

    fetchSettings: () => Promise<void>;
    updateSettings: (newSettings: Partial<NotificationSettings>) => Promise<void>;
    sendTestNotification: (type?: string) => Promise<void>;
}

/**
 * 通知統計フック戻り値の型
 */
export interface UseNotificationStatsReturn {
    stats: NotificationStats | null;
    loading: boolean;
    error: string | null;

    fetchStats: (days?: number) => Promise<void>;
    refreshStats: () => Promise<void>;
}

/**
 * 通知一覧管理フック
 */
export const useNotifications = (initialFilters?: NotificationFilters): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
    const [todayCount, setTodayCount] = useState(0);
    const [priorityCounts, setPriorityCounts] = useState<Record<string, number>>({});
    const [filters, setFilters] = useState<NotificationFilters>(initialFilters || {});
    const [perPage] = useState(20);

    /**
     * 通知一覧を取得
     */
    const fetchNotifications = useCallback(async (newFilters?: NotificationFilters) => {
        try {
            setLoading(true);
            setError(null);

            const searchFilters = newFilters ? { ...filters, ...newFilters } : filters;
            const params = {
                ...searchFilters,
                page: searchFilters.page || 1,
                per_page: perPage,
            };

            const response = await notificationsApi.getNotifications(params);

            if (response.success) {
                const { notifications: newNotifications, pagination, summary } = response.data;

                // 新しいページの場合は追加、最初のページの場合は置換
                if (params.page === 1) {
                    setNotifications(newNotifications);
                } else {
                    setNotifications(prev => [...prev, ...newNotifications]);
                }

                setCurrentPage(pagination.current_page);
                setTotalPages(pagination.total_pages);
                setTotalCount(pagination.total_count);
                setUnreadCount(summary.unread_count);
                setTodayCount(summary.today_count);
                setPriorityCounts(summary.priority_counts);
                setFilters(searchFilters);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [filters, perPage]);

    /**
     * 次のページを読み込み
     */
    const loadMore = useCallback(async () => {
        if (currentPage < totalPages && !loading) {
            await fetchNotifications({ ...filters, page: currentPage + 1 });
        }
    }, [currentPage, totalPages, loading, filters, fetchNotifications]);

    /**
     * 通知を既読にする
     */
    const markAsRead = useCallback(async (id: string) => {
        try {
            const response = await notificationsApi.markAsRead(id);

            if (response.success) {
                setNotifications(prev =>
                    prev.map(notification =>
                        notification.id === id
                            ? { ...notification, is_read: true, read_at: new Date().toISOString() }
                            : notification
                    )
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (err) {
            setError(handleApiError(err));
        }
    }, []);

    /**
     * 全ての通知を既読にする
     */
    const markAllAsRead = useCallback(async () => {
        try {
            const response = await notificationsApi.markAllAsRead();

            if (response.success) {
                setNotifications(prev =>
                    prev.map(notification => ({
                        ...notification,
                        is_read: true,
                        read_at: new Date().toISOString(),
                    }))
                );
                setUnreadCount(0);
            }
        } catch (err) {
            setError(handleApiError(err));
        }
    }, []);

    /**
     * 通知を削除
     */
    const deleteNotification = useCallback(async (id: string) => {
        try {
            const response = await notificationsApi.deleteNotification(id);

            if (response.success) {
                const deletedNotification = notifications.find(n => n.id === id);
                setNotifications(prev => prev.filter(notification => notification.id !== id));
                setTotalCount(prev => prev - 1);

                if (deletedNotification && !deletedNotification.is_read) {
                    setUnreadCount(prev => Math.max(0, prev - 1));
                }
            }
        } catch (err) {
            setError(handleApiError(err));
        }
    }, [notifications]);

    /**
     * 通知一覧を再取得
     */
    const refreshNotifications = useCallback(async () => {
        await fetchNotifications({ ...filters, page: 1 });
    }, [fetchNotifications, filters]);

    /**
     * 初回データ取得
     */
    useEffect(() => {
        fetchNotifications();
    }, []);

    return {
        notifications,
        loading,
        error,
        hasMore: currentPage < totalPages,
        totalCount,
        unreadCount,
        todayCount,
        priorityCounts,
        fetchNotifications,
        loadMore,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refreshNotifications,
        currentPage,
        totalPages,
        perPage,
    };
};

/**
 * 通知設定管理フック
 */
export const useNotificationSettings = (): UseNotificationSettingsReturn => {
    const [settings, setSettings] = useState<NotificationSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 通知設定を取得
     */
    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await notificationsApi.getSettings();

            if (response.success) {
                setSettings(response.data);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * 通知設定を更新
     */
    const updateSettings = useCallback(async (newSettings: Partial<NotificationSettings>) => {
        try {
            setSaving(true);
            setError(null);

            const response = await notificationsApi.updateSettings(newSettings);

            if (response.success) {
                setSettings(prev => prev ? { ...prev, ...response.data } : response.data);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setSaving(false);
        }
    }, []);

    /**
     * テスト通知を送信
     */
    const sendTestNotification = useCallback(async (type?: string) => {
        try {
            setError(null);
            await notificationsApi.sendTestNotification(type);
        } catch (err) {
            setError(handleApiError(err));
        }
    }, []);

    /**
     * 初回データ取得
     */
    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return {
        settings,
        loading,
        error,
        saving,
        fetchSettings,
        updateSettings,
        sendTestNotification,
    };
};

/**
 * 通知統計管理フック
 */
export const useNotificationStats = (initialDays = 30): UseNotificationStatsReturn => {
    const [stats, setStats] = useState<NotificationStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [days, setDays] = useState(initialDays);

    /**
     * 通知統計を取得
     */
    const fetchStats = useCallback(async (newDays?: number) => {
        try {
            setLoading(true);
            setError(null);

            const targetDays = newDays !== undefined ? newDays : days;
            const response = await notificationsApi.getStats(targetDays);

            if (response.success) {
                setStats(response.data);
                if (newDays !== undefined) {
                    setDays(newDays);
                }
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [days]);

    /**
     * 統計を再取得
     */
    const refreshStats = useCallback(async () => {
        await fetchStats(days);
    }, [fetchStats, days]);

    /**
     * 初回データ取得
     */
    useEffect(() => {
        fetchStats();
    }, []);

    return {
        stats,
        loading,
        error,
        fetchStats,
        refreshStats,
    };
};

/**
 * リアルタイム通知更新フック
 */
export const useNotificationUpdates = (onNewNotification?: (notification: Notification) => void) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // WebSocketやServer-Sent Eventsでリアルタイム更新を実装
        // 現在は仮実装として定期的なポーリングを行う
        const interval = setInterval(async () => {
            try {
                // 最新の通知をチェック
                const response = await notificationsApi.getNotifications({
                    page: 1,
                    per_page: 1
                });

                if (response.success && response.data.notifications.length > 0) {
                    const latestNotification = response.data.notifications[0];

                    // 5分以内の新しい通知の場合、コールバックを実行
                    const notificationTime = new Date(latestNotification.created_at);
                    const now = new Date();
                    const diffMinutes = (now.getTime() - notificationTime.getTime()) / (1000 * 60);

                    if (diffMinutes <= 5 && onNewNotification) {
                        onNewNotification(latestNotification);
                    }
                }

                setIsConnected(true);
            } catch (error) {
                setIsConnected(false);
            }
        }, 30000); // 30秒間隔でチェック

        return () => clearInterval(interval);
    }, [onNewNotification]);

    return { isConnected };
}; 