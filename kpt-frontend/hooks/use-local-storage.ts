/**
 * @fileoverview ローカルストレージ管理カスタムフック
 * @description ローカルストレージの値を状態として管理するフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useCallback } from 'react';

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
  // 初期値は常にdefaultValueを使用
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  /**
   * 値を設定する関数
   * @param value - 新しい値または更新関数
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        // localStorage操作をコメントアウト
        // setLocalStorageItem(key, valueToStore);
      } catch (error) {
        console.error(`値の設定に失敗しました (key: ${key}):`, error);
      }
    },
    [key, storedValue]
  );

  /**
   * 値を削除する関数
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue);
      // localStorage操作をコメントアウト
      // removeLocalStorageItem(key);
    } catch (error) {
      console.error(`値の削除に失敗しました (key: ${key}):`, error);
    }
  }, [key, defaultValue]);

  // ストレージイベント監視もコメントアウト
  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === key && e.newValue !== null) {
  //       try {
  //         const newValue = JSON.parse(e.newValue);
  //         setStoredValue(newValue);
  //       } catch {
  //         setStoredValue(defaultValue);
  //       }
  //     }
  //   };
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, [key, defaultValue]);

  return [storedValue, setValue, removeValue];
}
