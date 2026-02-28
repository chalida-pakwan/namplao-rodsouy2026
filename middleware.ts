import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect the secret office path
  // If the user tries to access any path starting with /office-888 (except login)
  if (path.startsWith('/office-888') && path !== '/office-888/login') {
    
    // Check for auth cookie
    const session = request.cookies.get('office_session');

    if (!session || session.value !== 'authenticated') {
      // Redirect to login page inside the office path
      const loginUrl = new URL('/office-888/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent users from guessing standard admin paths
  if (path.startsWith('/admin') || path === '/dashboard' || path === '/login') {
     return NextResponse.rewrite(new URL('/404', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'],
};


