/**
 * @fileoverview ダッシュボードAPI
 * @description ダッシュボードの基本情報取得と設定作成機能を提供
 * 
 * 主な仕様：
 * - ユーザー毎のダッシュボード設定管理
 * - 表示期間設定（day/week/month/quarter/year、デフォルト：week）
 * - ウィジェット配置設定
 * - リアルタイム更新対応
 * 
 * 制限事項：
 * - 認証必須（credentials: 'include'）
 * - ユーザー単位でのデータ管理
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
 * ダッシュボード設定の型定義
 */
interface DashboardSettings {
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
 * リクエストボディの型定義（新規作成用）
 */
interface CreateDashboardRequest {
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
 * ダッシュボード一覧取得API
 * @param {NextRequest} request - リクエスト
 * @returns {Promise<NextResponse>} ダッシュボード一覧レスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';
    const includeStats = searchParams.get('include_stats') === 'true';
    const includeActivity = searchParams.get('include_activity') === 'true';

    // クエリパラメータを構築
    const queryParams = new URLSearchParams();
    queryParams.append('period', period);
    if (includeStats) queryParams.append('include_stats', 'true');
    if (includeActivity) queryParams.append('include_activity', 'true');

    const endpoint = `/dashboard?${queryParams.toString()}`;

    return proxyToBackend(endpoint, { method: 'GET' }, request);
}

/**
 * ダッシュボード設定作成API
 * @param {NextRequest} request - リクエスト
 * @returns {Promise<NextResponse>} 作成結果レスポンス
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body: CreateDashboardRequest = await request.json();

        // バリデーション
        if (!body.name || !body.settings) {
            return NextResponse.json(
                {
                    success: false,
                    error: '必要なパラメータが不足しています',
                    details: 'name と settings は必須です'
                },
                { status: 400 }
            );
        }

        // 表示期間の妥当性チェック
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

        // 自動更新間隔の妥当性チェック
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

        // ウィジェット配置の妥当性チェック
        if (!Array.isArray(body.settings.widgetLayout)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'ウィジェット配置設定が無効です',
                    details: 'widgetLayout は配列である必要があります'
                },
                { status: 400 }
            );
        }

        return proxyToBackend('/dashboard', {
            method: 'POST',
            body: JSON.stringify({ dashboard: body }),
        }, request);

    } catch (error) {
        console.error('ダッシュボード作成エラー:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'ダッシュボード設定の作成に失敗しました',
                details: error instanceof Error ? error.message : '不明なエラー'
            },
            { status: 500 }
        );
    }
}

/**
 * PUTメソッドは[id]ルートで処理
 */
export async function PUT(): Promise<NextResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'このエンドポイントはPUTメソッドをサポートしていません',
            details: 'ダッシュボード更新は /api/dashboard/[id] をご利用ください'
        },
        { status: 405 }
    );
}

/**
 * DELETEメソッドは[id]ルートで処理
 */
export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'このエンドポイントはDELETEメソッドをサポートしていません',
            details: 'ダッシュボード削除は /api/dashboard/[id] をご利用ください'
        },
        { status: 405 }
    );
} 