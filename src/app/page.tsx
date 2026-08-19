import React from 'react';
import { PrayerTimesApp } from '@/components/PrayerTimesApp';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'WaqtNama',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon.ico`,
        },
        description: 'Accurate Prayer Times & Qibla Direction for All Cities Worldwide',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'WaqtNama',
        description: 'Accurate Prayer Times & Qibla Direction for All Cities Worldwide',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/{city}`,
          },
          'query-input': 'required name=city',
        },
      },
      {
        '@type': 'Place',
        name: 'Lahore, Pakistan',
        description: 'Islamic Prayer Times and Qibla direction in Lahore, Pakistan',
        url: siteUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrayerTimesApp initialCity="Lahore, Pakistan" />
    </>
  );
}
