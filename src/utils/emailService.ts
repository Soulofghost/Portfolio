export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSendResult {
  success: boolean;
  message: string;
  delivered?: boolean;
  requiresDirectEmail?: boolean;
  mailtoUrl?: string;
  recipient?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactSendResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      return result;
    }

    return {
      success: false,
      message: result.message || 'Failed to dispatch message. Please email directly at alvinms394@gmail.com.',
      requiresDirectEmail: true,
      mailtoUrl: `mailto:alvinms394@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(data.message)}`,
    };
  } catch (error) {
    console.error('Contact email dispatch failed:', error);
    return {
      success: false,
      message: 'Network error communicating with contact service. Please email directly at alvinms394@gmail.com.',
      requiresDirectEmail: true,
      mailtoUrl: `mailto:alvinms394@gmail.com?subject=${encodeURIComponent(data.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(data.message)}`,
    };
  }
}
