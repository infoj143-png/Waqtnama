import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Clock, ShieldCheck, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'About Us - Accurate Islamic Prayer Times, Qibla & Hijri Calendar',
  description:
    'Learn about WaqtNama: a premier Islamic utility platform offering accurate prayer timings, Qibla direction, and Hijri calendar updates across Pakistan and globally.',
  alternates: {
    canonical: `${siteUrl}/about-us`,
  },
  openGraph: {
    title: 'About WaqtNama - Islamic Prayer Times & Qibla Direction',
    description:
      'Discover WaqtNama: your reliable digital companion for accurate geographical prayer timing calculations, Qibla compass, and Hijri calendar updates across Pakistan and worldwide.',
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
      'WaqtNama is an accurate Islamic utility platform providing prayer timings, Qibla direction, and Hijri calendar updates for users across Pakistan and worldwide.',
    publisher: {
      '@type': 'Organization',
      name: 'WaqtNama',
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
      telephone: '+923446110659',
      email: 'infoj.j143@gmail.com',
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
              Accurate Islamic Utility Platform for Prayer Timings, Qibla & Hijri Calendar
            </h1>

            {/* Content Body */}
            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Welcome to <strong className="text-emerald-800">WaqtNama</strong>, an authentic and dedicated Islamic utility platform engineered to offer highly accurate daily prayer timings, precise Qibla direction, and real-time Hijri calendar updates for users across Pakistan and worldwide.
              </p>

              <p>
                Performing Salah on time is an integral pillar of Islamic life. WaqtNama was created to bridge the need for dependable, instant, and geographically precise prayer schedules. Whether you reside in major Pakistani cities such as Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, or Quetta, or are traveling abroad, WaqtNama serves as your reliable daily companion.
              </p>

              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-100 flex items-start gap-3.5">
                  <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base mb-1">Authentic Astronomical Calculations</h2>
                    <p className="text-xs text-gray-600 leading-normal">
                      We support globally recognized astronomical calculation standards—including the University of Islamic Sciences Karachi, Muslim World League (MWL), Umm al-Qura, and ISNA—ensuring precise timing for Fajr, Dhuhr, Asr, Maghrib, and Isha.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-100 flex items-start gap-3.5">
                  <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base mb-1">Geographical Precision Across Pakistan & Beyond</h2>
                    <p className="text-xs text-gray-600 leading-normal">
                      With coverage tailored for every district and city across Pakistan as well as global locations, WaqtNama calculates timings based on exact geographical coordinates (latitude and longitude).
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight pt-2">
                Our Mission & Community Service Commitment
              </h2>
              <p>
                At WaqtNama, our overarching goal is community service. We believe that access to essential Islamic utilities should be completely free, fast, reliable, and accessible to everyone without invasive tracking or intrusive ad formats.
              </p>

              <p>
                In addition to accurate daily prayer schedules, WaqtNama provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                <li>An interactive real-time Qibla direction compass aligned with your exact coordinates.</li>
                <li>Up-to-date Hijri calendar information and major Islamic date highlights (such as Ramadan and 12 Rabi ul Awwal).</li>
                <li>Live countdown timers for upcoming prayers to help users plan their daily routines effectively.</li>
              </ul>

              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h2 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  Our Core Pillars of Service
                </h2>
                <ul className="space-y-2.5 text-emerald-950 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Reliability & Accuracy:</strong> Delivering verified prayer schedules based on rigorous geographical calculations and recognized Islamic authorities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Community-First Mindset:</strong> Providing essential spiritual tools as a free utility for the Muslim Ummah across Pakistan and worldwide.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>User Respect & Compliance:</strong> Maintaining a clean, fast-loading, mobile-optimized experience that complies with web standard privacy guidelines.</span>
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
