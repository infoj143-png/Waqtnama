import React from 'react';
import { PrayerTimesApp } from '@/components/PrayerTimesApp';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export default function Home() {
  const nowIso = new Date().toISOString();

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
      {
        '@type': 'NewsArticle',
        '@id': `${siteUrl}/#newsarticle`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': siteUrl,
        },
        headline: 'Accurate Prayer Times & Qibla Direction Worldwide',
        description: 'Get daily Fajr, Dhuhr, Asr, Maghrib, and Isha prayer timings, Qibla direction, and Hijri calendar dates.',
        image: [`${siteUrl}/og-image.png`],
        datePublished: nowIso,
        dateModified: nowIso,
        author: {
          '@type': 'Organization',
          name: 'WaqtNama',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'WaqtNama',
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/favicon.ico`,
          },
        },
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
