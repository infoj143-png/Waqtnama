import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, ArrowLeft, Navigation, Smartphone, Sun, ShieldCheck } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Qibla Direction Guide - How to Find Kaaba Direction Accurately',
  description:
    'Learn how Qibla direction is calculated using spherical trigonometry, how to calibrate phone compasses, and methods for finding Kaaba direction anywhere on Earth.',
  alternates: {
    canonical: `${siteUrl}/qibla-direction-guide`,
  },
  openGraph: {
    title: 'Qibla Direction Guide - How to Find Kaaba Direction Accurately',
    description:
      'In-depth guide on Qibla calculation math (Great Circle formula), mobile device compass calibration, solar shadow alignment, and accuracy tips.',
    url: `${siteUrl}/qibla-direction-guide`,
    siteName: 'WaqtNama',
    type: 'article',
  },
};

export default function QiblaDirectionGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Qibla Direction Guide - Finding the Direction of the Kaaba',
    description:
      'A technical and practical guide explaining Qibla calculations, spherical trigonometry, smartphone compass calibration, and physical solar methods.',
    url: `${siteUrl}/qibla-direction-guide`,
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
                <Navigation className="w-4 h-4" />
                Qibla Compass & Navigation
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                Complete Guide to Finding the Qibla Direction
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                The Qibla (القبلة‎) is the direction facing the Kaaba in the Sacred Mosque (Al-Masjid al-Haram) in Mecca, Saudi Arabia. Facing the Qibla is a required condition (shart) for Muslims during daily obligatory prayers (Salah). Whether you are using a digital phone compass, a traditional magnetic compass, or solar indicators, this guide explains how the Qibla direction is calculated and how to ensure exact orientation.
              </p>
            </div>

            {/* Section 1: Mathematics of Qibla Calculation */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-600" />
                1. How Qibla Direction is Mathematically Calculated
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Because Earth is a sphere, calculating the shortest distance path (great circle) from any location on Earth to the Kaaba requires spherical trigonometry.
              </p>
              <div className="bg-slate-50 border border-emerald-100 p-5 rounded-2xl space-y-3 text-xs sm:text-sm text-gray-800">
                <p className="font-semibold text-gray-900">Coordinates of the Kaaba in Mecca:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Latitude: 21.4225° N (21° 25′ 21″ N)</li>
                  <li>Longitude: 39.8262° E (39° 49′ 34″ E)</li>
                </ul>

                <p className="font-semibold text-gray-900 pt-2">The Great Circle Formula:</p>
                <p className="font-mono bg-white p-3 rounded-lg border border-gray-200 text-xs overflow-x-auto text-emerald-900">
                  q = arctan2( sin(Δλ), cos(φ) * tan(φ_k) - sin(φ) * cos(Δλ) )
                </p>
                <p className="text-xs text-gray-600">
                  Where <span className="font-semibold">φ</span> is your local latitude, <span className="font-semibold">φ_k</span> is Mecca&apos;s latitude (21.4225°), and <span className="font-semibold">Δλ</span> is the difference between Mecca&apos;s longitude and your local longitude.
                </p>
              </div>
            </section>

            {/* Section 2: Calibrating Digital Compasses */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-emerald-600" />
                2. Calibrating Smartphone Magnetometers
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Modern web apps (like WaqtNama&apos;s built-in Qibla Compass) read data directly from your device&apos;s built-in magnetometer and gyroscope. To ensure maximum accuracy:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <strong className="block text-emerald-900 font-bold mb-1">Perform the Figure-8 Motion</strong>
                  <p className="text-gray-700">
                    Wave your smartphone in a smooth figure-8 loop in the air 3 to 5 times. This recalibrates the internal magnetic sensors across three axes.
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <strong className="block text-emerald-900 font-bold mb-1">Avoid Magnetic Interference</strong>
                  <p className="text-gray-700">
                    Keep your device away from laptops, metallic tables, heavy electrical wiring, phone magnetic cases, and microwave appliances.
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <strong className="block text-emerald-900 font-bold mb-1">Enable High-Accuracy Location</strong>
                  <p className="text-gray-700">
                    Allow GPS location access on your browser so the formula uses your exact latitude and longitude coordinates.
                  </p>
                </div>

                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <strong className="block text-emerald-900 font-bold mb-1">True North vs. Magnetic North</strong>
                  <p className="text-gray-700">
                    Qibla directions are based on True North. digital apps adjust automatically using magnetic declination tables.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Solar Alignment Method */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sun className="w-6 h-6 text-emerald-600" />
                3. The Solar Shadow Method (Sun directly over Kaaba)
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Twice a year, the Sun passes directly overhead (at zenith) above the Holy Kaaba in Mecca. On these exact dates and times, any vertical object anywhere in the sunlit hemisphere casts a shadow aligned directly opposite or towards the Kaaba:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">May 27 / May 28:</strong> At 12:18 PM Saudi Arabia Standard Time (09:18 UTC).
                </li>
                <li>
                  <strong className="text-gray-900">July 15 / July 16:</strong> At 12:27 PM Saudi Arabia Standard Time (09:27 UTC).
                </li>
              </ul>
              <p className="text-xs text-gray-600">
                At these exact moments, looking directly toward the Sun (with appropriate eye protection) gives you the 100% exact direction of Mecca from anywhere on the sunlit side of the world.
              </p>
            </section>

            {/* Section 4: WaqtNama Qibla Compass */}
            <section className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-3">
              <h3 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                Instant Qibla Direction on WaqtNama
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                When visiting any city page on WaqtNama, our integrated Qibla tool calculates the exact compass bearing in degrees (e.g. 265° WSW for Karachi, 58° NE for New York) and displays an interactive directional compass dial designed for ease of use.
              </p>
            </section>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
