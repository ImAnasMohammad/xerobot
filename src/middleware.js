
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import getCookie from './utils/cookies/getCookie';

const SECRET_KEY = process.env.NEXT_JWT_SECRECT || 'KEN%j7387jN9BKDHD^2Mfjsofsudf';

export async function middleware(request) {
  const protectedRoutes = ['/dashboard','/api'];
  const currentPath = request.nextUrl.pathname;

  if(currentPath==='/api/google/auth/callback') return NextResponse.next()

  const isAuthenticated = await getCookie(request);



  if(currentPath==='/login' && isAuthenticated?.success) return NextResponse.redirect(new URL('/dashboard', request.url));
  if (protectedRoutes.some(route => currentPath.startsWith(route)) && !isAuthenticated?.success) return NextResponse.redirect(new URL('/login', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*','/login'],
};
