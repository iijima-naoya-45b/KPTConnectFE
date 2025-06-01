/**
 * 学習ロードマップページ
 * 
 * @description KPTデータを基にAIが生成するパーソナライズされた学習計画
 * @features
 * - 個人の強み・弱みに基づく学習提案
 * - スキルマップ可視化
 * - 段階的学習計画
 * - 進捗トラッキング
 * @access プロプラン限定機能
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card/card';
import { Button } from '../../../components/ui/button/button';
import { Badge } from '../../../components/ui/badge/badge';
import { Progress } from '../../../components/ui/progress/progress';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Map,
  Brain,
  Trophy
} from 'lucide-react';

export default function LearningRoadmapPage() {
  const [loading, setLoading] = useState(false);

  const handleGenerateRoadmap = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-purple-500 mx-auto mb-4" />
          <p className="text-lg font-medium">ロードマップ作成中...</p>
          <p className="text-sm text-gray-500">あなた専用の学習計画を設計しています</p>
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
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Map className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">学習ロードマップ</h1>
              <p className="text-gray-600">AIがあなたの成長を加速する最適な学習計画を提案</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100">
            プロプラン限定
          </Badge>
        </div>
      </div>

      {/* プレースホルダーコンテンツ */}
      <Card className="text-center py-12">
        <CardContent>
          <Map className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">学習ロードマップを作成しましょう</h3>
          <p className="text-gray-600 mb-6">
            あなたのKPTデータを分析して、最適な学習計画をAIが提案します。
          </p>
          <Button 
            onClick={handleGenerateRoadmap}
            className="bg-gradient-to-r from-purple-500 to-pink-600"
          >
            <Brain className="h-4 w-4 mr-2" />
            ロードマップを作成
          </Button>
        </CardContent>
      </Card>

      {/* サンプル統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">学習ステップ</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-500">完了予定週</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-500">完了済み</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">75%</div>
                <div className="text-sm text-gray-500">進捗率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* プログレスバーのサンプル */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>学習進捗</CardTitle>
          <CardDescription>現在の学習状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>JavaScript基礎</span>
                <span>100%</span>
              </div>
              <Progress value={100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>React開発</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>TypeScript</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 