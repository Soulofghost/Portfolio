import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  const origin = new URL(request.url).origin;

  if (error || !code) {
    return NextResponse.redirect(`${origin}/?linkedin_auth=failed#projects`);
  }

  // 1. Validate CSRF OAuth State
  const cookieStore = await cookies();
  const storedState = cookieStore.get('linkedin_oauth_state')?.value;

  if (!state || !storedState || state !== storedState) {
    console.error('LinkedIn OAuth CSRF State Mismatch');
    const errRes = NextResponse.redirect(`${origin}/?linkedin_auth=csrf_state_mismatch#projects`);
    errRes.cookies.delete('linkedin_oauth_state');
    return errRes;
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${origin}/api/linkedin/callback`;

  if (!clientId || !clientSecret) {
    const credRes = NextResponse.redirect(`${origin}/?linkedin_auth=missing_credentials#projects`);
    credRes.cookies.delete('linkedin_oauth_state');
    return credRes;
  }

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const exchangeRes = NextResponse.redirect(`${origin}/?linkedin_auth=exchange_error#projects`);
      exchangeRes.cookies.delete('linkedin_oauth_state');
      return exchangeRes;
    }

    const tokenData = await tokenRes.json();
    const response = NextResponse.redirect(`${origin}/?linkedin_auth=success#projects`);

    // Set secure HTTP-only cookie with access token
    response.cookies.set('linkedin_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in || 5184000, // 60 days
      path: '/',
    });

    // Delete temporary state cookie
    response.cookies.delete('linkedin_oauth_state');

    return response;
  } catch (err) {
    console.error('LinkedIn callback error:', err);
    const serverErrRes = NextResponse.redirect(`${origin}/?linkedin_auth=server_error#projects`);
    serverErrRes.cookies.delete('linkedin_oauth_state');
    return serverErrRes;
  }
}
