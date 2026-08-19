import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Shield, ArrowLeft, Mail, Cookie, Lock, Eye, FileText } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Privacy Policy - WaqtNama',
  description:
    'Privacy Policy for WaqtNama. Understand how we handle cookies, Google AdSense, log files, and user data protection.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy - WaqtNama',
    description:
      'Read the official Privacy Policy for WaqtNama regarding Google AdSense, cookies, and data protection.',
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
      'WaqtNama Privacy Policy covering Google AdSense, cookies, log files, and user data protection.',
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
                At <strong>WaqtNama</strong> (accessible from <a href={siteUrl} className="text-emerald-700 underline font-medium">{siteUrl}</a>), the privacy of our visitors is one of our top priorities. This Privacy Policy document outlines the types of information that are collected and recorded by WaqtNama and how we use it.
              </p>

              {/* Section 1 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  Personal Data Collection
                </h2>
                <p>
                  We do <strong>not</strong> collect personal identifiable information (PII) such as your full name, physical address, or phone number. You can freely browse and check daily prayer times, Qibla directions, and calendar dates without registering for an account or submitting personal credentials.
                </p>
              </section>

              {/* Section 2 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Cookie className="w-5 h-5 text-emerald-600" />
                  Google AdSense & Cookies
                </h2>
                <p>
                  WaqtNama uses third-party advertising services, including <strong>Google AdSense</strong>. Google uses cookies, web beacons, and unique identifiers to serve advertisements to users based on their visits to our website and other websites on the Internet.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>DART Cookies:</strong> Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to WaqtNama and/or other sites on the Internet.
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-medium">Google Ads Settings</a>.
                  </li>
                  <li>
                    Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on WaqtNama, which are sent directly to users’ browsers. They automatically receive your IP address when this occurs.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Log Files & Analytics
                </h2>
                <p>
                  WaqtNama follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
                </p>
              </section>

              {/* Section 4 */}
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 text-emerald-900">
                  <Eye className="w-5 h-5 text-emerald-600" />
                  Third-Party Privacy Policies
                </h2>
                <p>
                  WaqtNama’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>
              </section>

              {/* Contact Card */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 mt-8">
                <h3 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-700" />
                  Questions & Contact Information
                </h3>
                <p className="text-emerald-950 text-sm leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our site practices, please feel free to reach out to us at:
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
