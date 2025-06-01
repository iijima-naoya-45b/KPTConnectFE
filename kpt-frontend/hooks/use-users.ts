/**
 * @fileoverview ユーザー管理カスタムフック
 * @description ユーザー情報、設定、統計の管理を提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useCallback, useState } from 'react';
import { useApi, useApiWithCache, useMutation, type CrudResult } from './use-api';
import { API_BASE_URL } from '@/lib/constants';

/**
 * ユーザー情報の型定義
 */
export interface User {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
    timezone: string;
    locale: string;
    email_verified: boolean;
    created_at: string;
    updated_at: string;
    // 統計情報
    total_kpt_sessions?: number;
    total_work_hours?: number;
    current_streak?: number;
    last_active_at?: string;
}

/**
 * ユーザー設定の型定義
 */
export interface UserSettings {
    id: string;
    user_id: string;
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    date_format: string;
    time_format: '12h' | '24h';
    first_day_of_week: number; // 0: Sunday, 1: Monday
    default_kpt_template?: string;
    auto_save_interval: number; // minutes
    show_tips: boolean;
    enable_keyboard_shortcuts: boolean;
    default_work_category?: string;
    preferred_chart_types: string[];
    dashboard_layout?: Record<string, any>;
    privacy_settings: {
        profile_visibility: 'public' | 'private';
        show_activity: boolean;
        show_statistics: boolean;
    };
    created_at: string;
    updated_at: string;
}

/**
 * ユーザー統計の型定義
 */
export interface UserStats {
    user_id: string;
    period: {
        start_date: string;
        end_date: string;
        days: number;
    };
    kpt_stats: {
        total_sessions: number;
        completed_sessions: number;
        total_items: number;
        keep_items: number;
        problem_items: number;
        try_items: number;
        completion_rate: number;
        average_session_duration: number;
    };
    work_stats: {
        total_hours: number;
        total_logs: number;
        average_productivity: number;
        average_mood: number;
        billable_hours: number;
        categories_breakdown: Record<string, number>;
    };
    activity_stats: {
        active_days: number;
        current_streak: number;
        longest_streak: number;
        total_logins: number;
        last_activity_date: string;
    };
    achievements: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        earned_at: string;
        category: string;
    }>;
    storage_usage: {
        used_mb: number;
        limit_mb: number;
        usage_percentage: number;
        breakdown: {
            kpt_sessions: number;
            work_logs: number;
            charts: number;
            attachments: number;
        };
    };
}

/**
 * プロフィール更新用の型定義
 */
export interface UserProfileInput {
    name?: string;
    timezone?: string;
    locale?: string;
}

/**
 * APIクライアントクラス
 */
class UsersApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/v1`;
    }

    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // ユーザー情報関連
    async getCurrentUser(): Promise<any> {
        return this.makeRequest('/me');
    }

    async updateUserProfile(profile: UserProfileInput): Promise<any> {
        return this.makeRequest('/me', {
            method: 'PUT',
            body: JSON.stringify({ user: profile }),
        });
    }

    async uploadAvatar(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('avatar', file);

        return this.makeRequest('/users/avatar', {
            method: 'POST',
            headers: {}, // Remove Content-Type to let browser set it for FormData
            body: formData,
        });
    }

    async deleteAccount(): Promise<any> {
        return this.makeRequest('/users/account', {
            method: 'DELETE',
        });
    }

    // 設定関連
    async getUserSettings(): Promise<any> {
        return this.makeRequest('/users/settings');
    }

    async updateUserSettings(settings: Partial<UserSettings>): Promise<any> {
        return this.makeRequest('/users/settings', {
            method: 'PUT',
            body: JSON.stringify({ settings }),
        });
    }

    // 統計関連
    async getUserStats(days: number = 30): Promise<any> {
        return this.makeRequest(`/users/stats?days=${days}`);
    }
}

const usersApi = new UsersApi();

/**
 * 現在のユーザー情報取得フック（キャッシュ付き）
 */
export const useCurrentUser = (): CrudResult<User> => {
    return useApiWithCache<User>(
        () => usersApi.getCurrentUser(),
        'current-user',
        10 * 60 * 1000 // 10分キャッシュ
    );
};

/**
 * ユーザープロフィール更新フック
 */
export const useUpdateUserProfile = () => {
    return useMutation<User, UserProfileInput>((profile) => usersApi.updateUserProfile(profile));
};

/**
 * アバターアップロードフック
 */
export const useUploadAvatar = () => {
    return useMutation<User, File>((file) => usersApi.uploadAvatar(file));
};

/**
 * アカウント削除フック
 */
export const useDeleteAccount = () => {
    return useMutation<void, void>(() => usersApi.deleteAccount());
};

/**
 * ユーザー設定取得フック（キャッシュ付き）
 */
export const useUserSettings = (): CrudResult<UserSettings> => {
    return useApiWithCache<UserSettings>(
        () => usersApi.getUserSettings(),
        'user-settings',
        5 * 60 * 1000 // 5分キャッシュ
    );
};

/**
 * ユーザー設定更新フック
 */
export const useUpdateUserSettings = () => {
    return useMutation<UserSettings, Partial<UserSettings>>((settings) =>
        usersApi.updateUserSettings(settings)
    );
};

/**
 * ユーザー統計取得フック
 */
export const useUserStats = () => {
    return useApi<UserStats>((days?: number) => usersApi.getUserStats(days));
};

/**
 * ユーザー情報の包括的な管理フック
 */
export const useUserManager = () => {
    const currentUser = useCurrentUser();
    const userSettings = useUserSettings();
    const userStats = useUserStats();
    const updateProfileMutation = useUpdateUserProfile();
    const updateSettingsMutation = useUpdateUserSettings();
    const uploadAvatarMutation = useUploadAvatar();
    const deleteAccountMutation = useDeleteAccount();

    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [isSettingsEditing, setIsSettingsEditing] = useState(false);

    const refreshAll = useCallback(async () => {
        await Promise.all([
            currentUser.execute(),
            userSettings.execute(),
            userStats.execute(),
        ]);
    }, [currentUser, userSettings, userStats]);

    const updateProfile = useCallback(async (profile: UserProfileInput) => {
        setIsProfileEditing(true);
        try {
            const result = await updateProfileMutation.mutate(profile);
            if (result) {
                await currentUser.execute(); // 更新後にユーザー情報を再取得
            }
            return result;
        } finally {
            setIsProfileEditing(false);
        }
    }, [updateProfileMutation, currentUser]);

    const updateSettings = useCallback(async (settings: Partial<UserSettings>) => {
        setIsSettingsEditing(true);
        try {
            const result = await updateSettingsMutation.mutate(settings);
            if (result) {
                await userSettings.execute(); // 更新後に設定を再取得
            }
            return result;
        } finally {
            setIsSettingsEditing(false);
        }
    }, [updateSettingsMutation, userSettings]);

    const uploadAvatar = useCallback(async (file: File) => {
        const result = await uploadAvatarMutation.mutate(file);
        if (result) {
            await currentUser.execute(); // アバター更新後にユーザー情報を再取得
        }
        return result;
    }, [uploadAvatarMutation, currentUser]);

    const deleteAccount = useCallback(async () => {
        return await deleteAccountMutation.mutate();
    }, [deleteAccountMutation]);

    return {
        // 状態
        user: currentUser,
        settings: userSettings,
        stats: userStats,

        // 編集状態
        isProfileEditing,
        isSettingsEditing,

        // 操作メソッド
        updateProfile,
        updateSettings,
        uploadAvatar,
        deleteAccount,
        refreshAll,

        // ローディング状態
        isUpdatingProfile: updateProfileMutation.loading,
        isUpdatingSettings: updateSettingsMutation.loading,
        isUploadingAvatar: uploadAvatarMutation.loading,
        isDeletingAccount: deleteAccountMutation.loading,

        // エラー状態
        profileError: updateProfileMutation.error,
        settingsError: updateSettingsMutation.error,
        avatarError: uploadAvatarMutation.error,
        deleteError: deleteAccountMutation.error,
    };
};

/**
 * 設定項目の個別管理フック
 */
export const useUserSettingItem = <K extends keyof UserSettings>(
    key: K
): {
    value: UserSettings[K] | undefined;
    updateValue: (value: UserSettings[K]) => Promise<UserSettings | null>;
    loading: boolean;
    error: string | null;
} => {
    const { settings, updateSettings } = useUserManager();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateValue = useCallback(async (value: UserSettings[K]) => {
        setLoading(true);
        setError(null);
        try {
            const result = await updateSettings({ [key]: value } as Partial<UserSettings>);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '設定の更新に失敗しました';
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, [key, updateSettings]);

    return {
        value: settings.data?.[key],
        updateValue,
        loading: loading || settings.loading,
        error: error || settings.error,
    };
};

/**
 * ユーザー統計の期間変更フック
 */
export const useUserStatsWithPeriod = () => {
    const statsHook = useUserStats();
    const [selectedPeriod, setSelectedPeriod] = useState(30);

    const changePeriod = useCallback(async (days: number) => {
        setSelectedPeriod(days);
        await statsHook.execute(days);
    }, [statsHook]);

    return {
        stats: statsHook.data,
        loading: statsHook.loading,
        error: statsHook.error,
        selectedPeriod,
        changePeriod,
        refresh: () => statsHook.execute(selectedPeriod),
    };
}; 