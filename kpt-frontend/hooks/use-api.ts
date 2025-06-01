/**
 * @fileoverview 汎用APIカスタムフック
 * @description 共通のAPI操作パターンを提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * 汎用API呼び出し結果の型
 */
export interface ApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

/**
 * CRUD操作結果の型
 */
export interface CrudResult<T> extends ApiResult<T> {
    execute: (params?: any) => Promise<T | null>;
    reset: () => void;
}

/**
 * リスト取得結果の型
 */
export interface ListResult<T> extends ApiResult<T[]> {
    items: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        perPage: number;
    };
    hasMore: boolean;
    fetch: (params?: any) => Promise<void>;
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;
}

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
 * 汎用API呼び出しフック
 */
export const useApi = <T>(apiFunction: (...args: any[]) => Promise<T>): CrudResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (...params: any[]): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...params);
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};

/**
 * リスト取得専用フック
 */
export const useApiList = <T>(
    apiFunction: (params?: any) => Promise<any>,
    options: {
        initialParams?: any;
        pageSize?: number;
        autoFetch?: boolean;
    } = {}
): ListResult<T> => {
    const { initialParams, pageSize = 20, autoFetch = true } = options;

    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [lastParams, setLastParams] = useState(initialParams);

    const fetch = useCallback(async (params?: any) => {
        try {
            setLoading(true);
            setError(null);

            const searchParams = params || lastParams || {};
            const finalParams = {
                ...searchParams,
                page: searchParams.page || 1,
                per_page: pageSize,
            };

            const response = await apiFunction(finalParams);

            if (response?.success) {
                const { data, pagination } = response.data || response;

                // 新しいページの場合は追加、最初のページの場合は置換
                if (finalParams.page === 1) {
                    setItems(Array.isArray(data) ? data : []);
                } else {
                    setItems(prev => [...prev, ...(Array.isArray(data) ? data : [])]);
                }

                if (pagination) {
                    setCurrentPage(pagination.current_page || pagination.currentPage || 1);
                    setTotalPages(pagination.total_pages || pagination.totalPages || 1);
                    setTotalCount(pagination.total_count || pagination.totalCount || 0);
                }

                setLastParams(searchParams);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    }, [apiFunction, pageSize, lastParams]);

    const loadMore = useCallback(async () => {
        if (currentPage < totalPages && !loading) {
            await fetch({ ...lastParams, page: currentPage + 1 });
        }
    }, [currentPage, totalPages, loading, lastParams, fetch]);

    const refresh = useCallback(async () => {
        await fetch({ ...lastParams, page: 1 });
    }, [fetch, lastParams]);

    // 初回データ取得
    useEffect(() => {
        if (autoFetch) {
            fetch();
        }
    }, []);

    return {
        data: items,
        items,
        loading,
        error,
        pagination: {
            currentPage,
            totalPages,
            totalCount,
            perPage: pageSize,
        },
        hasMore: currentPage < totalPages,
        fetch,
        loadMore,
        refresh,
    };
};

/**
 * キャッシュ機能付きAPI呼び出しフック
 */
export const useApiWithCache = <T>(
    apiFunction: (...args: any[]) => Promise<T>,
    cacheKey: string,
    cacheTime: number = 5 * 60 * 1000 // 5分
): CrudResult<T> => {
    const [data, setData] = useState<T | null>(() => {
        // 初期化時にキャッシュから読み込み
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
            try {
                const { data: cachedData, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < cacheTime) {
                    return cachedData;
                }
            } catch {
                // キャッシュの解析に失敗した場合は無視
            }
        }
        return null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (...params: any[]): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...params);
            setData(result);

            // 結果をキャッシュに保存
            sessionStorage.setItem(cacheKey, JSON.stringify({
                data: result,
                timestamp: Date.now(),
            }));

            return result;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, [apiFunction, cacheKey]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
        sessionStorage.removeItem(cacheKey);
    }, [cacheKey]);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};

/**
 * ミューテーション操作専用フック
 */
export const useMutation = <T, P = any>(
    mutationFunction: (params: P) => Promise<T>
): {
    mutate: (params: P) => Promise<T | null>;
    loading: boolean;
    error: string | null;
    data: T | null;
    reset: () => void;
} => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = useCallback(async (params: P): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            const result = await mutationFunction(params);
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, [mutationFunction]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        mutate,
        loading,
        error,
        data,
        reset,
    };
}; 