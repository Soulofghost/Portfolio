import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI || `${new URL(request.url).origin}/api/linkedin/callback`;
  const clientId = process.env.LINKEDIN_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      {
        error: 'LinkedIn Client ID not configured',
        instructions:
          'To enable official LinkedIn API publishing, configure LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, and LINKEDIN_REDIRECT_URI in your environment variables. You can still use the 1-click Web Share feature without API keys.',
      },
      { status: 400 }
    );
  }

  // Cryptographically secure CSRF state token
  const state = crypto.randomUUID();
  const scope = encodeURIComponent('openid profile email w_member_social');
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}&scope=${scope}`;

  const response = NextResponse.redirect(authUrl);

  // Store state in a short-lived HTTP-only cookie for CSRF validation during callback
  response.cookies.set('linkedin_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300, // 5 minutes
    path: '/',
  });

  return response;
}
