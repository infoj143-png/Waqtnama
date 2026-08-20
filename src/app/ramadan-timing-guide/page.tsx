import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, ArrowLeft, Moon, Sun, Utensils, HeartHandshake, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Ramadan Timing Guide - Suhoor, Iftar, Imsak & Fasting Schedule',
  description:
    'Comprehensive guide for Ramadan timings, Suhoor and Iftar schedules, Imsak buffer times, moon sighting conventions, and daily fasting etiquette.',
  alternates: {
    canonical: `${siteUrl}/ramadan-timing-guide`,
  },
  openGraph: {
    title: 'Ramadan Timing Guide - Suhoor, Iftar, Imsak & Fasting Schedule',
    description:
      'Everything you need to know about Suhoor (Sehri), Iftar, Imsak timing buffers, fasting duas, and accurate Ramadan calendars.',
    url: `${siteUrl}/ramadan-timing-guide`,
    siteName: 'WaqtNama',
    type: 'article',
  },
};

export default function RamadanTimingGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Ramadan Timing Guide - Suhoor, Iftar & Fasting Schedule',
    description:
      'A complete essential guide to Ramadan fasting timings, Suhoor and Iftar calculations, moon sighting principles, and daily spiritual practices.',
    url: `${siteUrl}/ramadan-timing-guide`,
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
                <Moon className="w-4 h-4" />
                Ramadan Essentials
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                Ramadan Timing Guide: Suhoor, Iftar, and Fasting
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Ramadan is the ninth and holiest month of the Islamic lunar calendar, during which millions of Muslims fast from dawn until sunset. Accurate timing for Suhoor (the pre-dawn meal) and Iftar (breaking the fast) is central to fulfilling the spiritual obligations of fasting (Sawm). This guide explains how Ramadan timings are determined, how to read fasting calendars, and best practices for daily worship.
              </p>
            </div>

            {/* Section 1: Suhoor, Imsak, and Fajr */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sun className="w-6 h-6 text-emerald-600" />
                1. Understanding Suhoor, Imsak, and Fajr
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Fasting begins precisely at true dawn (Subh Sadiq), which corresponds to the start of Fajr prayer time. It is important to distinguish between key time markers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Suhoor (Sehri)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    The blessed pre-dawn meal eaten before starting the fast. The Prophet Muhammad (peace be upon him) encouraged eating Suhoor as it carries immense blessing and provides physical strength for the fasting day.
                  </p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-900 text-base mb-1">Imsak (Precautionary Stop Time)</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Many Islamic calendars feature an &quot;Imsak&quot; time, which is typically set 10 to 15 minutes before Fajr. While eating is permissible right until Fajr begins, Imsak acts as a helpful safety window to wrap up eating and prepare for prayer.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Iftar & Sunset */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-emerald-600" />
                2. Iftar and Breaking the Fast
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Iftar takes place immediately at sunset, corresponding with the beginning of Maghrib prayer. It is Sunnah to break the fast without delay upon hearing the Adhan or verifying sunset. Dates and water are traditionally consumed first, following the practice of the Prophet (PBUH).
              </p>
              <div className="bg-slate-50 border border-emerald-100 p-5 rounded-2xl space-y-3">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Duas for Fasting
                </h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-emerald-800 block">Intention for Fasting (Suhoor):</span>
                    <p className="italic text-gray-700">&quot;Wa bisawmi ghadinn nawaiytu min shahri ramadan.&quot;</p>
                    <p className="text-gray-500 text-xs">&quot;I intend to keep the fast tomorrow for the month of Ramadan.&quot;</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-semibold text-emerald-800 block">Dua when Breaking Fast (Iftar):</span>
                    <p className="italic text-gray-700">&quot;Allahumma inni laka sumtu wa bika aamantu wa &apos;ala rizqika aftartu.&quot;</p>
                    <p className="text-gray-500 text-xs">&quot;O Allah, I fasted for You, I believe in You, and with Your provision I break my fast.&quot;</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Moon Sighting vs Astronomical Calculation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                3. Moon Sighting vs. Astronomical Calculation
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                The commencement and conclusion of Ramadan depend on the sighting of the new crescent moon (Hilal). Globally, two primary approaches are followed:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">Local or Regional Moon Sighting:</strong> Communities rely on visual naked-eye or telescope sightings reported by official Hilal committees on the 29th night of Sha&apos;ban.
                </li>
                <li>
                  <strong className="text-gray-900">Calculated Scientific Calendars:</strong> Bodies such as the Fiqh Council of North America or Turkey use precise astronomical criteria predicting crescent visibility in advance for structured annual planning.
                </li>
              </ul>
            </section>

            {/* Section 4: Tips for Accurate Ramadan Timing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-emerald-600" />
                4. Best Practices for Accurate Ramadan Schedules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-1">Check Local Elevation & Coordinates</strong>
                    <span className="text-gray-600">Ensure your city page on WaqtNama reflects your exact location, as elevation slightly impacts sunset visibility.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-1">Sync with Your Local Mosque</strong>
                    <span className="text-gray-600">Verify if your local Islamic center uses Hanafi or Standard Asr, or specific Fajr angles.</span>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
