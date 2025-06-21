/**
 * @file types.ts
 * @description ヘルプ機能に関する型定義
 * 
 * ヘルプページで使用される型定義を管理します。
 * FAQ、カテゴリー、タブなどに関する型を定義しています。
 */

/**
 * FAQカテゴリーの種類
 */
export type FAQCategory = 'general' | 'kpt' | 'integration' | 'notification';

/**
 * タブの種類
 */
export type TabType = 'help' | 'feedback';

/**
 * FAQの型定義
 */
export interface FAQ {
    /** 質問 */
    question: string;
    /** 回答 */
    answer: string;
}

/**
 * フィルター状態の型
 */
export interface FilterState {
    /** 選択されたカテゴリー */
    selectedCategory: FAQCategory | 'all';
    /** 検索クエリ */
    searchQuery: string;
}

export interface Guide {
    title: string;
    description: string;
} 