"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Button, Label } from "@/components/ui";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formObject, setFormObject] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/v1/oauth/google?provider=google`;
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      handleGoogleCallback(sessionId);
    }
  }, [searchParams]);

  const handleGoogleCallback = async (sessionId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/sessions/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Googleログインに失敗しました");
      }
    } catch (err) {
      setError("Googleログイン処理中にエラーが発生しました");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formObject),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "ログインに失敗しました");
      }
    } catch (err) {
      setError("ログイン処理中にエラーが発生しました");
    }
  };

  // formObjectの更新用
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ログイン
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email" className="sr-only">
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="メールアドレス"
                value={formObject.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                パスワード
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="パスワード"
                value={formObject.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4"
            >
              ログイン
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">または</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
              />
              Googleでログイン
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
