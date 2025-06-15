
export interface Step {
    title: string;
    description: string;
}

export const onboardingSteps: Step[] = [
    {
        title: 'ようこそ',
        description: 'サービスへようこそ！最初のステップです。',
    },
    {
        title: 'プロフィール設定',
        description: 'プロフィール情報を入力してください。',
    },
    {
        title: '通知設定',
        description: '通知の設定をしましょう。',
    },
    {
        title: '完了',
        description: 'これで準備完了です！',
    },
];
