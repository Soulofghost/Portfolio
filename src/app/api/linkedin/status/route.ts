import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('linkedin_access_token');
  const hasCredentials = Boolean(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET);

  return NextResponse.json({
    configured: hasCredentials,
    authenticated: Boolean(token),
    profileUrl: 'https://www.linkedin.com/in/alvin-ms-b812a836b/',
    headline: 'Computer Science & AI Student | Java Developer | Full Stack Engineer | Founder @ NEXAURON & HELIX',
    mode: token ? 'authenticated_api' : 'web_share_intent',
  });
}
