import type { Metadata, Viewport } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://alvin-ms-portfolio.alvinms394.workers.dev'),
  title: 'Alvin MS | Computer Science & AI Student, Java & Full Stack Engineer',
  description:
    'Official engineering portfolio of Alvin MS — Computer Science & Artificial Intelligence student, Java Spring Boot developer, Full Stack engineer, and Founder @ NEXAURON & HELIX based in Trivandrum, Kerala, India. Building intelligent distributed platforms and automated systems.',
  keywords: [
    'Alvin MS',
    'Alvin MS Portfolio',
    'Computer Science Student',
    'Artificial Intelligence Engineer',
    'Java Developer',
    'Spring Boot Developer',
    'Full Stack Developer',
    'SENTRIX Platform',
    'Trivandrum Kerala Developer',
    'Next.js Portfolio',
    'Soulofghost'
  ],
  authors: [{ name: 'Alvin MS', url: 'https://github.com/Soulofghost' }],
  openGraph: {
    title: 'Alvin MS | Computer Science & AI Student | Systems Engineer',
    description: 'Building High-Reliability Software, AI Solutions, and Modern Distributed Platforms.',
    url: 'https://alvin-ms-portfolio.alvinms394.workers.dev',
    siteName: 'Alvin MS Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Alvin MS Profile Picture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alvin MS | CS & AI Student | Java & Full Stack Developer',
    description: 'Building High-Reliability Software, AI Solutions, and Modern Distributed Platforms.',
    images: ['/profile.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-[#030712] text-gray-100 antialiased selection:bg-purple-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
