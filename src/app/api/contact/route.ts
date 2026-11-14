import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide a valid name (at least 2 characters).' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ success: false, message: 'Please provide a message with at least 5 characters.' }, { status: 400 });
    }

    const recipient = 'alvinms394@gmail.com';
    const emailSubject = subject?.trim() || `Portfolio Contact from ${name.trim()}`;
    const emailBody = `From: ${name.trim()} (${email.trim()})\n\nMessage:\n${message.trim()}`;

    // 2. Check for configured server mail transport (e.g. Resend, SendGrid, SMTP)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipient,
          reply_to: email.trim(),
          subject: emailSubject,
          text: emailBody,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({
          success: true,
          delivered: true,
          message: `Thank you ${name.trim()}! Your message has been successfully delivered to Alvin MS. Alvin will reply to ${email.trim()} shortly.`,
        });
      }
    }

    // 3. Fallback when SMTP / Resend API key is not configured in server environment variables
    // In accordance with zero-fake-metrics / genuine communication standards:
    // We return an honest status and an encoded mailto URL so the visitor can launch their email client immediately
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      delivered: false,
      requiresDirectEmail: true,
      mailtoUrl,
      recipient,
      message: `Message drafted for Alvin MS (${recipient}). Please click "Open in Mail Client" or send directly to ${recipient}.`,
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected server error occurred. Please contact Alvin MS directly at alvinms394@gmail.com.',
      },
      { status: 500 }
    );
  }
}
