import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AssistantWidget } from '@/components/AssistantWidget';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const isValidGaId = Boolean(gaId && gaId !== 'G-XXXXXXXXXX');

const adsenseClientId =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_ID ||
  'ca-pub-1171531038397592';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'WaqtNama - Islamic Prayer Times & Qibla Direction for All Cities Worldwide',
    template: '%s - WaqtNama',
  },
  description:
    'Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha), Qibla direction compass, live countdown, and Hijri calendar dates for all cities worldwide based on astronomical methods.',
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
    'Qibla direction',
    'Qibla compass',
    'Karachi prayer times',
    'Lahore prayer times',
  ],
  authors: [{ name: 'WaqtNama Team' }],
  creator: 'WaqtNama',
  publisher: 'WaqtNama',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'WaqtNama - Calculated Prayer Times & Qibla Direction for All Cities Worldwide',
    description:
      'Calculated Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha), Qibla direction compass, live countdown, and Hijri calendar dates for all cities worldwide.',
    url: siteUrl,
    siteName: 'WaqtNama',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WaqtNama - Islamic Prayer Times & Qibla Direction',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WaqtNama - Calculated Prayer Times & Qibla Direction for All Cities Worldwide',
    description:
      'Calculated Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha), Qibla direction compass, live countdown, and Hijri calendar dates for all cities worldwide.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
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
      <head>
        <link rel="preconnect" href="https://api.aladhan.com" />
        <link rel="dns-prefetch" href="https://api.aladhan.com" />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-slate-50 text-gray-900 min-h-screen font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {children}
        <AssistantWidget />
        {isValidGaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
