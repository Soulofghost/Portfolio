import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${new URL(request.url).origin}/?linkedin_auth=failed#projects`);
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${new URL(request.url).origin}/api/linkedin/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${new URL(request.url).origin}/?linkedin_auth=missing_credentials#projects`);
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
      return NextResponse.redirect(`${new URL(request.url).origin}/?linkedin_auth=exchange_error#projects`);
    }

    const tokenData = await tokenRes.json();
    const response = NextResponse.redirect(`${new URL(request.url).origin}/?linkedin_auth=success#projects`);

    // Set secure HTTP-only cookie with access token
    response.cookies.set('linkedin_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in || 5184000, // 60 days
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('LinkedIn callback error:', err);
    return NextResponse.redirect(`${new URL(request.url).origin}/?linkedin_auth=server_error#projects`);
  }
}

