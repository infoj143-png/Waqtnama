import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import { Compass, Mail, Clock, ArrowLeft, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

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
              Have a question, feedback, or noticed a discrepancy in prayer times? Send us a message directly using the form below or email us at{' '}
              <a
                href="mailto:infoj.j143@gmail.com"
                className="text-emerald-700 font-bold underline hover:text-emerald-800 transition-colors"
              >
                infoj.j143@gmail.com
              </a>
              . We respond within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
              {/* Form Section */}
              <div className="md:col-span-7">
                <ContactForm />
              </div>

              {/* Info & Guidelines Card */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-6 rounded-2xl shadow-md">
                  <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                    <Mail className="w-6 h-6 text-emerald-200" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Direct Email</h2>
                  <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-4">
                    Prefer emailing directly from your mail client? Feel free to write to us at any time.
                  </p>
                  <a
                    href="mailto:infoj.j143@gmail.com"
                    className="text-emerald-200 hover:text-white font-semibold underline text-sm break-all"
                  >
                    infoj.j143@gmail.com
                  </a>

                  <div className="mt-6 pt-4 border-t border-emerald-700/60 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    <div>
                      <span className="text-xs text-emerald-200 block">Response Time</span>
                      <span className="text-sm font-semibold text-white">Within 24 Hours</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-emerald-100 p-6 rounded-2xl">
                  <div className="bg-emerald-100 text-emerald-700 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Reporting Prayer Time Errors</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    To help us resolve time differences quickly, please include:
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>City & Country Name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Prayer Name & Date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Calculation Method / Local Mosque Time</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-2 text-xs text-gray-500">
                    <AlertCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>JazakAllah Khair for your support!</span>
                  </div>
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
