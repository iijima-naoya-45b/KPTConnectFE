/**
 * @file types.ts
 * @description お問い合わせ機能に関する型定義
 * 
 * お問い合わせページで使用される型定義を管理します。
 * フォームデータ、送信結果、状態管理に関する型を定義しています。
 */

/**
 * お問い合わせフォームのデータ型
 */
export interface ContactFormData {
    /** お名前 */
    name: string;
    /** メールアドレス */
    email: string;
    /** 件名 */
    subject: string;
    /** お問い合わせ内容 */
    message: string;
    /** 会社名（任意） */
    company?: string;
    /** 電話番号（任意） */
    phone?: string;
}

/**
 * 送信結果の型
 */
export interface SubmitResult {
    /** 送信成功フラグ */
    success: boolean;
    /** 結果メッセージ */
    message: string;
}

/**
 * お問い合わせフォームの状態
 */
export interface ContactFormState {
    /** 送信中フラグ */
    isSubmitting: boolean;
    /** 送信結果 */
    submitResult: SubmitResult | null;
} 