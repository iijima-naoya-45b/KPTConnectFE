/**
 * 強み分析コンポーネント
 * 
 * @description AI分析による強み分析結果を表示
 * @param data 強み分析データ
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card/card';
import { Badge } from '../../../../components/ui/badge/badge';
import { Star, TrendingUp, CheckCircle } from 'lucide-react';
import { StrengthData } from '../types';

interface StrengthsAnalysisProps {
  data: StrengthData[];
}

export function StrengthsAnalysis({ data }: StrengthsAnalysisProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((strength) => (
        <Card key={strength.id} className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-green-600" />
                <span>{strength.title}</span>
              </div>
              <Badge variant={strength.impact === 'high' ? 'default' : 'secondary'}>
                {strength.impact === 'high' ? '高インパクト' : 
                 strength.impact === 'medium' ? '中インパクト' : '低インパクト'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">{strength.description}</p>
              
              {/* 信頼度 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">信頼度:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-green-500 h-2 rounded-full w-[${strength.confidence * 100}%]`}
                  ></div>
                </div>
                <span className="text-sm font-medium">{Math.round(strength.confidence * 100)}%</span>
              </div>

              {/* カテゴリー */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">カテゴリー:</span>
                <Badge variant="outline">
                  {strength.category === 'skill' ? 'スキル' :
                   strength.category === 'behavior' ? '行動' :
                   strength.category === 'mindset' ? 'マインドセット' : 'プロセス'}
                </Badge>
              </div>

              {/* エビデンス */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">根拠となるデータ:</h4>
                <ul className="space-y-1">
                  {strength.evidence.map((evidence, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 推奨アクション */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">次のステップ:</h4>
                <ul className="space-y-1">
                  {strength.suggestedActions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-green-700">
                      <TrendingUp className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 