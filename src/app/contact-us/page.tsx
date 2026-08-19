import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Compass, Mail, Clock, ArrowLeft, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

export const metadata: Metadata = {
  title: 'Contact Us - WaqtNama',
  description:
    'Contact WaqtNama team for any questions, feedback, or prayer time corrections. We answer emails within 24 hours at infoj.j143@gmail.com.',
  alternates: {
    canonical: `${siteUrl}/contact-us`,
  },
  openGraph: {
    title: 'Contact Us - WaqtNama',
    description:
      'Have questions or found an incorrect prayer time? Contact WaqtNama at infoj.j143@gmail.com. We reply within 24 hours.',
    url: `${siteUrl}/contact-us`,
    siteName: 'WaqtNama',
    type: 'website',
  },
};

export default function ContactUsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us - WaqtNama',
    url: `${siteUrl}/contact-us`,
    description:
      'If you have any questions or find any incorrect prayer time, please contact us at infoj.j143@gmail.com. We will reply within 24 hours.',
    mainEntity: {
      '@type': 'Organization',
      name: 'WaqtNama',
      email: 'infoj.j143@gmail.com',
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
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-10">
            {/* Title Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm mb-4">
              <Mail className="w-4 h-4" />
              Contact Us
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Get in Touch with WaqtNama
            </h1>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              If you have any questions or find any incorrect prayer time, please contact us at{' '}
              <a
                href="mailto:infoj.j143@gmail.com"
                className="text-emerald-700 font-bold underline hover:text-emerald-800 transition-colors"
              >
                infoj.j143@gmail.com
              </a>
              . We will reply within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Direct Mail Card */}
              <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col justify-between">
                <div>
                  <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <Mail className="w-6 h-6 text-emerald-200" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Email Inquiry</h2>
                  <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-6">
                    Feel free to reach out regarding prayer time adjustments, feature suggestions, or general feedback.
                  </p>
                </div>

                <div className="space-y-3 border-t border-emerald-700/60 pt-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-emerald-200 block">Guaranteed Response Time</span>
                      <span className="text-sm font-semibold text-white">Within 24 Hours</span>
                    </div>
                  </div>

                  <a
                    href="mailto:infoj.j143@gmail.com"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm py-3 px-4 rounded-xl transition-all shadow"
                  >
                    <Send className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>

              {/* Support Guidelines Card */}
              <div className="bg-slate-50 border border-emerald-100 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="bg-emerald-100 text-emerald-700 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">How We Can Help</h2>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                    When submitting a prayer time error or discrepancy, please include:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>The exact City and Country name.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>The specific prayer (e.g. Fajr, Maghrib) and date.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Your preferred calculation method if applicable.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center gap-2 text-xs text-gray-500">
                  <AlertCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>We appreciate your feedback in improving WaqtNama.</span>
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
