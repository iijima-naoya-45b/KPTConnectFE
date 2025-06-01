/**
 * AI分析レポートページ
 * 
 * @description KPTデータを元にAIが生成する詳細な分析レポートを表示
 * @features
 * - 強み・改善点の自動分析
 * - 感情トレンド分析
 * - パフォーマンス向上提案
 * - 詳細なインサイト表示
 * @access プロプラン限定機能
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Button } from '../../../components/ui/button/button';
import { Badge } from '../../../components/ui/badge/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  AlertCircle, 
  Star,
  BarChart3,
  Calendar,
  Download,
  Sparkles
} from 'lucide-react';
import { AnalysisChart } from './components/AnalysisChart';
import { StrengthsAnalysis } from './components/StrengthsAnalysis';
import { ImprovementAreas } from './components/ImprovementAreas';
import { EmotionTrends } from './components/EmotionTrends';
import { ActionableInsights } from './components/ActionableInsights';
import { useAIAnalysis } from './hooks/useAIAnalysis';

export default function AIInsightsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { 
    analysisData, 
    loading, 
    error,
    generateNewAnalysis,
    downloadReport 
  } = useAIAnalysis(selectedPeriod);

  const handleGenerateAnalysis = async () => {
    setIsGenerating(true);
    try {
      await generateNewAnalysis();
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-blue-500 mx-auto mb-4" />
          <p className="text-lg font-medium">AI分析中...</p>
          <p className="text-sm text-gray-500">KPTデータを分析しています</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI分析レポート</h1>
              <p className="text-gray-600">AIがあなたのKPTデータから導く深いインサイト</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100">
            プロプラン限定
          </Badge>
        </div>

        {/* 期間選択と操作ボタン */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">分析期間:</span>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="7d">過去7日間</option>
              <option value="30d">過去30日間</option>
              <option value="90d">過去90日間</option>
              <option value="1y">過去1年間</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleGenerateAnalysis}
              disabled={isGenerating}
              variant="outline"
              size="sm"
            >
              <Brain className="h-4 w-4 mr-2" />
              {isGenerating ? '分析中...' : '新しい分析を実行'}
            </Button>
            <Button
              onClick={downloadReport}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              レポートダウンロード
            </Button>
          </div>
        </div>
      </div>

      {/* エラー表示 */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 分析結果がない場合 */}
      {!analysisData && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">分析データがありません</h3>
            <p className="text-gray-600 mb-6">
              KPTデータが蓄積されると、AIによる詳細な分析レポートが利用できます。
            </p>
            <Button onClick={handleGenerateAnalysis}>
              <Brain className="h-4 w-4 mr-2" />
              初回分析を実行
            </Button>
          </CardContent>
        </Card>
      )}

      {/* メイン分析コンテンツ */}
      {analysisData && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>概要</span>
            </TabsTrigger>
            <TabsTrigger value="strengths" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>強み分析</span>
            </TabsTrigger>
            <TabsTrigger value="improvements" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>改善点</span>
            </TabsTrigger>
            <TabsTrigger value="emotions" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>感情トレンド</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>提案</span>
            </TabsTrigger>
          </TabsList>

          {/* 概要タブ */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalysisChart data={analysisData.overview} />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>AI分析サマリー</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">全体的な傾向</h4>
                      <p className="text-sm text-blue-700">{analysisData.summary.trend}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">注目すべきポイント</h4>
                      <p className="text-sm text-green-700">{analysisData.summary.highlights}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-2">改善の機会</h4>
                      <p className="text-sm text-orange-700">{analysisData.summary.opportunities}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 強み分析タブ */}
          <TabsContent value="strengths">
            <StrengthsAnalysis data={analysisData.strengths} />
          </TabsContent>

          {/* 改善点タブ */}
          <TabsContent value="improvements">
            <ImprovementAreas data={analysisData.improvements} />
          </TabsContent>

          {/* 感情トレンドタブ */}
          <TabsContent value="emotions">
            <EmotionTrends data={analysisData.emotions} />
          </TabsContent>

          {/* 提案タブ */}
          <TabsContent value="insights">
            <ActionableInsights data={analysisData.insights} />
          </TabsContent>
        </Tabs>
      )}

      {/* 最終更新時刻 */}
      {analysisData && (
        <div className="mt-8 text-center text-sm text-gray-500">
          最終分析実行: {new Date(analysisData.lastUpdated).toLocaleString('ja-JP')}
        </div>
      )}
    </div>
  );
} 