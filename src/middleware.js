
import { NextResponse } from 'next/server';
import getCookie from './utils/cookies/getCookie';

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/instagram/webhooks')) {
    return NextResponse.next();
  }
  const protectedRoutes = ['/dashboard','/api'];
  const currentPath = request.nextUrl.pathname;

  if(currentPath==='/api/user') return NextResponse.next()

  const isAuthenticated = await getCookie(request);




  if(currentPath==='/login' && isAuthenticated?.success) return NextResponse.redirect(new URL('/dashboard', request.url));
  if (protectedRoutes.some(route => currentPath.startsWith(route)) && !isAuthenticated?.success) return NextResponse.redirect(new URL('/login', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*','/login'],
};
