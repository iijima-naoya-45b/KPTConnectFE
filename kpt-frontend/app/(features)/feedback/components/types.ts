/**
 * @file types.ts
 * @description フィードバック機能に関する型定義
 * 
 * フィードバックページで使用される型定義を管理します。
 * フィードバックタイプ、フォームデータ、状態管理に関する型を定義しています。
 */

/**
 * フィードバックの種類
 */
export type FeedbackType = 'bug' | 'feature' | 'improvement' | 'other';

/**
 * 優先度の種類
 */
export type Priority = 'low' | 'medium' | 'high';

/**
 * フィードバックフォームのデータ型
 */
export interface FeedbackForm {
    /** フィードバックの種類 */
    type: FeedbackType;
    /** タイトル */
    title: string;
    /** 詳細説明 */
    description: string;
    /** メールアドレス */
    email: string;
    /** 優先度 */
    priority: Priority;
    /** 添付ファイル（将来的な拡張用） */
    attachments?: File[];
}

/**
 * フィードバックタイプの詳細情報
 */
export interface FeedbackTypeConfig {
    /** 値 */
    value: FeedbackType;
    /** 表示ラベル */
    label: string;
    /** 説明 */
    description: string;
    /** アイコン */
    icon: string;
    /** カラースタイル */
    color: string;
}

/**
 * フィードバック送信の状態
 */
export interface FeedbackState {
    /** ローディング状態 */
    loading: boolean;
    /** 送信完了状態 */
    submitted: boolean;
    /** メッセージ */
    message: string;
} 