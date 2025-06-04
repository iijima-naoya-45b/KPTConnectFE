/**
 * @fileoverview ダッシュボード管理フック
 * @description ダッシュボードのCRUD操作とリアルタイム更新機能を提供
 * 
 * 主な仕様：
 * - ダッシュボード設定のCRUD操作
 * - リアルタイム統計データ更新
 * - ウィジェット配置管理
 * - 自動更新機能
 * 
 * 制限事項：
 * - ユーザー認証必須
 * - リアルタイム更新は30秒間隔
 * - 最大接続時間は1時間
 * 
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useApi, useApiList, CrudResult, ListResult } from './use-api';
import { API_BASE_URL } from '@/lib/constants';

/**
 * ダッシュボード設定の型定義
 */
export interface DashboardSettings {
    /** 表示期間 */
    displayPeriod: 'day' | 'week' | 'month' | 'quarter' | 'year';
    /** ウィジェット配置設定 */
    widgetLayout: {
        /** ウィジェットID */
        id: string;
        /** X座標 */
        x: number;
        /** Y座標 */
        y: number;
        /** 幅 */
        width: number;
        /** 高さ */
        height: number;
        /** 表示状態 */
        visible: boolean;
    }[];
    /** テーマ設定 */
    theme: 'light' | 'dark' | 'auto';
    /** 表示密度 */
    density: 'compact' | 'normal' | 'comfortable';
    /** 自動更新間隔（秒） */
    autoRefreshInterval: number;
    /** 表示する統計項目 */
    visibleStats: string[];
    /** チャート表示設定 */
    chartSettings: {
        /** チャートタイプ */
        type: 'line' | 'bar' | 'pie' | 'area';
        /** 色テーマ */
        colorScheme: string;
        /** アニメーション有効 */
        animationEnabled: boolean;
    };
}

/**
 * ダッシュボードの型定義
 */
export interface Dashboard {
    /** ID */
    id: string;
    /** 設定名 */
    name: string;
    /** 説明 */
    description?: string;
    /** ダッシュボード設定 */
    settings: DashboardSettings;
    /** デフォルト設定かどうか */
    isDefault: boolean;
    /** 作成日時 */
    createdAt: string;
    /** 更新日時 */
    updatedAt: string;
}

/**
 * ダッシュボード統計データの型定義
 */
export interface DashboardStats {
    /** 期間 */
    period: string;
    /** 開始日 */
    periodStart: string;
    /** 終了日 */
    periodEnd: string;
    /** セッション統計 */
    sessions: {
        /** 総数 */
        total: number;
        /** 完了数 */
        completed: number;
        /** 完了率 */
        completionRate: number;
    };
    /** アイテム統計 */
    items: {
        /** 総数 */
        total: number;
        /** アクティブ数 */
        active: number;
        /** Keep数 */
        keep: number;
        /** Problem数 */
        problem: number;
        /** Try数 */
        try: number;
        /** 平均感情スコア */
        averageEmotionScore?: number;
        /** 平均インパクトスコア */
        averageImpactScore?: number;
    };
    /** 日別内訳 */
    dailyBreakdown?: Array<{
        /** 日付 */
        date: string;
        /** セッション数 */
        sessionsCount: number;
        /** アイテム数 */
        itemsCount: number;
        /** 完了アイテム数 */
        completedItems: number;
    }>;
    /** 最終更新日時 */
    lastUpdated: string;
}

/**
 * ダッシュボード作成用データの型定義
 */
export interface CreateDashboardData {
    /** 設定名 */
    name: string;
    /** 説明 */
    description?: string;
    /** ダッシュボード設定 */
    settings: DashboardSettings;
    /** デフォルト設定かどうか */
    isDefault?: boolean;
}

/**
 * ダッシュボード更新用データの型定義
 */
export interface UpdateDashboardData {
    /** 設定名 */
    name?: string;
    /** 説明 */
    description?: string;
    /** ダッシュボード設定（部分更新） */
    settings?: Partial<DashboardSettings>;
    /** デフォルト設定かどうか */
    isDefault?: boolean;
}

/**
 * ダッシュボードフィルター用の型定義
 */
export interface DashboardFilters {
    /** 期間 */
    period?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    /** 統計データ含める */
    includeStats?: boolean;
    /** アクティビティ含める */
    includeActivity?: boolean;
    /** 開始日 */
    startDate?: string;
    /** 終了日 */
    endDate?: string;
}

