/**
 * @fileoverview KPT Connect フロントエンド共通ユーティリティ関数
 * @description アプリケーション全体で使用されるヘルパー関数を集約
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AppError, ValidationError } from '@/types';

// ===== CSS関連ユーティリティ =====

/**
 * TailwindCSSクラスを結合・マージする
 * @param inputs - クラス名の配列
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ===== 文字列操作ユーティリティ =====

/**
 * 文字列を指定した長さで切り詰める
 * @param text - 対象の文字列
 * @param maxLength - 最大長
 * @param suffix - 切り詰め時の接尾辞
 * @returns 切り詰められた文字列
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 文字列をケバブケースに変換
 * @param text - 対象の文字列
 * @returns ケバブケースの文字列
 */
export function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 文字列をキャメルケースに変換
 * @param text - 対象の文字列
 * @returns キャメルケースの文字列
 */
export function toCamelCase(text: string): string {
  return text
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * 文字列の最初の文字を大文字にする
 * @param text - 対象の文字列
 * @returns 最初の文字が大文字の文字列
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ===== 日付・時刻ユーティリティ =====

/**
 * 日付を相対的な時間表現に変換
 * @param date - 対象の日付
 * @returns 相対時間の文字列
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'たった今';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}週間前`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}ヶ月前`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}年前`;
}

/**
 * 日付を日本語形式でフォーマット
 * @param date - 対象の日付
 * @param includeTime - 時刻を含めるか
 * @returns フォーマットされた日付文字列
 */
export function formatJapaneseDate(date: string | Date, includeTime: boolean = false): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  let formatted = `${year}年${month}月${day}日`;

  if (includeTime) {
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
}

// ===== 数値操作ユーティリティ =====

/**
 * 数値を日本語形式でフォーマット（カンマ区切り）
 * @param num - 対象の数値
 * @returns フォーマットされた数値文字列
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ja-JP').format(num);
}

/**
 * 数値を短縮形式でフォーマット（1K, 1M など）
 * @param num - 対象の数値
 * @returns 短縮形式の数値文字列
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return `${Math.floor(num / 100) / 10}K`;
  }

  if (num < 1000000000) {
    return `${Math.floor(num / 100000) / 10}M`;
  }

  return `${Math.floor(num / 100000000) / 10}B`;
}

/**
 * パーセンテージを計算
 * @param value - 値
 * @param total - 総数
 * @param decimals - 小数点以下の桁数
 * @returns パーセンテージ
 */
export function calculatePercentage(value: number, total: number, decimals: number = 1): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// ===== 配列操作ユーティリティ =====

/**
 * 配列をランダムにシャッフル
 * @param array - 対象の配列
 * @returns シャッフルされた新しい配列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = Array.from(array);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 配列から重複を除去
 * @param array - 対象の配列
 * @param keyFn - キー抽出関数（オブジェクト配列の場合）
 * @returns 重複が除去された新しい配列
 * @description プリミティブ型の場合はSetを使用し、オブジェクト型の場合はkeyFnが必須
 */
export function uniqueArray<T>(array: T[], keyFn?: (item: T) => string | number): T[] {
  if (!keyFn) {
    // プリミティブ型（string, number, boolean等）の重複除去
    try {
      // Array.fromを使用してSetから配列に変換（ES5互換）
      return Array.from(new Set(array));
    } catch (error) {
      // Setで処理できない型の場合は、indexOf比較でフィルタリング
      console.warn('uniqueArray: オブジェクト型の配列にはkeyFn関数を指定してください', error);
      return array.filter((item, index) => array.indexOf(item) === index);
    }
  }

  // keyFnが指定された場合の重複除去
  const seen = new Set<string | number>();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * 配列を指定したサイズのチャンクに分割
 * @param array - 対象の配列
 * @param size - チャンクサイズ
 * @returns チャンクに分割された配列
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// ===== オブジェクト操作ユーティリティ =====

/**
 * オブジェクトの深いクローンを作成
 * @param obj - 対象のオブジェクト
 * @returns クローンされたオブジェクト
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
}

/**
 * オブジェクトから指定したキーを除外
 * @param obj - 対象のオブジェクト
 * @param keys - 除外するキーの配列
 * @returns 新しいオブジェクト
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = Object.assign({}, obj) as T;
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

/**
 * オブジェクトから指定したキーのみを抽出
 * @param obj - 対象のオブジェクト
 * @param keys - 抽出するキーの配列
 * @returns 新しいオブジェクト
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// ===== バリデーションユーティリティ =====

/**
 * メールアドレスの形式をチェック
 * @param email - チェック対象のメールアドレス
 * @returns 有効な形式かどうか
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * URLの形式をチェック
 * @param url - チェック対象のURL
 * @returns 有効な形式かどうか
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 空の値かどうかをチェック
 * @param value - チェック対象の値
 * @returns 空の値かどうか
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

// ===== エラーハンドリングユーティリティ =====

/**
 * APIエラーレスポンスを解析
 * @param error - エラーオブジェクト
 * @returns 解析されたエラー情報
 */
export function parseApiError(error: unknown): AppError {
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    return {
      code: (errorObj.code as string) || 'UNKNOWN_ERROR',
      message: (errorObj.message as string) || 'エラーが発生しました',
      details: errorObj.details as Record<string, unknown>,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'エラーが発生しました',
  };
}

/**
 * バリデーションエラーを整形
 * @param errors - バリデーションエラーの配列
 * @returns フィールドごとのエラーマップ
 */
export function formatValidationErrors(errors: ValidationError[]): Record<string, string> {
  return errors.reduce(
    (acc, error) => {
      acc[error.field] = error.message;
      return acc;
    },
    {} as Record<string, string>
  );
}

// ===== 非同期処理ユーティリティ =====

/**
 * 指定した時間だけ待機
 * @param ms - 待機時間（ミリ秒）
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 非同期関数をデバウンス
 * @param fn - 対象の関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 非同期関数をスロットル
 * @param fn - 対象の関数
 * @param limit - 制限時間（ミリ秒）
 * @returns スロットルされた関数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== ローカルストレージユーティリティ =====

/**
 * ローカルストレージから値を取得
 * @param key - キー
 * @param defaultValue - デフォルト値
 * @returns 取得した値
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * ローカルストレージに値を保存
 * @param key - キー
 * @param value - 値
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('ローカルストレージへの保存に失敗しました:', error);
  }
}

/**
 * ローカルストレージから値を削除
 * @param key - キー
 */
export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn('ローカルストレージからの削除に失敗しました:', error);
  }
}
