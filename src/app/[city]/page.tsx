import React from 'react';
import type { Metadata } from 'next';
import { PrayerTimesApp } from '@/components/PrayerTimesApp';
import { slugToLocationName } from '@/lib/citySlug';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

interface Props {
  params: {
    city: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locationName = slugToLocationName(params.city);
  const title = `Fajr, Dhuhr, Asr in ${locationName}`;
  const description = `Accurate Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times in ${locationName}. Get live countdown, Qibla direction, and Hijri calendar dates for ${locationName}.`;
  const url = `${siteUrl}/${params.city}`;

  return {
    title,
    description,
    keywords: [
      `Fajr in ${locationName}`,
      `Dhuhr in ${locationName}`,
      `Asr in ${locationName}`,
      `Maghrib in ${locationName}`,
      `Isha in ${locationName}`,
      `Prayer times ${locationName}`,
      `Namaz timings ${locationName}`,
      'WaqtNama',
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: 'WaqtNama',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `Prayer Times in ${locationName} - WaqtNama`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function CityPage({ params }: Props) {
  const locationName = slugToLocationName(params.city);
  const pageUrl = `${siteUrl}/${params.city}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        '@id': `${pageUrl}/#place`,
        name: locationName,
        description: `Islamic Prayer Times and Qibla direction in ${locationName}`,
        url: pageUrl,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locationName,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `Fajr, Dhuhr, Asr in ${locationName}`,
        description: `Accurate Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times in ${locationName}.`,
        breadcrumb: {
          '@id': `${pageUrl}/#breadcrumb`,
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
      <PrayerTimesApp initialCity={locationName} />
    </>
  );
}
