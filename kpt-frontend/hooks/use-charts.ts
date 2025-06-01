/**
 * @fileoverview チャート管理カスタムフック
 * @description ダッシュボード、カスタムチャートの作成・管理を提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useCallback, useState } from 'react';
import { useApi, useApiList, useMutation, type ListResult, type CrudResult } from './use-api';
import { API_BASE_URL } from '@/lib/constants';

/**
 * チャートの基本型定義
 */
export interface Chart {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    chart_type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap' | 'treemap';
    data_source: 'kpt' | 'work_logs' | 'mixed' | 'custom';
    config: {
        data_query: Record<string, any>;
        display_options: {
            width?: number;
            height?: number;
            colors?: string[];
            legend_position?: 'top' | 'bottom' | 'left' | 'right' | 'none';
            show_grid?: boolean;
            show_labels?: boolean;
            animation_enabled?: boolean;
        };
        filters?: Record<string, any>;
        time_range?: {
            start_date?: string;
            end_date?: string;
            period?: 'day' | 'week' | 'month' | 'quarter' | 'year';
        };
    };
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    is_favorite: boolean;
    is_public: boolean;
    tags: string[];
    created_at: string;
    updated_at: string;
    // 計算フィールド
    chart_type_ja?: string;
    data_source_ja?: string;
    generated_at?: string;
    data?: any; // チャートデータ
}

/**
 * チャートデータの型定義
 */
export interface ChartData {
    chart_id: string;
    generated_at: string;
    data: {
        labels: string[];
        datasets: Array<{
            label: string;
            data: number[];
            backgroundColor?: string | string[];
            borderColor?: string | string[];
            borderWidth?: number;
            fill?: boolean;
        }>;
    };
    metadata: {
        total_data_points: number;
        data_range: {
            start_date: string;
            end_date: string;
        };
        filters_applied: Record<string, any>;
        cache_expires_at?: string;
    };
}

/**
 * チャートフィルターの型定義
 */
export interface ChartFilters {
    chart_type?: string;
    data_source?: string;
    is_favorite?: boolean;
    is_public?: boolean;
    tags?: string[];
    created_after?: string;
    created_before?: string;
    page?: number;
    per_page?: number;
}

/**
 * チャート作成・更新用の型定義
 */
export interface ChartInput {
    title: string;
    description?: string;
    chart_type: Chart['chart_type'];
    data_source: Chart['data_source'];
    config: Chart['config'];
    position?: Chart['position'];
    is_favorite?: boolean;
    is_public?: boolean;
    tags?: string[];
}

/**
 * APIクライアントクラス
 */
class ChartsApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/v1/charts`;
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

    async getCharts(filters?: ChartFilters): Promise<any> {
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

    async getChart(id: string): Promise<any> {
        return this.makeRequest(`/${id}`);
    }

    async createChart(chart: ChartInput): Promise<any> {
        return this.makeRequest('', {
            method: 'POST',
            body: JSON.stringify({ chart }),
        });
    }

    async updateChart(id: string, chart: Partial<ChartInput>): Promise<any> {
        return this.makeRequest(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ chart }),
        });
    }

    async deleteChart(id: string): Promise<any> {
        return this.makeRequest(`/${id}`, {
            method: 'DELETE',
        });
    }

    async getChartData(id: string, forceRefresh: boolean = false): Promise<any> {
        const endpoint = `/${id}/data${forceRefresh ? '?force_refresh=true' : ''}`;
        return this.makeRequest(endpoint);
    }

    async toggleFavorite(id: string): Promise<any> {
        return this.makeRequest(`/${id}/favorite`, {
            method: 'POST',
        });
    }

    async duplicateChart(id: string): Promise<any> {
        return this.makeRequest(`/${id}/duplicate`, {
            method: 'POST',
        });
    }

    async reorderCharts(chartOrders: Array<{ id: string; position: Chart['position'] }>): Promise<any> {
        return this.makeRequest('/reorder', {
            method: 'PUT',
            body: JSON.stringify({ chart_orders: chartOrders }),
        });
    }

    async exportChart(id: string, format: 'png' | 'pdf' | 'svg' | 'json'): Promise<any> {
        return this.makeRequest(`/${id}/export?format=${format}`, {
            method: 'GET',
        });
    }
}

const chartsApi = new ChartsApi();

/**
 * チャート一覧取得フック
 */
export const useCharts = (initialFilters?: ChartFilters): ListResult<Chart> => {
    return useApiList<Chart>(
        (params) => chartsApi.getCharts(params),
        {
            initialParams: initialFilters,
            pageSize: 20,
            autoFetch: true,
        }
    );
};

/**
 * チャート詳細取得フック
 */
export const useChart = (): CrudResult<Chart> => {
    return useApi<Chart>((id: string) => chartsApi.getChart(id));
};

/**
 * チャート作成フック
 */
export const useCreateChart = () => {
    return useMutation<Chart, ChartInput>((chart) => chartsApi.createChart(chart));
};

/**
 * チャート更新フック
 */
export const useUpdateChart = () => {
    return useMutation<Chart, { id: string; chart: Partial<ChartInput> }>(
        ({ id, chart }) => chartsApi.updateChart(id, chart)
    );
};

/**
 * チャート削除フック
 */
export const useDeleteChart = () => {
    return useMutation<void, string>((id) => chartsApi.deleteChart(id));
};

/**
 * チャートデータ取得フック
 */
export const useChartData = () => {
    return useMutation<ChartData, { id: string; forceRefresh?: boolean }>(
        ({ id, forceRefresh = false }) => chartsApi.getChartData(id, forceRefresh)
    );
};

/**
 * チャートお気に入り切り替えフック
 */
export const useToggleChartFavorite = () => {
    return useMutation<Chart, string>((id) => chartsApi.toggleFavorite(id));
};

/**
 * チャート複製フック
 */
export const useDuplicateChart = () => {
    return useMutation<Chart, string>((id) => chartsApi.duplicateChart(id));
};

/**
 * チャート並び替えフック
 */
export const useReorderCharts = () => {
    return useMutation<Chart[], Array<{ id: string; position: Chart['position'] }>>(
        (chartOrders) => chartsApi.reorderCharts(chartOrders)
    );
};

/**
 * チャートエクスポートフック
 */
export const useExportChart = () => {
    return useMutation<Blob, { id: string; format: 'png' | 'pdf' | 'svg' | 'json' }>(
        ({ id, format }) => chartsApi.exportChart(id, format)
    );
};

/**
 * チャートの包括的な管理フック
 */
export const useChartManager = (initialFilters?: ChartFilters) => {
    const listResult = useCharts(initialFilters);
    const createMutation = useCreateChart();
    const updateMutation = useUpdateChart();
    const deleteMutation = useDeleteChart();
    const chartDataResult = useChartData();
    const favoriteToggleMutation = useToggleChartFavorite();
    const duplicateMutation = useDuplicateChart();
    const reorderMutation = useReorderCharts();
    const exportMutation = useExportChart();

    const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
    const [editingChart, setEditingChart] = useState<Chart | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const refreshAll = useCallback(async () => {
        await listResult.refresh();
        if (selectedChartId) {
            await chartDataResult.mutate({ id: selectedChartId, forceRefresh: false });
        }
    }, [listResult, chartDataResult, selectedChartId]);

    const createChart = useCallback(async (chart: ChartInput) => {
        const result = await createMutation.mutate(chart);
        if (result) {
            await listResult.refresh();
        }
        return result;
    }, [createMutation, listResult]);

    const updateChart = useCallback(async (id: string, chart: Partial<ChartInput>) => {
        const result = await updateMutation.mutate({ id, chart });
        if (result) {
            await listResult.refresh();
            if (selectedChartId === id) {
                await chartDataResult.mutate({ id, forceRefresh: true });
            }
        }
        return result;
    }, [updateMutation, listResult, chartDataResult, selectedChartId]);

    const deleteChart = useCallback(async (id: string) => {
        const result = await deleteMutation.mutate(id);
        if (result !== null) {
            await listResult.refresh();
            if (selectedChartId === id) {
                setSelectedChartId(null);
            }
        }
        return result;
    }, [deleteMutation, listResult, selectedChartId]);

    const selectChart = useCallback(async (id: string) => {
        setSelectedChartId(id);
        await chartDataResult.mutate({ id, forceRefresh: false });
    }, [chartDataResult]);

    const toggleFavorite = useCallback(async (id: string) => {
        const result = await favoriteToggleMutation.mutate(id);
        if (result) {
            await listResult.refresh();
        }
        return result;
    }, [favoriteToggleMutation, listResult]);

    const duplicateChart = useCallback(async (id: string) => {
        const result = await duplicateMutation.mutate(id);
        if (result) {
            await listResult.refresh();
        }
        return result;
    }, [duplicateMutation, listResult]);

    const reorderCharts = useCallback(async (chartOrders: Array<{ id: string; position: Chart['position'] }>) => {
        setIsDragging(true);
        try {
            const result = await reorderMutation.mutate(chartOrders);
            if (result) {
                await listResult.refresh();
            }
            return result;
        } finally {
            setIsDragging(false);
        }
    }, [reorderMutation, listResult]);

    const exportChart = useCallback(async (id: string, format: 'png' | 'pdf' | 'svg' | 'json') => {
        return await exportMutation.mutate({ id, format });
    }, [exportMutation]);

    const startEditingChart = useCallback((chart: Chart) => {
        setEditingChart(chart);
    }, []);

    const stopEditingChart = useCallback(() => {
        setEditingChart(null);
    }, []);

    return {
        // 一覧
        charts: listResult,

        // 選択されたチャート
        selectedChartId,
        selectedChartData: chartDataResult.data,
        isLoadingChartData: chartDataResult.loading,
        chartDataError: chartDataResult.error,

        // 編集中のチャート
        editingChart,

        // 状態
        isDragging,

        // CRUD操作
        createChart,
        updateChart,
        deleteChart,
        selectChart,

        // 特殊操作
        toggleFavorite,
        duplicateChart,
        reorderCharts,
        exportChart,

        // 編集操作
        startEditingChart,
        stopEditingChart,

        // ユーティリティ
        refreshAll,
        refreshChartData: () => selectedChartId && chartDataResult.mutate({ id: selectedChartId, forceRefresh: true }),

        // ローディング状態
        isCreatingChart: createMutation.loading,
        isUpdatingChart: updateMutation.loading,
        isDeletingChart: deleteMutation.loading,
        isExportingChart: exportMutation.loading,

        // エラー状態
        createError: createMutation.error,
        updateError: updateMutation.error,
        deleteError: deleteMutation.error,
        exportError: exportMutation.error,
    };
};

/**
 * お気に入りチャート専用フック
 */
export const useFavoriteCharts = (): ListResult<Chart> => {
    return useCharts({ is_favorite: true });
};

/**
 * 公開チャート専用フック
 */
export const usePublicCharts = (): ListResult<Chart> => {
    return useCharts({ is_public: true });
};

/**
 * チャート種別フィルタフック
 */
export const useChartsByType = (chartType: Chart['chart_type']): ListResult<Chart> => {
    return useCharts({ chart_type: chartType });
};

/**
 * ダッシュボード用チャート管理フック
 */
export const useDashboardCharts = () => {
    const chartsManager = useChartManager();
    const [dashboardLayout, setDashboardLayout] = useState<Chart['position'][]>([]);

    const updateDashboardLayout = useCallback(async (newLayout: Array<{ id: string; position: Chart['position'] }>) => {
        setDashboardLayout(newLayout.map(item => item.position));
        await chartsManager.reorderCharts(newLayout);
    }, [chartsManager]);

    const addChartToDashboard = useCallback(async (chart: ChartInput, position: Chart['position']) => {
        const chartWithPosition = { ...chart, position };
        return await chartsManager.createChart(chartWithPosition);
    }, [chartsManager]);

    const removeChartFromDashboard = useCallback(async (id: string) => {
        return await chartsManager.deleteChart(id);
    }, [chartsManager]);

    return {
        ...chartsManager,
        dashboardLayout,
        updateDashboardLayout,
        addChartToDashboard,
        removeChartFromDashboard,
    };
}; 