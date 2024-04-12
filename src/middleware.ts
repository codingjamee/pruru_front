import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;

  if (!currentUser && !request.nextUrl.pathname.startsWith('/welcome')) {
    return NextResponse.redirect(new URL('/welcome/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/add/:path*',
    '/food/:path*',
    '/home',
    '/receipt/:path*',
    '/searches/:path*',
    '/user/:path*',
  ],
};
