'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card/card';
import { Badge } from '../../../../components/ui/badge/badge';
import { Lightbulb, CheckCircle, Target } from 'lucide-react';
import { ActionableInsightData } from '../types';

interface ActionableInsightsProps {
  data: ActionableInsightData[];
}

export function ActionableInsights({ data }: ActionableInsightsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((insight) => (
        <Card key={insight.id} className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                <span>{insight.title}</span>
              </div>
              <div className="flex space-x-2">
                <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                  {insight.impact === 'high' ? '高インパクト' : 
                   insight.impact === 'medium' ? '中インパクト' : '低インパクト'}
                </Badge>
                <Badge variant="outline">
                  {insight.category === 'immediate' ? '即座' :
                   insight.category === 'short_term' ? '短期' : '長期'}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">{insight.description}</p>
              
              {/* 難易度 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">実行難易度:</span>
                <Badge variant={insight.difficulty === 'easy' ? 'secondary' : 'outline'}>
                  {insight.difficulty === 'easy' ? '簡単' :
                   insight.difficulty === 'medium' ? '普通' : '困難'}
                </Badge>
              </div>

              {/* 実行ステップ */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">実行ステップ:</h4>
                <ul className="space-y-1">
                  {insight.steps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 必要リソース */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">必要リソース:</h4>
                <div className="flex flex-wrap gap-1">
                  {insight.resources.map((resource, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 期待される成果 */}
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900 mb-1">期待される成果</h4>
                    <p className="text-sm text-green-700">{insight.expectedOutcome}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 