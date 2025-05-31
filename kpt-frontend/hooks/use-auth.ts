/**
 * @fileoverview 認証状態管理フック
 * @description httpOnlyCookieベースの認証状態を管理するカスタムフック
 * 
 * バックエンドのCookieセッションと連携して、ユーザーの認証状態を判定します。
 * 定期的な認証チェック、ログアウト処理なども提供します。
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface User {
    id: string;
    email: string;
    username: string;
    provider?: string;
}

export interface AuthState {
    /** 現在のユーザー */
    user: User | null;
    /** 認証状態 */
    isAuthenticated: boolean;
    /** ローディング状態 */
    loading: boolean;
    /** 初期化完了フラグ */
    initialized: boolean;
}

export interface UseAuthReturn extends AuthState {
    /** ユーザー情報を取得 */
    checkAuth: () => Promise<void>;
    /** ログアウト処理 */
    logout: () => Promise<void>;
    /** ユーザー情報を更新 */
    updateUser: (user: User) => void;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

/**
 * 認証状態を管理するカスタムフック
 * @returns 認証状態と操作メソッド
 */
export const useAuth = (): UseAuthReturn => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        loading: true,
        initialized: false,
    });

    /**
     * バックエンドに認証状態を確認
     */
    const checkAuth = useCallback(async () => {
        try {
            setAuthState(prev => ({ ...prev, loading: true }));

            const response = await fetch(`${BACKEND_URL}/api/v1/me`, {
                method: 'GET',
                credentials: 'include', // httpOnlyCookieを含める
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setAuthState({
                    user: userData,
                    isAuthenticated: true,
                    loading: false,
                    initialized: true,
                });
            } else {
                // 認証失敗
                setAuthState({
                    user: null,
                    isAuthenticated: false,
                    loading: false,
                    initialized: true,
                });
            }
        } catch (error) {
            console.error('認証チェックエラー:', error);
            setAuthState({
                user: null,
                isAuthenticated: false,
                loading: false,
                initialized: true,
            });
        }
    }, []);

    /**
     * ログアウト処理
     */
    const logout = useCallback(async () => {
        try {
            await fetch(`${BACKEND_URL}/api/v1/sessions/logout`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setAuthState({
                user: null,
                isAuthenticated: false,
                loading: false,
                initialized: true,
            });

            // ログイン画面にリダイレクト
            window.location.href = '/login';
        } catch (error) {
            console.error('ログアウトエラー:', error);
            // エラーでも認証状態をクリア
            setAuthState({
                user: null,
                isAuthenticated: false,
                loading: false,
                initialized: true,
            });
        }
    }, []);

    /**
     * ユーザー情報を更新
     */
    const updateUser = useCallback((user: User) => {
        setAuthState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
        }));
    }, []);

    // 初期認証チェック
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        ...authState,
        checkAuth,
        logout,
        updateUser,
    };
}; 