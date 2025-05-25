/**
 * @file types.ts
 * @description ログイン機能の型定義
 * 
 * ログイン機能で使用する共通の型定義を管理します。
 * ログインフォーム、認証、エラーハンドリングなどの型を定義します。
 */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginError {
  message: string;
  type: 'validation' | 'authentication' | 'network' | 'unknown';
}

export interface SocialProvider {
  name: string;
  displayName: string;
  iconUrl: string;
  loginUrl: string;
}

export interface LoginCallbackParams {
  session_id?: string;
  error?: string;
  provider?: string;
} 