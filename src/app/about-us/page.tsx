import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Clock, Globe2, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'About Us - Accurate Prayer Times & Qibla Direction',
  description:
    'Learn about WaqtNama. We provide accurate Islamic prayer times, Qibla direction, and Hijri calendar dates for all cities worldwide using authentic calculation methods.',
  alternates: {
    canonical: `${siteUrl}/about-us`,
  },
  openGraph: {
    title: 'About WaqtNama - Accurate Prayer Times & Qibla Direction',
    description:
      'Discover WaqtNama: your trusted global Islamic companion for accurate prayer times, Qibla compass, and Hijri calendar dates.',
    url: `${siteUrl}/about-us`,
    siteName: 'WaqtNama',
    type: 'website',
  },
};

export default function AboutUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About WaqtNama',
    url: `${siteUrl}/about-us`,
    description:
      'WaqtNama provides accurate prayer times and Qibla direction for all cities worldwide. Our goal is to help Muslims never miss their prayers.',
    publisher: {
      '@type': 'Organization',
      name: 'WaqtNama',
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
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
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10">
            {/* Title Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm mb-4">
              <Compass className="w-4 h-4" />
              About WaqtNama
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
              Empowering Muslims Worldwide with Precision & Clarity
            </h1>

            {/* Content Body - Target ~400 words */}
            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Welcome to <strong className="text-emerald-800">WaqtNama</strong>, your dedicated digital platform created to provide highly accurate Islamic prayer times and precise Qibla direction for every city across the globe. Our ultimate goal is to assist Muslims everywhere in fulfilling their sacred daily obligations without delay or uncertainty.
              </p>

              <p>
                Prayer (Salah) is the cornerstone of Islamic practice, serving as a direct connection between the believer and Allah Almighty. Recognizing the importance of performing prayers on time, WaqtNama is designed to deliver instantaneous, trustworthy, and daily updated timings for Fajr, Dhuhr, Asr, Maghrib, and Isha. Whether you are living in a bustling metropolis like London, New York, or Karachi, or traveling to a remote destination, WaqtNama ensures that you stay connected to your daily prayer schedule with absolute ease and confidence.
              </p>

              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-100 flex items-start gap-3.5">
                  <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Authentic Calculations</h3>
                    <p className="text-xs text-gray-600 leading-normal">
                      We integrate verified astronomical calculation standards (such as ISNA, Muslim World League, Umm al-Qura, and Karachi University) for exact prayer schedules.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-100 flex items-start gap-3.5">
                  <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">Global Accessibility</h3>
                    <p className="text-xs text-gray-600 leading-normal">
                      Instant search support for thousands of cities worldwide, with automatic geolocation detection for instant localized prayer schedules.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                To provide the highest level of precision, WaqtNama utilizes recognized calculation methods adapted to local astronomical conventions around the world. In addition to daily prayer times, WaqtNama features an interactive Qibla direction compass, accurate Hijri calendar dates, and live prayer countdown timers. Every feature is crafted with care to ensure ease of use on mobile devices, tablets, and desktops alike.
              </p>

              <p>
                We believe that reliable spiritual utility tools should be free, accessible, fast, and completely user-friendly. WaqtNama is continuously maintained and optimized so that every Muslim can seamlessly incorporate accurate timing into their daily routines.
              </p>

              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  Our Core Commitments
                </h3>
                <ul className="space-y-2 text-emerald-950 text-sm sm:text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Providing accurate and verified prayer schedules globally.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Maintaining a clean, mobile-first, and ad-friendly user experience.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Protecting user privacy with transparent and lightweight data practices.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
