/**
 * @fileoverview KPTセッション操作カスタムフック
 * @description KPTセッションのCRUD操作を提供するカスタムフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useCallback } from 'react';
import {
    kptSessionsApi,
    type KptSessionsQueryParams,
    type CreateKptSessionRequest,
    type UpdateKptSessionRequest
} from '@/lib/api/kpt-sessions';

/**
 * KPTセッション一覧操作フック
 */
export const useKptSessions = () => {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<any>(null);

    /**
     * セッション一覧を取得
     */
    const fetchSessions = useCallback(async (params?: KptSessionsQueryParams) => {
        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.getKptSessions(params);

            if (result.success) {
                setSessions(result.data.sessions);
                setPagination(result.data.pagination);
            } else {
                setError(result.message || 'セッションの取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || 'セッションの取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * セッションを作成
     */
    const createSession = useCallback(async (data: CreateKptSessionRequest) => {
        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.createKptSession(data);

            if (result.success) {
                // 作成後に一覧を再取得
                await fetchSessions();
                return result.data;
            } else {
                setError(result.message || 'セッションの作成に失敗しました');
                return null;
            }
        } catch (err: any) {
            setError(err.message || 'セッションの作成中にエラーが発生しました');
            return null;
        } finally {
            setLoading(false);
        }
    }, [fetchSessions]);

    return {
        sessions,
        loading,
        error,
        pagination,
        fetchSessions,
        createSession,
        refreshSessions: fetchSessions,
    };
};

/**
 * KPTセッション詳細操作フック
 */
export const useKptSessionDetail = (sessionId?: string) => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * セッション詳細を取得
     */
    const fetchSession = useCallback(async (id?: string) => {
        const targetId = id || sessionId;
        if (!targetId) {
            setError('セッションIDが指定されていません');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.getKptSession(targetId);

            if (result.success) {
                setSession(result.data);
            } else {
                setError(result.message || 'セッションの取得に失敗しました');
            }
        } catch (err: any) {
            setError(err.message || 'セッションの取得中にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    /**
     * セッションを更新
     */
    const updateSession = useCallback(async (id: string, data: UpdateKptSessionRequest) => {
        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.updateKptSession(id, data);

            if (result.success) {
                setSession(result.data);
                return result.data;
            } else {
                setError(result.message || 'セッションの更新に失敗しました');
                return null;
            }
        } catch (err: any) {
            setError(err.message || 'セッションの更新中にエラーが発生しました');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * セッションを削除
     */
    const deleteSession = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.deleteKptSession(id);

            if (result.success) {
                setSession(null);
                return true;
            } else {
                setError(result.message || 'セッションの削除に失敗しました');
                return false;
            }
        } catch (err: any) {
            setError(err.message || 'セッションの削除中にエラーが発生しました');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * テンプレートとして保存
     */
    const saveAsTemplate = useCallback(async (id: string, templateName: string) => {
        try {
            setLoading(true);
            setError(null);
            const result = await kptSessionsApi.saveAsTemplate(id, templateName);

            if (result.success) {
                return result.data;
            } else {
                setError(result.message || 'テンプレートの保存に失敗しました');
                return null;
            }
        } catch (err: any) {
            setError(err.message || 'テンプレートの保存中にエラーが発生しました');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        session,
        loading,
        error,
        fetchSession,
        updateSession,
        deleteSession,
        saveAsTemplate,
        refreshSession: fetchSession,
    };
};

/**
 * 使用例：
 * 
 * // セッション一覧
 * const { sessions, loading, error, fetchSessions, createSession } = useKptSessions();
 * 
 * useEffect(() => {
 *   fetchSessions({ page: 1, per_page: 20 });
 * }, [fetchSessions]);
 * 
 * // セッション詳細
 * const { session, fetchSession, updateSession, deleteSession } = useKptSessionDetail();
 * 
 * useEffect(() => {
 *   if (sessionId) {
 *     fetchSession(sessionId);
 *   }
 * }, [sessionId, fetchSession]);
 */ 