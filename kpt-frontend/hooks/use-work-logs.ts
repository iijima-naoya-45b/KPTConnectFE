import { useCallback } from 'react';
import { useApi, useApiList, useMutation, type ListResult, type CrudResult } from './use-api';
import { API_BASE_URL } from '@/lib/constants';

export interface WorkLog {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    category: string;
    project?: string;
    start_time: string;
    end_time?: string;
    duration_minutes?: number;
    mood_score: number;
    productivity_score: number;
    difficulty_score: number;
    is_billable: boolean;
    billable_rate?: number;
    tags: string[];
    kpt_session_id?: string;
    created_at: string;
    updated_at: string;
    // 計算フィールド
    duration_formatted?: string;
    category_ja?: string;
    productivity_ja?: string;
}

/**
 * 作業ログ統計の型定義
 */
export interface WorkLogStats {
    period: {
        start_date: string;
        end_date: string;
        days: number;
    };
    summary: {
        total_logs: number;
        total_hours: number;
        billable_hours: number;
        average_productivity: number;
        average_mood: number;
        total_earnings?: number;
    };
    by_category: Record<string, {
        count: number;
        hours: number;
        percentage: number;
    }>;
    by_project: Record<string, {
        count: number;
        hours: number;
        billable_hours: number;
        earnings?: number;
    }>;
    daily_trends: Array<{
        date: string;
        hours: number;
        logs_count: number;
        average_productivity: number;
        average_mood: number;
    }>;
}

/**
 * 作業ログフィルターの型定義
 */
export interface WorkLogFilters {
    category?: string;
    project?: string;
    start_date?: string;
    end_date?: string;
    is_billable?: boolean;
    kpt_session_id?: string;
    tags?: string[];
    page?: number;
    per_page?: number;
}

/**
 * 作業ログ作成・更新用の型定義
 */
export interface WorkLogInput {
    title: string;
    description?: string;
    category: string;
    project?: string;
    start_time: string;
    end_time?: string;
    mood_score: number;
    productivity_score: number;
    difficulty_score: number;
    is_billable?: boolean;
    billable_rate?: number;
    tags?: string[];
    kpt_session_id?: string;
}

/**
 * APIクライアントクラス
 */
class WorkLogsApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/v1/work_logs`;
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

    async getWorkLogs(filters?: WorkLogFilters): Promise<any> {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (Array.isArray(value)) {
                        value.forEach(item => queryParams.append(`${key}[]`, item));
                    } else {
                        queryParams.append(key, value.toString());
                    }
                }
            });
        }

        const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.makeRequest(endpoint);
    }

    async getWorkLog(id: string): Promise<any> {
        return this.makeRequest(`/${id}`);
    }

    async createWorkLog(workLog: WorkLogInput): Promise<any> {
        return this.makeRequest('', {
            method: 'POST',
            body: JSON.stringify({ work_log: workLog }),
        });
    }

    async updateWorkLog(id: string, workLog: Partial<WorkLogInput>): Promise<any> {
        return this.makeRequest(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ work_log: workLog }),
        });
    }

    async deleteWorkLog(id: string): Promise<any> {
        return this.makeRequest(`/${id}`, {
            method: 'DELETE',
        });
    }

    async getStats(filters?: { start_date?: string; end_date?: string; category?: string; project?: string }): Promise<any> {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value);
                }
            });
        }

        const endpoint = `/stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.makeRequest(endpoint);
    }

    async linkToKptSession(id: string, kptSessionId: string): Promise<any> {
        return this.makeRequest(`/${id}/link_kpt`, {
            method: 'POST',
            body: JSON.stringify({ kpt_session_id: kptSessionId }),
        });
    }

    async unlinkFromKptSession(id: string): Promise<any> {
        return this.makeRequest(`/${id}/unlink_kpt`, {
            method: 'DELETE',
        });
    }

    async startTimer(workLog: Omit<WorkLogInput, 'end_time'>): Promise<any> {
        return this.makeRequest('/start_timer', {
            method: 'POST',
            body: JSON.stringify({ work_log: workLog }),
        });
    }

    async stopTimer(id: string): Promise<any> {
        return this.makeRequest(`/${id}/stop_timer`, {
            method: 'PUT',
        });
    }
}

const workLogsApi = new WorkLogsApi();

