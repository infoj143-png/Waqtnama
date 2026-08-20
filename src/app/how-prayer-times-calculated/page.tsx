import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, ArrowLeft, Clock, Globe, Calculator, Sun, ShieldCheck } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'How Prayer Times Are Calculated - Complete Astronomical Guide',
  description:
    'Learn how Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) are calculated using solar positioning, shadow lengths, and international conventions.',
  alternates: {
    canonical: `${siteUrl}/how-prayer-times-calculated`,
  },
  openGraph: {
    title: 'How Prayer Times Are Calculated - Complete Astronomical Guide',
    description:
      'Detailed guide on astronomical formulas, solar angles, and Islamic juristic rules used for calculating accurate daily prayer schedules worldwide.',
    url: `${siteUrl}/how-prayer-times-calculated`,
    siteName: 'WaqtNama',
    type: 'article',
  },
};

export default function HowPrayerTimesCalculatedPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Islamic Prayer Times Are Calculated',
    description:
      'An in-depth explanation of astronomical calculations, solar angles, shadow ratios, and juristic differences used in determining daily prayer schedules.',
    url: `${siteUrl}/how-prayer-times-calculated`,
    author: {
      '@type': 'Organization',
      name: 'WaqtNama',
    },
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
        {/* Navigation Header */}
        <header className="bg-emerald-700 text-white shadow-md border-b border-emerald-800">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all">
                <Compass className="w-7 h-7 text-emerald-100" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">WaqtNama</span>
                <span className="text-xs text-emerald-100/90 font-medium">Islamic Prayer Times</span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl border border-emerald-600/50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-10">
          <article className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm mb-4">
                <Calculator className="w-4 h-4" />
                Calculation Methods & Science
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                How Islamic Prayer Times Are Calculated
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Islamic prayer times are determined by the position of the Sun relative to the observer on Earth. Rather than fixed times on a clock, prayer schedules adjust dynamically each day based on geographic coordinates (latitude and longitude), elevation, and solar declination. Understanding these mathematical principles helps Muslims appreciate the harmony between Islamic traditions and astronomical science.
              </p>
            </div>

            {/* Section 1: The Solar Day & Daily Prayers */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sun className="w-6 h-6 text-emerald-600" />
                1. Astronomical Definitions for Each Prayer
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Each of the five daily prayers corresponds to a distinct phase of the solar journey:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Fajr (Dawn Prayer)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Begins at the onset of true dawn (Subh Sadiq) when twilight first appears horizontally across the eastern horizon. Mathematically, this corresponds to when the Sun reaches a specific angle below the horizon (typically between 15° and 19.5° depending on juristic conventions).
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Dhuhr (Midday Prayer)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Begins immediately after solar noon (Zawal), when the Sun passes the local meridian and starts descending from its zenith. A safety buffer of a few minutes is usually added to ensure solar noon has passed.
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Asr (Afternoon Prayer)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Begins when an object&apos;s shadow length reaches its minimum shadow plus its height (Standard/Shafi&apos;i, Maliki, Hanbali method) or plus twice its height (Hanafi method).
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Maghrib (Sunset Prayer)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Begins right after sunset, when the upper limb of the Sun vanishes completely below the western horizon. Refraction effects and atmospheric conditions are factored in.
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl md:col-span-2">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Isha (Night Prayer)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Begins when the red evening twilight completely disappears from the western sky. In calculations, this is defined by the Sun dipping between 14° and 18° below the horizon, or a fixed interval (e.g. 90 minutes after Maghrib in Umm al-Qura).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Major Calculation Organizations */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-6 h-6 text-emerald-600" />
                2. Major Calculation Methods Worldwide
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Different Islamic organizations and government authorities around the world use slightly different astronomical angles to calculate Fajr and Isha based on geographical realities:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-emerald-700 text-white">
                    <tr>
                      <th className="p-3">Organization / Method</th>
                      <th className="p-3">Region</th>
                      <th className="p-3">Fajr Angle</th>
                      <th className="p-3">Isha Angle / Offset</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-800">
                    <tr className="bg-white">
                      <td className="p-3 font-semibold">MWL (Muslim World League)</td>
                      <td className="p-3">Europe, Far East, parts of US</td>
                      <td className="p-3">18.0°</td>
                      <td className="p-3">17.0°</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-semibold">ISNA (Islamic Society of North America)</td>
                      <td className="p-3">North America (USA & Canada)</td>
                      <td className="p-3">15.0°</td>
                      <td className="p-3">15.0°</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-semibold">Umm al-Qura University</td>
                      <td className="p-3">Saudi Arabia & Arabian Peninsula</td>
                      <td className="p-3">18.5°</td>
                      <td className="p-3">90 min after Maghrib (120 min in Ramadan)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-semibold">University of Islamic Sciences, Karachi</td>
                      <td className="p-3">Pakistan, Bangladesh, India</td>
                      <td className="p-3">18.0°</td>
                      <td className="p-3">18.0°</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-semibold">Egyptian General Authority of Survey</td>
                      <td className="p-3">Egypt, Africa, Syria, Lebanon</td>
                      <td className="p-3">19.5°</td>
                      <td className="p-3">17.5°</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: High Latitudes & Special Circumstances */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-emerald-600" />
                3. High Latitudes and Special Adjustments
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                In northern regions (above 48° or 66° latitude such as the UK, Scandinavia, or Canada), the Sun may not dip far enough below the horizon during summer months to reach twilight angles like 18°. To address this, Islamic scholars and astronomers established rule-based adjustments:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">Middle of the Night (Nifsu-l-Layl):</strong> The period between sunset and sunrise is split in half; Fajr and Isha are constrained to not cross the midpoint.
                </li>
                <li>
                  <strong className="text-gray-900">One-Seventh Rule (Subs-ul-Layl):</strong> Night is divided into seven parts. Isha begins after the first seventh, and Fajr occurs at the last seventh.
                </li>
                <li>
                  <strong className="text-gray-900">Angle-Based / Nearest Latitude:</strong> Prayer times are approximated using the nearest latitude where standard solar twilight occurs.
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-3">
              <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                Accuracy Commitment at WaqtNama
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                At WaqtNama, we partner with verified astronomical data sources including the Aladhan API and standard juristic conventions to deliver exact times for over 50,000 cities worldwide. Always ensure your local city settings align with your community&apos;s preferred calculation method for optimal peace of mind.
              </p>
            </section>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
