/**
 * 改善点分析コンポーネント
 * 
 * @description AI分析による改善点分析結果を表示
 * @param data 改善点分析データ
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card/card';
import { Badge } from '../../../../components/ui/badge/badge';
import { Target, CheckCircle, ArrowRight } from 'lucide-react';
import { ImprovementData } from '../types';

interface ImprovementAreasProps {
  data: ImprovementData[];
}

export function ImprovementAreas({ data }: ImprovementAreasProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((improvement) => (
        <Card key={improvement.id} className="border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-orange-600" />
                <span>{improvement.title}</span>
              </div>
              <Badge variant={improvement.priority === 'high' ? 'destructive' : 'secondary'}>
                {improvement.priority === 'high' ? '高優先度' : 
                 improvement.priority === 'medium' ? '中優先度' : '低優先度'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">{improvement.description}</p>
              
              {/* 現在の状態と目標状態 */}
              <div className="space-y-2">
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-900 mb-1">現在の状態</h4>
                  <p className="text-sm text-red-700">{improvement.currentState}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900 mb-1">目標状態</h4>
                  <p className="text-sm text-green-700">{improvement.targetState}</p>
                </div>
              </div>

              {/* カテゴリー */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">カテゴリー:</span>
                <Badge variant="outline">
                  {improvement.category === 'process' ? 'プロセス' :
                   improvement.category === 'communication' ? 'コミュニケーション' :
                   improvement.category === 'technical' ? '技術' : 'コラボレーション'}
                </Badge>
              </div>

              {/* アクションアイテム */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">改善アクション:</h4>
                <ul className="space-y-1">
                  {improvement.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* タイムライン */}
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">目標期間:</span>
                <span className="font-medium">{improvement.timeline}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 