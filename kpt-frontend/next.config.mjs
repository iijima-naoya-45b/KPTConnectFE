/**
 * @file next.config.mjs
 * @description Next.js設定ファイル
 *
 * アプリケーションの基本設定、画像最適化設定、
 * 外部画像ホストの許可設定、APIプロキシ設定を管理します。
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },
            {
                protocol: 'https',
                hostname: 'gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'github.githubassets.com',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'www.gstatic.com',
                port: '',
                pathname: '/firebasejs/**',
            },
        ],
    },
    async rewrites() {
        // 開発環境では特定のAPIを除外
        if (process.env.NODE_ENV === 'development') {
            return [
                // 開発用APIエンドポイントは除外（カレンダーAPIのみ内部処理）
                {
                    source: '/api/v1/calendar/:path*',
                    destination: '/api/v1/calendar/:path*', // 内部で処理
                },
                // KPTセッションとアイテムAPIもRailsサーバーにプロキシ（認証が必要なため）
                // その他のAPIはRailsサーバーにプロキシ
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:3001/api/:path*',
                },
            ];
        }

        // 本番環境では全てRailsサーバーにプロキシ
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/api/:path*',
            },
        ];
    },
};

export default nextConfig;
