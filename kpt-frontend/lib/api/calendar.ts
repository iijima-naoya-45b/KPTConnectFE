/**
 * @fileoverview カレンダーAPIクライアント
 * @description バックエンドのカレンダーAPIを直接呼び出すクライアント
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { API_BASE_URL } from '@/lib/constants';

/**
 * カレンダーデータのレスポンス型
 */
export interface CalendarDataResponse {
    success: boolean;
    data: {
        year: number;
        month: number;
        calendar_data: CalendarDayData[];
        monthly_summary: {
            total_reflection_days: number;
            total_sessions: number;
            completed_sessions: number;
            total_items: number;
            average_items_per_session: number;
            reflection_streak: number;
        };
    };
    message: string;
}

/**
 * カレンダー日付データ型
 */
export interface CalendarDayData {
    date: string;
    day: number;
    weekday: number;
    has_kpt_session: boolean;
    kpt_sessions: Array<{
        id: string;
        title: string;
        status: string;
        items_count: number;
        progress_rate: number;
    }>;
    reflection_score: number;
    productivity_level: string;
}

/**
 * 月次データのレスポンス型
 */
export interface MonthlyDataResponse {
    success: boolean;
    data: {
        kpt_sessions: {
            total: number;
            completed: number;
            by_type: { completed: number; in_progress: number; draft: number };
            items_count: { keep: number; problem: number; try: number };
        };
        productivity: {
            active_days: number;
            total_days: number;
            activity_rate: number;
            average_daily_items: number;
        };
        growth_metrics: {
            reflection_consistency: number;
            improvement_rate: number;
            goal_achievement: number;
            learning_velocity: number;
        };
        reflection_streak: number;
    };
    message: string;
}

/**
 * 成長タイムラインのレスポンス型
 */
export interface GrowthTimelineResponse {
    success: boolean;
    data: {
        timeline: TimelineItem[];
    };
    message: string;
}

/**
 * タイムラインアイテム型
 */
export interface TimelineItem {
    date: string;
    type: 'kpt_session' | 'work_log';
    title: string;
    description?: string;
    status?: string;
    items_count?: number;
    progress_rate?: number;
    emotion_score?: number;
    impact_score?: number;
    url: string;
}

/**
 * 個人統計のレスポンス型
 */
export interface PersonalStatsResponse {
    success: boolean;
    data: PersonalStats;
    message: string;
}

/**
 * 個人統計データ型
 */
export interface PersonalStats {
    user_id: string;
    current_month: {
        kpt_sessions: number;
        reflection_days: number;
        productivity_score: number;
    };
    growth_trends: {
        consistency_score: number;
        improvement_rate: number;
        learning_velocity: number;
    };
    weekly_activity: Array<{
        week: string;
        sessions: number;
        reflection_hours: number;
    }>;
    skill_development: {
        areas: string[];
        progress: number[];
    };
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
 * カレンダーAPIクライアントクラス
 */
class CalendarApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/calendar`;
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
     * 振り返りカレンダーデータを取得
     */
    async getReflectionCalendar(year?: number, month?: number): Promise<CalendarDataResponse> {
        const currentDate = new Date();
        const targetYear = year || currentDate.getFullYear();
        const targetMonth = month || (currentDate.getMonth() + 1);

        const queryParams = new URLSearchParams({
            year: String(targetYear),
            month: String(targetMonth),
        });

        return this.makeRequest<CalendarDataResponse>(`/reflection_calendar?${queryParams.toString()}`);
    }

    /**
     * 月次データを取得
     */
    async getMonthlyData(year?: number, month?: number): Promise<MonthlyDataResponse> {
        const currentDate = new Date();
        const targetYear = year || currentDate.getFullYear();
        const targetMonth = month || (currentDate.getMonth() + 1);

        const queryParams = new URLSearchParams({
            year: String(targetYear),
            month: String(targetMonth),
        });

        return this.makeRequest<MonthlyDataResponse>(`/monthly_data?${queryParams.toString()}`);
    }

    /**
     * 成長タイムラインを取得
     */
    async getGrowthTimeline(startDate?: string, endDate?: string): Promise<GrowthTimelineResponse> {
        const currentYear = new Date().getFullYear();
        const defaultStartDate = startDate || `${currentYear}-01-01`;
        const defaultEndDate = endDate || `${currentYear}-12-31`;

        const queryParams = new URLSearchParams({
            start_date: defaultStartDate,
            end_date: defaultEndDate,
        });

        return this.makeRequest<GrowthTimelineResponse>(`/growth_timeline?${queryParams.toString()}`);
    }

    /**
     * 個人統計を取得
     */
    async getPersonalStats(): Promise<PersonalStatsResponse> {
        return this.makeRequest<PersonalStatsResponse>('/personal_stats');
    }

    /**
     * 成長分析データを取得
     */
    async getGrowthAnalytics(startDate?: string, endDate?: string): Promise<any> {
        const currentYear = new Date().getFullYear();
        const defaultStartDate = startDate || `${currentYear}-01-01`;
        const defaultEndDate = endDate || `${currentYear}-12-31`;

        const queryParams = new URLSearchParams({
            start_date: defaultStartDate,
            end_date: defaultEndDate,
        });

        return this.makeRequest<any>(`/growth_analytics?${queryParams.toString()}`);
    }
}

// シングルトンインスタンスをエクスポート
export const calendarApi = new CalendarApi();

/**
 * デフォルトエクスポート（後方互換性のため）
 */
export default calendarApi; 