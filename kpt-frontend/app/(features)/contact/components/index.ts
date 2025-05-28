/**
 * @file index.ts
 * @description お問い合わせ機能コンポーネントのエクスポート
 * 
 * お問い合わせ機能で使用される全てのコンポーネントを
 * 一元的にエクスポートするためのインデックスファイルです。
 */

export { default as ContactForm } from './ContactForm';
export { default as ContactSubmitButton } from './ContactSubmitButton';

// 型定義もエクスポート
export type { ContactFormData, SubmitResult, ContactFormState } from './types'; 