/**
 * リアルタイム更新設定の型定義
 */
export interface RealtimeConfig {
    /** 有効フラグ */
    enabled: boolean;
    /** 更新間隔（秒） */
    interval: number;
    /** 自動停止フラグ */
    autoStop: boolean;
    /** 最大実行時間（分） */
    maxDuration: number;
}

/**
 * APIクライアントクラス
 */
class DashboardApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/dashboard`;
    }

    /**
     * API呼び出しの共通メソッド
     * @param {string} endpoint - エンドポイント
     * @param {RequestInit} options - リクエストオプション
     * @returns {Promise<any>} レスポンス
     */
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

    /**
     * ダッシュボード一覧取得
     * @param {DashboardFilters} filters - フィルター
     * @returns {Promise<any>} ダッシュボード一覧
     */
    async getDashboards(filters?: DashboardFilters): Promise<any> {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.makeRequest(endpoint);
    }

    /**
     * ダッシュボード詳細取得
     * @param {string} id - ダッシュボードID
     * @param {DashboardFilters} filters - フィルター
     * @returns {Promise<any>} ダッシュボード詳細
     */
    async getDashboard(id: string, filters?: DashboardFilters): Promise<any> {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = `/${id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.makeRequest(endpoint);
    }

    /**
     * ダッシュボード作成
     * @param {CreateDashboardData} dashboard - ダッシュボードデータ
     * @returns {Promise<any>} 作成結果
     */
    async createDashboard(dashboard: CreateDashboardData): Promise<any> {
        return this.makeRequest('', {
            method: 'POST',
            body: JSON.stringify(dashboard),
        });
    }

    /**
     * ダッシュボード更新
     * @param {string} id - ダッシュボードID
     * @param {UpdateDashboardData} dashboard - 更新データ
     * @returns {Promise<any>} 更新結果
     */
    async updateDashboard(id: string, dashboard: UpdateDashboardData): Promise<any> {
        return this.makeRequest(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dashboard),
        });
    }

    /**
     * ダッシュボード削除
     * @param {string} id - ダッシュボードID
     * @param {boolean} force - 強制削除フラグ
     * @returns {Promise<any>} 削除結果
     */
    async deleteDashboard(id: string, force: boolean = false): Promise<any> {
        const endpoint = force ? `/${id}?force=true` : `/${id}`;
        return this.makeRequest(endpoint, {
            method: 'DELETE',
        });
    }

    /**
     * 統計データ取得
     * @param {object} params - パラメータ
     * @returns {Promise<any>} 統計データ
     */
    async getStats(params?: {
        period?: string;
        startDate?: string;
        endDate?: string;
        metrics?: string[];
        groupBy?: string;
        realtime?: boolean;
    }): Promise<any> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(item => queryParams.append(`${key}[]`, item));
                    } else {
                        queryParams.append(key, value.toString());
                    }
                }
            });
        }

        const endpoint = `/stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.makeRequest(endpoint);
    }

    /**
     * 統計データ再計算
     * @param {string} period - 期間
     * @param {boolean} force - 強制実行フラグ
     * @returns {Promise<any>} 再計算結果
     */
    async recalculateStats(period?: string, force: boolean = false): Promise<any> {
        return this.makeRequest('/stats', {
            method: 'POST',
            body: JSON.stringify({
                action: 'recalculate',
                period,
                force,
            }),
        });
    }
}

const dashboardApi = new DashboardApi();

/**
 * ダッシュボード一覧取得フック
 * @param {DashboardFilters} initialFilters - 初期フィルター
 * @returns {ListResult<Dashboard>} 一覧取得結果
 */
export const useDashboards = (initialFilters?: DashboardFilters): ListResult<Dashboard> => {
    return useApiList<Dashboard>(
        (params) => dashboardApi.getDashboards(params),
        {
            initialParams: initialFilters,
            pageSize: 20,
            autoFetch: true,
        }
    );
};

/**
 * ダッシュボード詳細取得フック
 * @param {string} id - ダッシュボードID
 * @param {DashboardFilters} filters - フィルター
 * @returns {CrudResult<Dashboard>} 詳細取得結果
 */
export const useDashboard = (id: string, filters?: DashboardFilters): CrudResult<Dashboard> => {
    return useApi<Dashboard>(() => dashboardApi.getDashboard(id, filters));
};

/**
 * ダッシュボード作成フック
 * @returns {CrudResult<Dashboard>} 作成結果
 */
export const useCreateDashboard = (): CrudResult<Dashboard> => {
    return useApi<Dashboard>((dashboard: CreateDashboardData) =>
        dashboardApi.createDashboard(dashboard)
    );
};

/**
 * ダッシュボード更新フック
 * @returns {CrudResult<Dashboard>} 更新結果
 */
export const useUpdateDashboard = (): CrudResult<Dashboard> => {
    return useApi<Dashboard>((id: string, dashboard: UpdateDashboardData) =>
        dashboardApi.updateDashboard(id, dashboard)
    );
};

/**
 * ダッシュボード削除フック
 * @returns {CrudResult<void>} 削除結果
 */
export const useDeleteDashboard = (): CrudResult<void> => {
    return useApi<void>((id: string, force?: boolean) =>
        dashboardApi.deleteDashboard(id, force)
    );
};

/**
 * ダッシュボード統計データ取得フック
 * @param {object} params - パラメータ
 * @returns {CrudResult<DashboardStats>} 統計データ取得結果
 */
export const useDashboardStats = (params?: {
    period?: string;
    startDate?: string;
    endDate?: string;
    metrics?: string[];
    groupBy?: string;
}): CrudResult<DashboardStats> => {
    return useApi<DashboardStats>(() => dashboardApi.getStats(params));
};

/**
 * リアルタイムダッシュボード統計データフック
 * @param {RealtimeConfig} config - リアルタイム設定
 * @param {object} params - 統計データパラメータ
 * @returns {{
 *   data: DashboardStats | null;
 *   loading: boolean;
 *   error: string | null;
 *   isConnected: boolean;
 *   start: () => void;
 *   stop: () => void;
 *   refresh: () => void;
 * }} リアルタイム統計データ結果
 */
export const useRealtimeDashboardStats = (
    config: RealtimeConfig,
    params?: {
        period?: string;
        startDate?: string;
        endDate?: string;
        metrics?: string[];
        groupBy?: string;
    }
) => {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);

    /**
     * 統計データ取得関数
     */
    const fetchStats = useCallback(async () => {
        try {
            setError(null);
            const result = await dashboardApi.getStats({ ...params, realtime: true });

            if (result.success) {
                setData(result.data);
            } else {
                throw new Error(result.error || '統計データの取得に失敗しました');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '不明なエラーが発生しました';
            setError(errorMessage);
            console.error('リアルタイム統計データ取得エラー:', err);
        }
    }, [params]);

    /**
     * リアルタイム更新開始
     */
    const start = useCallback(() => {
        if (intervalRef.current || !config.enabled) return;

        setIsConnected(true);
        setLoading(true);
        startTimeRef.current = Date.now();

        // 初回データ取得
        fetchStats().finally(() => setLoading(false));

        // 定期更新開始
        intervalRef.current = setInterval(() => {
            // 最大実行時間チェック
            if (config.autoStop && startTimeRef.current) {
                const elapsed = Date.now() - startTimeRef.current;
                const maxDuration = config.maxDuration * 60 * 1000; // 分をミリ秒に変換

                if (elapsed > maxDuration) {
                    stop();
                    return;
                }
            }

            fetchStats();
        }, config.interval * 1000);
    }, [config, fetchStats]);

    /**
     * リアルタイム更新停止
     */
    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsConnected(false);
        setLoading(false);
        startTimeRef.current = null;
    }, []);

    /**
     * 手動更新
     */
    const refresh = useCallback(() => {
        setLoading(true);
        fetchStats().finally(() => setLoading(false));
    }, [fetchStats]);

    // クリーンアップ
    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    // 設定変更時の自動再起動
    useEffect(() => {
        if (isConnected) {
            stop();
            start();
        }
    }, [config.interval, params]);

    return {
        data,
        loading,
        error,
        isConnected,
        start,
        stop,
        refresh,
    };
};

/**
 * ダッシュボード統計データ再計算フック
 * @returns {CrudResult<any>} 再計算結果
 */
export const useRecalculateDashboardStats = (): CrudResult<any> => {
    return useApi<any>((period?: string, force?: boolean) =>
        dashboardApi.recalculateStats(period, force)
    );
}; 