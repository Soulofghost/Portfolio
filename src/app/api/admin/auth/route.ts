import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json({ authenticated: false, error: 'PIN is required' }, { status: 400 });
    }

    // Compare with server-side environment variable (default: alvin2026)
    const expectedPin = process.env.ADMIN_PIN || 'alvin2026';

    if (pin.trim() === expectedPin.trim()) {
      return NextResponse.json({ authenticated: true, message: 'Authentication successful' });
    }

    return NextResponse.json({ authenticated: false, error: 'Invalid administrator PIN' }, { status: 401 });
  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json({ authenticated: false, error: 'Server error during authentication' }, { status: 500 });
  }
}
