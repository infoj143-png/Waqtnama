import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import {
  Compass,
  FileText,
  ArrowLeft,
  AlertTriangle,
  Calculator,
  MapPin,
  Globe2,
  Scale,
  Mail,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Terms & Conditions - WaqtNama',
  description:
    'Terms and Conditions for WaqtNama. Read disclaimers regarding astronomical prayer calculations, local mosque schedule variations, compass hardware limits, and third-party APIs.',
  alternates: {
    canonical: `${siteUrl}/terms-and-conditions`,
  },
  openGraph: {
    title: 'Terms & Conditions - WaqtNama',
    description:
      'Official Terms & Conditions for WaqtNama regarding prayer timing calculations, local mosque variations, and service usage disclaimers.',
    url: `${siteUrl}/terms-and-conditions`,
    siteName: 'WaqtNama',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms & Conditions - WaqtNama',
    url: `${siteUrl}/terms-and-conditions`,
    description:
      'WaqtNama Terms and Conditions including disclaimers on astronomical calculations, local mosque schedule differences, geolocation limitations, and third-party API dependencies.',
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
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10">
            {/* Title Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm mb-4">
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-500 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to <strong>WaqtNama</strong> (accessible from <a href={siteUrl} className="text-emerald-700 underline font-medium">{siteUrl}</a>). By accessing or using our website and utility services, you agree to be bound by these Terms and Conditions. Please review them carefully. If you do not agree with any part of these terms, you should discontinue using WaqtNama.
              </p>

              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  1. Astronomical Calculation Variations & Juristic Standards
                </h2>
                <p>
                  Prayer schedules displayed on WaqtNama are computed using standard astronomical algorithms based on solar position, twilight angles, and elevation. Depending on your chosen calculation convention (e.g., University of Islamic Sciences Karachi, ISNA, Muslim World League, Umm al-Qura University, Diyanet, JAKIM, KEMENAG), Fajr, Isha, or Asr times may vary by several minutes.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>Asr timing depends on the juristic method selected (Standard/Shafi&#39;i vs. Hanafi ratio).</li>
                  <li>Fajr and Isha timings depend on solar depression angles (ranging between 15° and 19.5°).</li>
                  <li>Calculated times serve as informative astronomical estimates.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <AlertTriangle className="w-5 h-5 text-emerald-600" />
                  2. Local Mosque & Community Schedule Discrepancies
                </h2>
                <p>
                  Local Islamic centers and mosques frequently adjust Adhan or Iqamah times by a few minutes to accommodate congregation schedules, seasonal shifts, or local municipal agreements. Users are advised to cross-check WaqtNama timings with their local mosque or Islamic authority, especially during Ramadan (Suhoor and Iftar cutoff times) or when joining congregational prayers.
                </p>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  3. Compass & Geolocation Hardware Limitations
                </h2>
                <p>
                  WaqtNama provides interactive Qibla direction indicators based on mathematical formulas and browser geolocation sensors. However, digital compass bearings depend heavily on your device&#39;s built-in magnetometer, GPS accuracy, and local environmental factors.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                  <li>Magnetic interference from surrounding metals, buildings, or electronics can affect phone compass accuracy.</li>
                  <li>Users should calibrate their device magnetometer (e.g., rotating in a figure-8 motion) prior to determining Qibla orientation.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Globe2 className="w-5 h-5 text-emerald-600" />
                  4. Third-Party API & Service Dependency
                </h2>
                <p>
                  WaqtNama relies on third-party APIs and infrastructure to deliver real-time timing data and interactive features, including the <strong>Aladhan API</strong> for astronomical timing schedules, <strong>FormSubmit</strong> for contact form communications, and <strong>Google Analytics / AdSense</strong> for performance measurement and non-intrusive advertising. We are not liable for temporary service interruptions, network outages, or data delays caused by external upstream providers.
                </p>
              </section>

              {/* Section 5 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Scale className="w-5 h-5 text-emerald-600" />
                  5. Limitation of Liability
                </h2>
                <p>
                  WaqtNama is provided on an &#34;as is&#34; and &#34;as available&#34; basis without warranties of any kind. While we make every effort to maintain accurate data, WaqtNama and its maintainers shall not be held liable for any missed prayers, fasting timing discrepancies, or inaccuracies resulting from technological limitations or local schedule variances.
                </p>
              </section>

              {/* Contact Card */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-700" />
                  Contact Us Regarding Terms
                </h3>
                <p className="text-emerald-950 text-sm leading-relaxed mb-4">
                  If you have questions or feedback concerning these Terms and Conditions, please reach out to us:
                </p>
                <a
                  href="mailto:infoj.j143@gmail.com"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  infoj.j143@gmail.com
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
