// 汎用APIフック
export * from './use-api';

// 認証関連フック
export * from './use-auth';

// 通知関連フック
export * from './use-notifications';

// 作業ログ関連フック
export * from './use-work-logs';

// ユーザー管理関連フック
export * from './use-users';

// チャート関連フック
export * from './use-charts';

// サブスクリプション関連フック
export * from './use-subscriptions';

/**
 * よく使用されるフックのエイリアス
 */
export {
    // 通知
    useNotifications as useNotificationsList,
    useNotificationSettings as useNotifySettings,
} from './use-notifications';

export {
    // 作業ログ
    useWorkLogManager as useWorkLogs,
    useWorkLogTimer as useTimer,
} from './use-work-logs';

export {
    // ユーザー
    useUserManager as useProfile,
    useCurrentUser as useUser,
} from './use-users';

export {
    // チャート
    useChartManager as useCharts,
    useDashboardCharts as useDashboard,
} from './use-charts';

export {
    // サブスクリプション
    useSubscriptionManager as useSubscription,
    useProFeatures as useFeatures,
} from './use-subscriptions';

/**
 * 主要機能の統合フック
 */
export interface UseKptAppReturn {
    // ユーザー関連
    user: ReturnType<typeof import('./use-users').useUserManager>;

    // 通知関連
    notifications: ReturnType<typeof import('./use-notifications').useNotifications>;

    // 作業ログ関連
    workLogs: ReturnType<typeof import('./use-work-logs').useWorkLogManager>;

    // チャート関連
    charts: ReturnType<typeof import('./use-charts').useChartManager>;

    // サブスクリプション関連
    subscription: ReturnType<typeof import('./use-subscriptions').useSubscriptionManager>;

    // 機能フラグ
    features: ReturnType<typeof import('./use-subscriptions').useProFeatures>;
}

/**
 * KPTアプリケーション全体の統合フック
 * @description アプリケーション全体で使用する主要なAPIフックを統合
 */
export const useKptApp = (): UseKptAppReturn => {
    const { useUserManager } = require('./use-users');
    const { useNotifications } = require('./use-notifications');
    const { useWorkLogManager } = require('./use-work-logs');
    const { useChartManager } = require('./use-charts');
    const { useSubscriptionManager, useProFeatures } = require('./use-subscriptions');

    return {
        user: useUserManager(),
        notifications: useNotifications(),
        workLogs: useWorkLogManager(),
        charts: useChartManager(),
        subscription: useSubscriptionManager(),
        features: useProFeatures(),
    };
};

/**
 * 型定義のre-export
 */
export type {
    // 通知（正しいimport先から）
    Notification,
    NotificationSettings,
    NotificationFilters,
} from './use-notifications';

export type {
    // 作業ログ
    WorkLog,
    WorkLogStats,
    WorkLogFilters,
    WorkLogInput,
} from './use-work-logs';

export type {
    // ユーザー
    User,
    UserSettings,
    UserStats,
    UserProfileInput,
} from './use-users';

export type {
    // チャート
    Chart,
    ChartData,
    ChartFilters,
    ChartInput,
} from './use-charts';

export type {
    // サブスクリプション
    Subscription,
    Plan,
    Payment,
    PaymentFilters,
    SubscriptionInput,
} from './use-subscriptions';

export type {
    // 汎用API
    ApiResult,
    CrudResult,
    ListResult,
} from './use-api';