/**
 * 作業ログ一覧取得フック
 */
export const useWorkLogs = (initialFilters?: WorkLogFilters): ListResult<WorkLog> => {
    return useApiList<WorkLog>(
        (params) => workLogsApi.getWorkLogs(params),
        {
            initialParams: initialFilters,
            pageSize: 20,
            autoFetch: true,
        }
    );
};

/**
 * 作業ログ詳細取得フック
 */
export const useWorkLog = (): CrudResult<WorkLog> => {
    return useApi<WorkLog>((id: string) => workLogsApi.getWorkLog(id));
};

/**
 * 作業ログ作成フック
 */
export const useCreateWorkLog = () => {
    return useMutation<WorkLog, WorkLogInput>((workLog) => workLogsApi.createWorkLog(workLog));
};

/**
 * 作業ログ更新フック
 */
export const useUpdateWorkLog = () => {
    return useMutation<WorkLog, { id: string; workLog: Partial<WorkLogInput> }>(
        ({ id, workLog }) => workLogsApi.updateWorkLog(id, workLog)
    );
};

/**
 * 作業ログ削除フック
 */
export const useDeleteWorkLog = () => {
    return useMutation<void, string>((id) => workLogsApi.deleteWorkLog(id));
};

/**
 * 作業ログ統計取得フック
 */
export const useWorkLogStats = () => {
    return useApi<WorkLogStats>((filters?: any) => workLogsApi.getStats(filters));
};

/**
 * KPTセッションリンク操作フック
 */
export const useWorkLogKptActions = () => {
    const linkMutation = useMutation<WorkLog, { id: string; kptSessionId: string }>(
        ({ id, kptSessionId }) => workLogsApi.linkToKptSession(id, kptSessionId)
    );

    const unlinkMutation = useMutation<WorkLog, string>(
        (id) => workLogsApi.unlinkFromKptSession(id)
    );

    return {
        linkToKpt: linkMutation,
        unlinkFromKpt: unlinkMutation,
    };
};

/**
 * タイマー操作フック
 */
export const useWorkLogTimer = () => {
    const startMutation = useMutation<WorkLog, Omit<WorkLogInput, 'end_time'>>(
        (workLog) => workLogsApi.startTimer(workLog)
    );

    const stopMutation = useMutation<WorkLog, string>(
        (id) => workLogsApi.stopTimer(id)
    );

    return {
        startTimer: startMutation,
        stopTimer: stopMutation,
    };
};

/**
 * 作業ログの包括的な管理フック
 */
export const useWorkLogManager = (initialFilters?: WorkLogFilters) => {
    const listResult = useWorkLogs(initialFilters);
    const createMutation = useCreateWorkLog();
    const updateMutation = useUpdateWorkLog();
    const deleteMutation = useDeleteWorkLog();
    const statsResult = useWorkLogStats();
    const kptActions = useWorkLogKptActions();
    const timerActions = useWorkLogTimer();

    const refreshAll = useCallback(async () => {
        await Promise.all([
            listResult.refresh(),
            statsResult.execute(),
        ]);
    }, [listResult, statsResult]);

    const createWorkLog = useCallback(async (workLog: WorkLogInput) => {
        const result = await createMutation.mutate(workLog);
        if (result) {
            await listResult.refresh();
            await statsResult.execute();
        }
        return result;
    }, [createMutation, listResult, statsResult]);

    const updateWorkLog = useCallback(async (id: string, workLog: Partial<WorkLogInput>) => {
        const result = await updateMutation.mutate({ id, workLog });
        if (result) {
            await listResult.refresh();
            await statsResult.execute();
        }
        return result;
    }, [updateMutation, listResult, statsResult]);

    const deleteWorkLog = useCallback(async (id: string) => {
        const result = await deleteMutation.mutate(id);
        if (result !== null) {
            await listResult.refresh();
            await statsResult.execute();
        }
        return result;
    }, [deleteMutation, listResult, statsResult]);

    return {
        // 一覧
        workLogs: listResult,

        // 統計
        stats: statsResult,

        // CRUD操作
        createWorkLog,
        updateWorkLog,
        deleteWorkLog,

        // KPTリンク操作
        kptActions,

        // タイマー操作
        timerActions,

        // ユーティリティ
        refreshAll,
    };
}; 