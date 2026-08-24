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
      'If you have any questions or find any incorrect prayer time, please contact us at infoj.j143@gmail.com or WhatsApp +92 344 6110659. We will reply within 24 hours.',
    mainEntity: {
      '@type': 'Organization',
      name: 'WaqtNama',
      email: 'infoj.j143@gmail.com',
      telephone: '+923446110659',
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20">
                      <Mail className="w-6 h-6 text-emerald-200" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Direct Contact</h2>
                  <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-4">
                    Get in touch with us directly via email or instant WhatsApp support.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-xs text-emerald-300 block font-medium">Email Support:</span>
                      <a
                        href="mailto:infoj.j143@gmail.com"
                        className="text-emerald-200 hover:text-white font-semibold underline text-sm break-all"
                      >
                        infoj.j143@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="text-xs text-emerald-300 block font-medium">WhatsApp & Phone:</span>
                      <a
                        href="https://wa.me/923446110659"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-200 hover:text-white font-semibold underline text-sm"
                      >
                        +92 344 6110659
                      </a>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/923446110659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all text-sm mb-4"
                  >
                    <svg className="w-5 h-5 fill-emerald-950" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982L2 22l5.133-1.343a9.96 9.96 0 004.877 1.272h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.667-1.034-5.174-2.921-7.06A9.916 9.916 0 0012.012 2zm5.836 14.341c-.244.686-1.42 1.309-1.959 1.393-.502.078-1.156.111-1.852-.112-.423-.136-.967-.312-1.666-.615-2.946-1.274-4.863-4.254-5.011-4.45-.147-.197-1.202-1.599-1.202-3.05 0-1.45.76-2.164 1.032-2.457.272-.294.598-.367.797-.367.199 0 .399.002.571.01.183.008.43-.069.673.513.244.582.83 2.025.903 2.172.073.147.122.318.024.515-.098.197-.147.318-.293.49-.147.172-.309.385-.441.517-.147.147-.301.307-.129.602.172.295.764 1.262 1.637 2.04 1.122.999 2.068 1.309 2.363 1.456.295.147.467.123.639-.073.172-.197.737-.858.934-1.152.197-.294.393-.245.663-.147.27.098 1.719.81 2.013.957.294.147.49.22.564.343.073.123.073.71-.171 1.396z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>

                  <div className="pt-4 border-t border-emerald-700/60 flex items-center gap-3">
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
