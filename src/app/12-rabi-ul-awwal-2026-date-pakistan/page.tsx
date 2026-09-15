import React from 'react';
import type { Metadata } from 'next';
import EventClientComponent from './EventClientComponent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: '12 Rabi ul Awal 2026 Date in Pakistan, Holiday & Night Ibadat Guide',
  description:
    'Find the exact date of 12 Rabi ul Awal 2026 in Pakistan, public holiday announcements, and complete guide for night ibadat and nawafil prayers.',
  keywords: [
    '12 rabi ul awal 2026 date in pakistan',
    '12 rabi ul awwal night ibadat',
    '12 rabi ul awal 2026 nawafil',
    'what is islamic date today in pakistan 12 rabi ul awal',
    '12 Rabi ul Awwal 2026 date in Pakistan',
    'Eid Milad un Nabi 2026 holiday date Pakistan',
    'Rabi ul Awwal 1448 moon sighting Pakistan',
    'Pakistan Islamic Calendar 1448',
  ],
  alternates: {
    canonical: `${siteUrl}/12-rabi-ul-awwal-2026-date-pakistan`,
  },
  openGraph: {
    title: '12 Rabi ul Awal 2026 Date in Pakistan, Holiday & Night Ibadat Guide',
    description:
      'Find the exact date of 12 Rabi ul Awal 2026 in Pakistan, public holiday announcements, and complete guide for night ibadat and nawafil prayers.',
    url: `${siteUrl}/12-rabi-ul-awwal-2026-date-pakistan`,
    siteName: 'WaqtNama',
    type: 'article',
  },
};

export default function Event12RabiUlAwwal2026Page() {
  return <EventClientComponent />;
}
