import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Shield, ArrowLeft, Mail, Cookie, Lock, MapPin, Server, Phone, ExternalLink } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Privacy Policy - WaqtNama',
  description:
    'Privacy Policy for WaqtNama. Learn about our Google AdSense cookie disclosures, data collection practices, analytics, cookie management opt-out options, and contact details (+92 344 6110659).',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy - WaqtNama',
    description:
      'Read the official Privacy Policy for WaqtNama regarding Google AdSense cookies, user data protection, cookie management, and official contact information.',
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
      'WaqtNama Privacy Policy detailing Google AdSense cookie disclosures, analytics, log files, cookie management options, and contact details (+92 344 6110659).',
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
              Privacy Policy & Ad Disclosures
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-500 mb-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong>WaqtNama</strong> (accessible from <a href={siteUrl} className="text-emerald-700 underline font-medium">{siteUrl}</a>), protecting the privacy of our visitors is one of our top priorities. This Privacy Policy document outlines the types of information collected and recorded by WaqtNama, our third-party advertising disclosures, and how you can manage or opt out of data processing.
              </p>

              {/* Section 1: Google AdSense & Third-Party Cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Cookie className="w-5 h-5 text-emerald-600" />
                  Google AdSense & Third-Party Cookie Disclosures
                </h2>
                <p>
                  WaqtNama utilizes third-party advertising services, including <strong>Google AdSense</strong>, to display advertisements on our platform:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Use of Cookies:</strong> Third-party vendors, including Google, use cookies (such as the DART cookie) to serve advertisements to users based on prior visits to WaqtNama or other websites across the Internet.
                  </li>
                  <li>
                    <strong>Ad Personalization:</strong> Google&#39;s use of advertising cookies enables it and its partners to serve personalized ads based on your visit to our website and/or other sites on the Internet.
                  </li>
                  <li>
                    <strong>Non-Personal Identification:</strong> The cookies used by third-party ad networks do not collect personally identifiable information such as your name, email address, physical address, or phone number.
                  </li>
                </ul>
              </section>

              {/* Section 2: Instructions for Managing & Opting-Out of Cookies */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  How to Manage & Opt-Out of Cookies
                </h2>
                <p>
                  Users have complete control over their cookie preferences and can opt out of personalized advertising at any time:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Google Ad Settings:</strong> You can opt out of personalized Google advertising by visiting the official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium inline-flex items-center gap-1">Google Ads Settings <ExternalLink className="w-3.5 h-3.5" /></a> page.
                  </li>
                  <li>
                    <strong>Third-Party Ad Networks:</strong> Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium inline-flex items-center gap-1">aboutads.info <ExternalLink className="w-3.5 h-3.5" /></a> or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium inline-flex items-center gap-1">Network Advertising Initiative Consumer Opt-Out <ExternalLink className="w-3.5 h-3.5" /></a>.
                  </li>
                  <li>
                    <strong>Browser Settings:</strong> You can disable or selectively turn off our cookies or third-party cookies in your browser options (e.g., Chrome, Firefox, Safari, Edge). However, disabling cookies may affect how you interact with our website features.
                  </li>
                </ul>
              </section>

              {/* Section 3: Data Collection Practices & Analytics */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Server className="w-5 h-5 text-emerald-600" />
                  Data Collection Practices & Analytics
                </h2>
                <p>
                  We are committed to transparent data practices. WaqtNama collects only non-personally identifiable information required to deliver accurate timing services:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to analyze site traffic, visitor statistics, and platform performance. Google Analytics processes anonymized metrics (such as page views, device types, and generalized geographic locations) without associating data with individual identities.
                  </li>
                  <li>
                    <strong>Non-Personally Identifiable Log Files:</strong> Like most standard web servers, WaqtNama uses standard log files. Information stored includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring/exit pages, date/time stamps, and click statistics. These log files are strictly used for technical system administration, security verification, and performance analysis.
                  </li>
                  <li>
                    <strong>Transient Client-Side Geolocation:</strong> When you request localized prayer timings or Qibla orientation, browser location coordinates (latitude & longitude) are processed purely in real-time on your client device and are never saved or stored on our servers.
                  </li>
                </ul>
              </section>

              {/* Section 4: User Rights & Information Security */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Children&#39;s Privacy & User Rights
                </h2>
                <p>
                  WaqtNama does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best efforts to promptly remove such information from our records.
                </p>
              </section>

              {/* Contact Card */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h2 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-700" />
                  Official Contact & Privacy Inquiries
                </h2>
                <p className="text-emerald-950 text-sm leading-relaxed mb-4">
                  If you have any questions, require more information about our Privacy Policy, or wish to make privacy requests, please feel free to reach out to us:
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm font-semibold text-emerald-900">
                  <a
                    href="mailto:infoj.j143@gmail.com"
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    infoj.j143@gmail.com
                  </a>
                  <a
                    href="tel:+923446110659"
                    className="inline-flex items-center gap-2 bg-white hover:bg-emerald-100 text-emerald-800 text-sm px-4 py-2.5 rounded-xl border border-emerald-300 transition-all shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span>Phone / WhatsApp: +92 344 6110659</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
