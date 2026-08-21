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
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/#webapp`,
        name: 'WaqtNama',
        url: siteUrl,
        description: 'Accurate daily Fajr, Dhuhr, Asr, Maghrib, and Isha prayer timings, Qibla direction compass, and Hijri calendar dates for all cities worldwide.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
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
