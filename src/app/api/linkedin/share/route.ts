import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { title, text, url } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Post content is required.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('linkedin_access_token');

    // If authenticated via official LinkedIn OAuth token
    if (tokenCookie?.value) {
      // 1. Get user URN via userinfo
      const userinfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
      });

      if (!userinfoRes.ok) {
        return NextResponse.json(
          { error: 'Session expired. Please reconnect LinkedIn or use 1-click Web Share.' },
          { status: 401 }
        );
      }

      const userinfo = await userinfoRes.json();
      const personUrn = `urn:li:person:${userinfo.sub}`;

      // 2. Publish UGC Post via official LinkedIn REST API
      const postPayload: any = {
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text },
            shareMediaCategory: url ? 'ARTICLE' : 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      if (url) {
        postPayload.specificContent['com.linkedin.ugc.ShareContent'].media = [
          {
            status: 'READY',
            originalUrl: url,
            title: { text: title || 'Alvin MS Portfolio Project' },
          },
        ];
      }

      const publishRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postPayload),
      });

      if (!publishRes.ok) {
        const errData = await publishRes.text();
        console.error('LinkedIn publication error:', errData);
        return NextResponse.json(
          {
            error: 'Failed to publish via LinkedIn API (w_member_social scope may be restricted by LinkedIn approval). Please use 1-click Web Share.',
          },
          { status: 502 }
        );
      }

      const result = await publishRes.json();
      return NextResponse.json({ success: true, postUrn: result.id });
    }

    // Default mode: return web share intent URL
    const webShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    return NextResponse.json({
      success: true,
      mode: 'web_share_intent',
      webShareUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

