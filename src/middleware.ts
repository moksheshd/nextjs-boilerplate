import { NextRequest, NextResponse } from 'next/server';
import logger from './lib/logger';

export function middleware(request: NextRequest) {
  const start = Date.now();
  const requestId = crypto.randomUUID();
  
  // Log the request
  logger.http(
    `[${requestId}] ${request.method} ${request.nextUrl.pathname} - Request received`
  );

  // Continue with the request
  const response = NextResponse.next();

  // Calculate duration
  const duration = Date.now() - start;
  
  // Log the response (note: this doesn't include actual response time, just middleware processing time)
  logger.http(
    `[${requestId}] ${request.method} ${request.nextUrl.pathname} - Request processed in ${duration}ms`
  );

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
