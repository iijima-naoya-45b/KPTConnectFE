import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);

    const jwt = request.cookies.get('jwt');

    // Skip authentication for the root path
    if (url.pathname === '/' || url.pathname === '/dashboard' || url.pathname === '/onboarding' || url.pathname === '/pricing') {
        return NextResponse.next();
    }


    if (!jwt || !jwt.value) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Cookie: `jwt=${encodeURIComponent(jwt.value)}`
            },
        });

        if (!response.ok) {
            console.log('Failed to authenticate, response not ok');
            throw new Error('Failed to authenticate');
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!^$|api|_next/static|_next/image|favicon/.*|help|terms|privacy|login|images/.*).*)",
    ],
}; 