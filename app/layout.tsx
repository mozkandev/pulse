import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pulse — Türkiye Haber Terminali',
  description: 'Türkiye\'nin önde gelen haber kaynaklarından gerçek zamanlı, kategorize edilmiş haber akışı. Gündem, ekonomi, spor, teknoloji ve daha fazlası.',
  keywords: ['haber', 'türkiye', 'gündem', 'ekonomi', 'spor', 'teknoloji', 'rss', 'news'],
  openGraph: {
    title: 'Pulse — Türkiye Haber Terminali',
    description: 'Gerçek zamanlı, kategorize edilmiş haber akışı.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
