/**
 * @fileoverview ダッシュボード統計データAPI
 * @description リアルタイム更新用の統計データ取得機能を提供
 * 
 * 主な仕様：
 * - 期間別統計データ取得（day/week/month/quarter/year）
 * - リアルタイム更新対応
 * - キャッシュヘッダー設定
 * - 高頻度アクセス対応
 * 
 * 制限事項：
 * - 認証必須（credentials: 'include'）
 * - 1分間に最大60リクエスト
 * - データ取得のみ（更新不可）
 * 
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * API_BASE_URLの設定
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

/**
 * リクエストパラメータの型定義
 */
interface StatsRequestParams {
    /** 期間 */
    period: 'day' | 'week' | 'month' | 'quarter' | 'year';
    /** 開始日 */
    startDate?: string;
    /** 終了日 */
    endDate?: string;
    /** 統計項目フィルター */
    metrics?: string[];
    /** グループ化設定 */
    groupBy?: 'day' | 'week' | 'month';
    /** リアルタイム更新フラグ */
    realtime?: boolean;
}

/**
 * バックエンドAPIへのプロキシリクエスト共通関数
 * @param {string} endpoint - エンドポイント
 * @param {RequestInit} options - フェッチオプション
 * @param {NextRequest} request - 元のリクエスト
 * @returns {Promise<NextResponse>} レスポンス
 */
async function proxyToBackend(endpoint: string, options: RequestInit, request: NextRequest): Promise<NextResponse> {
    try {
        // Cookieを含めてバックエンドに転送
        const cookies = request.headers.get('cookie') || '';

        const response = await fetch(`${API_BASE_URL}/v1${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies,
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    error: data.error || 'ダッシュボード統計APIでエラーが発生しました',
                    details: data.details
                },
                { status: response.status }
            );
        }

        // リアルタイム更新用のキャッシュヘッダーを設定
        const headers = new Headers();
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        headers.set('Last-Modified', new Date().toUTCString());

        return NextResponse.json(data, {
            status: response.status,
            headers
        });

    } catch (error) {
        console.error('Dashboard Stats API プロキシエラー:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'バックエンドAPIとの通信に失敗しました',
                details: error instanceof Error ? error.message : '不明なエラー'
            },
            { status: 500 }
        );
    }
}

/**
 * パラメータバリデーション関数
 * @param {StatsRequestParams} params - リクエストパラメータ
 * @returns {{ isValid: boolean; error?: string }} バリデーション結果
 */
function validateStatsParams(params: StatsRequestParams): { isValid: boolean; error?: string } {
    // 期間の妥当性チェック
    const validPeriods = ['day', 'week', 'month', 'quarter', 'year'];
    if (!validPeriods.includes(params.period)) {
        return {
            isValid: false,
            error: `無効な期間が指定されています。有効な期間: ${validPeriods.join(', ')}`
        };
    }

    // 日付形式の妥当性チェック
    if (params.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(params.startDate)) {
        return {
            isValid: false,
            error: '開始日の形式が無効です。YYYY-MM-DD形式で指定してください'
        };
    }

    if (params.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(params.endDate)) {
        return {
            isValid: false,
            error: '終了日の形式が無効です。YYYY-MM-DD形式で指定してください'
        };
    }

    // 日付の論理チェック
    if (params.startDate && params.endDate) {
        const startDate = new Date(params.startDate);
        const endDate = new Date(params.endDate);

        if (startDate > endDate) {
            return {
                isValid: false,
                error: '開始日は終了日より前である必要があります'
            };
        }

        // 過度に長い期間のチェック（1年以上）
        const diffTime = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 365) {
            return {
                isValid: false,
                error: '取得期間は1年以下で指定してください'
            };
        }
    }

    // グループ化設定の妥当性チェック
    if (params.groupBy) {
        const validGroupBy = ['day', 'week', 'month'];
        if (!validGroupBy.includes(params.groupBy)) {
            return {
                isValid: false,
                error: `無効なグループ化設定です。有効な設定: ${validGroupBy.join(', ')}`
            };
        }
    }

    return { isValid: true };
}

/**
 * ダッシュボード統計データ取得API
 * @param {NextRequest} request - リクエスト
 * @returns {Promise<NextResponse>} 統計データレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);

    // パラメータ取得
    const params: StatsRequestParams = {
        period: (searchParams.get('period') as StatsRequestParams['period']) || 'week',
        startDate: searchParams.get('start_date') || undefined,
        endDate: searchParams.get('end_date') || undefined,
        metrics: searchParams.get('metrics')?.split(',') || undefined,
        groupBy: (searchParams.get('group_by') as StatsRequestParams['groupBy']) || undefined,
        realtime: searchParams.get('realtime') === 'true',
    };

    // パラメータバリデーション
    const validation = validateStatsParams(params);
    if (!validation.isValid) {
        return NextResponse.json(
            {
                success: false,
                error: validation.error,
                details: 'パラメータを確認してください'
            },
            { status: 400 }
        );
    }

    // クエリパラメータを構築
    const queryParams = new URLSearchParams();
    queryParams.append('period', params.period);

    if (params.startDate) queryParams.append('start_date', params.startDate);
    if (params.endDate) queryParams.append('end_date', params.endDate);
    if (params.groupBy) queryParams.append('group_by', params.groupBy);
    if (params.realtime) queryParams.append('realtime', 'true');

    if (params.metrics && params.metrics.length > 0) {
        params.metrics.forEach(metric => queryParams.append('metrics[]', metric));
    }

    const endpoint = `/dashboard/stats?${queryParams.toString()}`;

    return proxyToBackend(endpoint, { method: 'GET' }, request);
}

/**
 * POSTメソッドは統計データ生成用
 * @param {NextRequest} request - リクエスト
 * @returns {Promise<NextResponse>} 生成結果レスポンス
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        // 統計データ再計算リクエストの場合
        if (body.action === 'recalculate') {
            const { period, force } = body;

            // 期間の妥当性チェック
            const validPeriods = ['day', 'week', 'month', 'quarter', 'year'];
            if (period && !validPeriods.includes(period)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: '無効な期間が指定されています',
                        details: `有効な期間: ${validPeriods.join(', ')}`
                    },
                    { status: 400 }
                );
            }

            const queryParams = new URLSearchParams();
            if (period) queryParams.append('period', period);
            if (force) queryParams.append('force', 'true');

            const endpoint = `/dashboard/stats/recalculate${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

            return proxyToBackend(endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
            }, request);
        }

        return NextResponse.json(
            {
                success: false,
                error: '無効なアクションです',
                details: 'サポートされているアクション: recalculate'
            },
            { status: 400 }
        );

    } catch (error) {
        console.error('ダッシュボード統計データ生成エラー:', error);
        return NextResponse.json(
            {
                success: false,
                error: '統計データの生成に失敗しました',
                details: error instanceof Error ? error.message : '不明なエラー'
            },
            { status: 500 }
        );
    }
}

/**
 * PUTメソッドはサポートしない
 */
export async function PUT(): Promise<NextResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'このエンドポイントはPUTメソッドをサポートしていません',
            details: '統計データは読み取り専用です'
        },
        { status: 405 }
    );
}

/**
 * DELETEメソッドはサポートしない
 */
export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'このエンドポイントはDELETEメソッドをサポートしていません',
            details: '統計データは削除できません'
        },
        { status: 405 }
    );
} 