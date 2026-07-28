import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Get the hostname from the request (e.g., hoteldivineview.com, localhost:3000)
  const hostname = req.headers.get('host') || '';

  // Prevent routing loops if the path already starts with the target directory
  if (url.pathname.startsWith('/divine-view') || url.pathname.startsWith('/ambarish') || url.pathname.startsWith('/api') || url.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // 1. Route for Hotel Divine View
  // Handles both www.hoteldivineview.com and hoteldivineview.com
  if (hostname.includes('hoteldivineview.com')) {
    url.pathname = `/divine-view${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Future-proofing: Route for Hotel Ambarish
  if (hostname.includes('hotelambarish.com')) {
    url.pathname = `/ambarish${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Default: proceed as normal (shows the portal page)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
