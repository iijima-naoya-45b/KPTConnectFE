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
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/v1/calendar/:path*',
                    destination: '/api/v1/calendar/:path*',
                },
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:3001/api/:path*',
                },
            ];
        }
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/api/:path*',
            },
        ];
    },
};

export default nextConfig;
