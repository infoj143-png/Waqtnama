import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WaqtNama - Prayer Times Worldwide',
  description:
    'Accurate Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any city in the world. Detect location, view Gregorian and Hijri dates, and track next prayer countdown.',
  keywords: [
    'Prayer times',
    'Namaz timings',
    'Islamic prayer times',
    'WaqtNama',
    'Fajr',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
    'Hijri date',
    'Qibla',
  ],
  authors: [{ name: 'WaqtNama Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16A34A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-gray-900 min-h-screen font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
