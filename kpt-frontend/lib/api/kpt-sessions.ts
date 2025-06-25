/**
 * @fileoverview KPTセッションAPIクライアント
 * @description バックエンドのKPTセッションAPIを直接呼び出すクライアント
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { API_BASE_URL } from '@/lib/constants';

/**
 * KPTセッション作成時のリクエストデータ型
 */
export interface CreateKptSessionRequest {
    session: {
        title: string;
        description?: string;
        session_date?: string;
        tags?: string[];
    };
    keep?: string;
    problem?: string;
    try?: string;
}

/**
 * KPTセッション更新時のリクエストデータ型
 */
export interface UpdateKptSessionRequest {
    session: {
        title?: string;
        description?: string;
        session_date?: string;
        tags?: string[];
    };
}

/**
 * KPTセッション一覧取得時のクエリパラメータ型
 */
export interface KptSessionsQueryParams {
    page?: number;
    per_page?: number;
    date?: string;
    session_date?: string;
    start_date?: string;
    end_date?: string;
    tag?: string;
    templates?: string;
}

/**
 * KPTセッション一覧のレスポンス型
 */
export interface KptSessionsResponse {
    success: boolean;
    data: {
        sessions: any[];
        pagination: {
            current_page: number;
            per_page: number;
            total_pages: number;
            total_count: number;
        };
    };
    message: string;
}

/**
 * KPTセッション詳細のレスポンス型
 */
export interface KptSessionDetailResponse {
    success: boolean;
    data: any;
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
 * KPTセッションAPIクライアントクラス
 */
class KptSessionsApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kpt_sessions`;
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
     * KPTセッション一覧を取得
     */
    async getKptSessions(params?: KptSessionsQueryParams): Promise<KptSessionsResponse> {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
        }

        const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
        return this.makeRequest<KptSessionsResponse>(endpoint);
    }

    /**
     * KPTセッション詳細を取得
     */
    async getKptSession(id: string): Promise<KptSessionDetailResponse> {
        return this.makeRequest<KptSessionDetailResponse>(`/${id}`);
    }

    /**
     * KPTセッションを作成
     */
    async createKptSession(data: CreateKptSessionRequest): Promise<KptSessionDetailResponse> {
        return this.makeRequest<KptSessionDetailResponse>('', {
            method: 'POST',
            body: data,
        });
    }

    /**
     * KPTセッションを更新
     */
    async updateKptSession(id: string, data: UpdateKptSessionRequest): Promise<KptSessionDetailResponse> {
        return this.makeRequest<KptSessionDetailResponse>(`/${id}`, {
            method: 'PUT',
            body: data,
        });
    }

    /**
     * KPTセッションを削除
     */
    async deleteKptSession(id: string): Promise<{ success: boolean; message: string }> {
        return this.makeRequest<{ success: boolean; message: string }>(`/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * セッションをテンプレートとして保存
     */
    async saveAsTemplate(id: string, templateName: string): Promise<KptSessionDetailResponse> {
        return this.makeRequest<KptSessionDetailResponse>(`/${id}/save_template`, {
            method: 'POST',
            body: { template_name: templateName },
        });
    }
}

// シングルトンインスタンスをエクスポート
export const kptSessionsApi = new KptSessionsApi();

/**
 * デフォルトエクスポート（後方互換性のため）
 */
export default kptSessionsApi; 