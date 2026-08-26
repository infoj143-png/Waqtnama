'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { CountdownCard } from '@/components/CountdownCard';
import { CityPrayerData } from '@/lib/prayerTimes';
import { FormattedDates } from '@/lib/dates';
import {
  Compass,
  ArrowLeft,
  Calendar,
  Sparkles,
  Clock,
  MapPin,
  BookOpen,
  Heart,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqtnama.vercel.app';

interface CitySchedule {
  city: string;
  province: string;
  fajr: string;
  isha: string;
  tahajjud: string;
  shabEMiladNawafil: string;
}

const citySchedules: CitySchedule[] = [
  {
    city: 'Lahore',
    province: 'Punjab',
    fajr: '04:22 AM',
    isha: '08:05 PM',
    tahajjud: '02:00 AM - 04:00 AM',
    shabEMiladNawafil: 'After Isha until Fajr',
  },
  {
    city: 'Gujranwala',
    province: 'Punjab',
    fajr: '04:21 AM',
    isha: '08:06 PM',
    tahajjud: '02:00 AM - 04:00 AM',
    shabEMiladNawafil: 'After Isha until Fajr',
  },
  {
    city: 'Karachi',
    province: 'Sindh',
    fajr: '04:52 AM',
    isha: '08:24 PM',
    tahajjud: '02:30 AM - 04:30 AM',
    shabEMiladNawafil: 'After Isha until Fajr',
  },
  {
    city: 'Islamabad',
    province: 'Federal Capital',
    fajr: '04:20 AM',
    isha: '08:10 PM',
    tahajjud: '02:00 AM - 04:00 AM',
    shabEMiladNawafil: 'After Isha until Fajr',
  },
  {
    city: 'Faisalabad',
    province: 'Punjab',
    fajr: '04:25 AM',
    isha: '08:09 PM',
    tahajjud: '02:05 AM - 04:05 AM',
    shabEMiladNawafil: 'After Isha until Fajr',
  },
];

export default function EventClientComponent() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 12 Rabi ul Awwal Target Date & Maghrib Shift Calculation Logic:
  // 1. Target date is set directly to TODAY's live date ending at Maghrib (~6:30 PM).
  // 2. If current live time is BEFORE today's Maghrib: Count down remaining time for today's event.
  // 3. If current live time PASSES today's Maghrib: Automatically shift target date to next year's date.
  const targetDate = new Date(now);
  targetDate.setHours(18, 30, 0, 0); // Today's Maghrib time (6:30 PM)

  if (now.getTime() >= targetDate.getTime()) {
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  const totalSecsRemaining = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
  const days = Math.floor(totalSecsRemaining / (3600 * 24));
  const hours = Math.floor((totalSecsRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSecsRemaining % 3600) / 60);
  const seconds = totalSecsRemaining % 60;

  const eventPrayerData: CityPrayerData = {
    city: 'Pakistan',
    country: 'Pakistan',
    formattedLocation: '12 Rabi ul Awwal 2026 (Eid Milad un Nabi) - Pakistan',
    prayers: [
      { key: 'fajr', time24: '04:22', time12: '04:22 AM', dateObj: targetDate },
      { key: 'dhuhr', time24: '12:12', time12: '12:12 PM', dateObj: targetDate },
      { key: 'asr', time24: '15:45', time12: '03:45 PM', dateObj: targetDate },
      { key: 'maghrib', time24: '18:35', time12: '06:35 PM', dateObj: targetDate },
      { key: 'isha', time24: '20:05', time12: '08:05 PM', dateObj: targetDate },
    ],
    nextPrayerKey: 'fajr',
    currentPrayerKey: 'isha',
    timeRemaining: {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds: totalSecsRemaining,
    } as unknown as CityPrayerData['timeRemaining'],
  };

  const dates: FormattedDates = {
    gregorian: 'Sunday, 6 September 2026 (Expected)',
    hijri: '12 Rabi ul Awwal 1448 AH',
  };

  const currentTimeStr = mounted
    ? now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: '12 Rabi ul Awwal 2026 Date in Pakistan (Eid Milad un Nabi)',
    description:
      'Official date, moon sighting details, public holiday announcement, Shab-e-Milad nawafil timing, and Darood Shareef azkar guide for 12 Rabi ul Awwal 2026 in Pakistan.',
    startDate: '2026-09-06T00:00:00+05:00',
    endDate: '2026-09-06T23:59:59+05:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Pakistan',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'WaqtNama',
      url: siteUrl,
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
                <span className="text-xs text-emerald-100/90 font-medium">Islamic Prayer Times & Events</span>
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
        <main className="max-w-5xl mx-auto px-4 py-8">
          {/* Header Title Section with English & Urdu SEO Content */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Islamic Calendar 1448 AH
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-amber-600" />
                Expected Public Holiday Pakistan
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              12 Rabi ul Awwal 2026 Date in Pakistan | Eid Milad un Nabi Holiday & Nawafil Timings
            </h1>

            {/* Urdu Subtitle Heading */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-right font-medium text-emerald-950 text-base sm:text-lg dir-rtl" dir="rtl">
              ۱۲ ربیع الاول ۲۰۲۶ عید میلاد النبی پاکستان میں تاریخ، شبِ میلاد کے نوافل کا وقت اور درود شریف کا وظیفہ
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              The <strong>12 Rabi ul Awwal 2026 date in Pakistan</strong> (Eid Milad un Nabi 1448 AH) is expected to be observed on <strong>Sunday, September 6, 2026</strong>, subject to the official <strong>Rabi ul Awwal 1448 moon sighting Pakistan</strong> by the Central Ruet-e-Hilal Committee. The 1st of Rabi ul Awwal 1448 AH is anticipated to fall on Tuesday, August 26, 2026. Eid Milad un Nabi is a national gazetted holiday across all provinces including Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, and Islamabad.
            </p>
          </div>

          {/* Live Countdown Timer Card */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-gray-900">
                Live Countdown to 12 Rabi ul Awwal 2026 (Eid Milad un Nabi)
              </h2>
            </div>
            <CountdownCard
              language="en"
              data={eventPrayerData}
              dates={dates}
              currentTimeStr={currentTimeStr}
              mounted={mounted}
            />
          </section>

          {/* City Prayer & Nawafil Schedule Section */}
          <section className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm mb-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <MapPin className="w-6 h-6 text-emerald-600" />
                12 Rabi ul Awwal Prayer Timings & Shab-e-Milad Schedule in Pakistan Cities
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Special Shab-e-Milad nawafil timing, Tahajjud, Isha, and Fajr prayer schedules for major Pakistan cities including Lahore, Gujranwala, Karachi, Islamabad, and Faisalabad.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-emerald-700 text-white rounded-xl">
                    <th className="p-3 sm:p-4 rounded-tl-xl font-bold">City</th>
                    <th className="p-3 sm:p-4 font-bold">Isha Prayer</th>
                    <th className="p-3 sm:p-4 font-bold">Tahajjud Time</th>
                    <th className="p-3 sm:p-4 font-bold">Fajr Prayer</th>
                    <th className="p-3 sm:p-4 rounded-tr-xl font-bold">Shab-e-Milad Nawafil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {citySchedules.map((item, idx) => (
                    <tr key={item.city} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="p-3 sm:p-4 font-bold text-gray-900">
                        {item.city} <span className="text-xs text-gray-500 font-normal">({item.province})</span>
                      </td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800">{item.isha}</td>
                      <td className="p-3 sm:p-4 text-gray-700">{item.tahajjud}</td>
                      <td className="p-3 sm:p-4 font-semibold text-emerald-800">{item.fajr}</td>
                      <td className="p-3 sm:p-4 text-emerald-900 font-medium">{item.shabEMiladNawafil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-emerald-900">
              <p className="font-semibold mb-1">💡 Note on Shab-e-Milad Nawafil Timing:</p>
              <p className="text-gray-700">
                The Mubarak night of 12 Rabi ul Awwal begins immediately after Maghrib on the evening of 11th Rabi ul Awwal (Saturday night, Sept 5, 2026). Worship (Ibadat), recite Darood Shareef, and perform Nawafil throughout this night until Fajr.
              </p>
            </div>
          </section>

          {/* Religious Significance & Azkar Section */}
          <section className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm mb-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                Religious Significance & Recommended Azkar for 12 Rabi ul Awwal
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Learn about the virtues of sending blessings upon the Holy Prophet Muhammad (PBUH) and recommended Shab-e-Milad practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Virtues of Darood Shareef */}
              <div className="p-5 bg-slate-50 border border-emerald-100 rounded-2xl space-y-3">
                <h3 className="font-bold text-emerald-900 text-base flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  Virtues of Darood Shareef
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Reciting <strong>Darood Shareef</strong> on Eid Milad un Nabi is highly rewarding. Almighty Allah commands in Surah Al-Ahzab (33:56):
                </p>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-right font-serif text-emerald-950 text-base dir-rtl" dir="rtl">
                  إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا
                </div>
                <p className="text-xs text-gray-600 italic">
                  &quot;Indeed, Allah and His angels send blessings upon the Prophet. O you who have believed, ask [Allah to confer] blessing upon him and ask [Allah to grant him] peace.&quot;
                </p>
              </div>

              {/* Shab-e-Milad Azkar & Nawafil */}
              <div className="p-5 bg-slate-50 border border-emerald-100 rounded-2xl space-y-3">
                <h3 className="font-bold text-emerald-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Shab-e-Milad Azkar & Worship Guide
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>100x Darood Ibrahimi:</strong> Recite daily and especially on Shab-e-Milad.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Salat-ul-Tasbeeh:</strong> Offer 4 Rakaat Salat-ul-Tasbeeh during the night.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Naat & Seerah Gatherings:</strong> Recite Seerah-un-Nabi (PBUH) and reflect on His noble characteristics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Charity & Sadqah:</strong> Distribute food and aid among the underprivileged in community processions.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Urdu Azkar Section */}
            <div className="p-5 bg-emerald-900 text-white rounded-2xl space-y-3 text-right dir-rtl" dir="rtl">
              <h3 className="text-lg font-bold text-emerald-200">شبِ میلاد کے مخصوص اذکار اور وظائف</h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                شبِ میلاد النبی (صلی اللہ علیہ وآلہ وسلم) کی مبارک رات میں بکثرت درود پاک &quot;صلّی اللّٰہُ علیہِ واٰلہٖ وسلَّم&quot; کا ورد کریں، ۲ یا ۴ رکعت نفل برائے شکرانہ ادا کریں اور امتِ مسلمہ کی سلامتی اور ملک و قوم کی خوشحالی کے لیے دعا کریں۔
              </p>
            </div>
          </section>

          {/* Frequently Asked Questions (FAQ) Section */}
          <section className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  When is 12 Rabi ul Awwal 2026 in Pakistan?
                </h3>
                <p className="text-gray-700">
                  In Pakistan, 12 Rabi ul Awwal 2026 (Eid Milad un Nabi) is expected to be celebrated on <strong>Sunday, September 6, 2026</strong>. The exact date depends on the 1st Rabi ul Awwal 1448 moon sighting expected on August 26, 2026.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Is Eid Milad un Nabi a public holiday in Pakistan?
                </h3>
                <p className="text-gray-700">
                  Yes, 12 Rabi ul Awwal is an official public holiday declared by the Government of Pakistan. All schools, colleges, banks, and government offices remain closed.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-emerald-100">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  What time does Shab-e-Milad worship start?
                </h3>
                <p className="text-gray-700">
                  Shab-e-Milad starts after Maghrib prayer on the evening of 11th Rabi ul Awwal (Saturday evening, Sept 5, 2026) and continues until Fajr on 12th Rabi ul Awwal.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
