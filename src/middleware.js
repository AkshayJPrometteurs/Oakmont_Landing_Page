import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicPaths = ['/login', '/signup', '/forget-password', '/reset-password'];
    const isPublicPath = publicPaths.some((publicPath) => path.startsWith(publicPath));
    const token = Cookies.get('_om_at');
    if (isPublicPath && token) { return NextResponse.redirect(new URL('/', request.url)); }
    if (!isPublicPath && !token) { return NextResponse.redirect(new URL('/login', request.url)); }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/manage-subscription',
        '/login',
        '/signup',
        '/forget-password',
        '/reset-password',
        '/manage-subscription/:path*',
        '/login/:path*',
        '/signup/:path*',
        '/forget-password/:path*',
        '/reset-password/:path*',
    ],
};
