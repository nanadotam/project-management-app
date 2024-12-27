import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth condition redirects
  if (!session && !req.nextUrl.pathname.startsWith('/auth') && 
      !req.nextUrl.pathname.startsWith('/login') && 
      !req.nextUrl.pathname.startsWith('/signup')) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (session && (
    req.nextUrl.pathname.startsWith('/login') || 
    req.nextUrl.pathname.startsWith('/signup')
  )) {
    const redirectUrl = new URL('/', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 