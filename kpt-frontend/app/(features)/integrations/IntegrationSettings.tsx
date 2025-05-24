/**
 * @file IntegrationSettings.tsx
 * @description 外部サービスとの連携設定を管理するコンポーネント
 *
 * @example
 * ```tsx
 * <IntegrationSettings />
 * ```
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface IntegrationSettings {
  projectManagement: {
    enabled: boolean;
    service: "jira" | "trello" | "asana" | null;
    apiKey: string;
    projectId: string;
  };
  chat: {
    enabled: boolean;
    service: "slack" | "discord" | "teams" | null;
    webhookUrl: string;
    channel: string;
  };
  calendar: {
    enabled: boolean;
    service: "google" | "outlook" | null;
    apiKey: string;
    calendarId: string;
  };
}

const IntegrationSettings: React.FC = () => {
  const [settings, setSettings] = useState<IntegrationSettings>({
    projectManagement: {
      enabled: false,
      service: null,
      apiKey: "",
      projectId: "",
    },
    chat: {
      enabled: false,
      service: null,
      webhookUrl: "",
      channel: "",
    },
    calendar: {
      enabled: false,
      service: null,
      apiKey: "",
      calendarId: "",
    },
  });

  const handleServiceToggle = (
    service: keyof IntegrationSettings,
    enabled: boolean
  ) => {
    setSettings({
      ...settings,
      [service]: {
        ...settings[service],
        enabled,
      },
    });
  };

  const handleServiceSelect = (
    service: keyof IntegrationSettings,
    selectedService: string
  ) => {
    setSettings({
      ...settings,
      [service]: {
        ...settings[service],
        service: selectedService as any,
      },
    });
  };

  const handleApiKeyChange = (
    service: keyof IntegrationSettings,
    apiKey: string
  ) => {
    setSettings({
      ...settings,
      [service]: {
        ...settings[service],
        apiKey,
      },
    });
  };

  const handleProjectIdChange = (projectId: string) => {
    setSettings({
      ...settings,
      projectManagement: {
        ...settings.projectManagement,
        projectId,
      },
    });
  };

  const handleWebhookUrlChange = (webhookUrl: string) => {
    setSettings({
      ...settings,
      chat: {
        ...settings.chat,
        webhookUrl,
      },
    });
  };

  const handleChannelChange = (channel: string) => {
    setSettings({
      ...settings,
      chat: {
        ...settings.chat,
        channel,
      },
    });
  };

  const handleCalendarIdChange = (calendarId: string) => {
    setSettings({
      ...settings,
      calendar: {
        ...settings.calendar,
        calendarId,
      },
    });
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">外部連携設定</h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-900"
          >
            ダッシュボードに戻る
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          {/* プロジェクト管理ツール連携 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              プロジェクト管理ツール
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="project-management-toggle"
                    className="text-sm font-medium text-gray-700"
                  >
                    プロジェクト管理ツール連携を有効にする
                  </label>
                  <p className="text-sm text-gray-500">
                    KPTとプロジェクト管理ツールを連携します
                  </p>
                </div>
                <Button
                  type="button"
                  className={`${
                    settings.projectManagement.enabled
                      ? "bg-indigo-600"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role="switch"
                  aria-checked={settings.projectManagement.enabled}
                  onClick={() =>
                    handleServiceToggle(
                      "projectManagement",
                      !settings.projectManagement.enabled
                    )
                  }
                >
                  <span
                    className={`${
                      settings.projectManagement.enabled
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        settings.projectManagement.enabled
                          ? "opacity-0 duration-100 ease-out"
                          : "opacity-100 duration-200 ease-in"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        settings.projectManagement.enabled
                          ? "opacity-100 duration-200 ease-in"
                          : "opacity-0 duration-100 ease-out"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>

              {settings.projectManagement.enabled && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="project-management"
                      className="block text-sm font-medium text-gray-700"
                    >
                      プロジェクト管理ツール
                    </label>
                    <select
                      id="project-management"
                      value={settings.projectManagement.service || ""}
                      onChange={(e) =>
                        handleServiceSelect("projectManagement", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">選択してください</option>
                      <option value="jira">Jira</option>
                      <option value="trello">Trello</option>
                      <option value="asana">Asana</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="project-management-api-key"
                      className="block text-sm font-medium text-gray-700"
                    >
                      APIキー
                    </label>
                    <input
                      type="password"
                      id="project-management-api-key"
                      value={settings.projectManagement.apiKey}
                      onChange={(e) =>
                        handleApiKeyChange("projectManagement", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="APIキーを入力"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* チャットツール連携 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              チャットツール
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="chat-toggle"
                    className="text-sm font-medium text-gray-700"
                  >
                    チャットツール連携を有効にする
                  </label>
                  <p className="text-sm text-gray-500">
                    KPTとチャットツールを連携します
                  </p>
                </div>
                <Button
                  type="button"
                  className={`${
                    settings.chat.enabled ? "bg-indigo-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role="switch"
                  aria-checked={settings.chat.enabled}
                  onClick={() =>
                    handleServiceToggle("chat", !settings.chat.enabled)
                  }
                >
                  <span
                    className={`${
                      settings.chat.enabled ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        settings.chat.enabled
                          ? "opacity-0 duration-100 ease-out"
                          : "opacity-100 duration-200 ease-in"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        settings.chat.enabled
                          ? "opacity-100 duration-200 ease-in"
                          : "opacity-0 duration-100 ease-out"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>

              {settings.chat.enabled && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="chat"
                      className="block text-sm font-medium text-gray-700"
                    >
                      チャットツール
                    </label>
                    <select
                      id="chat"
                      value={settings.chat.service || ""}
                      onChange={(e) =>
                        handleServiceSelect("chat", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">選択してください</option>
                      <option value="slack">Slack</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="discord">Discord</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="chat-api-key"
                      className="block text-sm font-medium text-gray-700"
                    >
                      APIキー
                    </label>
                    <input
                      type="password"
                      id="chat-api-key"
                      value={settings.chat.webhookUrl}
                      onChange={(e) => handleWebhookUrlChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="APIキーを入力"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* カレンダーツール連携 */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              カレンダーツール
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="calendar-toggle"
                    className="text-sm font-medium text-gray-700"
                  >
                    カレンダーツール連携を有効にする
                  </label>
                  <p className="text-sm text-gray-500">
                    KPTとカレンダーツールを連携します
                  </p>
                </div>
                <Button
                  type="button"
                  className={`${
                    settings.calendar.enabled ? "bg-indigo-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role="switch"
                  aria-checked={settings.calendar.enabled}
                  onClick={() =>
                    handleServiceToggle("calendar", !settings.calendar.enabled)
                  }
                >
                  <span
                    className={`${
                      settings.calendar.enabled
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        settings.calendar.enabled
                          ? "opacity-0 duration-100 ease-out"
                          : "opacity-100 duration-200 ease-in"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 12 12"
                      >
                        <path
                          d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        settings.calendar.enabled
                          ? "opacity-100 duration-200 ease-in"
                          : "opacity-0 duration-100 ease-out"
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden="true"
                    >
                      <svg
                        className="h-3 w-3 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>

              {settings.calendar.enabled && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="calendar"
                      className="block text-sm font-medium text-gray-700"
                    >
                      カレンダーツール
                    </label>
                    <select
                      id="calendar"
                      value={settings.calendar.service || ""}
                      onChange={(e) =>
                        handleServiceSelect("calendar", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">選択してください</option>
                      <option value="google">Google Calendar</option>
                      <option value="outlook">Microsoft Outlook</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="calendar-api-key"
                      className="block text-sm font-medium text-gray-700"
                    >
                      APIキー
                    </label>
                    <input
                      type="password"
                      id="calendar-api-key"
                      value={settings.calendar.apiKey}
                      onChange={(e) =>
                        handleApiKeyChange("calendar", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="APIキーを入力"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;
