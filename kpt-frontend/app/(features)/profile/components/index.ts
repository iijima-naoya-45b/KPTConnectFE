/**
 * @file index.ts
 * @description プロフィールコンポーネントのエクスポート管理
 * 
 * プロフィール機能で使用するコンポーネントの
 * 一元的なエクスポートを提供します。
 */

export { default as ProfileBasicInfo } from './ProfileBasicInfo';
export { default as ProfileSettings } from './ProfileSettings';
export type { 
  UserProfile, 
  ProfileSettings as ProfileSettingsType, 
  SecuritySettings, 
  ProfileFieldKey, 
  SettingsFieldKey 
} from './types'; 