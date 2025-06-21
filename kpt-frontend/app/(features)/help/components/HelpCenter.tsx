'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs/tabs';
import { Button } from '@/components/ui/button/button';
import { Mail, MessageCircle, BookOpen, HelpCircle, Users, Shield, Edit, History, ChevronDown, ChevronUp } from 'lucide-react';

// シンプルなアコーディオンコンポーネント
const AccordionItem = ({ title, children, isOpen, onToggle }: { 
  title: React.ReactNode; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => (
  <div className="border rounded-lg mb-2">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
    >
      {title}
      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </button>
    {isOpen && (
      <div className="px-4 pb-4">
        {children}
      </div>
    )}
  </div>
);

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (value: string) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basics" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            KPTの基本
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            よくある質問
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            お問い合わせ
          </TabsTrigger>
        </TabsList>

        {/* KPTの基本 */}
        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                KPT（Keep, Problem, Try）の基本的な使い方
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">K</span>
                      </div>
                      Keep（継続すること）
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700">
                      うまくいっていること、続けたいことを記録します。成功体験や効果的な方法を残すことで、
                      次回も同じように良い結果を得ることができます。
                    </p>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">例：</p>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• 朝の30分読書が習慣化できた</li>
                        <li>• チームミーティングで意見が活発に出た</li>
                        <li>• 新しい作業手順が効率的だった</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold">P</span>
                      </div>
                      Problem（問題点）
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700">
                      改善が必要な点、課題を記録します。問題を明確にすることで、
                      解決策を考えるきっかけになります。
                    </p>
                    <div className="mt-4 p-3 bg-red-100 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">例：</p>
                      <ul className="text-sm text-red-700 mt-2 space-y-1">
                        <li>• 会議が長すぎて時間を無駄にした</li>
                        <li>• タスクの優先順位が曖昧だった</li>
                        <li>• コミュニケーションが不足していた</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">T</span>
                      </div>
                      Try（試してみること）
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-700">
                      次回試してみたい改善策を記録します。具体的で実行可能な
                      アクションを設定することで、継続的な改善が可能になります。
                    </p>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">例：</p>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• 会議時間を30分に制限する</li>
                        <li>• 朝の最初の1時間は集中作業に充てる</li>
                        <li>• 週1回の振り返りミーティングを設定する</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>KPTの効果的な活用方法</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">定期的な振り返り</h4>
                      <p className="text-sm text-gray-600">
                        週次や月次で定期的にKPTを振り返ることで、継続的な改善が可能になります。
                        過去の記録を参考に、新しいTryを考えてみましょう。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">チームでの共有</h4>
                      <p className="text-sm text-gray-600">
                        チームメンバーとKPTを共有することで、お互いの良い実践や
                        課題解決のアイデアを得ることができます。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* よくある質問 */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                よくある質問（FAQ）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <AccordionItem
                  title={
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      KPTの記録は誰でも見られますか？
                    </div>
                  }
                  isOpen={openAccordion === 'privacy'}
                  onToggle={() => toggleAccordion('privacy')}
                >
                  <div className="space-y-2">
                    <p>デフォルトではプライベートに設定されています。必要に応じて共有設定を変更できます。</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>プライベート設定：</strong>自分だけが閲覧・編集可能
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>チーム共有：</strong>チームメンバー全員が閲覧可能
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>公開設定：</strong>組織全体で閲覧可能
                      </p>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title={
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      過去のKPT記録は編集できますか？
                    </div>
                  }
                  isOpen={openAccordion === 'edit'}
                  onToggle={() => toggleAccordion('edit')}
                >
                  <div className="space-y-2">
                    <p>はい、過去の記録も編集可能です。ただし、編集履歴は保持されます。</p>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>編集履歴の確認方法：</strong>
                      </p>
                      <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                        <li>• 記録の詳細画面で「編集履歴」ボタンをクリック</li>
                        <li>• いつ、誰が、どの部分を変更したかが表示されます</li>
                        <li>• 過去のバージョンに戻すことも可能です</li>
                      </ul>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title={
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      AIによる目標提案機能はどのように使いますか？
                    </div>
                  }
                  isOpen={openAccordion === 'ai'}
                  onToggle={() => toggleAccordion('ai')}
                >
                  <div className="space-y-2">
                    <p>AIがあなたの過去のKPT記録を分析し、新しい目標や改善案を提案します。</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>使用方法：</strong>
                      </p>
                      <ol className="text-sm text-green-800 mt-2 space-y-1">
                        <li>1. ダッシュボードで「AI目標提案」ボタンをクリック</li>
                        <li>2. AIが分析した結果と提案が表示されます</li>
                        <li>3. 気に入った提案があれば「採用」ボタンで保存</li>
                        <li>4. 必要に応じて内容を編集してから保存</li>
                      </ol>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title={
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      KPTの記録をエクスポートできますか？
                    </div>
                  }
                  isOpen={openAccordion === 'export'}
                  onToggle={() => toggleAccordion('export')}
                >
                  <div className="space-y-2">
                    <p>はい、CSV形式でエクスポートが可能です。レポート機能から期間を指定してダウンロードできます。</p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-purple-800">
                        <strong>エクスポート手順：</strong>
                      </p>
                      <ol className="text-sm text-purple-800 mt-2 space-y-1">
                        <li>1. レポートページに移動</li>
                        <li>2. エクスポートしたい期間を選択</li>
                        <li>3. 「CSVエクスポート」ボタンをクリック</li>
                        <li>4. ファイルが自動的にダウンロードされます</li>
                      </ol>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title={
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      チームでのKPT共有はどのように設定しますか？
                    </div>
                  }
                  isOpen={openAccordion === 'team'}
                  onToggle={() => toggleAccordion('team')}
                >
                  <div className="space-y-2">
                    <p>チームメンバーを招待して、KPT記録を共有できます。</p>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-sm text-indigo-800">
                        <strong>チーム設定手順：</strong>
                      </p>
                      <ol className="text-sm text-indigo-800 mt-2 space-y-1">
                        <li>1. 設定ページで「チーム管理」を選択</li>
                        <li>2. 「メンバーを招待」ボタンをクリック</li>
                        <li>3. 招待したいメンバーのメールアドレスを入力</li>
                        <li>4. 招待メールが送信され、承認後に共有開始</li>
                      </ol>
                    </div>
                  </div>
                </AccordionItem>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* お問い合わせ */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                お問い合わせ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">サポートが必要ですか？</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  問題が解決しない場合や、ご質問がございましたら、お気軽にお問い合わせください。
                  24時間以内に回答いたします。
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      メールでのお問い合わせ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      詳細な質問や技術的な問題については、メールでのお問い合わせをお勧めします。
                    </p>
                    <Button className="w-full" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      お問い合わせフォームへ
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      チャットサポート
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      簡単な質問や操作方法について、リアルタイムでチャットサポートをご利用いただけます。
                    </p>
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      チャットを開始
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle>よくあるお問い合わせ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">アカウントの設定変更について</p>
                        <p className="text-sm text-gray-600">設定ページから各種設定を変更できます。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">データのバックアップについて</p>
                        <p className="text-sm text-gray-600">自動的にクラウドにバックアップされています。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">プライバシーとセキュリティについて</p>
                        <p className="text-sm text-gray-600">SSL暗号化により、データは安全に保護されています。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenter;
