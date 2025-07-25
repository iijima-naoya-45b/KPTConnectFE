/**
 * @file constants.ts
 * @description ヘルプ機能の定数データ
 * 
 * FAQ、カテゴリー情報などの定数データを管理します。
 */

import { FAQ, Guide } from './types';

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

export const faqData: FAQ[] = [
    {
        question: 'KPTとは何ですか？',
        answer: 'KPTは、Keep（継続すること）、Problem（問題点）、Try（試してみること）の頭文字を取った振り返り手法です。チームや個人の改善と成長を促進するための効果的なフレームワークです。',
    },
    {
        question: '目標設定はどのように活用できますか？',
        answer: '学習目標や開発目標を設定し、具体的なアクションプランに分解することで、計画的なスキルアップが可能です。進捗率を可視化することで、モチベーション維持にも繋がります。',
    },
    {
        question: '外部サービスとの連携は可能ですか？',
        answer: '現在、GitHubとの連携が可能です。将来的にはSlackやTrelloなど、より多くのツールとの連携を予定しています。',
    },
    {
        question: 'AIによる目標提案はどのような仕組みですか？',
        answer: 'あなたの職種、経験年数、学習したいことなどの情報に基づき、AIが現実的で効果的な目標とアクションプランの草案を提案します。あくまで草案ですので、ご自身の言葉で自由に編集してください。',
    },
];

export const guideData: Guide[] = [
    {
        title: '初めての目標設定',
        description: 'AI提案機能を使わずに、手動で目標を設定する基本的な流れを解説します。',
    },
    {
        title: 'AIと一緒に目標を作る',
        description: 'いくつかの質問に答えるだけで、AIがあなたに合った目標を提案してくれる機能の使い方です。',
    },
    {
        title: '日々の進捗を記録する',
        description: '設定した目標の進捗率を更新する方法や、ステータスを変更する方法について説明します。',
    },
    {
        title: '効果的な振り返りのコツ',
        description: 'KPTフレームワークを最大限に活用し、次に繋がる「Try（試すこと）」を見つけるためのヒントを紹介します。',
    },
]; 