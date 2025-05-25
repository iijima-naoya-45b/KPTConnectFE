/**
 * @fileoverview ローカルストレージ管理カスタムフック
 * @description ローカルストレージの値を状態として管理するフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useEffect, useCallback } from 'react';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '@/utils';

/**
 * ローカルストレージの値を状態として管理するフック
 * @template T - 値の型
 * @param key - ローカルストレージのキー
 * @param defaultValue - デフォルト値
 * @returns [値, 設定関数, 削除関数]
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 初期値を取得
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getLocalStorageItem(key, defaultValue);
  });

  /**
   * 値を設定する関数
   * @param value - 新しい値または更新関数
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // 関数の場合は現在の値を渡して実行
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // 状態を更新
        setStoredValue(valueToStore);

        // ローカルストレージに保存
        setLocalStorageItem(key, valueToStore);
      } catch (error) {
        console.error(`ローカルストレージへの保存に失敗しました (key: ${key}):`, error);
      }
    },
    [key, storedValue]
  );

  /**
   * 値を削除する関数
   */
  const removeValue = useCallback(() => {
    try {
      // 状態をデフォルト値にリセット
      setStoredValue(defaultValue);

      // ローカルストレージから削除
      removeLocalStorageItem(key);
    } catch (error) {
      console.error(`ローカルストレージからの削除に失敗しました (key: ${key}):`, error);
    }
  }, [key, defaultValue]);

  // ストレージイベントを監視（他のタブでの変更を検知）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          // JSON解析に失敗した場合はデフォルト値を使用
          setStoredValue(defaultValue);
        }
      }
    };

    // ストレージイベントリスナーを追加
    window.addEventListener('storage', handleStorageChange);

    // クリーンアップ
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, defaultValue]);

  return [storedValue, setValue, removeValue];
}
