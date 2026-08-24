import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Compass, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { getCityDetails } from '@/lib/cityDetails';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: {
    absolute: 'Prayer Times by City - Global Islamic Directory | WaqtNama',
  },
  description:
    'Browse daily Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for cities across Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and worldwide.',
  alternates: {
    canonical: `${siteUrl}/prayer-times`,
  },
  openGraph: {
    title: 'Prayer Times by City - Global Islamic Directory | WaqtNama',
    description:
      'Find dedicated prayer timing pages, calculation details, timezones, live countdowns, and Qibla direction for major global cities.',
    url: `${siteUrl}/prayer-times`,
    siteName: 'WaqtNama',
    type: 'website',
  },
};

const CITY_GROUPS = [
  {
    region: 'Pakistan',
    cities: [
      { name: 'Karachi', slug: 'karachi' },
      { name: 'Lahore', slug: 'lahore' },
      { name: 'Islamabad', slug: 'islamabad' },
      { name: 'Faisalabad', slug: 'faisalabad' },
      { name: 'Rawalpindi', slug: 'rawalpindi' },
      { name: 'Multan', slug: 'multan' },
      { name: 'Peshawar', slug: 'peshawar' },
      { name: 'Quetta', slug: 'quetta' },
      { name: 'Gujranwala', slug: 'gujranwala' },
      { name: 'Sialkot', slug: 'sialkot' },
      { name: 'Hyderabad', slug: 'hyderabad' },
    ],
  },
  {
    region: 'Saudi Arabia & Gulf',
    cities: [
      { name: 'Mecca', slug: 'mecca' },
      { name: 'Medina', slug: 'medina' },
      { name: 'Riyadh', slug: 'riyadh' },
      { name: 'Dubai', slug: 'dubai' },
      { name: 'Abu Dhabi', slug: 'abu-dhabi' },
      { name: 'Doha', slug: 'doha' },
      { name: 'Kuwait City', slug: 'kuwait-city' },
      { name: 'Muscat', slug: 'muscat' },
    ],
  },
  {
    region: 'United Kingdom & Europe',
    cities: [
      { name: 'London', slug: 'london' },
      { name: 'Birmingham', slug: 'birmingham' },
      { name: 'Manchester', slug: 'manchester' },
      { name: 'Istanbul', slug: 'istanbul' },
      { name: 'Ankara', slug: 'ankara' },
    ],
  },
  {
    region: 'North America',
    cities: [
      { name: 'New York', slug: 'new-york' },
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'Houston', slug: 'houston' },
      { name: 'Toronto', slug: 'toronto' },
      { name: 'Montreal', slug: 'montreal' },
      { name: 'Vancouver', slug: 'vancouver' },
    ],
  },
  {
    region: 'Asia & Pacific',
    cities: [
      { name: 'Jakarta', slug: 'jakarta' },
      { name: 'Kuala Lumpur', slug: 'kuala-lumpur' },
      { name: 'Dhaka', slug: 'dhaka' },
      { name: 'Sydney', slug: 'sydney' },
      { name: 'Melbourne', slug: 'melbourne' },
    ],
  },
  {
    region: 'Africa & Middle East',
    cities: [
      { name: 'Cairo', slug: 'cairo' },
      { name: 'Casablanca', slug: 'casablanca' },
    ],
  },
];

export default function BrowseCitiesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DirectoryPage',
    name: 'Global City Prayer Times Directory',
    description: 'Browse daily Islamic prayer times for major cities worldwide.',
    url: `${siteUrl}/prayer-times`,
    publisher: {
      '@type': 'Organization',
      name: 'WaqtNama',
      url: siteUrl,
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <Header />

        <main className="max-w-5xl mx-auto px-4 py-8">
          {/* Hero Banner */}
          <div className="bg-emerald-700 text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-md relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-100 mb-4 backdrop-blur-sm border border-white/20">
                <Compass className="w-4 h-4" />
                Global Cities Directory
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Islamic Prayer Times by City
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                Select your city below to get daily Fajr, Dhuhr, Asr, Maghrib, and Isha timings, live countdowns, calculation method details, and Qibla compass bearings.
              </p>
            </div>
          </div>

          {/* City Groups */}
          <div className="space-y-8">
            {CITY_GROUPS.map((group) => (
              <section key={group.region} className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  {group.region}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.cities.map((city) => {
                    const details = getCityDetails(city.slug);
                    return (
                      <Link
                        key={city.slug}
                        href={`/prayer-times/${city.slug}`}
                        className="p-3.5 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-100/80 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">{details.country}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Internal Guides Section */}
          <div className="mt-8 bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Islamic Guides & Calculations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Link
                href="/how-prayer-times-calculated"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block"
              >
                <h3 className="font-bold text-emerald-900 text-sm mb-1">Prayer Time Calculations</h3>
                <p className="text-xs text-gray-600">Astronomical formulas, solar angles, and calculation standards explained.</p>
              </Link>
              <Link
                href="/ramadan-timing-guide"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block"
              >
                <h3 className="font-bold text-emerald-900 text-sm mb-1">Ramadan Timing Guide</h3>
                <p className="text-xs text-gray-600">Suhoor & Iftar rules, fasting guidelines, and Ramadan calendar tips.</p>
              </Link>
              <Link
                href="/qibla-direction-guide"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block"
              >
                <h3 className="font-bold text-emerald-900 text-sm mb-1">Qibla Direction Guide</h3>
                <p className="text-xs text-gray-600">Locate the direction of the Kaaba accurately using compass and GPS.</p>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
