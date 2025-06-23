/**
 * @file route.ts
 * @description KPTセッション一覧API（開発用）
 * 
 * @overview
 * Railsサーバーへのプロキシ用エンドポイント
 * 本番環境では next.config.mjs の rewrites でプロキシされます
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            // クエリパラメータを構築
            const queryString = searchParams.toString();
            const endpoint = queryString ? `?${queryString}` : '';

            // Cookieを含めてバックエンドに転送
            const cookies = request.headers.get('cookie') || '';

            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions${endpoint}`, {
                headers: {
                    'Authorization': request.headers.get('Authorization') || '',
                    'Cookie': cookies,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'APIサーバーに接続できません' },
                { status: 500 }
            );
        }
    }

    // 開発環境用テストデータ
    const testData = {
        success: true,
        data: {
            kpt_sessions: [
                {
                    id: 'b99b1455-f825-42db-a9f4-06fdd83f3f3a',
                    title: 'チーム振り返り 2025-06-23',
                    description: '週次振り返り',
                    created_at: '2025-06-23T10:00:00Z',
                    status: 'completed',
                    items_count: 8
                },
                {
                    id: 'd016379b-d50e-46a4-9d36-b0f9fa15aa73',
                    title: 'プロジェクト振り返り',
                    description: 'スプリント終了振り返り',
                    created_at: '2025-06-22T15:30:00Z',
                    status: 'in_progress',
                    items_count: 5
                }
            ],
            pagination: {
                current_page: 1,
                per_page: 20,
                total_pages: 1,
                total_count: 2
            }
        },
        message: 'KPTセッション一覧を取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 