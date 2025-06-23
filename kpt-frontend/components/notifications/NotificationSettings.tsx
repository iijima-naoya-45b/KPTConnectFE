'use client';

import { useEffect, useState, useCallback } from 'react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/toast';
import { Label } from '@radix-ui/react-label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui';

// 型定義
interface UserSettings {
  slack_notification_enabled: boolean;
  slack_webhook_url?: string;
}

interface ApiResponse {
  data: UserSettings;
}

const apiClient = {
  get: async (url: string): Promise<ApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { data };
  },
  put: async (url: string, body: unknown): Promise<ApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { data };
  },
};

/**
 * 通知設定コンポーネント
 */
export const NotificationSettings: React.FC = () => {
  const [isSlackEnabled, setIsSlackEnabled] = useState(false);
  const [slackWebhookUrl, setSlackWebhookUrl] = useState('');
  const [initialSlackWebhookUrl, setInitialSlackWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  const fetchUserSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/me');
      if (response.data) {
        setIsSlackEnabled(response.data.slack_notification_enabled);
        setSlackWebhookUrl(response.data.slack_webhook_url || '');
        setInitialSlackWebhookUrl(response.data.slack_webhook_url || '');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '設定の読み込みに失敗しました。';
      addToast({
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const handleSlackToggle = async (checked: boolean) => {
    if (!checked) {
      try {
        await apiClient.put('/me', {
          user: {
            slack_notification_enabled: false,
            slack_webhook_url: '',
          },
        });
        setIsSlackEnabled(false);
        setSlackWebhookUrl('');
        setInitialSlackWebhookUrl('');
        addToast({
          message: 'Slack通知を無効にしました。',
          type: 'success',
        });
      } catch (error) {
        addToast({
          message: '設定の更新に失敗しました。',
          type: 'error',
        });
      }
    } else {
      setIsSlackEnabled(true);
    }
  };

  const handleSaveWebhookUrl = async () => {
    try {
      await apiClient.put('/me', {
        user: {
          slack_notification_enabled: true,
          slack_webhook_url: slackWebhookUrl,
        },
      });
      setInitialSlackWebhookUrl(slackWebhookUrl);
      addToast({
        message: 'Slack Webhook URLを保存しました。',
        type: 'success',
      });
    } catch (error) {
      addToast({
        message: 'URLの保存に失敗しました。',
        type: 'error',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>通知チャンネル設定</CardTitle>
        <CardDescription>
          どのチャネルで通知を受け取るかを選択します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="slack-notifications" className="text-base font-medium">
              Slack通知
            </Label>
            <p className="text-sm text-muted-foreground">
              KPTを作成した際にSlackへ通知を送信します。
            </p>
          </div>
          <div>
            {isLoading ? (
              <div className="h-5 w-9 rounded-full bg-gray-200 animate-pulse" />
            ) : (
              <Switch
                id="slack-notifications"
                checked={isSlackEnabled}
                onCheckedChange={handleSlackToggle}
                aria-label="Slack通知の切り替え"
              />
            )}
          </div>
        </div>

        {isSlackEnabled && (
          <div className="p-4 border-t space-y-4">
            <div>
              <Label htmlFor="slack-webhook-url" className="text-base font-medium">
                Slack Webhook URL
              </Label>
              <p className="text-sm text-muted-foreground mt-1 mb-2">
                通知を送信したいSlackチャンネルのIncoming Webhook URLを入力してください。
                <a
                  href="https://api.slack.com/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  URLの取得方法はこちら
                </a>
              </p>
              <input
                id="slack-webhook-url"
                type="text"
                value={slackWebhookUrl}
                onChange={(e) => setSlackWebhookUrl(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSlackWebhookUrl(initialSlackWebhookUrl)}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveWebhookUrl}
                disabled={slackWebhookUrl === initialSlackWebhookUrl}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                保存
              </button>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default NotificationSettings; 