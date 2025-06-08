import { API_BASE_URL } from '@/lib/constants';

/**
 * 通知の基本型定義
 */
export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
    priority_ja: string;
    is_read: boolean;
    read_at?: string;
    action_url?: string;
    metadata?: Record<string, any>;
    expires_at?: string;
    created_at: string;
    updated_at: string;
    time_ago: string;
}

/**
 * 通知一覧のレスポンス型
 */
export interface NotificationsListResponse {
    success: boolean;
    data: {
        notifications: Notification[];
        pagination: {
            current_page: number;
            per_page: number;
            total_pages: number;
            total_count: number;
        };
        summary: {
            unread_count: number;
            today_count: number;
            priority_counts: Record<string, number>;
        };
    };
    message: string;
}

/**
 * 通知詳細のレスポンス型
 */
export interface NotificationDetailResponse {
    success: boolean;
    data: Notification;
    message: string;
}

/**
 * 通知設定の型定義
 */
export interface NotificationSettings {
    email_notifications: {
        enabled: boolean;
        kpt_session_completed: boolean;
        weekly_summary: boolean;
        item_reminders: boolean;
        system_updates: boolean;
        marketing: boolean;
    };
    push_notifications: {
        enabled: boolean;
        browser_enabled: boolean;
        kpt_reminders: boolean;
        item_due_alerts: boolean;
        achievement_alerts: boolean;
    };
    in_app_notifications: {
        enabled: boolean;
        show_badge: boolean;
        auto_read_time: number;
        sound_enabled: boolean;
    };
    frequency_settings: {
        daily_digest_time: string;
        weekly_summary_day: number;
        reminder_frequency: string;
        max_notifications_per_day: number;
    };
    quiet_hours: {
        enabled: boolean;
        start_time: string;
        end_time: string;
        timezone: string;
    };
}

/**
 * 通知設定レスポンス型
 */
export interface NotificationSettingsResponse {
    success: boolean;
    data: NotificationSettings;
    message: string;
}

/**
 * 通知統計の型定義
 */
export interface NotificationStats {
    period: {
        days: number;
        start_date: string;
        end_date: string;
    };
    summary: {
        total_notifications: number;
        unread_notifications: number;
        read_rate: number;
        average_response_time: number;
    };
    by_type: Record<string, number>;
    by_priority: Record<string, number>;
    daily_trends: Array<{
        date: string;
        total: number;
        unread: number;
        by_type: Record<string, number>;
    }>;
}

/**
 * 通知統計レスポンス型
 */
export interface NotificationStatsResponse {
    success: boolean;
    data: NotificationStats;
    message: string;
}

/**
 * API呼び出し時のオプション型
 */
interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
}

/**
 * 基本APIクライアント
 */
class NotificationsApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/v1/notifications`;
    }

    /**
     * API呼び出しの共通メソッド
     */
    private async makeRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
        const { method = 'GET', body, headers = {} } = options;

        const config: RequestInit = {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (body && method !== 'GET') {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    /**
     * 通知一覧を取得
     */
    async getNotifications(params?: {
        type?: string;
        is_read?: boolean;
        priority?: string;
        page?: number;
        per_page?: number;
    }): Promise<NotificationsListResponse> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.makeRequest<NotificationsListResponse>(endpoint);
    }

    /**
     * 通知詳細を取得
     */
    async getNotification(id: string): Promise<NotificationDetailResponse> {
        return this.makeRequest<NotificationDetailResponse>(`/${id}`);
    }

    /**
     * 通知を既読にする
     */
    async markAsRead(id: string): Promise<NotificationDetailResponse> {
        return this.makeRequest<NotificationDetailResponse>(`/${id}/read`, {
            method: 'PUT',
        });
    }

    /**
     * 全ての通知を既読にする
     */
    async markAllAsRead(): Promise<{ success: boolean; data: { updated_count: number; remaining_unread: number }; message: string }> {
        return this.makeRequest('/mark_all_read', {
            method: 'PUT',
        });
    }

    /**
     * 通知を削除
     */
    async deleteNotification(id: string): Promise<{ success: boolean; message: string }> {
        return this.makeRequest(`/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * 通知設定を取得
     */
    async getSettings(): Promise<NotificationSettingsResponse> {
        return this.makeRequest<NotificationSettingsResponse>('/settings');
    }

    /**
     * 通知設定を更新
     */
    async updateSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettingsResponse> {
        return this.makeRequest<NotificationSettingsResponse>('/settings', {
            method: 'PUT',
            body: settings,
        });
    }

    /**
     * テスト通知を送信
     */
    async sendTestNotification(type?: string): Promise<NotificationDetailResponse> {
        return this.makeRequest<NotificationDetailResponse>('/test', {
            method: 'POST',
            body: { type },
        });
    }

    /**
     * 通知統計を取得
     */
    async getStats(days?: number): Promise<NotificationStatsResponse> {
        const endpoint = days ? `/stats?days=${days}` : '/stats';
        return this.makeRequest<NotificationStatsResponse>(endpoint);
    }
}

/**
 * 通知APIクライアントのインスタンス
 */
export const notificationsApi = new NotificationsApi();

/**
 * エラーハンドリング用のユーティリティ
 */
export const handleApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return '予期しないエラーが発生しました';
};

/**
 * 通知タイプの日本語変換
 */
export const getNotificationTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
        'kpt_reminder': 'KPTリマインダー',
        'item_due': 'アイテム期限',
        'kpt_session_completed': 'KPTセッション完了',
        'weekly_summary': '週次サマリー',
        'achievement': '実績解除',
        'system': 'システム通知',
    };

    return typeLabels[type] || type;
};

/**
 * 優先度の日本語変換
 */
export const getPriorityLabel = (priority: string): string => {
    const priorityLabels: Record<string, string> = {
        'low': '低',
        'normal': '通常',
        'high': '高',
        'urgent': '緊急',
    };

    return priorityLabels[priority] || priority;
};

/**
 * 優先度に応じたスタイルクラス
 */
export const getPriorityClass = (priority: string): string => {
    const priorityClasses: Record<string, string> = {
        'low': 'bg-gray-100 text-gray-800',
        'normal': 'bg-blue-100 text-blue-800',
        'high': 'bg-yellow-100 text-yellow-800',
        'urgent': 'bg-red-100 text-red-800',
    };

    return priorityClasses[priority] || priorityClasses['normal'];
}; 