/**
 * @fileoverview ダッシュボード個別操作API
 * @description 特定ダッシュボードの詳細取得、更新、削除機能を提供
 * 
 * 主な仕様：
 * - 特定ダッシュボード設定の取得（統計データ含む）
 * - ダッシュボード設定の更新（部分更新対応）
 * - ダッシュボード設定の削除
 * - リアルタイム更新対応
 * 
 * 制限事項：
 * - 認証必須（credentials: 'include'）
 * - ユーザー所有設定のみ操作可能
 * - デフォルト設定の削除は不可
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
 * ダッシュボード更新用の型定義
 */
interface UpdateDashboardRequest {
    /** 設定名 */
    name?: string;
    /** 説明 */
    description?: string;
    /** ダッシュボード設定（部分更新） */
    settings?: {
        /** 表示期間 */
        displayPeriod?: 'day' | 'week' | 'month' | 'quarter' | 'year';
        /** ウィジェット配置設定 */
        widgetLayout?: {
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
        theme?: 'light' | 'dark' | 'auto';
        /** 表示密度 */
        density?: 'compact' | 'normal' | 'comfortable';
        /** 自動更新間隔（秒） */
        autoRefreshInterval?: number;
        /** 表示する統計項目 */
        visibleStats?: string[];
        /** チャート表示設定 */
        chartSettings?: {
            /** チャートタイプ */
            type?: 'line' | 'bar' | 'pie' | 'area';
            /** 色テーマ */
            colorScheme?: string;
            /** アニメーション有効 */
            animationEnabled?: boolean;
        };
    };
    /** デフォルト設定かどうか */
    isDefault?: boolean;
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
                    error: data.error || 'ダッシュボードAPIでエラーが発生しました',
                    details: data.details
                },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        console.error('Dashboard API プロキシエラー:', error);
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
 * IDバリデーション関数
 * @param {string} id - ダッシュボードID
 * @returns {boolean} バリデーション結果
 */
function validateDashboardId(id: string): boolean {
    // UUIDまたは数値IDの形式をチェック
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const numericRegex = /^\d+$/;

    return uuidRegex.test(id) || numericRegex.test(id);
}

/**
 * ダッシュボード詳細取得API
 * @param {NextRequest} request - リクエスト
 * @param {{ params: { id: string } }} context - パラメータコンテキスト
 * @returns {Promise<NextResponse>} ダッシュボード詳細レスポンス
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const { id } = params;

    // IDバリデーション
    if (!validateDashboardId(id)) {
        return NextResponse.json(
            {
                success: false,
                error: '無効なダッシュボードIDです',
                details: 'IDは有効なUUIDまたは数値である必要があります'
            },
            { status: 400 }
        );
    }

    const { searchParams } = new URL(request.url);
    const includeStats = searchParams.get('include_stats') === 'true';
    const includeActivity = searchParams.get('include_activity') === 'true';
    const period = searchParams.get('period') || 'week';
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    // クエリパラメータを構築
    const queryParams = new URLSearchParams();
    queryParams.append('period', period);
    if (includeStats) queryParams.append('include_stats', 'true');
    if (includeActivity) queryParams.append('include_activity', 'true');
    if (startDate) queryParams.append('start_date', startDate);
    if (endDate) queryParams.append('end_date', endDate);

    const endpoint = `/dashboard/${id}?${queryParams.toString()}`;

    return proxyToBackend(endpoint, { method: 'GET' }, request);
}

/**
 * ダッシュボード設定更新API
 * @param {NextRequest} request - リクエスト
 * @param {{ params: { id: string } }} context - パラメータコンテキスト
 * @returns {Promise<NextResponse>} 更新結果レスポンス
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const { id } = params;

    // IDバリデーション
    if (!validateDashboardId(id)) {
        return NextResponse.json(
            {
                success: false,
                error: '無効なダッシュボードIDです',
                details: 'IDは有効なUUIDまたは数値である必要があります'
            },
            { status: 400 }
        );
    }

    try {
        const body: UpdateDashboardRequest = await request.json();

        // 部分更新用のバリデーション
        if (body.settings) {
            // 表示期間の妥当性チェック（指定されている場合のみ）
            if (body.settings.displayPeriod) {
                const validPeriods = ['day', 'week', 'month', 'quarter', 'year'];
                if (!validPeriods.includes(body.settings.displayPeriod)) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: '無効な表示期間が指定されています',
                            details: `有効な期間: ${validPeriods.join(', ')}`
                        },
                        { status: 400 }
                    );
                }
            }

            // 自動更新間隔の妥当性チェック（指定されている場合のみ）
            if (body.settings.autoRefreshInterval !== undefined) {
                if (body.settings.autoRefreshInterval < 30 || body.settings.autoRefreshInterval > 3600) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: '無効な自動更新間隔が指定されています',
                            details: '自動更新間隔は30秒以上3600秒以下で設定してください'
                        },
                        { status: 400 }
                    );
                }
            }

            // ウィジェット配置の妥当性チェック（指定されている場合のみ）
            if (body.settings.widgetLayout && !Array.isArray(body.settings.widgetLayout)) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'ウィジェット配置設定が無効です',
                        details: 'widgetLayout は配列である必要があります'
                    },
                    { status: 400 }
                );
            }

            // テーマ設定の妥当性チェック（指定されている場合のみ）
            if (body.settings.theme) {
                const validThemes = ['light', 'dark', 'auto'];
                if (!validThemes.includes(body.settings.theme)) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: '無効なテーマ設定です',
                            details: `有効なテーマ: ${validThemes.join(', ')}`
                        },
                        { status: 400 }
                    );
                }
            }

            // 表示密度の妥当性チェック（指定されている場合のみ）
            if (body.settings.density) {
                const validDensities = ['compact', 'normal', 'comfortable'];
                if (!validDensities.includes(body.settings.density)) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: '無効な表示密度設定です',
                            details: `有効な密度: ${validDensities.join(', ')}`
                        },
                        { status: 400 }
                    );
                }
            }
        }

        return proxyToBackend(`/dashboard/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ dashboard: body }),
        }, request);

    } catch (error) {
        console.error('ダッシュボード更新エラー:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'ダッシュボード設定の更新に失敗しました',
                details: error instanceof Error ? error.message : '不明なエラー'
            },
            { status: 500 }
        );
    }
}

/**
 * ダッシュボード設定削除API
 * @param {NextRequest} request - リクエスト
 * @param {{ params: { id: string } }} context - パラメータコンテキスト
 * @returns {Promise<NextResponse>} 削除結果レスポンス
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    const { id } = params;

    // IDバリデーション
    if (!validateDashboardId(id)) {
        return NextResponse.json(
            {
                success: false,
                error: '無効なダッシュボードIDです',
                details: 'IDは有効なUUIDまたは数値である必要があります'
            },
            { status: 400 }
        );
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    // クエリパラメータを構築
    const queryParams = new URLSearchParams();
    if (force) queryParams.append('force', 'true');

    const endpoint = `/dashboard/${id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return proxyToBackend(endpoint, { method: 'DELETE' }, request);
}

/**
 * POSTメソッドは基本ルートで処理
 */
export async function POST(): Promise<NextResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'このエンドポイントはPOSTメソッドをサポートしていません',
            details: 'ダッシュボード作成は /api/dashboard をご利用ください'
        },
        { status: 405 }
    );
} 