import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);

    // Skip authentication for the root path
    if (url.pathname === '/' || url.pathname === '/dashboard' || url.pathname === '/onboarding' || url.pathname === '/pricing') {
        return NextResponse.next();
    }

    const jwt = request.cookies.get('jwt');

    if (!jwt) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log('Failed to authenticate, response not ok');
            throw new Error('Failed to authenticate');
        }
    } catch (error) {
        console.error('Middleware: Authentication failed', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!^$|api|_next/static|_next/image|favicon/.*|help|terms|privacy|login|images/.*).*)",
    ],
}; 