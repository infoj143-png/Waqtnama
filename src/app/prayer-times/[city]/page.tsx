import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PrayerTimesApp } from '@/components/PrayerTimesApp';
import { PRIMARY_CITY_SLUGS, getCanonicalCitySlug, slugToLocationName } from '@/lib/citySlug';
import { getCityDetails } from '@/lib/cityDetails';
import { parseLocationQuery, AladhanApiResponseData, getDefaultFallbackApiData } from '@/lib/prayerTimes';
import { getPrayerTimes } from '@/../lib/Api';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

interface Props {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return PRIMARY_CITY_SLUGS.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const canonicalSlug = getCanonicalCitySlug(params.city);
  const cityDetails = getCityDetails(canonicalSlug);
  const locationName = slugToLocationName(canonicalSlug);
  const cityName = cityDetails.name || locationName.split(',')[0];

  const fullTitle = `${cityName} Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib, Isha - WaqtNama`;
  const description = `Daily prayer times for ${locationName}. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings, ${cityDetails.method} calculation, ${cityDetails.timezone} timezone info, live countdown, and Hijri calendar dates.`;
  const pageUrl = `${siteUrl}/prayer-times/${canonicalSlug}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: [
      `${cityName} Prayer Times`,
      `Fajr in ${cityName}`,
      `Dhuhr in ${cityName}`,
      `Asr in ${cityName}`,
      `Maghrib in ${cityName}`,
      `Isha in ${cityName}`,
      `Prayer times ${locationName}`,
      `Namaz timings ${cityName}`,
      'WaqtNama',
    ],
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
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
      title: fullTitle,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CityPrayerTimesPage({ params }: Props) {
  const canonicalSlug = getCanonicalCitySlug(params.city);
  if (params.city !== canonicalSlug) {
    redirect(`/prayer-times/${canonicalSlug}`);
  }

  const locationName = slugToLocationName(canonicalSlug);
  const cityDetails = getCityDetails(canonicalSlug);
  const pageUrl = `${siteUrl}/prayer-times/${canonicalSlug}`;

  const { city, country } = parseLocationQuery(locationName);
  let initialApiData: AladhanApiResponseData | null = null;

  try {
    initialApiData = await getPrayerTimes(city, country, cityDetails.methodId);
  } catch {
    initialApiData = getDefaultFallbackApiData();
  }

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
            name: 'Prayer Times',
            item: `${siteUrl}/prayer-times`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: locationName,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${cityDetails.name} Prayer Times Today | Fajr, Dhuhr, Asr, Maghrib, Isha - WaqtNama`,
        description: `Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times in ${locationName}.`,
        breadcrumb: {
          '@id': `${pageUrl}/#breadcrumb`,
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}/#webapp`,
        name: `Prayer Times in ${locationName} - WaqtNama`,
        url: pageUrl,
        description: `Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times, live countdown, Qibla direction, and Hijri calendar dates for ${locationName}.`,
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
      <PrayerTimesApp
        initialCity={locationName}
        initialApiData={initialApiData}
        cityDetails={cityDetails}
      />
    </>
  );
}
