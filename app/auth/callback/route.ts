import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log('Auth callback received code:', code)

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Session exchange result:', { data, error })
      
      if (error) throw error
    } catch (error) {
      console.error('Auth callback error:', error)
      return new NextResponse('Auth error', { status: 400 })
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin))
} 