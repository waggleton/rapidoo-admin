// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user has a 'token' cookie
  const token = request.cookies.get('token')?.value;

  // Define the protected routes
  const protectedRoutes = ['/Dashboard', '/other-protected-route'];

  // If the user is not authenticated and tries to access a protected route, redirect to SignIn
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Allow the request to proceed if the token is present or the route is not protected
  return NextResponse.next();
}

// Define the routes where middleware should apply
export const config = {
  matcher: ['/Dashboard/:path*', '/other-protected-route/:path*'],
};