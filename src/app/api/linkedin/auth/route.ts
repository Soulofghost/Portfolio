import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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

  const state = Math.random().toString(36).substring(7);
  const scope = encodeURIComponent('openid profile email w_member_social');
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}&scope=${scope}`;

  return NextResponse.redirect(authUrl);
}

