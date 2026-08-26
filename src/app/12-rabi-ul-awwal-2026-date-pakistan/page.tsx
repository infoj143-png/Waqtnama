import React from 'react';
import type { Metadata } from 'next';
import EventClientComponent from './EventClientComponent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: '12 Rabi ul Awwal 2026 Date in Pakistan | Eid Milad un Nabi Holiday & Nawafil Timings',
  description:
    '12 Rabi ul Awwal 2026 date in Pakistan (Eid Milad un Nabi 1448 AH) holiday date, Rabi ul Awwal 1448 moon sighting Pakistan updates, 12 Rabi ul Awwal prayer timings for Gujranwala, Lahore, Karachi, Islamabad & Faisalabad, plus Shab e Milad nawafil timing and Darood Shareef azkar.',
  keywords: [
    '12 Rabi ul Awwal 2026 date in Pakistan',
    'Eid Milad un Nabi 2026 holiday date Pakistan',
    'Rabi ul Awwal 1448 moon sighting Pakistan',
    '12 Rabi ul Awwal prayer timings Gujranwala Lahore Karachi Islamabad',
    'Shab e Milad nawafil timing and Darood Shareef azkar',
    '12 Rabi ul Awwal 2026',
    'Eid Milad un Nabi 2026',
    'Pakistan Islamic Calendar 1448',
  ],
  alternates: {
    canonical: `${siteUrl}/12-rabi-ul-awwal-2026-date-pakistan`,
  },
  openGraph: {
    title: '12 Rabi ul Awwal 2026 Date in Pakistan | Eid Milad un Nabi Holiday & Timings',
    description:
      'Complete guide for 12 Rabi ul Awwal 2026 in Pakistan including moon sighting, Eid Milad un Nabi holiday, Shab-e-Milad nawafil schedule, and Darood Shareef azkar.',
    url: `${siteUrl}/12-rabi-ul-awwal-2026-date-pakistan`,
    siteName: 'WaqtNama',
    type: 'article',
  },
};

export default function Event12RabiUlAwwal2026Page() {
  return <EventClientComponent />;
}
