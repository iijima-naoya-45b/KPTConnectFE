/**
 * @file types.ts
 * @description プロフィール機能の型定義
 * 
 * プロフィール機能で使用する共通の型定義を管理します。
 * UserProfile、設定項目、フォームデータなどの型を定義します。
 */

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  language: string;
  emailNotifications: boolean;
  kptReminders: boolean;
}

export interface ProfileSettings {
  timezone: string;
  language: string;
  emailNotifications: boolean;
  kptReminders: boolean;
}

export interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ProfileFieldKey = keyof UserProfile;
export type SettingsFieldKey = keyof ProfileSettings; 