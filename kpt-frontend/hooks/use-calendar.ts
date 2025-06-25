/**
 * @fileoverview カレンダー操作カスタムフック
 * @description カレンダー関連のデータ取得を提供するカスタムフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useCallback } from 'react';
import {
    calendarApi,
    type PersonalStats,
    type TimelineItem,
    type CalendarDayData
} from '@/lib/api/calendar';

/**
 * カレンダーデータ操作フック
 */
export const useCalendarData = () => {
    const [calendarData, setCalendarData] = useState<CalendarDayData[]>([]);
    const [monthlySummary, setMonthlySummary] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 振り返りカレンダーデータを取得
     */
    const fetchCalendarData = useCallback(async (year?: number, month?: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await calendarApi.getReflectionCalendar(year, month);

            if (result.success) {
                setCalendarData(result.data.calendar_data);
                setMonthlySummary(result.data.monthly_summary);
            } else {
                setError(result.message || 'カレンダーデータの取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || 'カレンダーデータの取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        calendarData,
        monthlySummary,
        loading,
        error,
        fetchCalendarData,
        refreshCalendarData: fetchCalendarData,
    };
};

/**
 * 月次データ操作フック
 */
export const useMonthlyData = () => {
    const [monthlyData, setMonthlyData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 月次データを取得
     */
    const fetchMonthlyData = useCallback(async (year?: number, month?: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await calendarApi.getMonthlyData(year, month);

            if (result.success) {
                setMonthlyData(result.data);
            } else {
                setError(result.message || '月次データの取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || '月次データの取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        monthlyData,
        loading,
        error,
        fetchMonthlyData,
        refreshMonthlyData: fetchMonthlyData,
    };
};

/**
 * 成長タイムライン操作フック
 */
export const useGrowthTimeline = () => {
    const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 成長タイムラインを取得
     */
    const fetchTimeline = useCallback(async (startDate?: string, endDate?: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await calendarApi.getGrowthTimeline(startDate, endDate);

            if (result.success) {
                setTimelineData(result.data.timeline);
            } else {
                setError(result.message || 'タイムラインデータの取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || 'タイムラインデータの取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        timelineData,
        loading,
        error,
        fetchTimeline,
        refreshTimeline: fetchTimeline,
    };
};

/**
 * 個人統計操作フック
 */
export const usePersonalStats = () => {
    const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 個人統計を取得
     */
    const fetchPersonalStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await calendarApi.getPersonalStats();

            if (result.success) {
                // API側のPersonalStatsを現在のPersonalStats型にマッピング
                const mappedStats: PersonalStats = {
                    user_id: result.data.user_id,
                    current_month: result.data.current_month,
                    growth_trends: result.data.growth_trends,
                    weekly_activity: result.data.weekly_activity,
                    skill_development: result.data.skill_development,
                };
                setPersonalStats(mappedStats);
            } else {
                setError(result.message || '個人統計の取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || '個人統計の取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        personalStats,
        loading,
        error,
        fetchPersonalStats,
        refreshPersonalStats: fetchPersonalStats,
    };
};

/**
 * 統合カレンダーフック（複数のデータを同時に管理）
 */
export const useCalendar = () => {
    const calendarDataHook = useCalendarData();
    const monthlyDataHook = useMonthlyData();
    const timelineHook = useGrowthTimeline();
    const statsHook = usePersonalStats();

    /**
     * 指定月のすべてのカレンダーデータを取得
     */
    const fetchAllCalendarData = useCallback(async (year?: number, month?: number) => {
        await Promise.all([
            calendarDataHook.fetchCalendarData(year, month),
            monthlyDataHook.fetchMonthlyData(year, month),
        ]);
    }, [calendarDataHook.fetchCalendarData, monthlyDataHook.fetchMonthlyData]);

    /**
     * タイムラインと統計データを取得
     */
    const fetchAnalyticsData = useCallback(async (startDate?: string, endDate?: string) => {
        await Promise.all([
            timelineHook.fetchTimeline(startDate, endDate),
            statsHook.fetchPersonalStats(),
        ]);
    }, [timelineHook.fetchTimeline, statsHook.fetchPersonalStats]);

    const loading = calendarDataHook.loading || monthlyDataHook.loading || timelineHook.loading || statsHook.loading;
    const error = calendarDataHook.error || monthlyDataHook.error || timelineHook.error || statsHook.error;

    return {
        // 個別データ
        calendarData: calendarDataHook.calendarData,
        monthlySummary: calendarDataHook.monthlySummary,
        monthlyData: monthlyDataHook.monthlyData,
        timelineData: timelineHook.timelineData,
        personalStats: statsHook.personalStats,

        // 状態
        loading,
        error,

        // 操作関数
        fetchAllCalendarData,
        fetchAnalyticsData,

        // 個別操作関数
        fetchCalendarData: calendarDataHook.fetchCalendarData,
        fetchMonthlyData: monthlyDataHook.fetchMonthlyData,
        fetchTimeline: timelineHook.fetchTimeline,
        fetchPersonalStats: statsHook.fetchPersonalStats,
    };
};

/**
 * 使用例：
 * 
 * // 基本的な使用
 * const { calendarData, loading, error, fetchCalendarData } = useCalendarData();
 * 
 * useEffect(() => {
 *   fetchCalendarData(2025, 6);
 * }, [fetchCalendarData]);
 * 
 * // 統合カレンダー
 * const { 
 *   calendarData, 
 *   monthlyData, 
 *   timelineData, 
 *   personalStats,
 *   loading, 
 *   error, 
 *   fetchAllCalendarData,
 *   fetchAnalyticsData 
 * } = useCalendar();
 * 
 * useEffect(() => {
 *   fetchAllCalendarData(2025, 6);
 *   fetchAnalyticsData('2025-01-01', '2025-12-31');
 * }, [fetchAllCalendarData, fetchAnalyticsData]);
 */ 