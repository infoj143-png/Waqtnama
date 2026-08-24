import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Shield, ArrowLeft, Mail, Cookie, Lock, FileText, MapPin, Server } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Privacy Policy - WaqtNama',
  description:
    'Privacy Policy for WaqtNama. Learn how we handle browser geolocation, Google AdSense cookies, FormSubmit contact processing, Google Analytics, and user data privacy.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy - WaqtNama',
    description:
      'Read the official Privacy Policy for WaqtNama regarding geolocation usage, Google AdSense, FormSubmit, and data protection.',
    url: `${siteUrl}/privacy-policy`,
    siteName: 'WaqtNama',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - WaqtNama',
    url: `${siteUrl}/privacy-policy`,
    description:
      'WaqtNama Privacy Policy covering optional geolocation usage, FormSubmit message processing, Google Analytics, Google AdSense cookies, and user data protection.',
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
              <Shield className="w-4 h-4" />
              Privacy Policy
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong>WaqtNama</strong> (accessible from <a href={siteUrl} className="text-emerald-700 underline font-medium">{siteUrl}</a>), the privacy of our visitors is paramount. This Privacy Policy outlines the types of information collected and recorded by WaqtNama, how it is processed, and your rights regarding your data.
              </p>

              {/* Section 1: Personal Data */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  Personal Data Collection
                </h2>
                <p>
                  We do <strong>not</strong> collect or store personally identifiable information (PII) such as full names, home addresses, or phone numbers. You can freely browse and check daily prayer times, Qibla directions, and calendar dates without creating an account or providing sensitive personal credentials.
                </p>
              </section>

              {/* Section 2: Browser Geolocation Usage */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Browser Geolocation Usage
                </h2>
                <p>
                  WaqtNama offers an optional automatic location detection feature to allow users to calculate local prayer timings and compute Qibla compass bearing accurately.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Optional & On-Demand:</strong> Accessing your device location requires your explicit browser permission.
                  </li>
                  <li>
                    <strong>Client-Side & Transient Processing:</strong> Geolocation coordinates (latitude and longitude) are processed purely in real time on the client side to query timing calculation endpoints and align compass bearings.
                  </li>
                  <li>
                    <strong>No Location Tracking or Storage:</strong> Your precise geographic coordinates are never stored on our servers, transmitted to external databases, or tracked across sessions.
                  </li>
                </ul>
              </section>

              {/* Section 3: Third-Party Processors */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Server className="w-5 h-5 text-emerald-600" />
                  Third-Party Data Processors
                </h2>
                <p>
                  To provide our core utility features, analytics, and contact options, WaqtNama integrates trusted third-party service providers:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>FormSubmit (Contact Form Processor):</strong> Messages submitted via our Contact Us form are processed securely through <a href="https://formsubmit.co" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">FormSubmit.co</a> AJAX API endpoint to route user inquiries to our administration team. No contact messages are sold or shared with advertisers.
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to measure aggregated website performance, visitor counts, and usage trends. Google Analytics collects anonymized interaction statistics without associating them with personal identities.
                  </li>
                  <li>
                    <strong>Aladhan API:</strong> Astronomical timing queries for city schedules are fetched directly via Aladhan API endpoints.
                  </li>
                </ul>
              </section>

              {/* Section 4: Advertising & Cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Cookie className="w-5 h-5 text-emerald-600" />
                  Google AdSense & Cookies
                </h2>
                <p>
                  WaqtNama uses third-party advertising services, including <strong>Google AdSense</strong>, to support site operations. Google uses cookies, web beacons, and unique identifiers to serve non-intrusive advertisements based on previous site visits.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>DART Cookies:</strong> Google&#39;s use of advertising cookies enables it and its partners to serve relevant ads to users based on visits to WaqtNama and other internet sites.
                  </li>
                  <li>
                    <strong>Ad Personalization Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">aboutads.info</a>.
                  </li>
                </ul>
              </section>

              {/* Section 5: Log Files */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Standard Log Files
                </h2>
                <p>
                  WaqtNama follows standard web hosting procedures using server log files. The information collected includes IP addresses, browser types, Internet Service Provider (ISP), date/time stamps, referring pages, and click counts. These details are used solely to analyze technical site performance and prevent abuse, and are not linked to any personally identifiable information.
                </p>
              </section>

              {/* Contact Card */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-700" />
                  Questions & Privacy Requests
                </h3>
                <p className="text-emerald-950 text-sm leading-relaxed mb-4">
                  If you have questions or concerns regarding this Privacy Policy or data handling, please contact us:
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
