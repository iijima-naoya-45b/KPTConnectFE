/**
 * @file constants.ts
 * @description ヘルプ機能の定数データ
 * 
 * FAQ、カテゴリー情報などの定数データを管理します。
 */

import { FAQ } from './types';

/**
 * FAQデータの定数
 */
export const faqs: FAQ[] = [
    {
        question: 'KPTとは何ですか？',
        answer:
            'KPTは、Keep（継続すること）、Problem（問題点）、Try（試してみること）の頭文字を取った振り返り手法です。チームの改善と成長を促進するための効果的な方法です。',
        category: 'general',
    },
    {
        question: 'テンプレートの共有はどのように行いますか？',
        answer:
            'テンプレート作成時に「テンプレートを共有する」オプションを選択することで、チーム内でテンプレートを共有できます。共有されたテンプレートは、チームの全メンバーが利用可能になります。',
        category: 'kpt',
    },
    {
        question: '外部サービスとの連携はどのように設定しますか？',
        answer:
            '設定画面の「インテグレーション」タブから、各種外部サービスとの連携を設定できます。対応しているサービスは、プロジェクト管理ツール（Jira、Trello、Asana）、チャットツール（Slack、Discord、Teams）、カレンダーツール（Google Calendar、Outlook）です。',
        category: 'integration',
    },
    {
        question: '通知の設定はどこで行えますか？',
        answer:
            '設定画面の「通知」タブから、メール通知、プッシュ通知、カスタムアラートの設定が可能です。各通知タイプごとに詳細な設定を行うことができます。',
        category: 'notification',
    },
    {
        question: 'KPTの効果的な使い方を教えてください',
        answer:
            'KPTは定期的に（週次や月次で）実施することが重要です。チーム全員で振り返りを行い、Keepで良かった点を共有し、Problemで課題を明確にし、Tryで次の改善アクションを決めましょう。',
        category: 'kpt',
    },
    {
        question: 'データのエクスポートは可能ですか？',
        answer:
            'はい、KPTボードのデータはCSV、JSON、PDF形式でエクスポートできます。レポート画面の「エクスポート」ボタンから実行してください。',
        category: 'general',
    },
]; 